import { BusinessRule } from '@servicenow/sdk/core'

/**
 * Business Rule: Set dates on complaint
 * Auto-fills opened_on on insert, resolved_at on resolve
 */
export const setComplaintDates = BusinessRule({
    $id: 'br_complaint_set_dates',
    name: 'Set Complaint Dates',
    table: 'x_664892_society_0_complaint',
    when: 'before',
    order: 100,
    script: `
(function executeRule(current, previous) {
    // Set opened_on on insert
    if (current.isNewRecord()) {
        current.opened_on = gs.nowDateTime();
    }

    // Set resolved_at when status changes to resolved or closed
    if (!current.isNewRecord() && current.status.changes()) {
        var newStatus = current.status.toString();
        var oldStatus = previous.status.toString();

        if ((newStatus === 'resolved' || newStatus === 'closed') &&
            (oldStatus !== 'resolved' && oldStatus !== 'closed')) {
            current.resolved_at = gs.nowDateTime();
            current.resolved_by = gs.getUserID();
        }

        // Clear resolved_at if reopened
        if ((oldStatus === 'resolved' || oldStatus === 'closed') &&
            (newStatus !== 'resolved' && newStatus !== 'closed')) {
            current.resolved_at = '';
            current.resolved_by = '';
        }
    }
})(current, previous);
    `,
})

/**
 * Business Rule: Prevent double booking
 * Aborts facility booking if slot already taken
 */
export const preventDoubleBooking = BusinessRule({
    $id: 'br_facility_booking_prevent_double',
    name: 'Prevent Double Booking',
    table: 'x_664892_society_0_facility_booking',
    when: 'before',
    order: 100,
    filter: {
        operation: ['insert', 'update'],
        values: {
            status: ['requested', 'approved'],
        },
    },
    script: `
(function executeRule(current, previous) {
    // Only check for new bookings or when date/time/facility changes
    if (!current.isNewRecord()) {
        var noChanges = !current.facility.changes() &&
                        !current.booking_date.changes() &&
                        !current.start_time.changes() &&
                        !current.end_time.changes();
        if (noChanges) {
            return;
        }
    }

    var utils = new x_664892_society_0.SocietyUtils();

    var isAvailable = utils.isSlotAvailable(
        current.facility.toString(),
        current.booking_date.getDisplayValue().substring(0, 10),
        current.start_time.toString(),
        current.end_time.toString(),
        current.isNewRecord() ? null : current.sys_id.toString()
    );

    if (!isAvailable) {
        gs.addErrorMessage('This time slot is already booked. Please select a different time.');
        current.setAbortAction(true);
    }
})(current, previous);
    `,
})

/**
 * Business Rule: Update bill status on payment
 */
export const updateBillOnPayment = BusinessRule({
    $id: 'br_payment_update_bill',
    name: 'Update Bill on Payment',
    table: 'x_664892_society_0_payment',
    when: 'after',
    order: 100,
    filter: {
        operation: ['insert', 'update'],
    },
    script: `
(function executeRule(current, previous) {
    // Only process if payment is cleared
    if (current.status.toString() !== 'cleared') {
        return;
    }

    // Skip if status didn't change to cleared
    if (!current.isNewRecord() && previous.status.toString() === 'cleared') {
        return;
    }

    if (!current.bill) {
        return;
    }

    var bill = new GlideRecord('x_664892_society_0_bill');
    if (!bill.get(current.bill)) {
        return;
    }

    var newPaidAmount = parseFloat(bill.paid_amount || 0) + parseFloat(current.amount || 0);
    var totalWithLateFee = parseFloat(bill.total_amount || 0) + parseFloat(bill.late_fee || 0);
    var newOutstanding = totalWithLateFee - newPaidAmount;

    bill.paid_amount = newPaidAmount;
    bill.outstanding_amount = Math.max(0, newOutstanding);

    if (newOutstanding <= 0) {
        bill.status = 'paid';
    } else if (newPaidAmount > 0) {
        if (bill.status.toString() === 'overdue') {
            // Keep as overdue but update amounts
        } else {
            bill.status = 'partial';
        }
    }

    bill.update();
})(current, previous);
    `,
})

