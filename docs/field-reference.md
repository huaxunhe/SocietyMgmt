# Field Reference

**Scope Prefix**: `x_664892_society_0_`

---

## Table: Unit (Flat Registry)

**Table Name**: `x_664892_society_0_unit`
**Label**: Unit

| Short Name | Full Field Name | Type | Values/Constraints | Description |
|------------|-----------------|------|-------------------|-------------|
| sys_id | x_664892_society_0_unit.sys_id | GUID | Primary key | Unique identifier for the unit |
| building | x_664892_society_0_unit.building | Reference | → x_664892_society_0_building (mandatory) | Building this unit belongs to |
| society | x_664892_society_0_unit.society | Reference | → x_664892_society_0_society (mandatory) | Society this unit belongs to |
| unit_number | x_664892_society_0_unit.unit_number | String | Mandatory | Apartment/unit number (e.g., A-101) |
| floor | x_664892_society_0_unit.floor | Integer | Mandatory | Floor number |
| unit_type | x_664892_society_0_unit.unit_type | Choice | 1bhk, 2bhk, 3bhk, 4bhk, studio, penthouse, shop, office | Type of unit |
| area_sqft | x_664892_society_0_unit.area_sqft | Decimal | — | Area in square feet |
| ownership_type | x_664892_society_0_unit.ownership_type | Choice | owned, rented, vacant (default: vacant) | Current ownership status |
| status | x_664892_society_0_unit.status | Choice | occupied, vacant, under_maintenance (default: vacant) | Occupancy status |
| intercom_number | x_664892_society_0_unit.intercom_number | String | — | Intercom extension number |
| active | x_664892_society_0_unit.active | Boolean | default: true | Record is active |

---

## Table: Maintenance Bill

**Table Name**: `x_664892_society_0_bill`
**Label**: Maintenance Bill
**Auto-number**: BILL1000+

| Short Name | Full Field Name | Type | Values/Constraints | Description |
|------------|-----------------|------|-------------------|-------------|
| sys_id | x_664892_society_0_bill.sys_id | GUID | Primary key | Unique identifier |
| bill_number | x_664892_society_0_bill.bill_number | String | Unique | Auto-generated bill number |
| society | x_664892_society_0_bill.society | Reference | → x_664892_society_0_society (mandatory) | Society reference |
| unit | x_664892_society_0_bill.unit | Reference | → x_664892_society_0_unit (mandatory) | Unit being billed |
| resident | x_664892_society_0_bill.resident | Reference | → x_664892_society_0_resident | Resident responsible for payment |
| bill_period_month | x_664892_society_0_bill.bill_period_month | Integer | 1-12 (mandatory) | Month of billing period |
| bill_period_year | x_664892_society_0_bill.bill_period_year | Integer | mandatory | Year of billing period |
| due_date | x_664892_society_0_bill.due_date | DateTime | Mandatory | Payment due date |
| total_amount | x_664892_society_0_bill.total_amount | Decimal | Mandatory | Total bill amount |
| paid_amount | x_664892_society_0_bill.paid_amount | Decimal | default: 0 | Amount paid so far |
| outstanding_amount | x_664892_society_0_bill.outstanding_amount | Decimal | — | Remaining balance |
| late_fee | x_664892_society_0_bill.late_fee | Decimal | default: 0 | Late payment charges |
| status | x_664892_society_0_bill.status | Choice | draft, generated, sent, partial, paid, overdue, cancelled (default: draft) | Bill status |
| bill_date | x_664892_society_0_bill.bill_date | DateTime | — | Date bill was generated |
| notes | x_664892_society_0_bill.notes | String | max 2000 chars | Additional notes |
| active | x_664892_society_0_bill.active | Boolean | default: true | Record is active |

---

## Table: Complaint (Service Requests)

**Table Name**: `x_664892_society_0_complaint`
**Label**: Complaint
**Auto-number**: CMP1000+

| Short Name | Full Field Name | Type | Values/Constraints | Description |
|------------|-----------------|------|-------------------|-------------|
| sys_id | x_664892_society_0_complaint.sys_id | GUID | Primary key | Unique identifier |
| complaint_number | x_664892_society_0_complaint.complaint_number | String | Unique | Auto-generated complaint number |
| society | x_664892_society_0_complaint.society | Reference | → x_664892_society_0_society (mandatory) | Society reference |
| resident | x_664892_society_0_complaint.resident | Reference | → x_664892_society_0_resident (mandatory) | Resident who raised complaint |
| unit | x_664892_society_0_complaint.unit | Reference | → x_664892_society_0_unit | Related unit |
| building | x_664892_society_0_complaint.building | Reference | → x_664892_society_0_building | Related building |
| category | x_664892_society_0_complaint.category | Choice | plumbing, electrical, security, cleanliness, parking, lift, water, noise, common_area, intercom, other (mandatory) | Complaint category |
| subject | x_664892_society_0_complaint.subject | String | Mandatory | Brief subject line |
| description | x_664892_society_0_complaint.description | String | max 2000 chars (mandatory) | Detailed description |
| priority | x_664892_society_0_complaint.priority | Choice | 1_critical, 2_high, 3_moderate, 4_low (default: 3_moderate) | Priority level |
| location | x_664892_society_0_complaint.location | String | — | Specific location of issue |
| assigned_to | x_664892_society_0_complaint.assigned_to | Reference | → sys_user | Staff assigned to resolve |
| assigned_group | x_664892_society_0_complaint.assigned_group | Reference | → sys_user_group | Team assigned |
| resolution_notes | x_664892_society_0_complaint.resolution_notes | String | max 2000 chars | Resolution details |
| resolved_at | x_664892_society_0_complaint.resolved_at | DateTime | — | Resolution timestamp |
| resolved_by | x_664892_society_0_complaint.resolved_by | Reference | → sys_user | User who resolved |
| status | x_664892_society_0_complaint.status | Choice | new, in_progress, on_hold, resolved, closed, rejected (default: new) | Complaint status |
| active | x_664892_society_0_complaint.active | Boolean | default: true | Record is active |

