# Society Management System - Field Reference

## Table: x_664892_society_0_facility (Facility)

| Field | Full Name | Type | Values/Length | Description |
|-------|-----------|------|---------------|-------------|
| sys_id | x_664892_society_0_facility.sys_id | GUID | - | Primary key |
| society | x_664892_society_0_facility.society | Reference | x_664892_society_0_society | Parent society (required) |
| name | x_664892_society_0_facility.name | String | - | Facility name (required) |
| facility_type | x_664892_society_0_facility.facility_type | Choice | clubhouse, gym, pool, tennis, badminton, party_hall, conference, playground, garden, library, other | Type of facility (required) |
| description | x_664892_society_0_facility.description | String | max 1000 | Facility description |
| capacity | x_664892_society_0_facility.capacity | Integer | - | Maximum capacity |
| booking_charge | x_664892_society_0_facility.booking_charge | Decimal | - | Per-booking charge amount |
| deposit_amount | x_664892_society_0_facility.deposit_amount | Decimal | - | Required deposit amount |
| available_from | x_664892_society_0_facility.available_from | String | - | Daily available from time |
| available_to | x_664892_society_0_facility.available_to | String | - | Daily available until time |
| max_booking_hours | x_664892_society_0_facility.max_booking_hours | Integer | - | Maximum booking duration |
| advance_booking_days | x_664892_society_0_facility.advance_booking_days | Integer | - | Days in advance for booking |
| requires_approval | x_664892_society_0_facility.requires_approval | Boolean | true/false | Requires manager approval |
| status | x_664892_society_0_facility.status | Choice | available, maintenance, closed | Current availability status |
| active | x_664892_society_0_facility.active | Boolean | true/false | Record active flag |

## Table: x_664892_society_0_facility_booking (Facility Booking)

| Field | Full Name | Type | Values/Length | Description |
|-------|-----------|------|---------------|-------------|
| sys_id | x_664892_society_0_facility_booking.sys_id | GUID | - | Primary key |
| booking_number | x_664892_society_0_facility_booking.booking_number | String | unique | Auto-generated booking ID (prefix: BOOK) |
| society | x_664892_society_0_facility_booking.society | Reference | x_664892_society_0_society | Parent society (required) |
| facility | x_664892_society_0_facility_booking.facility | Reference | x_664892_society_0_facility | Booked facility (required) |
| resident | x_664892_society_0_facility_booking.resident | Reference | x_664892_society_0_resident | Booking resident (required) |
| unit | x_664892_society_0_facility_booking.unit | Reference | x_664892_society_0_unit | Resident's unit |
| booking_date | x_664892_society_0_facility_booking.booking_date | DateTime | - | Date of booking (required) |
| start_time | x_664892_society_0_facility_booking.start_time | String | - | Start time (required) |
| end_time | x_664892_society_0_facility_booking.end_time | String | - | End time (required) |
| purpose | x_664892_society_0_facility_booking.purpose | String | max 500 | Reason for booking |
| number_of_guests | x_664892_society_0_facility_booking.number_of_guests | Integer | - | Expected guest count |
| booking_charge | x_664892_society_0_facility_booking.booking_charge | Decimal | - | Copied from facility |
| deposit_amount | x_664892_society_0_facility_booking.deposit_amount | Decimal | - | Copied from facility |
| total_amount | x_664892_society_0_facility_booking.total_amount | Decimal | - | Total charges |
| payment_status | x_664892_society_0_facility_booking.payment_status | Choice | pending, paid, refunded | Payment status |
| status | x_664892_society_0_facility_booking.status | Choice | requested, approved, rejected, cancelled, completed | Booking status |
| approved_by | x_664892_society_0_facility_booking.approved_by | Reference | sys_user | User who approved |
| approval_date | x_664892_society_0_facility_booking.approval_date | DateTime | - | Date approved |
| notes | x_664892_society_0_facility_booking.notes | String | max 1000 | Additional notes |
| active | x_664892_society_0_facility_booking.active | Boolean | true/false | Record active flag |

## Table: x_664892_society_0_complaint (Complaint)

