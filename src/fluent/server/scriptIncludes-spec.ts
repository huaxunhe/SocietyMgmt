import { ScriptInclude } from '@servicenow/sdk/core'

/**
 * SCRIPT INCLUDE 1 — SocietyUtilsSpec
 * Reusable helper methods for the Society Management System
 */
export const SocietyUtilsSpec = ScriptInclude({
    $id: 'society_utils_spec_include',
    name: 'SocietyUtilsSpec',
    description: 'Utility functions for Society Management System - facility availability, unpaid bills, open requests',
    active: true,
    api_name: 'x_664892_society_0.SocietyUtilsSpec',
    script: `
var SocietyUtilsSpec = Class.create();
SocietyUtilsSpec.prototype = {
    initialize: function() {
    },

    /**
     * Check if a facility time slot is available for booking
     * @param {string} facility - The facility choice value (gym, community_hall, etc.)
     * @param {string} bookingDate - Date in YYYY-MM-DD format
     * @param {string} startTime - Start time in HH:mm format (e.g., "10:00")
     * @param {string} endTime - End time in HH:mm format (e.g., "14:00")
     * @param {string} excludeSysId - Optional record sys_id to exclude (for update scenarios)
     * @returns {boolean} - true if no confirmed bookings overlap with the given slot
     */
    isSlotAvailable: function(facility, bookingDate, startTime, endTime, excludeSysId) {
        if (!facility || !bookingDate || !startTime || !endTime) {
            return false;
        }

        var gr = new GlideRecord('x_664892_society_0_service_request');
        gr.addQuery('request_type', 'facility_booking');
        gr.addQuery('facility', facility);
        gr.addQuery('booking_date', bookingDate);
        gr.addQuery('status', '!=', 'cancelled');
        gr.addQuery('status', '!=', 'expired');

        // Exclude current booking if updating
        if (excludeSysId) {
            gr.addQuery('sys_id', '!=', excludeSysId);
        }

        // Check for time overlap: existing.start < proposed.end AND existing.end > proposed.start
        var overlapQuery = 'start_time<' + endTime + '^end_time>' + startTime;
        gr.addEncodedQuery(overlapQuery);

        gr.query();

        return !gr.hasNext();
    },

    /**
     * Get all unpaid or overdue maintenance bills for a given flat
     * @param {string} flatSysId - sys_id of the flat
     * @returns {GlideRecord} - GlideRecord of unpaid/overdue bills ordered by due_date ascending
     */
    getUnpaidBillsByFlat: function(flatSysId) {
        var gr = new GlideRecord('x_664892_society_0_maintenance_bill');
        gr.addQuery('flat', flatSysId);
        gr.addQuery('status', 'IN', 'unpaid,overdue');
        gr.orderBy('due_date');
        gr.query();
        return gr;
    },

    /**
     * Get all open (unresolved/unarchived) service_request records for a given request_type
     * @param {string} requestType - The request_type value (complaint, facility_booking, notice)
     * @returns {GlideRecord} - GlideRecord of open requests ordered by opened_on descending
     */
    getOpenRequestsByType: function(requestType) {
        var gr = new GlideRecord('x_664892_society_0_service_request');
        gr.addQuery('request_type', requestType);

        // For complaints: open, in_progress
        // For facility_booking: open, confirmed, active
        // For notices: open, active
        if (requestType === 'complaint') {
            gr.addQuery('status', 'IN', 'open,in_progress');
        } else if (requestType === 'facility_booking') {
            gr.addQuery('status', 'IN', 'open,confirmed,active');
        } else if (requestType === 'notice') {
            gr.addQuery('status', 'IN', 'open,active');
        }

        gr.orderByDesc('opened_on');
        gr.query();
        return gr;
    },

    type: 'SocietyUtilsSpec'
};
    `,
})

/**
 * SCRIPT INCLUDE 2 — MaintenanceBillingEngineSpec
 * Engine for generating monthly bills and marking overdue bills
 */
