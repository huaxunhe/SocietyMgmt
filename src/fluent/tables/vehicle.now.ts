import {
    Table,
    StringColumn,
    ReferenceColumn,
    DateTimeColumn,
    BooleanColumn,
    GuidColumn,
    ChoiceColumn,
} from '@servicenow/sdk/core'

// Vehicle registration
export const x_664892_society_0_vehicle = Table({
    name: 'x_664892_society_0_vehicle',
    label: 'Vehicle',
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
            attributes: {
                encode_utf8: false,
            },
        }),
        vehicle_number: StringColumn({
            label: 'Vehicle Number',
            mandatory: true,
            unique: true,
        }),
        vehicle_type: ChoiceColumn({
            label: 'Vehicle Type',
            choices: {
                two_wheeler: { label: 'Two Wheeler' },
                four_wheeler: { label: 'Four Wheeler' },
                three_wheeler: { label: 'Three Wheeler' },
                bicycle: { label: 'Bicycle' },
            },
            mandatory: true,
            dropdown: 'dropdown_with_none',
        }),
        vehicle_make: StringColumn({
            label: 'Make',
        }),
        vehicle_model: StringColumn({
            label: 'Model',
        }),
        vehicle_color: StringColumn({
            label: 'Color',
        }),
        registration_date: DateTimeColumn({
            label: 'Registration Date',
        }),
        insurance_expiry: DateTimeColumn({
            label: 'Insurance Expiry',
        }),
        pollution_expiry: DateTimeColumn({
            label: 'Pollution Certificate Expiry',
        }),
        parking_slot: ReferenceColumn({
            label: 'Parking Slot',
            referenceTable: 'x_664892_society_0_parking_slot',
            attributes: {
                encode_utf8: false,
            },
        }),
        status: ChoiceColumn({
            label: 'Status',
            choices: {
                active: { label: 'Active' },
                inactive: { label: 'Inactive' },
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
            element: 'parking_slot',
        },
        {
            name: 'index2',
            unique: false,
            element: 'resident',
        },
        {
            name: 'index3',
            unique: false,
            element: 'society',
        },
        {
            name: 'index4',
            unique: false,
            element: 'unit',
        },
        {
            name: 'index5',
            unique: true,
            element: 'vehicle_number',
        },
    ],
})

// Parking slots
export const x_664892_society_0_parking_slot = Table({
    name: 'x_664892_society_0_parking_slot',
    label: 'Parking Slot',
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
        building: ReferenceColumn({
            label: 'Building',
            referenceTable: 'x_664892_society_0_building',
            attributes: {
                encode_utf8: false,
            },
        }),
        slot_number: StringColumn({
            label: 'Slot Number',
            mandatory: true,
        }),
        parking_level: StringColumn({
            label: 'Parking Level',
        }),
        parking_zone: StringColumn({
            label: 'Parking Zone',
        }),
        slot_type: ChoiceColumn({
            label: 'Slot Type',
            choices: {
                covered: { label: 'Covered' },
                open: { label: 'Open' },
                basement: { label: 'Basement' },
            },
            default: 'open',
            dropdown: 'dropdown_with_none',
        }),
        vehicle_type: ChoiceColumn({
            label: 'Vehicle Type Allowed',
            choices: {
                two_wheeler: { label: 'Two Wheeler' },
                four_wheeler: { label: 'Four Wheeler' },
                any: { label: 'Any' },
            },
            default: 'any',
            dropdown: 'dropdown_with_none',
        }),
        allocation_type: ChoiceColumn({
            label: 'Allocation Type',
            choices: {
                reserved: { label: 'Reserved' },
                visitor: { label: 'Visitor' },
                common: { label: 'Common' },
            },
            default: 'reserved',
            dropdown: 'dropdown_with_none',
        }),
        monthly_charge: StringColumn({
            label: 'Monthly Charge',
        }),
        status: ChoiceColumn({
            label: 'Status',
            choices: {
                available: { label: 'Available' },
                occupied: { label: 'Occupied' },
                reserved: { label: 'Reserved' },
                maintenance: { label: 'Under Maintenance' },
            },
            default: 'available',
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
            element: 'building',
        },
        {
            name: 'index2',
            unique: false,
            element: 'society',
        },
    ],
})