| Field | Full Name | Type | Values/Length | Description |
|-------|-----------|------|---------------|-------------|
| sys_id | x_664892_society_0_complaint.sys_id | GUID | - | Primary key |
| complaint_number | x_664892_society_0_complaint.complaint_number | String | unique | Auto-generated ID (prefix: CMP) |
| society | x_664892_society_0_complaint.society | Reference | x_664892_society_0_society | Parent society (required) |
| resident | x_664892_society_0_complaint.resident | Reference | x_664892_society_0_resident | Complainant (required) |
| unit | x_664892_society_0_complaint.unit | Reference | x_664892_society_0_unit | Related unit |
| building | x_664892_society_0_complaint.building | Reference | x_664892_society_0_building | Related building |
| category | x_664892_society_0_complaint.category | Choice | plumbing, electrical, security, cleanliness, parking, lift, water, noise, common_area, intercom, other | Issue category (required) |
| subject | x_664892_society_0_complaint.subject | String | - | Brief subject (required) |
| description | x_664892_society_0_complaint.description | String | max 2000 | Detailed description (required) |
| priority | x_664892_society_0_complaint.priority | Choice | 1_critical, 2_high, 3_moderate, 4_low | Urgency level |
| location | x_664892_society_0_complaint.location | String | - | Specific location |
| assigned_to | x_664892_society_0_complaint.assigned_to | Reference | sys_user | Assigned staff |
| assigned_group | x_664892_society_0_complaint.assigned_group | Reference | sys_user_group | Assigned team |
| resolution_notes | x_664892_society_0_complaint.resolution_notes | String | max 2000 | Resolution details |
| resolved_at | x_664892_society_0_complaint.resolved_at | DateTime | - | Resolution timestamp |
| resolved_by | x_664892_society_0_complaint.resolved_by | Reference | sys_user | User who resolved |
| status | x_664892_society_0_complaint.status | Choice | new, in_progress, on_hold, resolved, closed, rejected | Current status |
| active | x_664892_society_0_complaint.active | Boolean | true/false | Record active flag |

## Table: x_664892_society_0_notice (Notice)

| Field | Full Name | Type | Values/Length | Description |
|-------|-----------|------|---------------|-------------|
| sys_id | x_664892_society_0_notice.sys_id | GUID | - | Primary key |
| notice_number | x_664892_society_0_notice.notice_number | String | unique | Auto-generated ID (prefix: NTC) |
| society | x_664892_society_0_notice.society | Reference | x_664892_society_0_society | Parent society (required) |
| title | x_664892_society_0_notice.title | String | - | Notice title (required) |
| content | x_664892_society_0_notice.content | String | max 5000 | Notice content (required) |
| notice_type | x_664892_society_0_notice.notice_type | Choice | general, meeting, maintenance, event, important, emergency | Type of notice |
| posted_by | x_664892_society_0_notice.posted_by | Reference | sys_user | User who posted |
| posted_date | x_664892_society_0_notice.posted_date | DateTime | - | Publication date |
| effective_from | x_664892_society_0_notice.effective_from | DateTime | - | Start date (required) |
| effective_to | x_664892_society_0_notice.effective_to | DateTime | - | End date |
| target_audience | x_664892_society_0_notice.target_audience | Choice | all, owners, tenants, committee | Who can see |
| is_pinned | x_664892_society_0_notice.is_pinned | Boolean | true/false | Pinned to top |
| status | x_664892_society_0_notice.status | Choice | draft, published, expired, archived | Notice status |
| active | x_664892_society_0_notice.active | Boolean | true/false | Record active flag |

## Table: x_664892_society_0_visitor (Visitor)

