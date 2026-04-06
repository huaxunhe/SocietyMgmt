# Society Management System - ServiceNow SDK Assistant

You are an expert assistant for the **Society Management System** ServiceNow application.

## App Identity
- **Name**: Society Management System
- **Scope Prefix**: `x_society`
- **Scope ID**: `2f615807c5324c9d96440b479fc333ff`
- **SDK Version**: `@servicenow/sdk` 4.5.0, `@servicenow/glide` 27.0.5
- **Auth Alias**: (configured via `now-sdk auth`)

## SDK Commands
| Command | Script | Purpose |
|---------|--------|---------|
| Build | `npm run build` | Compiles the app and generates the update set |
| Deploy | `npm run deploy` | Installs the app to the configured instance |
| Transform | `npm run transform` | Converts existing instance metadata to SDK code |
| Types | `npm run types` | Fetches type definitions from instance |

## File Structure Rules
- **Fluent APIs**: Place in `src/fluent/*.now.ts` files
- **Tables**: Place in `src/fluent/tables/*.now.ts` files
- **Entry Point**: `src/fluent/index.now.ts` exports all Fluent definitions
- **Naming Convention**: Files must end in `.now.ts` for SDK recognition
- **Table Definitions**: Export name must match table name (e.g., `export const x_society_resident = Table({ name: 'x_society_resident', ... })`)
- **ChoiceColumn**: Use `{ choice_value: { label: 'Label' } }` format, not `{ value, label }`
- **All artifacts** (tables, roles, ACLs, UI components, flows) are defined in `.now.ts` files

## Core Tables

### Society Structure
| Table | Label | Description |
|-------|-------|-------------|
| `x_society_society` | Society | Main society/community record |
| `x_society_building` | Building | Buildings within a society |
| `x_society_unit` | Unit | Individual apartments/units |
| `x_society_resident` | Resident | Resident/owner/tenant information |
| `x_society_resident_unit` | Resident Unit Association | Junction table linking residents to units |

### Vehicles & Parking
| Table | Label | Description |
|-------|-------|-------------|
| `x_society_vehicle` | Vehicle | Vehicle registrations |
| `x_society_parking_slot` | Parking Slot | Parking slot inventory and allocation |

### Finance
| Table | Label | Description |
|-------|-------|-------------|
| `x_society_maintenance_charge` | Maintenance Charge | Charge definitions (fixed/per sqft/per unit) |
| `x_society_bill` | Maintenance Bill | Monthly maintenance bills/invoices |
| `x_society_bill_line` | Bill Line Item | Individual charge line items on bills |
| `x_society_payment` | Payment | Payment records received from residents |
| `x_society_expense` | Expense | Society expense tracking |

### Facilities & Services
| Table | Label | Description |
|-------|-------|-------------|
| `x_society_facility` | Facility | Amenities (clubhouse, gym, pool, etc.) |
| `x_society_facility_booking` | Facility Booking | Facility reservation records |
| `x_society_complaint` | Complaint | Service requests/complaints |
| `x_society_notice` | Notice | Announcements/notices |
| `x_society_visitor` | Visitor | Visitor management/check-in |

## User Roles
| Role | Description |
|------|-------------|
| `x_society.admin` | Full admin access (scoped admin) |
| `x_society.manager` | Committee members - manage residents, facilities, complaints |
| `x_society.staff` | Security/maintenance staff - visitors, complaints |
| `x_society.resident` | Standard resident - self-service access |
| `x_society.finance` | Billing and payment management |
| `x_society.facility_manager` | Facility and booking management |

## Common Gotchas
- Always prefix custom table names with `x_society_` (scope prefix)
- All SDK artifacts require the `.now.ts` extension
- Table export name must match the `name` property exactly
- ChoiceColumn uses `{ value: { label: 'Label' } }` not `{ value: 'x', label: 'y' }`
- Run `npm run types` after adding new tables to get type definitions
- Use `now-sdk auth` to configure instance credentials before deploy
- No `PhoneNumberColumn` available - use `StringColumn` with `maxLength: 20`