import { ScriptInclude } from '@servicenow/sdk/core'

export const MaintenanceBillingEngine = ScriptInclude({
    $id: 'maintenance_billing_engine',
    name: 'MaintenanceBillingEngine',
    description: 'Engine for generating and managing maintenance bills',
    active: true,
    api_name: 'x_664892_society_0.MaintenanceBillingEngine',
    script: `
var MaintenanceBillingEngine = Class.create();
MaintenanceBillingEngine.prototype = {
    initialize: function() {
        this.billTable = 'x_664892_society_0_bill';
        this.billLineTable = 'x_664892_society_0_bill_line';
        this.chargeTable = 'x_664892_society_0_maintenance_charge';
        this.unitTable = 'x_664892_society_0_unit';
        this.societyTable = 'x_664892_society_0_society';
    },

    /**
     * Generate monthly maintenance bills for all active units in a society
     * @param {string} societySysId - sys_id of the society
     * @param {number} month - Month (1-12)
     * @param {number} year - Year (e.g., 2026)
     * @returns {object} - Result with count and status
     */
    generateMonthlyBills: function(societySysId, month, year) {
        var result = {
            success: true,
            billsCreated: 0,
            errors: [],
            skipped: 0
        };

        if (!societySysId || !month || !year) {
            result.success = false;
            result.errors.push('Missing required parameters: societySysId, month, year');
            return result;
        }

        // Get society details
        var society = new GlideRecord(this.societyTable);
        if (!society.get(societySysId)) {
            result.success = false;
            result.errors.push('Society not found: ' + societySysId);
            return result;
        }

        // Get all active units for this society
        var units = new GlideRecord(this.unitTable);
        units.addQuery('society', societySysId);
        units.addQuery('active', true);
        units.addQuery('status', 'occupied');
        units.query();

        while (units.next()) {
            // Check if bill already exists for this unit/month/year
            if (this._billExists(units.sys_id, month, year)) {
                result.skipped++;
                continue;
            }

            // Calculate bill amount
            var billData = this._calculateBillAmount(units.sys_id, societySysId, month, year);

            if (billData.totalAmount > 0) {
                // Create the bill
                var billCreated = this._createBill(units, society, month, year, billData);
                if (billCreated) {
                    result.billsCreated++;
                } else {
                    result.errors.push('Failed to create bill for unit: ' + units.unit_number);
                }
            }
        }

        return result;
    },

    /**
     * Generate bills for all societies for the current month
     * @returns {object} - Summary of bill generation
     */
    generateAllSocietyBills: function() {
        var result = {
            success: true,
            totalBills: 0,
            societies: [],
            errors: []
        };

        var today = new GlideDateTime();
        var month = parseInt(today.getMonthLocalNo());
        var year = parseInt(today.getYearLocal());

        var societies = new GlideRecord(this.societyTable);
        societies.addQuery('active', true);
        societies.query();

        while (societies.next()) {
            var genResult = this.generateMonthlyBills(societies.sys_id, month, year);
            result.totalBills += genResult.billsCreated;
            result.societies.push({
                name: societies.name,
                billsCreated: genResult.billsCreated,
                skipped: genResult.skipped
            });
            if (genResult.errors.length > 0) {
                result.errors = result.errors.concat(genResult.errors);
            }
        }

        return result;
    },

    /**
     * Mark overdue bills - called by scheduled job
     * @param {string} societySysId - Optional: specific society
     * @returns {number} - Count of bills marked as overdue
     */
    markOverdueBills: function(societySysId) {
        var count = 0;
        var today = new GlideDateTime();
        today.setDisplayValue(gs.nowDateTime());

        var gr = new GlideRecord(this.billTable);
        gr.addQuery('status', 'IN', 'generated,sent');
        gr.addQuery('due_date', '<', today);
        if (societySysId) {
            gr.addQuery('society', societySysId);
        }
        gr.query();

        while (gr.next()) {
            gr.status = 'overdue';
            gr.update();
            count++;

            // Optionally notify residents about overdue bill
            this._sendOverdueNotification(gr);
        }

        return count;
    },

    /**
     * Apply late fee to overdue bills
     * @param {number} daysOverdue - Days past due date to apply fee
     * @param {number} feeAmount - Late fee amount
     * @param {string} societySysId - Optional: specific society
     * @returns {number} - Count of bills updated
     */
    applyLateFees: function(daysOverdue, feeAmount, societySysId) {
        var count = 0;
        var cutoffDate = new GlideDateTime();
        cutoffDate.addDaysLocalTime(-daysOverdue);

        var gr = new GlideRecord(this.billTable);
        gr.addQuery('status', 'overdue');
        gr.addQuery('due_date', '<', cutoffDate);
        gr.addQuery('late_fee', '0'); // Only apply once
        if (societySysId) {
            gr.addQuery('society', societySysId);
        }
        gr.query();

        while (gr.next()) {
            gr.late_fee = feeAmount;
            gr.outstanding_amount = parseFloat(gr.outstanding_amount) + feeAmount;
            gr.update();
            count++;
        }

        return count;
    },

    /**
     * Record a payment against a bill
     * @param {string} billSysId - sys_id of the bill
     * @param {number} amount - Payment amount
     * @param {string} paymentMode - Mode of payment
     * @param {string} transactionId - Transaction reference
     * @returns {object} - Payment result
     */
    recordPayment: function(billSysId, amount, paymentMode, transactionId) {
        var result = {
            success: false,
            message: '',
            paymentSysId: null
        };

        var bill = new GlideRecord(this.billTable);
        if (!bill.get(billSysId)) {
            result.message = 'Bill not found';
            return result;
        }

        // Create payment record
        var payment = new GlideRecord('x_664892_society_0_payment');
        payment.initialize();
        payment.society = bill.society;
        payment.bill = billSysId;
        payment.unit = bill.unit;
        payment.resident = bill.resident;
        payment.amount = amount;
        payment.payment_date = gs.nowDateTime();
        payment.payment_mode = paymentMode;
        payment.transaction_id = transactionId || '';
        payment.status = 'pending';

        if (paymentMode === 'cheque') {
            payment.status = 'pending'; // Needs clearance
        } else {
            payment.status = 'cleared';
        }

        result.paymentSysId = payment.insert();

        // Update bill
        if (paymentMode !== 'cheque') {
            this._updateBillAfterPayment(bill, amount);
        }

        result.success = true;
        result.message = 'Payment recorded successfully';
        return result;
    },

    /**
     * Get billing summary for a society
     * @param {string} societySysId - sys_id of the society
     * @param {number} month - Month (1-12)
     * @param {number} year - Year
     * @returns {object} - Billing summary
     */
    getBillingSummary: function(societySysId, month, year) {
        var summary = {
            totalBilled: 0,
            totalCollected: 0,
            totalOutstanding: 0,
            totalOverdue: 0,
            billsByStatus: {}
        };

        var gr = new GlideRecord(this.billTable);
        gr.addQuery('society', societySysId);
        if (month && year) {
            gr.addQuery('bill_period_month', month);
            gr.addQuery('bill_period_year', year);
        }
        gr.query();

        while (gr.next()) {
            var status = gr.status.toString();
            summary.billsByStatus[status] = (summary.billsByStatus[status] || 0) + 1;
            summary.totalBilled += parseFloat(gr.total_amount || 0);
            summary.totalCollected += parseFloat(gr.paid_amount || 0);
            summary.totalOutstanding += parseFloat(gr.outstanding_amount || 0);

            if (gr.status === 'overdue') {
                summary.totalOverdue += parseFloat(gr.outstanding_amount || 0);
            }
        }

        return summary;
    },

    // Private methods

    _billExists: function(unitSysId, month, year) {
        var gr = new GlideRecord(this.billTable);
        gr.addQuery('unit', unitSysId);
        gr.addQuery('bill_period_month', month);
        gr.addQuery('bill_period_year', year);
        gr.setLimit(1);
        gr.query();
        return gr.hasNext();
    },

    _calculateBillAmount: function(unitSysId, societySysId, month, year) {
        var result = {
            totalAmount: 0,
            lineItems: []
        };

        // Get active maintenance charges
        var charges = new GlideRecord(this.chargeTable);
        charges.addQuery('society', societySysId);
        charges.addQuery('active', true);
        charges.query();

        var unit = new GlideRecord(this.unitTable);
        unit.get(unitSysId);

        while (charges.next()) {
            var amount = 0;
            var rate = parseFloat(charges.amount || 0);

            switch (charges.charge_type.toString()) {
                case 'fixed':
                    amount = rate;
                    break;
                case 'per_sqft':
                    var area = parseFloat(unit.area_sqft || 0);
                    amount = area * rate;
                    break;
                case 'per_unit':
                    amount = rate;
                    break;
            }

            result.totalAmount += amount;
            result.lineItems.push({
                charge: charges.sys_id,
                chargeName: charges.name.toString(),
                rate: rate,
                amount: amount
            });
        }

        return result;
    },

    _createBill: function(unit, society, month, year, billData) {
        // Calculate due date (typically 15th of next month)
        var dueDate = new GlideDateTime();
        dueDate.setYear(year);
        dueDate.setMonthLocalNo(month === 12 ? 1 : month + 1);
        dueDate.setDayOfMonthLocalTime(15);

        var bill = new GlideRecord(this.billTable);
        bill.initialize();
        bill.society = society.sys_id;
        bill.unit = unit.sys_id;

        // Get primary resident
        var utils = new SocietyUtils();
        var primaryResident = utils.getPrimaryResident(unit.sys_id);
        if (primaryResident) {
            bill.resident = primaryResident.sys_id;
        }

        bill.bill_period_month = month;
        bill.bill_period_year = year;
        bill.due_date = dueDate;
        bill.total_amount = billData.totalAmount;
        bill.outstanding_amount = billData.totalAmount;
        bill.paid_amount = 0;
        bill.late_fee = 0;
        bill.bill_date = gs.nowDateTime();
        bill.status = 'generated';

        var billSysId = bill.insert();

        if (billSysId && billData.lineItems.length > 0) {
            // Create line items
            for (var i = 0; i < billData.lineItems.length; i++) {
                var line = new GlideRecord(this.billLineTable);
                line.initialize();
                line.bill = billSysId;
                line.charge = billData.lineItems[i].charge;
                line.charge_name = billData.lineItems[i].chargeName;
                line.rate = billData.lineItems[i].rate;
                line.amount = billData.lineItems[i].amount;
                line.quantity = 1;
                line.insert();
            }
        }

        return billSysId;
    },

    _updateBillAfterPayment: function(bill, amount) {
        var newPaidAmount = parseFloat(bill.paid_amount || 0) + amount;
        var newOutstanding = parseFloat(bill.total_amount || 0) + parseFloat(bill.late_fee || 0) - newPaidAmount;

        bill.paid_amount = newPaidAmount;
        bill.outstanding_amount = Math.max(0, newOutstanding);

        if (newOutstanding <= 0) {
            bill.status = 'paid';
        } else if (newPaidAmount > 0) {
            bill.status = 'partial';
        }

        bill.update();
    },

    _sendOverdueNotification: function(bill) {
        // Create a notification event - implementation can be customized
        // gs.eventQueue('x_664892_society_0.bill.overdue', bill);
    },

    type: 'MaintenanceBillingEngine'
};
    `,
})