| Field | Full Name | Type | Values/Length | Description |
|-------|-----------|------|---------------|-------------|
| sys_id | x_664892_society_0_visitor.sys_id | GUID | - | Primary key |
| visitor_number | x_664892_society_0_visitor.visitor_number | String | unique | Auto-generated ID (prefix: VIS) |
| society | x_664892_society_0_visitor.society | Reference | x_664892_society_0_society | Parent society (required) |
| visitor_name | x_664892_society_0_visitor.visitor_name | String | - | Visitor's name (required) |
| visitor_phone | x_664892_society_0_visitor.visitor_phone | String | - | Visitor's phone (required) |
| visitor_company | x_664892_society_0_visitor.visitor_company | String | - | Company/organization |
| purpose | x_664892_society_0_visitor.purpose | String | - | Visit purpose (required) |
| visiting_unit | x_664892_society_0_visitor.visiting_unit | Reference | x_664892_society_0_unit | Destination unit (required) |
| visiting_resident | x_664892_society_0_visitor.visiting_resident | Reference | x_664892_society_0_resident | Host resident |
| visitor_type | x_664892_society_0_visitor.visitor_type | Choice | guest, delivery, service, vendor, cab, other | Type of visitor |
| expected_date | x_664892_society_0_visitor.expected_date | DateTime | - | Expected arrival |
| check_in_time | x_664892_society_0_visitor.check_in_time | DateTime | - | Actual check-in time |
| check_out_time | x_664892_society_0_visitor.check_out_time | DateTime | - | Actual check-out time |
| vehicle_number | x_664892_society_0_visitor.vehicle_number | String | - | Vehicle registration |
| id_proof_type | x_664892_society_0_visitor.id_proof_type | String | - | ID document type |
| id_proof_number | x_664892_society_0_visitor.id_proof_number | String | - | ID document number |
| approved_by | x_664892_society_0_visitor.approved_by | Reference | sys_user | Security staff |
| status | x_664892_society_0_visitor.status | Choice | expected, checked_in, checked_out, cancelled, denied | Visit status |
| notes | x_664892_society_0_visitor.notes | String | max 1000 | Additional notes |
| active | x_664892_society_0_visitor.active | Boolean | true/false | Record active flag |

## Table: x_664892_society_0_resident (Resident)

| Field | Full Name | Type | Values/Length | Description |
|-------|-----------|------|---------------|-------------|
| sys_id | x_664892_society_0_resident.sys_id | GUID | - | Primary key |
| society | x_664892_society_0_resident.society | Reference | x_664892_society_0_society | Parent society (required) |
| user | x_664892_society_0_resident.user | Reference | sys_user | Linked user account |
| first_name | x_664892_society_0_resident.first_name | String | - | First name (required) |
| last_name | x_664892_society_0_resident.last_name | String | - | Last name |
| email | x_664892_society_0_resident.email | Email | - | Email address |
| phone | x_664892_society_0_resident.phone | String | max 20 | Phone number |
| alternate_phone | x_664892_society_0_resident.alternate_phone | String | max 20 | Alternate phone |
| emergency_contact | x_664892_society_0_resident.emergency_contact | String | max 20 | Emergency contact number |
| emergency_contact_name | x_664892_society_0_resident.emergency_contact_name | String | - | Emergency contact name |
| resident_type | x_664892_society_0_resident.resident_type | Choice | owner, tenant, family_member | Type of resident (required) |
| gender | x_664892_society_0_resident.gender | Choice | male, female, other | Gender |
| date_of_birth | x_664892_society_0_resident.date_of_birth | DateTime | - | Date of birth |
| id_proof_type | x_664892_society_0_resident.id_proof_type | Choice | aadhar, pan, passport, voter_id, driving_license | ID document type |
| id_proof_number | x_664892_society_0_resident.id_proof_number | String | - | ID document number |
| move_in_date | x_664892_society_0_resident.move_in_date | DateTime | - | Move-in date |
| move_out_date | x_664892_society_0_resident.move_out_date | DateTime | - | Move-out date |
| is_primary_resident | x_664892_society_0_resident.is_primary_resident | Boolean | true/false | Primary contact for unit |
| is_committee_member | x_664892_society_0_resident.is_committee_member | Boolean | true/false | Committee member flag |
| vehicle_count | x_664892_society_0_resident.vehicle_count | Integer | - | Number of vehicles |
| status | x_664892_society_0_resident.status | Choice | active, inactive, moved_out | Resident status |
| active | x_664892_society_0_resident.active | Boolean | true/false | Record active flag |

## Table: x_664892_society_0_bill (Maintenance Bill)