export const MaintenanceBillingEngineSpec = ScriptInclude({
    $id: 'maintenance_billing_engine_spec_include',
    name: 'MaintenanceBillingEngineSpec',
    description: 'Engine for generating monthly maintenance bills and marking overdue bills',
    active: true,
    api_name: 'x_664892_society_0.MaintenanceBillingEngineSpec',
    script: `
var MaintenanceBillingEngineSpec = Class.create();
MaintenanceBillingEngineSpec.prototype = {
    initialize: function() {
        this.billTable = 'x_664892_society_0_maintenance_bill';
        this.flatTable = 'x_664892_society_0_flat';
    },

    /**
     * Generate monthly maintenance bills for all active flats
     * @param {string} monthYear - Billing period string like "MAR-2026"
     * @returns {number} - Count of bills created
     */
    generateMonthlyBills: function(monthYear) {
        if (!monthYear) {
            gs.error('[SocietyApp] generateMonthlyBills: monthYear parameter is required');
            return 0;
        }

        var billsCreated = 0;

        // Find all active flat records
        var flats = new GlideRecord(this.flatTable);
        flats.addQuery('active', true);
        flats.query();

        while (flats.next()) {
            // Check if a maintenance_bill already exists for that month_year
            var existingBill = new GlideRecord(this.billTable);
            existingBill.addQuery('flat', flats.sys_id);
            existingBill.addQuery('month_year', monthYear);
            existingBill.setLimit(1);
            existingBill.query();

            if (existingBill.hasNext()) {
                // Bill already exists for this flat/month, skip
                continue;
            }

            // Create a new bill with status = unpaid
            // Due date = 10th of the following month
            var dueDate = this._calculateDueDate(monthYear);

            var bill = new GlideRecord(this.billTable);
            bill.initialize();
            bill.flat = flats.sys_id;
            bill.month_year = monthYear;
            bill.amount = this._calculateBillAmount(flats);
            bill.due_date = dueDate;
            bill.status = 'unpaid';
            bill.insert();
            billsCreated++;
        }

        gs.info('[SocietyApp] Generated ' + billsCreated + ' maintenance bills for ' + monthYear);
        return billsCreated;
    },

    /**
     * Mark all unpaid bills with past due_date as overdue
     * @returns {number} - Count of bills marked as overdue
     */
    markOverdueBills: function() {
        var count = 0;
        var today = new GlideDateTime();
        today.setDisplayValue(gs.nowDate());

        var gr = new GlideRecord(this.billTable);
        gr.addQuery('status', 'unpaid');
        gr.addQuery('due_date', '<', today);
        gr.query();

        while (gr.next()) {
            gr.status = 'overdue';
            gr.update();
            count++;
        }

        gs.info('[SocietyApp] Marked ' + count + ' maintenance bills as overdue');
        return count;
    },

    // Private helper methods

    /**
     * Calculate due date as 10th of the following month
     * @param {string} monthYear - Format "MMM-YYYY" (e.g., "MAR-2026")
     * @returns {GlideDateTime} - Due date
     */
    _calculateDueDate: function(monthYear) {
        var parts = monthYear.split('-');
        if (parts.length !== 2) {
            return gs.nowDate();
        }

        var monthMap = {
            'JAN': 1, 'FEB': 2, 'MAR': 3, 'APR': 4,
            'MAY': 5, 'JUN': 6, 'JUL': 7, 'AUG': 8,
            'SEP': 9, 'OCT': 10, 'NOV': 11, 'DEC': 12
        };

        var month = monthMap[parts[0].toUpperCase()];
        var year = parseInt(parts[1]);

        if (!month || isNaN(year)) {
            return gs.nowDate();
        }

        // Next month
        month = month + 1;
        if (month > 12) {
            month = 1;
            year = year + 1;
        }

        var dueDate = new GlideDateTime();
        dueDate.setYear(year);
        dueDate.setMonthLocalNo(month);
        dueDate.setDayOfMonthLocalTime(10);

        return dueDate;
    },

    /**
     * Calculate bill amount for a flat
     * Default implementation returns a fixed amount
     * Can be customized based on flat area, society settings, etc.
     * @param {GlideRecord} flat - The flat record
     * @returns {number} - Bill amount
     */
    _calculateBillAmount: function(flat) {
        // Default maintenance charge - can be customized
        // For example, could read from society configuration or flat area
        return 2000; // Default Rs. 2000 per month
    },

    type: 'MaintenanceBillingEngineSpec'
};
    `,
})