---

## Table: Visitor Log

**Table Name**: `x_664892_society_0_visitor`
**Label**: Visitor
**Auto-number**: VIS1000+

| Short Name | Full Field Name | Type | Values/Constraints | Description |
|------------|-----------------|------|-------------------|-------------|
| sys_id | x_664892_society_0_visitor.sys_id | GUID | Primary key | Unique identifier |
| visitor_number | x_664892_society_0_visitor.visitor_number | String | Unique | Auto-generated visitor pass number |
| society | x_664892_society_0_visitor.society | Reference | → x_664892_society_0_society (mandatory) | Society reference |
| visitor_name | x_664892_society_0_visitor.visitor_name | String | Mandatory | Name of visitor |
| visitor_phone | x_664892_society_0_visitor.visitor_phone | String | Mandatory | Visitor's phone number |
| visitor_company | x_664892_society_0_visitor.visitor_company | String | — | Company/organization if applicable |
| purpose | x_664892_society_0_visitor.purpose | String | Mandatory | Reason for visit |
| visiting_unit | x_664892_society_0_visitor.visiting_unit | Reference | → x_664892_society_0_unit (mandatory) | Unit being visited |
| visiting_resident | x_664892_society_0_visitor.visiting_resident | Reference | → x_664892_society_0_resident | Resident being visited |
| visitor_type | x_664892_society_0_visitor.visitor_type | Choice | guest, delivery, service, vendor, cab, other (default: guest) | Type of visitor |
| expected_date | x_664892_society_0_visitor.expected_date | DateTime | — | Expected arrival date/time |
| check_in_time | x_664892_society_0_visitor.check_in_time | DateTime | — | Actual check-in timestamp |
| check_out_time | x_664892_society_0_visitor.check_out_time | DateTime | — | Actual check-out timestamp |
| vehicle_number | x_664892_society_0_visitor.vehicle_number | String | — | Vehicle registration number |
| id_proof_type | x_664892_society_0_visitor.id_proof_type | String | — | Type of ID provided |
| id_proof_number | x_664892_society_0_visitor.id_proof_number | String | — | ID document number |
| approved_by | x_664892_society_0_visitor.approved_by | Reference | → sys_user | Security staff who approved entry |
| status | x_664892_society_0_visitor.status | Choice | expected, checked_in, checked_out, cancelled, denied (default: expected) | Visit status |
| notes | x_664892_society_0_visitor.notes | String | max 1000 chars | Additional notes |
| active | x_664892_society_0_visitor.active | Boolean | default: true | Record is active |

---

## Related Tables

### Facility Booking (`x_664892_society_0_facility_booking`)
Auto-number: BOOK1000+. For booking clubhouse, gym, party hall, etc.

### Notice (`x_664892_society_0_notice`)
Auto-number: NTC1000+. Society announcements and notices.

---

## Status Workflows

### Maintenance Bill Status
```
draft → generated → sent → partial → paid
                      ↓
                   overdue (auto-set by scheduled job when due_date < today and status != 'paid')
                      ↓
                   cancelled
```

### Complaint Status
```
new → in_progress → resolved → closed
         ↓
      on_hold
         ↓
      rejected
```

### Facility Booking Status
```
requested → approved → completed
               ↓
           rejected
               ↓
           cancelled
```

### Visitor Status
```
expected → checked_in → checked_out
              ↓
           denied
              ↓
           cancelled
```

---

## Script Include Public Methods

### SocietyUtils
| Method | Parameters | Returns | Description |
|--------|------------|---------|-------------|
| `isSlotAvailable(facility, date, start, end)` | facility: sys_id, date: date, start: string, end: string | boolean | Checks if a facility slot is free for booking |
| `getUnpaidBillsByFlat(flat_sys_id)` | flat_sys_id: string | GlideRecord | Returns all unpaid bills for a unit |
| `getOpenRequestsByType(request_type)` | request_type: string | GlideRecord | Returns open service requests by type |

### MaintenanceBillingEngine
| Method | Parameters | Returns | Description |
|--------|------------|---------|-------------|
| `generateMonthlyBills(month_year)` | month_year: string (YYYY-MM) | void | Auto-generates bills for all active units |
| `markOverdueBills()` | — | number | Marks unpaid past-due bills as overdue, returns count updated |

---

## Scheduled Jobs

| Job | Schedule | Description |
|-----|----------|-------------|
| Mark Overdue Bills | Daily @ 1:00 AM | Calls `MaintenanceBillingEngine.markOverdueBills()` |
| Generate Monthly Bills | Monthly @ 1st | Calls `MaintenanceBillingEngine.generateMonthlyBills()` with current month |