| Field | Full Name | Type | Values/Length | Description |
|-------|-----------|------|---------------|-------------|
| sys_id | x_664892_society_0_bill.sys_id | GUID | - | Primary key |
| bill_number | x_664892_society_0_bill.bill_number | String | unique | Auto-generated ID (prefix: BILL) |
| society | x_664892_society_0_bill.society | Reference | x_664892_society_0_society | Parent society (required) |
| unit | x_664892_society_0_bill.unit | Reference | x_664892_society_0_unit | Billed unit (required) |
| resident | x_664892_society_0_bill.resident | Reference | x_664892_society_0_resident | Responsible resident |
| bill_period_month | x_664892_society_0_bill.bill_period_month | Integer | 1-12 | Billing month (required) |
| bill_period_year | x_664892_society_0_bill.bill_period_year | Integer | - | Billing year (required) |
| due_date | x_664892_society_0_bill.due_date | DateTime | - | Payment due date (required) |
| total_amount | x_664892_society_0_bill.total_amount | Decimal | - | Total bill amount (required) |
| paid_amount | x_664892_society_0_bill.paid_amount | Decimal | - | Amount paid so far |
| outstanding_amount | x_664892_society_0_bill.outstanding_amount | Decimal | - | Remaining balance |
| late_fee | x_664892_society_0_bill.late_fee | Decimal | - | Late payment fee |
| status | x_664892_society_0_bill.status | Choice | draft, generated, sent, partial, paid, overdue, cancelled | Bill status |
| bill_date | x_664892_society_0_bill.bill_date | DateTime | - | Bill generation date |
| notes | x_664892_society_0_bill.notes | String | max 2000 | Additional notes |
| active | x_664892_society_0_bill.active | Boolean | true/false | Record active flag |

## Table: x_664892_society_0_payment (Payment)

| Field | Full Name | Type | Values/Length | Description |
|-------|-----------|------|---------------|-------------|
| sys_id | x_664892_society_0_payment.sys_id | GUID | - | Primary key |
| payment_number | x_664892_society_0_payment.payment_number | String | unique | Auto-generated ID (prefix: PAY) |
| society | x_664892_society_0_payment.society | Reference | x_664892_society_0_society | Parent society (required) |
| bill | x_664892_society_0_payment.bill | Reference | x_664892_society_0_bill | Associated bill |
| unit | x_664892_society_0_payment.unit | Reference | x_664892_society_0_unit | Paying unit (required) |
| resident | x_664892_society_0_payment.resident | Reference | x_664892_society_0_resident | Paying resident |
| amount | x_664892_society_0_payment.amount | Decimal | - | Payment amount (required) |
| payment_date | x_664892_society_0_payment.payment_date | DateTime | - | Date of payment (required) |
| payment_mode | x_664892_society_0_payment.payment_mode | Choice | cash, cheque, neft, upi, card, online | Payment method (required) |
| transaction_id | x_664892_society_0_payment.transaction_id | String | - | Transaction reference |
| cheque_number | x_664892_society_0_payment.cheque_number | String | - | Cheque number |
| cheque_date | x_664892_society_0_payment.cheque_date | DateTime | - | Cheque date |
| bank_name | x_664892_society_0_payment.bank_name | String | - | Bank name |
| receipt_number | x_664892_society_0_payment.receipt_number | String | - | Receipt number |
| status | x_664892_society_0_payment.status | Choice | pending, cleared, bounced, cancelled | Payment status |
| notes | x_664892_society_0_payment.notes | String | max 1000 | Additional notes |
| active | x_664892_society_0_payment.active | Boolean | true/false | Record active flag |

## Table: x_664892_society_0_vehicle (Vehicle)

