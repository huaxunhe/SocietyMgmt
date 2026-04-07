import { ScheduledJob } from '@servicenow/sdk/core'

/**
 * SCHEDULED JOB 1 — mark-overdue-bills
 * Daily at 01:00 AM to mark unpaid past-due bills as overdue
 */
export const markOverdueBillsJobSpec = ScheduledJob({
    $id: 'sj_spec_mark_overdue_bills_v2',
    name: 'Society: Mark Overdue Bills Spec',
    description: 'Daily job to mark unpaid maintenance bills with past due_date as overdue',
    active: true,
    trigger_type: 'daily',
    repeat_interval: 1,
    time: '01:00:00',
    timezone: 'Asia/Kolkata',
    script: `
(function() {
    var engine = new x_664892_society_0.MaintenanceBillingEngineSpec();
    var count = engine.markOverdueBills();
    gs.info('[SocietyApp] Scheduled job completed: ' + count + ' bills marked overdue');
})(current);
    `,
})

/**
 * SCHEDULED JOB 2 — generate-monthly-bills
 * Monthly on 1st at 06:00 AM to generate maintenance bills
 */
export const generateMonthlyBillsJobSpec = ScheduledJob({
    $id: 'sj_spec_generate_monthly_bills_v2',
    name: 'Society: Generate Monthly Bills Spec',
    description: 'Monthly job to generate maintenance bills for all active flats',
    active: true,
    trigger_type: 'monthly',
    repeat_interval: 1,
    monthly_type: 'date',
    monthly_date: 1,
    time: '06:00:00',
    timezone: 'Asia/Kolkata',
    script: `
(function() {
    // Resolve current month and year into "MMM-YYYY" format
    var today = new GlideDateTime();
    var monthNames = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN',
                      'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

    var month = parseInt(today.getMonthLocalNo()) - 1; // 0-indexed
    var year = parseInt(today.getYearLocal());

    var monthYear = monthNames[month] + '-' + year;

    var engine = new x_664892_society_0.MaintenanceBillingEngineSpec();
    var count = engine.generateMonthlyBills(monthYear);

    gs.info('[SocietyApp] Scheduled job completed: ' + count + ' bills generated for ' + monthYear);
})(current);
    `,
})