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
    actions: ['read', 'update', 'create', 'delete'],
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
            default: 'true',
        }),
    },
})

// Building within a society
export const x_664892_society_0_building = Table({
    name: 'x_664892_society_0_building',
    label: 'Building',
    actions: ['read', 'update', 'create', 'delete'],
    allowNewFields: true,
    schema: {
        sys_id: GuidColumn({ primary: true }),
        society: ReferenceColumn({
            label: 'Society',
            referenceTable: 'x_664892_society_0_society',
            mandatory: true,
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
        }),
        active: BooleanColumn({
            label: 'Active',
            default: 'true',
        }),
    },
})

// Individual unit/apartment
export const x_664892_society_0_unit = Table({
    name: 'x_664892_society_0_unit',
    label: 'Unit',
    actions: ['read', 'update', 'create', 'delete'],
    allowNewFields: true,
    schema: {
        sys_id: GuidColumn({ primary: true }),
        building: ReferenceColumn({
            label: 'Building',
            referenceTable: 'x_664892_society_0_building',
            mandatory: true,
        }),
        society: ReferenceColumn({
            label: 'Society',
            referenceTable: 'x_664892_society_0_society',
            mandatory: true,
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
        }),
        status: ChoiceColumn({
            label: 'Status',
            choices: {
                occupied: { label: 'Occupied' },
                vacant: { label: 'Vacant' },
                under_maintenance: { label: 'Under Maintenance' },
            },
            default: 'vacant',
        }),
        intercom_number: StringColumn({
            label: 'Intercom Number',
        }),
        active: BooleanColumn({
            label: 'Active',
            default: 'true',
        }),
    },
})