| Field | Full Name | Type | Values/Length | Description |
|-------|-----------|------|---------------|-------------|
| sys_id | x_664892_society_0_vehicle.sys_id | GUID | - | Primary key |
| society | x_664892_society_0_vehicle.society | Reference | x_664892_society_0_society | Parent society (required) |
| resident | x_664892_society_0_vehicle.resident | Reference | x_664892_society_0_resident | Owner resident (required) |
| unit | x_664892_society_0_vehicle.unit | Reference | x_664892_society_0_unit | Associated unit |
| vehicle_number | x_664892_society_0_vehicle.vehicle_number | String | unique | Registration number (required) |
| vehicle_type | x_664892_society_0_vehicle.vehicle_type | Choice | two_wheeler, four_wheeler, three_wheeler, bicycle | Type of vehicle (required) |
| vehicle_make | x_664892_society_0_vehicle.vehicle_make | String | - | Manufacturer |
| vehicle_model | x_664892_society_0_vehicle.vehicle_model | String | - | Model name |
| vehicle_color | x_664892_society_0_vehicle.vehicle_color | String | - | Vehicle color |
| registration_date | x_664892_society_0_vehicle.registration_date | DateTime | - | Registration date |
| insurance_expiry | x_664892_society_0_vehicle.insurance_expiry | DateTime | - | Insurance expiry date |
| pollution_expiry | x_664892_society_0_vehicle.pollution_expiry | DateTime | - | Pollution cert expiry |
| parking_slot | x_664892_society_0_vehicle.parking_slot | Reference | x_664892_society_0_parking_slot | Assigned parking |
| status | x_664892_society_0_vehicle.status | Choice | active, inactive | Vehicle status |
| active | x_664892_society_0_vehicle.active | Boolean | true/false | Record active flag |

---

## Spec Tables (Simplified Schema)

These tables implement a simplified, unified data model for the Society Management System.

### Table: x_664892_society_0_flat (Flat)

| Field | Full Name | Type | Values/Length | Description |
|-------|-----------|------|---------------|-------------|
| sys_id | x_664892_society_0_flat.sys_id | GUID | - | Primary key |
| flat_number | x_664892_society_0_flat.flat_number | String | max 10 | Flat/unit number e.g. A-101, B-204 (required) |
| block | x_664892_society_0_flat.block | String | max 5 | Block identifier e.g. A, B, C |
| floor | x_664892_society_0_flat.floor | Integer | - | Floor number |
| resident | x_664892_society_0_flat.resident | Reference | sys_user | Current resident (required) |
| ownership | x_664892_society_0_flat.ownership | Choice | owner, tenant | Ownership type (default: owner) |
| move_in_date | x_664892_society_0_flat.move_in_date | Date | - | Move-in date |
| contact_phone | x_664892_society_0_flat.contact_phone | String | max 15 | Contact phone number |
| active | x_664892_society_0_flat.active | Boolean | true/false | Active flag (false when vacant) |

### Table: x_664892_society_0_maintenance_bill (Maintenance Bill - Spec)

| Field | Full Name | Type | Values/Length | Description |
|-------|-----------|------|---------------|-------------|
| sys_id | x_664892_society_0_maintenance_bill.sys_id | GUID | - | Primary key |
| number | x_664892_society_0_maintenance_bill.number | String | unique | Auto-generated ID (prefix: MB) |
| flat | x_664892_society_0_maintenance_bill.flat | Reference | x_664892_society_0_flat | Billed flat (required) |
| month_year | x_664892_society_0_maintenance_bill.month_year | String | max 7 | Billing period e.g. MAR-2026 (required) |
| amount | x_664892_society_0_maintenance_bill.amount | Decimal | - | Charge amount in INR (required) |
| due_date | x_664892_society_0_maintenance_bill.due_date | Date | - | Payment due date (required) |
| status | x_664892_society_0_maintenance_bill.status | Choice | unpaid, paid, overdue | Bill status (default: unpaid) |
| payment_date | x_664892_society_0_maintenance_bill.payment_date | Date | - | Date payment received |
| payment_mode | x_664892_society_0_maintenance_bill.payment_mode | Choice | cash, upi, bank_transfer, cheque | Payment method |
| remarks | x_664892_society_0_maintenance_bill.remarks | String | max 500 | Committee notes |

### Table: x_664892_society_0_service_request (Service Request - Unified)

A unified table for complaints, facility bookings, and notices, distinguished by `request_type`.

