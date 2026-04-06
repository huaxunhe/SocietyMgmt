import { Role } from '@servicenow/sdk/core'

// Application Administrator - Full access to all features
export const x_664892_society_0_admin = Role({
    name: 'x_society.admin',
    description: 'Society Management System Administrator - Full access to all application features',
    scopedAdmin: true,
    canDelegate: true,
})

// Society Manager - Management committee members with administrative access
export const x_664892_society_0_manager = Role({
    name: 'x_society.manager',
    description: 'Society Manager - Can manage residents, facilities, complaints, and view reports',
    containsRoles: [x_664892_society_0_admin],
    canDelegate: true,
})

// Society Staff - Security, maintenance staff with limited access
export const x_664892_society_0_staff = Role({
    name: 'x_society.staff',
    description: 'Society Staff - Can manage visitors, update complaints, basic operational access',
    canDelegate: false,
})

// Resident User - Standard resident with self-service access
export const x_664892_society_0_resident_user = Role({
    name: 'x_society.resident',
    description: 'Society Resident - Can view notices, book facilities, raise complaints, view bills',
    canDelegate: false,
})

// Finance User - Access to billing and payment features
export const x_664892_society_0_finance = Role({
    name: 'x_society.finance',
    description: 'Finance User - Can manage bills, payments, expenses, and financial reports',
    containsRoles: [x_664892_society_0_manager],
    canDelegate: true,
})

// Facility Manager - Can manage facility bookings
export const x_664892_society_0_facility_manager = Role({
    name: 'x_society.facility_manager',
    description: 'Facility Manager - Can manage facilities and approve bookings',
    canDelegate: false,
})