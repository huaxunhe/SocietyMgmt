# Society Management System

A ServiceNow application for managing residential societies and apartment complexes in India. Replaces WhatsApp groups and Excel sheets with a proper enterprise application.

## Features

### Property Management
- **Society/Community** - Manage multiple societies from a single instance
- **Buildings & Units** - Track buildings, floors, and individual apartments
- **Residents** - Owner/tenant management with family relationships
- **Vehicles & Parking** - Vehicle registration and parking slot allocation

### Facility Management
- **Amenity Booking** - Book clubhouse, gym, pool, party hall, etc.
- **Complaint Management** - Track and resolve maintenance issues
- **Visitor Management** - Gate entry/exit logging with ID verification
- **Notices** - Society announcements and circulars

### Financial Management
- **Maintenance Billing** - Auto-generate monthly maintenance bills
- **Payment Tracking** - Record payments via multiple modes (UPI, NEFT, cheque, cash)
- **Expense Management** - Track society expenses by category
- **Late Fees** - Automatic late fee application for overdue bills

## Tech Stack

- **Platform**: ServiceNow
- **SDK**: ServiceNow SDK 4.5.0 (Fluent API)
- **Language**: TypeScript
- **Scope**: `x_664892_society_0`

## Prerequisites

- ServiceNow instance (Developer or Production)
- Node.js 18+ and npm
- ServiceNow SDK CLI (`npm install -g @servicenow/sdk`)

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/huaxunhe/SocietyMgmt.git
cd SocietyMgmt
npm install
```

### 2. Configure authentication

```bash
now-sdk auth --add <instance-name> --type basic --alias dev
```

### 3. Update configuration

Edit `now.config.json` with your app's scope ID from ServiceNow:

```json
{
    "scope": "x_664892_society_0",
    "scopeId": "<your-sys-app-sys-id>",
    "name": "Society Management System"
}
```

### 4. Build and deploy

```bash
npm run build   # Compile TypeScript to XML
npm run deploy  # Deploy to ServiceNow instance
```

## Development Commands

| Command | Description |
|---------|-------------|
| `npm run build` | Compile TypeScript to XML, checks for errors |
| `npm run deploy` | Build and push to ServiceNow instance |
| `npm run types` | Fetch type definitions from instance |
| `npm run transform` | Pull instance state to local (commit first!) |

## Project Structure

```
SocietyMgmt/
├── src/fluent/
│   ├── index.now.ts          # Main entry point - exports all modules
│   ├── tables/               # Table definitions (Fluent)
│   │   ├── society.now.ts    # Society, Building, Unit
│   │   ├── resident.now.ts   # Resident, Resident_Unit
│   │   ├── vehicle.now.ts    # Vehicle, Parking_Slot
│   │   ├── facility.now.ts   # Facility, Facility_Booking, Complaint, Notice, Visitor
│   │   └── finance.now.ts    # Bill, Bill_Line, Payment, Expense, Maintenance_Charge
│   ├── server/               # Server-side scripts
│   │   ├── SocietyUtils.ts   # Utility functions
│   │   ├── MaintenanceBillingEngine.ts  # Billing engine
│   │   ├── businessRules.ts  # Business rules
│   │   └── scheduledJobs.ts  # Scheduled jobs
│   └── roles.roles.ts        # Role definitions
├── docs/
│   └── field-reference.md    # Field documentation
├── now.config.json           # App configuration
└── package.json              # Dependencies and scripts
```

## Data Model

### Core Tables

| Table | Label | Purpose |
|-------|-------|---------|
| `x_664892_society_0_society` | Society | Master society/community record |
| `x_664892_society_0_building` | Building | Buildings within a society |
| `x_664892_society_0_unit` | Unit | Individual apartments/flats |
| `x_664892_society_0_resident` | Resident | Resident information |
| `x_664892_society_0_resident_unit` | Resident Unit | Resident-Unit association |

### Facility Tables

| Table | Label | Purpose |
|-------|-------|---------|
| `x_664892_society_0_facility` | Facility | Amenities (clubhouse, gym, etc.) |
| `x_664892_society_0_facility_booking` | Facility Booking | Amenity reservations |
| `x_664892_society_0_complaint` | Complaint | Service requests/complaints |
| `x_664892_society_0_notice` | Notice | Announcements |
| `x_664892_society_0_visitor` | Visitor | Gate entry log |

### Finance Tables

| Table | Label | Purpose |
|-------|-------|---------|
| `x_664892_society_0_maintenance_charge` | Maintenance Charge | Charge definitions |
| `x_664892_society_0_bill` | Maintenance Bill | Monthly bills |
| `x_664892_society_0_bill_line` | Bill Line Item | Bill line items |
| `x_664892_society_0_payment` | Payment | Payment records |
| `x_664892_society_0_expense` | Expense | Society expenses |

## Automation

### Business Rules

- **Set Complaint Dates** - Auto-fills `opened_on` and `resolved_at`
- **Prevent Double Booking** - Blocks overlapping facility reservations
- **Update Bill on Payment** - Updates bill status when payment clears
- **Validate Booking Times** - Ensures valid time ranges
- **Copy Facility Charges** - Auto-populates booking charges

### Scheduled Jobs

| Job | Schedule | Description |
|-----|----------|-------------|
| Mark Overdue Bills | Daily @ 1:00 AM | Marks unpaid past-due bills |
| Generate Monthly Bills | Monthly @ 1st | Auto-generates maintenance bills |
| Apply Late Fees | Daily @ 2:00 AM | Applies late fees after 15 days |
| Expire Notices | Daily @ 3:00 AM | Marks expired notices |
| Payment Reminders | Daily @ 10:00 AM | Sends upcoming due date reminders |

### Script Includes

**SocietyUtils**
```javascript
var utils = new x_664892_society_0.SocietyUtils();
utils.isSlotAvailable(facilityId, date, startTime, endTime);
utils.getUnpaidBillsByFlat(unitId);
utils.getPrimaryResident(unitId);
```

**MaintenanceBillingEngine**
```javascript
var engine = new x_664892_society_0.MaintenanceBillingEngine();
engine.generateMonthlyBills(societyId, month, year);
engine.markOverdueBills();
engine.recordPayment(billId, amount, paymentMode, transactionId);
```

## Roles

| Role | Description |
|------|-------------|
| `x_664892_society_0.resident` | Basic resident access |
| `x_664892_society_0.committee_member` | Committee member privileges |
| `x_664892_society_0.admin` | Full administrative access |

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

UNLICENSED - Private application for Society Management.

## Support

For issues and feature requests, please use the [GitHub Issues](https://github.com/huaxunhe/SocietyMgmt/issues) page.