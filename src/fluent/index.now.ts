// Society Management System - Main Entry Point
// Export all tables and roles for SDK processing

// Tables - Society Structure (original)
export * from './tables/society.now'
export * from './tables/resident.now'
export * from './tables/vehicle.now'
export * from './tables/finance.now'
export * from './tables/facility.now'

// Tables - Spec Tables (simplified schema)
export * from './tables/society-spec.now'

// Server-side Scripts (original)
export * from './server/SocietyUtils'
export * from './server/MaintenanceBillingEngine'
export * from './server/businessRules'
export * from './server/scheduledJobs'

// Server-side Scripts - Spec
export * from './server/scriptIncludes-spec'
export * from './server/businessRules-spec'
export * from './server/scheduledJobs-spec'

// Security - ACLs
export * from './security/acl-spec'

// Navigation
export * from './navigation/navigation-spec'

// Roles
export * from './roles.roles'
export * from './roles-spec.roles'