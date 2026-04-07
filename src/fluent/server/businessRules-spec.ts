import { BusinessRule } from '@servicenow/sdk/core'

/**
 * BUSINESS RULE 1 — set-dates (on service_request)
 * Auto-fills opened_on on insert, resolved_on when status changes to resolved
 */
export const setServiceRequestDatesSpec = BusinessRule({
    $id: 'br_spec_service_request_set_dates',
    name: 'Set Service Request Dates',
    table: 'x_664892_society_0_service_request',
    when: 'before',
    order: 100,
    script: `
(function executeRule(current, previous) {
    // On insert: automatically populate opened_on with today's date if not already set
    if (current.isNewRecord() && !current.opened_on) {
        current.opened_on = gs.nowDate();
    }

    // On update: when status changes to "resolved", automatically set resolved_on
    if (!current.isNewRecord() && current.status.changesTo('resolved')) {
        if (!current.resolved_on) {
            current.resolved_on = gs.nowDate();
        }
    }
})(current, previous);
    `,
})

/**
 * BUSINESS RULE 2 — prevent-double-booking (on service_request)
 * Prevents overlapping facility bookings
 */
export const preventDoubleBookingSpec = BusinessRule({
    $id: 'br_spec_service_request_prevent_double_booking',
    name: 'Prevent Double Booking Spec',
    table: 'x_664892_society_0_service_request',
    when: 'before',
    order: 100,
    filter: {
        operation: ['insert', 'update'],
    },
    script: `
(function executeRule(current, previous) {
    // Only run when request_type is "facility_booking" and status is not "cancelled"
    if (current.request_type.toString() !== 'facility_booking') {
        return;
    }

    if (current.status.toString() === 'cancelled') {
        return;
    }

    // Skip if no relevant fields changed on update
    if (!current.isNewRecord()) {
        var noChanges = !current.facility.changes() &&
                        !current.booking_date.changes() &&
                        !current.start_time.changes() &&
                        !current.end_time.changes();
        if (noChanges) {
            return;
        }
    }

    var facility = current.facility.toString();
    var bookingDate = current.booking_date.getDisplayValue().substring(0, 10);
    var startTime = current.start_time.toString();
    var endTime = current.end_time.toString();
    var excludeId = current.isNewRecord() ? null : current.sys_id.toString();

    // Query for conflicting bookings
    var gr = new GlideRecord('x_664892_society_0_service_request');
    gr.addQuery('request_type', 'facility_booking');
    gr.addQuery('facility', facility);
    gr.addQuery('booking_date', bookingDate);
    gr.addQuery('status', '!=', 'cancelled');
    gr.addQuery('status', '!=', 'expired');

    // Exclude current record for updates
    if (excludeId) {
        gr.addQuery('sys_id', '!=', excludeId);
    }

    // Check for time overlap: existing.start < proposed.end AND existing.end > proposed.start
    var overlapQuery = 'start_time<' + endTime + '^end_time>' + startTime;
    gr.addEncodedQuery(overlapQuery);
    gr.query();

    if (gr.hasNext()) {
        gs.addErrorMessage('This time slot conflicts with an existing booking. Please select a different time.');
        current.setAbortAction(true);
    }
})(current, previous);
    `,
})