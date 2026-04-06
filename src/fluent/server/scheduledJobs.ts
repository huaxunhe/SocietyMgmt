import { ScheduledJob } from '@servicenow/sdk/core'

/**
 * Scheduled Job: Mark overdue bills
 * Runs daily at 1:00 AM to mark unpaid past-due bills as overdue
 */
export const markOverdueBillsJob = ScheduledJob({
    $id: 'sj_mark_overdue_bills',
    name: 'Mark Overdue Bills',
    description: 'Daily job to mark unpaid past-due maintenance bills as overdue',
    active: true,
    trigger_type: 'daily',
    repeat_interval: 1,
    repeat_until: '',
    start_date: '',
    time: '01:00:00',
    timezone: 'Asia/Kolkata',
    script: `
(function() {
    var engine = new x_664892_society_0.MaintenanceBillingEngine();

    // Mark overdue bills for all societies
    var count = engine.markOverdueBills();

    gs.info('Marked ' + count + ' maintenance bills as overdue');
})(current);
    `,
})

/**
 * Scheduled Job: Generate monthly bills
 * Runs on 1st of every month at 1:00 AM to generate bills
 */
export const generateMonthlyBillsJob = ScheduledJob({
    $id: 'sj_generate_monthly_bills',
    name: 'Generate Monthly Maintenance Bills',
    description: 'Monthly job to generate maintenance bills for all active units',
    active: true,
    trigger_type: 'monthly',
    repeat_interval: 1,
    monthly_type: 'date',
    monthly_date: 1,
    time: '01:00:00',
    timezone: 'Asia/Kolkata',
    script: `
(function() {
    var engine = new x_664892_society_0.MaintenanceBillingEngine();

    // Generate bills for all active societies
    var result = engine.generateAllSocietyBills();

    gs.info('Generated ' + result.totalBills + ' maintenance bills for ' + result.societies.length + ' societies');

    if (result.errors.length > 0) {
        gs.warn('Bill generation errors: ' + JSON.stringify(result.errors));
    }
})(current);
    `,
})

/**
 * Scheduled Job: Apply late fees
 * Runs daily at 2:00 AM to apply late fees to overdue bills
 */
export const applyLateFeesJob = ScheduledJob({
    $id: 'sj_apply_late_fees',
    name: 'Apply Late Fees',
    description: 'Daily job to apply late fees to bills overdue by more than 15 days',
    active: true,
    trigger_type: 'daily',
    repeat_interval: 1,
    time: '02:00:00',
    timezone: 'Asia/Kolkata',
    script: `
(function() {
    var engine = new x_664892_society_0.MaintenanceBillingEngine();

    // Apply late fee of Rs. 100 for bills overdue by 15+ days
    var count = engine.applyLateFees(15, 100);

    gs.info('Applied late fees to ' + count + ' overdue bills');
})(current);
    `,
})

/**
 * Scheduled Job: Expire old notices
 * Runs daily at 3:00 AM to mark expired notices
 */
export const expireNoticesJob = ScheduledJob({
    $id: 'sj_expire_notices',
    name: 'Expire Old Notices',
    description: 'Daily job to mark notices as expired after their effective_to date',
    active: true,
    trigger_type: 'daily',
    repeat_interval: 1,
    time: '03:00:00',
    timezone: 'Asia/Kolkata',
    script: `
(function() {
    var today = new GlideDateTime();
    today.setDisplayValue(gs.nowDate());

    var count = 0;

    var gr = new GlideRecord('x_664892_society_0_notice');
    gr.addQuery('status', 'published');
    gr.addQuery('effective_to', '<', today);
    gr.addNotNullQuery('effective_to');
    gr.query();

    while (gr.next()) {
        gr.status = 'expired';
        gr.update();
        count++;
    }

    gs.info('Marked ' + count + ' notices as expired');
})(current);
    `,
})

/**
 * Scheduled Job: Send payment reminders
 * Runs daily at 10:00 AM to send payment reminders
 */
export const sendPaymentRemindersJob = ScheduledJob({
    $id: 'sj_send_payment_reminders',
    name: 'Send Payment Reminders',
    description: 'Daily job to send payment reminders for upcoming due dates',
    active: true,
    trigger_type: 'daily',
    repeat_interval: 1,
    time: '10:00:00',
    timezone: 'Asia/Kolkata',
    script: `
(function() {
    var today = new GlideDateTime();
    var reminderDate = new GlideDateTime();
    reminderDate.addDaysLocalTime(3); // Remind 3 days before due date

    var count = 0;

    var gr = new GlideRecord('x_664892_society_0_bill');
    gr.addQuery('status', 'IN', 'generated,sent');
    gr.addQuery('due_date', '>=', today);
    gr.addQuery('due_date', '<=', reminderDate);
    gr.query();

    while (gr.next()) {
        // Get primary resident
        var utils = new x_664892_society_0.SocietyUtils();
        var resident = utils.getPrimaryResident(gr.unit);

        if (resident && resident.email) {
            // Send email notification
            gs.eventQueue('x_664892_society_0.bill.reminder', gr, resident.email, gr.outstanding_amount);
            count++;
        }
    }

    gs.info('Sent payment reminders to ' + count + ' residents');
})(current);
    `,
})
