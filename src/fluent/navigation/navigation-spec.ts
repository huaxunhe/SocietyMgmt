import { Application, AppCategory, AppMenu, Module } from '@servicenow/sdk/core'

/**
 * Application Menu: Society Management Spec
 * Visible to all authenticated users
 */
export const societyManagementAppSpec = Application({
    $id: 'app_society_management_spec',
    name: 'x_society_spec',
    title: 'Society Management',
    description: 'Society Management System for residential communities',
    active: true,
})

// Application Menu
export const societyAppMenuSpec = AppMenu({
    $id: 'appmenu_society_management_spec',
    title: 'Society Management',
    application: societyManagementAppSpec,
    active: true,
    roles: [], // Visible to all authenticated users
})

// ============================================================================
// Menu Items
// ============================================================================

// 1. Dashboard - order 100 - all service_request records (overview)
export const dashboardModuleSpec = Module({
    $id: 'module_spec_dashboard',
    title: 'Dashboard',
    application: societyManagementAppSpec,
    order: 100,
    link_type: 'LIST',
    table: 'x_664892_society_0_service_request',
    filter: '',
    roles: [],
    active: true,
})

// 2. My Bills - Order 200 - maintenance_bill filtered by current user's flat
export const myBillsModuleSpec = Module({
    $id: 'module_spec_my_bills',
    title: 'My Bills',
    application: societyManagementAppSpec,
    order: 200,
    link_type: 'LIST',
    table: 'x_664892_society_0_maintenance_bill',
    filter: 'flat.resident=javascript:gs.getUserID()',
    roles: [],
    active: true,
})

// 3. Complaints - Order 300 - service_request where request_type = complaint
export const complaintsModuleSpec = Module({
    $id: 'module_spec_complaints',
    title: 'Complaints',
    application: societyManagementAppSpec,
    order: 300,
    link_type: 'LIST',
    table: 'x_664892_society_0_service_request',
    filter: 'request_type=complaint',
    roles: [],
    active: true,
})

// 4. Facility Booking - Order 400 - service_request where request_type = facility_booking
export const facilityBookingModuleSpec = Module({
    $id: 'module_spec_facility_booking',
    title: 'Facility Booking',
    application: societyManagementAppSpec,
    order: 400,
    link_type: 'LIST',
    table: 'x_664892_society_0_service_request',
    filter: 'request_type=facility_booking',
    roles: [],
    active: true,
})

// 5. Notices - Order 500 - service_request where request_type = notice, pinned first
export const noticesModuleSpec = Module({
    $id: 'module_spec_notices',
    title: 'Notices',
    application: societyManagementAppSpec,
    order: 500,
    link_type: 'LIST',
    table: 'x_664892_society_0_service_request',
    filter: 'request_type=notice^ORDERBYDESCpinned^ORDERBYDESCopened_on',
    roles: [],
    active: true,
})

// 6. Visitor Log - Order 600 - all visitor_log records
export const visitorLogModuleSpec = Module({
    $id: 'module_spec_visitor_log',
    title: 'Visitor Log',
    application: societyManagementAppSpec,
    order: 600,
    link_type: 'LIST',
    table: 'x_664892_society_0_visitor_log',
    filter: '',
    roles: [],
    active: true,
})

// 7. Flat Registry - Order 700 - flat table (committee_member/admin role required)
export const flatRegistryModuleSpec = Module({
    $id: 'module_spec_flat_registry',
    title: 'Flat Registry',
    application: societyManagementAppSpec,
    order: 700,
    link_type: 'LIST',
    table: 'x_664892_society_0_flat',
    filter: '',
    roles: ['x_society.admin', 'x_society.manager'],
    active: true,
})