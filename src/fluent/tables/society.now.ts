import {
    Table,
    StringColumn,
    ReferenceColumn,
    DateTimeColumn,
    DecimalColumn,
    BooleanColumn,
    IntegerColumn,
    GuidColumn,
    ChoiceColumn,
} from '@servicenow/sdk/core'

// Main Society/Community table
export const x_664892_society_0_society = Table({
    name: 'x_664892_society_0_society',
    label: 'Society',
    actions: ['read', 'update', 'delete', 'create'],
    allowNewFields: true,
    schema: {
        sys_id: GuidColumn({ primary: true }),
        name: StringColumn({
            label: 'Society Name',
            mandatory: true,
        }),
        code: StringColumn({
            label: 'Society Code',
            unique: true,
        }),
        address: StringColumn({
            label: 'Address',
            maxLength: 500,
        }),
        city: StringColumn({
            label: 'City',
        }),
        state: StringColumn({
            label: 'State',
        }),
        country: StringColumn({
            label: 'Country',
        }),
        postal_code: StringColumn({
            label: 'Postal Code',
        }),
        total_buildings: IntegerColumn({
            label: 'Total Buildings',
            default: '0',
        }),
        total_units: IntegerColumn({
            label: 'Total Units',
            default: '0',
        }),
        established_date: DateTimeColumn({
            label: 'Established Date',
        }),
        registration_number: StringColumn({
            label: 'Registration Number',
        }),
        gst_number: StringColumn({
            label: 'GST Number',
        }),
        bank_account: StringColumn({
            label: 'Bank Account Number',
        }),
        bank_name: StringColumn({
            label: 'Bank Name',
        }),
        ifsc_code: StringColumn({
            label: 'IFSC Code',
        }),
        maintenance_charge_per_sqft: DecimalColumn({
            label: 'Maintenance Charge per Sq.Ft',
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
            unique: true,
            element: 'code',
        },
    ],
})

// Building within a society
export const x_664892_society_0_building = Table({
    name: 'x_664892_society_0_building',
    label: 'Building',
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
        name: StringColumn({
            label: 'Building Name',
            mandatory: true,
        }),
        code: StringColumn({
            label: 'Building Code',
        }),
        total_floors: IntegerColumn({
            label: 'Total Floors',
            mandatory: true,
        }),
        units_per_floor: IntegerColumn({
            label: 'Units per Floor',
        }),
        total_units: IntegerColumn({
            label: 'Total Units',
            default: '0',
        }),
        building_type: ChoiceColumn({
            label: 'Building Type',
            choices: {
                residential: { label: 'Residential' },
                commercial: { label: 'Commercial' },
                mixed: { label: 'Mixed Use' },
            },
            default: 'residential',
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
    ],
})

// Individual unit/apartment
export const x_664892_society_0_unit = Table({
    name: 'x_664892_society_0_unit',
    label: 'Unit',
    actions: ['read', 'update', 'delete', 'create'],
    allowNewFields: true,
    schema: {
        sys_id: GuidColumn({ primary: true }),
        building: ReferenceColumn({
            label: 'Building',
            referenceTable: 'x_664892_society_0_building',
            mandatory: true,
            attributes: {
                encode_utf8: false,
            },
        }),
        society: ReferenceColumn({
            label: 'Society',
            referenceTable: 'x_664892_society_0_society',
            mandatory: true,
            attributes: {
                encode_utf8: false,
            },
        }),
        unit_number: StringColumn({
            label: 'Unit Number',
            mandatory: true,
        }),
        floor: IntegerColumn({
            label: 'Floor',
            mandatory: true,
        }),
        unit_type: ChoiceColumn({
            label: 'Unit Type',
            choices: {
                '1bhk': { label: '1 BHK' },
                '2bhk': { label: '2 BHK' },
                '3bhk': { label: '3 BHK' },
                '4bhk': { label: '4 BHK' },
                studio: { label: 'Studio' },
                penthouse: { label: 'Penthouse' },
                shop: { label: 'Shop' },
                office: { label: 'Office' },
            },
            dropdown: 'dropdown_with_none',
        }),
        area_sqft: DecimalColumn({
            label: 'Area (Sq.Ft)',
        }),
        ownership_type: ChoiceColumn({
            label: 'Ownership Type',
            choices: {
                owned: { label: 'Owned' },
                rented: { label: 'Rented' },
                vacant: { label: 'Vacant' },
            },
            default: 'vacant',
            dropdown: 'dropdown_with_none',
        }),
        status: ChoiceColumn({
            label: 'Status',
            choices: {
                occupied: { label: 'Occupied' },
                vacant: { label: 'Vacant' },
                under_maintenance: { label: 'Under Maintenance' },
            },
            default: 'vacant',
            dropdown: 'dropdown_with_none',
        }),
        intercom_number: StringColumn({
            label: 'Intercom Number',
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
            element: 'building',
        },
        {
            name: 'index2',
            unique: false,
            element: 'society',
        },
    ],
})
