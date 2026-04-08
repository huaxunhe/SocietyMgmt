import {
    Table,
    StringColumn,
    ReferenceColumn,
    DateTimeColumn,
    BooleanColumn,
    IntegerColumn,
    GuidColumn,
    ChoiceColumn,
    EmailColumn,
} from '@servicenow/sdk/core'

// Resident/Owner/Tenant information
export const x_664892_society_0_resident = Table({
    name: 'x_664892_society_0_resident',
    label: 'Resident',
    actions: ['read', 'update', 'delete', 'create'],
    allowNewFields: true,
    schema: {
        sys_id: GuidColumn({ primary: true }),
        society: ReferenceColumn({
            label: 'Society',
            referenceTable: 'x_664892_society_0_society',
            mandatory: true,
            attributes: {
                encode_utf8: false,
            },
        }),
        user: ReferenceColumn({
            label: 'User Account',
            referenceTable: 'sys_user',
            attributes: {
                encode_utf8: false,
            },
        }),
        first_name: StringColumn({
            label: 'First Name',
            mandatory: true,
        }),
        last_name: StringColumn({
            label: 'Last Name',
        }),
        email: EmailColumn({
            label: 'Email',
        }),
        phone: StringColumn({
            label: 'Phone',
            maxLength: 20,
        }),
        alternate_phone: StringColumn({
            label: 'Alternate Phone',
            maxLength: 20,
        }),
        emergency_contact: StringColumn({
            label: 'Emergency Contact',
            maxLength: 20,
        }),
        emergency_contact_name: StringColumn({
            label: 'Emergency Contact Name',
        }),
        resident_type: ChoiceColumn({
            label: 'Resident Type',
            choices: {
                owner: { label: 'Owner' },
                tenant: { label: 'Tenant' },
                family_member: { label: 'Family Member' },
            },
            mandatory: true,
            dropdown: 'dropdown_with_none',
        }),
        gender: ChoiceColumn({
            label: 'Gender',
            choices: {
                male: { label: 'Male' },
                female: { label: 'Female' },
                other: { label: 'Other' },
            },
            dropdown: 'dropdown_with_none',
        }),
        date_of_birth: DateTimeColumn({
            label: 'Date of Birth',
        }),
        id_proof_type: ChoiceColumn({
            label: 'ID Proof Type',
            choices: {
                aadhar: { label: 'Aadhar Card' },
                pan: { label: 'PAN Card' },
                passport: { label: 'Passport' },
                voter_id: { label: 'Voter ID' },
                driving_license: { label: 'Driving License' },
            },
            dropdown: 'dropdown_with_none',
        }),
        id_proof_number: StringColumn({
            label: 'ID Proof Number',
        }),
        move_in_date: DateTimeColumn({
            label: 'Move-in Date',
        }),
        move_out_date: DateTimeColumn({
            label: 'Move-out Date',
        }),
        is_primary_resident: BooleanColumn({
            label: 'Primary Resident',
            default: false,
        }),
        is_committee_member: BooleanColumn({
            label: 'Committee Member',
            default: false,
        }),
        vehicle_count: IntegerColumn({
            label: 'Vehicle Count',
            default: '0',
        }),
        status: ChoiceColumn({
            label: 'Status',
            choices: {
                active: { label: 'Active' },
                inactive: { label: 'Inactive' },
                moved_out: { label: 'Moved Out' },
            },
            default: 'active',
            dropdown: 'dropdown_with_none',
        }),
        active: BooleanColumn({
            label: 'Active',
            default: true,
        }),
    },
    attributes: {
        enforce_dot_walk_cross_scope_access: true,
    },
    index: [
        {
            name: 'index',
            unique: false,
            element: 'society',
        },
        {
            name: 'index2',
            unique: false,
            element: 'user',
        },
    ],
})

// Resident-Unit association (junction table for many-to-many)
export const x_664892_society_0_resident_unit = Table({
    name: 'x_664892_society_0_resident_unit',
    label: 'Resident Unit Association',
    actions: ['read', 'update', 'delete', 'create'],
    allowNewFields: true,
    schema: {
        sys_id: GuidColumn({ primary: true }),
        resident: ReferenceColumn({
            label: 'Resident',
            referenceTable: 'x_664892_society_0_resident',
            mandatory: true,
            attributes: {
                encode_utf8: false,
            },
        }),
        unit: ReferenceColumn({
            label: 'Unit',
            referenceTable: 'x_664892_society_0_unit',
            mandatory: true,
            attributes: {
                encode_utf8: false,
            },
        }),
        relationship_type: ChoiceColumn({
            label: 'Relationship Type',
            choices: {
                owner: { label: 'Owner' },
                tenant: { label: 'Tenant' },
                family: { label: 'Family Member' },
            },
            mandatory: true,
            dropdown: 'dropdown_with_none',
        }),
        is_primary: BooleanColumn({
            label: 'Primary Contact',
            default: false,
        }),
        start_date: DateTimeColumn({
            label: 'Start Date',
        }),
        end_date: DateTimeColumn({
            label: 'End Date',
        }),
        active: BooleanColumn({
            label: 'Active',
            default: true,
        }),
    },
    attributes: {
        enforce_dot_walk_cross_scope_access: true,
    },
    index: [
        {
            name: 'index',
            unique: false,
            element: 'resident',
        },
        {
            name: 'index2',
            unique: false,
            element: 'unit',
        },
    ],
})
