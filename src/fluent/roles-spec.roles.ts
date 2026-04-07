import { Role } from '@servicenow/sdk/core'

// Application Administrator - Full access to all features
export const x_society_admin = Role({
    name: 'x_society.admin',
    description: 'Society Management System Administrator - Full access to all application features',
    scopedAdmin: true,
    canDelegate: true,
})

// Committee Member / Manager - Management committee members
export const x_society_manager = Role({
    name: 'x_society.manager',
    description: 'Committee Member - Can manage flats, bills, service requests, and visitor logs',
    containsRoles: [x_society_admin],
    canDelegate: true,
})

// Resident - Standard resident with self-service access
export const x_society_resident = Role({
    name: 'x_society.resident',
    description: 'Society Resident - Can view notices, book facilities, raise complaints, view own bills',
    canDelegate: false,
})