| Field | Full Name | Type | Values/Length | Description |
|-------|-----------|------|---------------|-------------|
| sys_id | x_664892_society_0_service_request.sys_id | GUID | - | Primary key |
| number | x_664892_society_0_service_request.number | String | unique | Auto-generated ID (prefix: SR) |
| **Common Fields** |
| request_type | x_664892_society_0_service_request.request_type | Choice | complaint, facility_booking, notice | Type of request (required) |
| title | x_664892_society_0_service_request.title | String | max 200 | Title/subject (required) |
| description | x_664892_society_0_service_request.description | String | max 4000 | Detailed description |
| opened_by | x_664892_society_0_service_request.opened_by | Reference | sys_user | Requester (required) |
| flat | x_664892_society_0_service_request.flat | Reference | x_664892_society_0_flat | Related flat |
| opened_on | x_664892_society_0_service_request.opened_on | Date | - | Auto-set on insert |
| status | x_664892_society_0_service_request.status | Choice | open, in_progress, resolved, confirmed, cancelled, active, expired | Status (default: open) |
| assigned_to | x_664892_society_0_service_request.assigned_to | Reference | sys_user | Assigned committee member |
| **Complaint Fields** |
| category | x_664892_society_0_service_request.category | Choice | water, electricity, lift, parking, housekeeping, security, noise, other | Issue category |
| priority | x_664892_society_0_service_request.priority | Choice | low, medium, high | Urgency (default: medium) |
| vendor_name | x_664892_society_0_service_request.vendor_name | String | max 100 | Outsourced vendor name |
| resolution_notes | x_664892_society_0_service_request.resolution_notes | String | max 2000 | Resolution details |
| resolved_on | x_664892_society_0_service_request.resolved_on | Date | - | Auto-set when resolved |
| **Facility Booking Fields** |
| facility | x_664892_society_0_service_request.facility | Choice | gym, community_hall, terrace, guest_room, swimming_pool | Facility to book |
| booking_date | x_664892_society_0_service_request.booking_date | Date | - | Date of booking |
| start_time | x_664892_society_0_service_request.start_time | String | max 5 | Start time e.g. 10:00 |
| end_time | x_664892_society_0_service_request.end_time | String | max 5 | End time e.g. 14:00 |
| booking_charges | x_664892_society_0_service_request.booking_charges | Decimal | - | Booking fee (default: 0) |
| **Notice Fields** |
| pinned | x_664892_society_0_service_request.pinned | Boolean | true/false | Pinned to top (default: false) |
| expires_on | x_664892_society_0_service_request.expires_on | Date | - | Expiration date |

### Table: x_664892_society_0_visitor_log (Visitor Log)

| Field | Full Name | Type | Values/Length | Description |
|-------|-----------|------|---------------|-------------|
| sys_id | x_664892_society_0_visitor_log.sys_id | GUID | - | Primary key |
| number | x_664892_society_0_visitor_log.number | String | unique | Auto-generated ID (prefix: VL) |
| visitor_name | x_664892_society_0_visitor_log.visitor_name | String | max 100 | Visitor's name (required) |
| visitor_phone | x_664892_society_0_visitor_log.visitor_phone | String | max 15 | Visitor's phone |
| purpose | x_664892_society_0_visitor_log.purpose | Choice | delivery, guest, service_vendor, cab, other | Visit purpose |
| host_flat | x_664892_society_0_visitor_log.host_flat | Reference | x_664892_society_0_flat | Destination flat (required) |
| vehicle_number | x_664892_society_0_visitor_log.vehicle_number | String | max 15 | Vehicle registration |
| entry_time | x_664892_society_0_visitor_log.entry_time | DateTime | - | Entry timestamp (required) |
| exit_time | x_664892_society_0_visitor_log.exit_time | DateTime | - | Exit timestamp |
| logged_by | x_664892_society_0_visitor_log.logged_by | Reference | sys_user | Security staff who logged |

---

## Status Workflows

### Facility Booking
```
requested → approved → completed
         → rejected
         → cancelled
```
- Business Rule: Prevents double booking via `SocietyUtils.isSlotAvailable()`
- Business Rule: Validates end_time > start_time, no past dates
- Business Rule: Copies charges from facility on insert