/**
 * Business Rule: Set visitor check-in/check-out times
 */
export const setVisitorTimes = BusinessRule({
    $id: 'br_visitor_set_times',
    name: 'Set Visitor Times',
    table: 'x_664892_society_0_visitor',
    when: 'before',
    order: 100,
    script: `
(function executeRule(current, previous) {
    // Set check_in_time when status changes to checked_in
    if (current.status.changesTo('checked_in')) {
        current.check_in_time = gs.nowDateTime();
        current.approved_by = gs.getUserID();
    }

    // Set check_out_time when status changes to checked_out
    if (current.status.changesTo('checked_out')) {
        current.check_out_time = gs.nowDateTime();
    }
})(current, previous);
    `,
})

/**
 * Business Rule: Validate facility booking times
 */
export const validateBookingTimes = BusinessRule({
    $id: 'br_facility_booking_validate_times',
    name: 'Validate Booking Times',
    table: 'x_664892_society_0_facility_booking',
    when: 'before',
    order: 50,
    filter: {
        operation: ['insert', 'update'],
    },
    script: `
(function executeRule(current, previous) {
    var startTime = current.start_time.toString();
    var endTime = current.end_time.toString();

    // Validate end time is after start time
    if (startTime && endTime && startTime >= endTime) {
        gs.addErrorMessage('End time must be after start time.');
        current.setAbortAction(true);
        return;
    }

    // Validate booking date is not in the past
    var bookingDate = new GlideDateTime(current.booking_date);
    var today = new GlideDateTime();
    today.setDisplayValue(gs.nowDate());

    if (bookingDate.before(today)) {
        gs.addErrorMessage('Booking date cannot be in the past.');
        current.setAbortAction(true);
        return;
    }

    // Check facility availability hours if configured
    if (current.facility) {
        var facility = new GlideRecord('x_664892_society_0_facility');
        if (facility.get(current.facility)) {
            var availFrom = facility.available_from.toString();
            var availTo = facility.available_to.toString();

            if (availFrom && startTime < availFrom) {
                gs.addErrorMessage('Facility is only available from ' + availFrom);
                current.setAbortAction(true);
                return;
            }

            if (availTo && endTime > availTo) {
                gs.addErrorMessage('Facility is only available until ' + availTo);
                current.setAbortAction(true);
                return;
            }
        }
    }
})(current, previous);
    `,
})

/**
 * Business Rule: Copy charges to booking
 */
export const copyFacilityCharges = BusinessRule({
    $id: 'br_facility_booking_copy_charges',
    name: 'Copy Facility Charges',
    table: 'x_664892_society_0_facility_booking',
    when: 'before',
    order: 200,
    filter: {
        operation: 'insert',
    },
    script: `
(function executeRule(current, previous) {
    if (!current.facility) {
        return;
    }

    var facility = new GlideRecord('x_664892_society_0_facility');
    if (facility.get(current.facility)) {
        current.booking_charge = facility.booking_charge;
        current.deposit_amount = facility.deposit_amount;

        // Calculate total
        var charge = parseFloat(facility.booking_charge || 0);
        var deposit = parseFloat(facility.deposit_amount || 0);
        current.total_amount = charge + deposit;
    }
})(current, previous);
    `,
})

/**
 * Business Rule: Set notice posted date
 */
export const setNoticePostedDate = BusinessRule({
    $id: 'br_notice_set_posted_date',
    name: 'Set Notice Posted Date',
    table: 'x_664892_society_0_notice',
    when: 'before',
    order: 100,
    script: `
(function executeRule(current, previous) {
    // Set posted_date when status changes to published
    if (current.status.changesTo('published')) {
        current.posted_date = gs.nowDateTime();
        current.posted_by = gs.getUserID();
    }

    // Auto-set effective_from to now if not set and publishing
    if (current.status.toString() === 'published' && !current.effective_from) {
        current.effective_from = gs.nowDateTime();
    }
})(current, previous);
    `,
})