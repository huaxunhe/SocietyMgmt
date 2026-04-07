import { RecordACL, FieldACL } from '@servicenow/sdk/core'

// ============================================================================
// ACLs for x_664892_society_0_flat
// ============================================================================

// ACL 1 — READ: Any authenticated user can read records
export const flatReadACLSpec = RecordACL({
    $id: 'acl_spec_flat_read',
    table: 'x_664892_society_0_flat',
    operation: 'read',
    admin_overrides: true,
    script: 'answer = true;',
})

// ACL 2 — CREATE: Only committee_member or admin can create flat records
export const flatCreateACLSpec = RecordACL({
    $id: 'acl_spec_flat_create',
    table: 'x_664892_society_0_flat',
    operation: 'create',
    admin_overrides: true,
    roles: ['x_society.admin', 'x_society.manager'],
    script: `
var hasRole = gs.hasRole('x_society.admin') || gs.hasRole('x_society.manager');
answer = hasRole;
    `,
})

// ACL 3 — WRITE: committee_member or admin can update all records
export const flatWriteACLSpec = RecordACL({
    $id: 'acl_spec_flat_write',
    table: 'x_664892_society_0_flat',
    operation: 'write',
    admin_overrides: true,
    roles: ['x_society.admin', 'x_society.manager'],
    script: `
var hasRole = gs.hasRole('x_society.admin') || gs.hasRole('x_society.manager');
answer = hasRole;
    `,
})

// ACL 4 — DELETE: Only admin can delete any record
export const flatDeleteACLSpec = RecordACL({
    $id: 'acl_spec_flat_delete',
    table: 'x_664892_society_0_flat',
    operation: 'delete',
    admin_overrides: true,
    roles: ['x_society.admin'],
    script: `
answer = gs.hasRole('x_society.admin');
    `,
})

// ============================================================================
// ACLs for x_664892_society_0_maintenance_bill
// ============================================================================

export const maintenanceBillReadACLSpec = RecordACL({
    $id: 'acl_spec_maintenance_bill_read',
    table: 'x_664892_society_0_maintenance_bill',
    operation: 'read',
    admin_overrides: true,
    script: 'answer = true;',
})

export const maintenanceBillCreateACLSpec = RecordACL({
    $id: 'acl_spec_maintenance_bill_create',
    table: 'x_664892_society_0_maintenance_bill',
    operation: 'create',
    admin_overrides: true,
    roles: ['x_society.admin', 'x_society.manager'],
    script: `
var hasRole = gs.hasRole('x_society.admin') || gs.hasRole('x_society.manager');
answer = hasRole;
    `,
})

export const maintenanceBillWriteACLSpec = RecordACL({
    $id: 'acl_spec_maintenance_bill_write',
    table: 'x_664892_society_0_maintenance_bill',
    operation: 'write',
    admin_overrides: true,
    roles: ['x_society.admin', 'x_society.manager'],
    script: `
var hasRole = gs.hasRole('x_society.admin') || gs.hasRole('x_society.manager');
answer = hasRole;
    `,
})

export const maintenanceBillDeleteACLSpec = RecordACL({
    $id: 'acl_spec_maintenance_bill_delete',
    table: 'x_664892_society_0_maintenance_bill',
    operation: 'delete',
    admin_overrides: true,
    roles: ['x_society.admin'],
    script: `
answer = gs.hasRole('x_society.admin');
    `,
})

// ============================================================================
// ACLs for x_664892_society_0_service_request
// ============================================================================

export const serviceRequestReadACLSpec = RecordACL({
    $id: 'acl_spec_service_request_read',
    table: 'x_664892_society_0_service_request',
    operation: 'read',
    admin_overrides: true,
    script: 'answer = true;',
})

// CREATE: Any authenticated user can create service_requests
export const serviceRequestCreateACLSpec = RecordACL({
    $id: 'acl_spec_service_request_create',
    table: 'x_664892_society_0_service_request',
    operation: 'create',
    admin_overrides: true,
    script: 'answer = true;',
})

// WRITE: committee_member or admin can update all records
// Residents can only update their own service_request records (opened_by = current user) when status is still "open"
export const serviceRequestWriteACLSpec = RecordACL({
    $id: 'acl_spec_service_request_write',
    table: 'x_664892_society_0_service_request',
    operation: 'write',
    admin_overrides: true,
    script: `
// Committee member or admin can update all records
if (gs.hasRole('x_society.admin') || gs.hasRole('x_society.manager')) {
    answer = true;
} else {
    // Residents can only update their own records when status is "open"
    var isOpened = current.opened_by == gs.getUserID();
    var isOpen = current.status.toString() === 'open';
    answer = isOpened && isOpen;
}
    `,
})

export const serviceRequestDeleteACLSpec = RecordACL({
    $id: 'acl_spec_service_request_delete',
    table: 'x_664892_society_0_service_request',
    operation: 'delete',
    admin_overrides: true,
    roles: ['x_society.admin'],
    script: `
answer = gs.hasRole('x_society.admin');
    `,
})

// ============================================================================
// ACLs for x_664892_society_0_visitor_log
// ============================================================================

export const visitorLogReadACLSpec = RecordACL({
    $id: 'acl_spec_visitor_log_read',
    table: 'x_664892_society_0_visitor_log',
    operation: 'read',
    admin_overrides: true,
    script: 'answer = true;',
})

// CREATE: Any authenticated user can create visitor_log entries
export const visitorLogCreateACLSpec = RecordACL({
    $id: 'acl_spec_visitor_log_create',
    table: 'x_664892_society_0_visitor_log',
    operation: 'create',
    admin_overrides: true,
    script: 'answer = true;',
})

export const visitorLogWriteACLSpec = RecordACL({
    $id: 'acl_spec_visitor_log_write',
    table: 'x_664892_society_0_visitor_log',
    operation: 'write',
    admin_overrides: true,
    roles: ['x_society.admin', 'x_society.manager'],
    script: `
var hasRole = gs.hasRole('x_society.admin') || gs.hasRole('x_society.manager');
answer = hasRole;
    `,
})

export const visitorLogDeleteACLSpec = RecordACL({
    $id: 'acl_spec_visitor_log_delete',
    table: 'x_664892_society_0_visitor_log',
    operation: 'delete',
    admin_overrides: true,
    roles: ['x_society.admin'],
    script: `
answer = gs.hasRole('x_society.admin');
    `,
})