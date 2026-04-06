import { ScriptInclude } from '@servicenow/sdk/core'

export const SocietyUtils = ScriptInclude({
    $id: 'society_utils_script_include',
    name: 'SocietyUtils',
    description: 'Utility functions for Society Management System',
    active: true,
    api_name: 'x_664892_society_0.SocietyUtils',
    script: `
var SocietyUtils = Class.create();
SocietyUtils.prototype = {
    initialize: function() {
    },

    /**
     * Check if a facility time slot is available for booking
     * @param {string} facilitySysId - sys_id of the facility
     * @param {string} date - Date in YYYY-MM-DD format
     * @param {string} startTime - Start time in HH:mm format
     * @param {string} endTime - End time in HH:mm format
     * @param {string} excludeBookingId - Optional booking sys_id to exclude (for updates)
     * @returns {boolean} - true if slot is available
     */
    isSlotAvailable: function(facilitySysId, date, startTime, endTime, excludeBookingId) {
        if (!facilitySysId || !date || !startTime || !endTime) {
            return false;
        }

        var gr = new GlideRecord('x_664892_society_0_facility_booking');
        gr.addQuery('facility', facilitySysId);
        gr.addQuery('booking_date', date);
        gr.addQuery('status', 'IN', 'requested,approved');

        // Exclude current booking if updating
        if (excludeBookingId) {
            gr.addQuery('sys_id', '!=', excludeBookingId);
        }

        // Check for time overlap
        // Overlap occurs if: existing.start < proposed.end AND existing.end > proposed.start
        var overlapCondition =
            '(start_time < \'' + endTime + '\' AND end_time > \'' + startTime + '\')';
        gr.addEncodedQuery(overlapCondition);

        gr.query();

        return !gr.hasNext();
    },

    /**
     * Get all unpaid bills for a specific unit
     * @param {string} unitSysId - sys_id of the unit
     * @returns {GlideRecord} - GlideRecord of unpaid bills
     */
    getUnpaidBillsByFlat: function(unitSysId) {
        var gr = new GlideRecord('x_664892_society_0_bill');
        gr.addQuery('unit', unitSysId);
        gr.addQuery('status', 'IN', 'generated,sent,partial,overdue');
        gr.orderBy('due_date');
        gr.query();
        return gr;
    },

    /**
     * Get total outstanding amount for a unit
     * @param {string} unitSysId - sys_id of the unit
     * @returns {number} - Total outstanding amount
     */
    getTotalOutstanding: function(unitSysId) {
        var total = 0;
        var gr = this.getUnpaidBillsByFlat(unitSysId);
        while (gr.next()) {
            total += parseFloat(gr.outstanding_amount || 0);
        }
        return total;
    },

    /**
     * Get open service requests/complaints by category
     * @param {string} category - Complaint category (optional)
     * @returns {GlideRecord} - GlideRecord of open complaints
     */
    getOpenRequestsByType: function(category) {
        var gr = new GlideRecord('x_664892_society_0_complaint');
        gr.addQuery('status', 'IN', 'new,in_progress');
        if (category) {
            gr.addQuery('category', category);
        }
        gr.orderByDesc('sys_created_on');
        gr.query();
        return gr;
    },

    /**
     * Get primary resident for a unit
     * @param {string} unitSysId - sys_id of the unit
     * @returns {GlideRecord} - Primary resident record
     */
    getPrimaryResident: function(unitSysId) {
        var gr = new GlideRecord('x_664892_society_0_resident_unit');
        gr.addQuery('unit', unitSysId);
        gr.addQuery('is_primary', true);
        gr.addQuery('active', true);
        gr.setLimit(1);
        gr.query();
        if (gr.next()) {
            var resident = new GlideRecord('x_664892_society_0_resident');
            if (resident.get(gr.resident)) {
                return resident;
            }
        }
        return null;
    },

    /**
     * Get all residents for a unit
     * @param {string} unitSysId - sys_id of the unit
     * @returns {GlideRecord} - GlideRecord of resident associations
     */
    getResidentsByUnit: function(unitSysId) {
        var gr = new GlideRecord('x_664892_society_0_resident_unit');
        gr.addQuery('unit', unitSysId);
        gr.addQuery('active', true);
        gr.query();
        return gr;
    },

    /**
     * Check if visitor check-out is pending
     * @param {string} societySysId - sys_id of the society
     * @returns {number} - Count of pending check-outs
     */
    getPendingCheckOuts: function(societySysId) {
        var gr = new GlideRecord('x_664892_society_0_visitor');
        gr.addQuery('society', societySysId);
        gr.addQuery('status', 'checked_in');
        gr.query();
        return gr.getRowCount();
    },

    type: 'SocietyUtils'
};
    `,
})
