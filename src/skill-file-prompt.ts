Create the complete Society Management System app in one pass.

Create the necessary Fluent files for every component below, then add each export to
src/fluent/index.now.ts. Scope prefix is x_society.

───────────────────────────────────────────────────────────────
TABLE 1 — flat  (master flat/unit registry)
───────────────────────────────────────────────────────────────
Purpose: single source of truth for every flat in the society.
Other tables reference this instead of storing flat_number as raw text.

Fields:
- flat_number: String max 10 chars, mandatory — e.g. A-101, B-204
- block: String max 5 chars — e.g. A, B, C
- floor: Integer — floor number
- resident: Reference to sys_user, mandatory — current resident
- ownership: Choice — owner, tenant. Default: owner
- move_in_date: Date
- contact_phone: String max 15 chars
- active: Boolean, default true — false when flat is vacant

───────────────────────────────────────────────────────────────
TABLE 2 — maintenance_bill
───────────────────────────────────────────────────────────────
Purpose: one record per flat per billing month.

Fields:
- flat: Reference to x_society_flat, mandatory
- month_year: String max 7 chars, mandatory — e.g. MAR-2026
- amount: Decimal, mandatory — charge in INR
- due_date: Date, mandatory
- status: Choice — unpaid, paid, overdue. Default: unpaid
- payment_date: Date
- payment_mode: Choice — cash, upi, bank_transfer, cheque
- remarks: String max 500 chars — committee notes

───────────────────────────────────────────────────────────────
TABLE 3 — service_request  (unified: complaints + bookings + notices)
───────────────────────────────────────────────────────────────
Purpose: single table for all resident requests and society communications,
distinguished by request_type.

Common fields (all types):
- request_type: Choice — complaint, facility_booking, notice. Mandatory.
- title: String max 200 chars, mandatory
- description: String max 4000 chars
- opened_by: Reference to sys_user, mandatory
- flat: Reference to x_society_flat
- opened_on: Date — auto-set by business rule on insert
- status: Choice — open, in_progress, resolved, confirmed, cancelled, active, expired
  Default: open
- assigned_to: Reference to sys_user — committee member

Complaint-specific fields:
- category: Choice — water, electricity, lift, parking, housekeeping, security, noise, other
- priority: Choice — low, medium, high. Default: medium
- vendor_name: String max 100 chars — outsourced vendor if any
- resolution_notes: String max 2000 chars
- resolved_on: Date — auto-set by business rule when status → resolved

Facility Booking-specific fields:
- facility: Choice — gym, community_hall, terrace, guest_room, swimming_pool
- booking_date: Date
- start_time: String max 5 chars — e.g. 10:00
- end_time: String max 5 chars — e.g. 14:00
- booking_charges: Decimal, default 0

Notice-specific fields:
- pinned: Boolean, default false
- expires_on: Date

───────────────────────────────────────────────────────────────
TABLE 4 — visitor_log
───────────────────────────────────────────────────────────────
Purpose: gate entry log maintained by security staff.

Fields:
- visitor_name: String max 100 chars, mandatory
- visitor_phone: String max 15 chars
- purpose: Choice — delivery, guest, service_vendor, cab, other
- host_flat: Reference to x_society_flat, mandatory
- vehicle_number: String max 15 chars
- entry_time: DateTime, mandatory
- exit_time: DateTime
- logged_by: Reference to sys_user — security staff

───────────────────────────────────────────────────────────────
BUSINESS RULE 1 — set-dates  (on service_request)
───────────────────────────────────────────────────────────────
Write a before-insert and before-update business rule on x_society_service_request.

It should handle two things:
- On insert: automatically populate opened_on with today's date if it is not already set.
- On update: when the status field changes to "resolved", automatically set resolved_on
  to today's date if it is not already populated.

Generate the appropriate ServiceNow server-side script for this logic.

───────────────────────────────────────────────────────────────
BUSINESS RULE 2 — prevent-double-booking  (on service_request)
───────────────────────────────────────────────────────────────
Write a before-insert and before-update business rule on x_society_service_request.
It should only run when request_type is "facility_booking" and status is not "cancelled".