### Complaint
```
new → in_progress → resolved → closed
                      → rejected
         → on_hold
```
- Business Rule: Auto-sets `resolved_at` and `resolved_by` when status → resolved/closed
- Business Rule: Clears resolution fields if reopened

### Notice
```
draft → published → expired
                  → archived
```
- Business Rule: Auto-sets `posted_date` and `posted_by` when status → published

### Maintenance Bill
```
draft → generated → sent → partial → paid
                      → overdue
         → cancelled
```
- Scheduled Job: `MaintenanceBillingEngine.markOverdueBills()` auto-sets overdue status
- Business Rule: Updates bill status/amounts when payment status → cleared

### Visitor
```
expected → checked_in → checked_out
         → cancelled
         → denied
```
- Business Rule: Auto-sets `check_in_time` and `approved_by` on check-in
- Business Rule: Auto-sets `check_out_time` on check-out

---

## Spec Table Workflows

### Service Request (Unified)
```
Complaint:      open → in_progress → resolved → confirmed/cancelled
Facility Booking: open → confirmed → active → expired/cancelled
Notice:         open → active → expired
```
- Business Rule: Auto-sets `opened_on` on insert
- Business Rule: Auto-sets `resolved_on` when status → resolved
- Business Rule: Prevents double booking for facility_booking type

### Maintenance Bill (Spec)
```
unpaid → paid
       → overdue
```
- Scheduled Job: `MaintenanceBillingEngineSpec.markOverdueBills()` marks unpaid bills with past due_date as overdue
- Scheduled Job: `MaintenanceBillingEngineSpec.generateMonthlyBills()` creates bills for all active flats

---

## Spec Script Include Methods

### SocietyUtilsSpec (x_664892_society_0.SocietyUtilsSpec)

| Method | Parameters | Returns | Description |
|--------|------------|---------|-------------|
| `isSlotAvailable` | facility, bookingDate, startTime, endTime, excludeSysId | boolean | Check if facility time slot is available |
| `getUnpaidBillsByFlat` | flatSysId | GlideRecord | Get unpaid/overdue bills for a flat, ordered by due_date |
| `getOpenRequestsByType` | requestType | GlideRecord | Get open requests by type, ordered by opened_on desc |

### MaintenanceBillingEngineSpec (x_664892_society_0.MaintenanceBillingEngineSpec)

| Method | Parameters | Returns | Description |
|--------|------------|---------|-------------|
| `generateMonthlyBills` | monthYear (e.g. "MAR-2026") | number | Generate bills for all active flats |
| `markOverdueBills` | - | number | Mark unpaid bills with past due_date as overdue |

---

## Script Include Public Methods

### SocietyUtils (x_664892_society_0.SocietyUtils)

| Method | Parameters | Returns | Description |
|--------|------------|---------|-------------|
| `isSlotAvailable` | facility, date, startTime, endTime, excludeBookingId | boolean | Check if facility slot is free |
| `getUnpaidBillsByFlat` | unitSysId | GlideRecord | Get all unpaid bills for a unit |
| `getTotalOutstanding` | unitSysId | number | Sum of outstanding bill amounts |
| `getOpenRequestsByType` | category | GlideRecord | Get open complaints by category |
| `getPrimaryResident` | unitSysId | GlideRecord | Get primary resident for unit |
| `getResidentsByUnit` | unitSysId | GlideRecord | Get all residents for unit |
| `getPendingCheckOuts` | societySysId | number | Count of visitors still checked-in |

### MaintenanceBillingEngine (x_664892_society_0.MaintenanceBillingEngine)

| Method | Parameters | Returns | Description |
|--------|------------|---------|-------------|
| `generateMonthlyBills` | societySysId, month, year | object | Generate bills for all occupied units |
| `generateAllSocietyBills` | - | object | Generate bills for all societies |
| `markOverdueBills` | societySysId (optional) | number | Mark past-due bills as overdue |
| `applyLateFees` | daysOverdue, feeAmount, societySysId (optional) | number | Apply late fee to overdue bills |
| `recordPayment` | billSysId, amount, paymentMode, transactionId | object | Record payment against bill |
| `getBillingSummary` | societySysId, month, year | object | Get billing statistics |
