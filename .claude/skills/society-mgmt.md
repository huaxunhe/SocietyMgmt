---
name: society-mgmt
description: Society Management System project context and conventions
---

# Society Management System - Project Context

## 1. App Identity
- **Name**: Society Management System
- **ScopePrefix**: `x_664892_society_0`
- **SDK Version**: `@servicenow/sdk` 4.5.0
- **Auth Alias**: Default (uses `now-sdk` CLI authentication)

## 2. SDK Commands

| Command | Description |
|---------|-------------|
| `npm run build` | Compile TypeScript, bundle client/server code, generate update set artifact |
| `npm run deploy` | Install/deploy the app to the connected ServiceNow instance |
| `npm run transform` | Convert existing ServiceNow metadata to SDK format |
| `npm run types` | Generate TypeScript type dependencies from instance |
| `npm run dev` | Start local development mode with hot reload |

## 3. File Structure Rules

```
src/
├── fluent/
│   ├── index.now.ts          # MUST export all tables/roles/scripts
│   ├── roles.roles.ts        # Role definitions (*.roles.ts)
│   ├── tables/
│   │   ├── society.now.ts    # Table definitions (*.now.ts)
│   │   ├── resident.now.ts
│   │   ├── vehicle.now.ts
│   │   ├── finance.now.ts
│   │   └── facility.now.ts
│   ├── server/
│   │   ├── businessRules.ts  # Business rules
│   │   ├── scheduledJobs.ts  # Scheduled jobs
│   │   ├── SocietyUtils.ts   # Script includes
│   │   └── MaintenanceBillingEngine.ts
│   └── ui-pages/
│       └── incident-manager.now.ts
└── client/
    ├── main.jsx              # Client entry point
    ├── app.jsx               # Main app component
    └── components/           # React components
```

### Naming Conventions
- Tables: `*.now.ts` in `tables/` folder
- Roles: `*.roles.ts`
- Server scripts: Any `.ts` file in `server/`
- UI Pages: `*.now.ts` in `ui-pages/`
- **Critical**: All exports must be re-exported from `index.now.ts`

## 4. Core Tables

| Table | Purpose |
|-------|---------|
| `x_664892_society_0_society` | Society/Community master record |
| `x_664892_society_0_building` | Buildings within society |
| `x_664892_society_0_unit` | Individual apartments/units |
| `x_664892_society_0_resident` | Residents (owners/tenants) |
| `x_664892_society_0_vehicle` | Vehicle parking records |
| `x_664892_society_0_bill` | Maintenance bills |
| `x_664892_society_0_payment` | Payment records |
| `x_664892_society_0_expense` | Society expenses |
| `x_664892_society_0_facility` | Facilities (gym, pool, etc.) |
| `x_664892_society_0_facility_booking` | Facility reservations |
| `x_664892_society_0_complaint` | Service requests/complaints |
| `x_664892_society_0_notice` | Announcements |
| `x_664892_society_0_visitor` | Visitor management |

## 5. User Roles

| Role | Name | Access Level |
|------|------|--------------|
| `x_society.admin` | Administrator | Full access, scoped admin |
| `x_society.manager` | Manager | Manage residents, facilities, complaints |
| `x_society.staff` | Staff | Visitors, complaint updates, basic ops |
| `x_society.resident` | Resident | Self-service: notices, bookings, bills |
| `x_society.finance` | Finance | Bills, payments, expenses, reports |
| `x_society.facility_manager` | Facility Manager | Facilities and booking approvals |

## 6. Business Logic

- **Complaint Dates**: Auto-set `opened_on`, `resolved_at` on status change
- **Double Booking Prevention**: Validates facility slot availability
- **Payment Updates**: Updates bill `paid_amount` and `status` on payment
- **Visitor Times**: Auto-set `check_in_time`/`check_out_time`
- **Booking Validation**: End time > start time, no past dates
- **Notice Posted Date**: Auto-set when status → published

## 7. Development Workflow

When adding new features:

1. **New Table**: Create in `src/fluent/tables/*.now.ts`, export in `index.now.ts`
2. **New Role**: Add to `roles.roles.ts`, export in `index.now.ts`
3. **Business Rule**: Add to `server/businessRules.ts` or create new file
4. **UI Page**: Create in `ui-pages/*.now.ts`, client components in `client/`
5. **Build & Deploy**: `npm run build` then `npm run deploy`

Always run `npm run build` after changes to verify compilation.