The rule must prevent a booking from saving if another confirmed booking already exists
for the same facility on the same date with an overlapping time slot.
If a conflict is found, abort the action and show a clear error message to the user.

Generate the ServiceNow server-side script that queries for conflicts and enforces this.

───────────────────────────────────────────────────────────────
SCRIPT INCLUDE 1 — SocietyUtils
───────────────────────────────────────────────────────────────
Create a server-side Script Include class called SocietyUtils (not client-callable).

It should expose three reusable helper methods:

1. A method to check if a facility time slot is available — takes facility, booking date,
   start time, end time, and an optional record sys_id to exclude (for update scenarios).
   Returns true if no confirmed bookings overlap with the given slot, false otherwise.

2. A method to get all unpaid or overdue maintenance bills for a given flat sys_id.
   Returns results ordered by due date ascending.

3. A method to get all open (unresolved/unarchived) service_request records for a given
   request_type. Returns results ordered by opened_on descending.

Generate clean, well-commented ServiceNow GlideRecord-based code for each method.

───────────────────────────────────────────────────────────────
SCRIPT INCLUDE 2 — MaintenanceBillingEngine
───────────────────────────────────────────────────────────────
Create a server-side Script Include class called MaintenanceBillingEngine (not client-callable).

It should expose two methods:

1. generateMonthlyBills(month_year): Takes a billing period string like "MAR-2026".
   Finds all active flat records and for each one checks if a maintenance_bill already
   exists for that month_year. If not, creates a new bill with status = unpaid and
   due_date set to the 10th of the following month.
   Log how many bills were created using gs.info with a [SocietyApp] prefix.

2. markOverdueBills(): Finds all maintenance_bill records that are still "unpaid"
   but have a due_date in the past. Updates their status to "overdue".
   Log how many records were updated using gs.info with a [SocietyApp] prefix.

Generate production-quality ServiceNow server-side code for both methods.

───────────────────────────────────────────────────────────────
SCHEDULED JOB 1 — mark-overdue-bills
───────────────────────────────────────────────────────────────
Name: "Society: Mark Overdue Bills"
Schedule: Daily at 01:00 AM
Write a short job script that instantiates MaintenanceBillingEngine and calls
markOverdueBills(). Generate the script.

───────────────────────────────────────────────────────────────
SCHEDULED JOB 2 — generate-monthly-bills
───────────────────────────────────────────────────────────────
Name: "Society: Generate Monthly Bills"
Schedule: Monthly, 1st of every month at 06:00 AM
Write a job script that resolves the current month and year into a "MMM-YYYY" string
and passes it to MaintenanceBillingEngine.generateMonthlyBills(). Generate the script.

───────────────────────────────────────────────────────────────
ACLs
───────────────────────────────────────────────────────────────
Apply across all four society tables:
ACL 1 — READ: Any authenticated user can read records.
ACL 2 — CREATE: Any authenticated user can create service_requests and visitor_log entries.
  Only committee_member or admin can create maintenance_bill and flat records.
ACL 3 — WRITE: committee_member or admin can update all records.
  Residents can only update their own service_request records (opened_by = current user)
  when status is still "open".
ACL 4 — DELETE: Only admin can delete any record.

───────────────────────────────────────────────────────────────
NAVIGATION
───────────────────────────────────────────────────────────────
Application menu: "Society Management" — visible to all authenticated users.

Menu items:
1. "Dashboard"          order 100 — all service_request records (overview)
2. "My Bills"           order 200 — maintenance_bill filtered by current user’s flat
3. "Complaints"         order 300 — service_request where request_type = complaint
4. "Facility Booking"   order 400 — service_request where request_type = facility_booking
5. "Notices"            order 500 — service_request where request_type = notice, pinned first
6. "Visitor Log"        order 600 — all visitor_log records
7. "Flat Registry"      order 700 — flat table (committee_member/admin role required)