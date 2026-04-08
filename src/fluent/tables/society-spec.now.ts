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
    DateColumn,
} from '@servicenow/sdk/core'

/**
 * TABLE 1 — flat (master flat/unit registry)
 * Single source of truth for every flat in the society.
 * Other tables reference this instead of storing flat_number as raw text.
 */
export const x_664892_society_0_flat = Table({
    name: 'x_664892_society_0_flat',
    label: 'Flat',
    actions: ['read', 'update', 'delete', 'create'],
    allowNewFields: true,
    schema: {
        sys_id: GuidColumn({ primary: true }),
        flat_number: StringColumn({
            label: 'Flat Number',
            maxLength: 10,
            mandatory: true,
        }),
        block: StringColumn({
            label: 'Block',
            maxLength: 5,
        }),
        floor: IntegerColumn({
            label: 'Floor',
        }),
        resident: ReferenceColumn({
            label: 'Resident',
            referenceTable: 'sys_user',
            mandatory: true,
            attributes: {
                encode_utf8: false,
            },
        }),
        ownership: ChoiceColumn({
            label: 'Ownership',
            choices: {
                owner: { label: 'Owner' },
                tenant: { label: 'Tenant' },
            },
            default: 'owner',
            dropdown: 'dropdown_with_none',
        }),
        move_in_date: DateColumn({
            label: 'Move-in Date',
        }),
        contact_phone: StringColumn({
            label: 'Contact Phone',
            maxLength: 15,
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
    ],
})

/**
 * TABLE 2 — maintenance_bill
 * One record per flat per billing month.
 */
export const x_664892_society_0_maintenance_bill = Table({
    name: 'x_664892_society_0_maintenance_bill',
    label: 'Maintenance Bill',
    autoNumber: {
        number: 1000,
        prefix: 'MB',
    },
    actions: ['read', 'update', 'delete', 'create'],
    allowNewFields: true,
    schema: {
        sys_id: GuidColumn({ primary: true }),
        number: StringColumn({
            label: 'Number',
            unique: true,
        }),
        flat: ReferenceColumn({
            label: 'Flat',
            referenceTable: 'x_664892_society_0_flat',
            mandatory: true,
            attributes: {
                encode_utf8: false,
            },
        }),
        month_year: StringColumn({
            label: 'Month-Year',
            maxLength: 7,
            mandatory: true,
        }),
        amount: DecimalColumn({
            label: 'Amount',
            mandatory: true,
        }),
        due_date: DateColumn({
            label: 'Due Date',
            mandatory: true,
        }),
        status: ChoiceColumn({
            label: 'Status',
            choices: {
                unpaid: { label: 'Unpaid' },
                paid: { label: 'Paid' },
                overdue: { label: 'Overdue' },
            },
            default: 'unpaid',
            dropdown: 'dropdown_with_none',
        }),
        payment_date: DateColumn({
            label: 'Payment Date',
        }),
        payment_mode: ChoiceColumn({
            label: 'Payment Mode',
            choices: {
                cash: { label: 'Cash' },
                upi: { label: 'UPI' },
                bank_transfer: { label: 'Bank Transfer' },
                cheque: { label: 'Cheque' },
            },
            dropdown: 'dropdown_with_none',
        }),
        remarks: StringColumn({
            label: 'Remarks',
            maxLength: 500,
        }),
    },
    attributes: {
        enforce_dot_walk_cross_scope_access: true,
    },
    index: [
        {
            name: 'index',
            unique: false,
            element: 'flat',
        },
        {
            name: 'index2',
            unique: true,
            element: 'number',
        },
    ],
})

/**
 * TABLE 3 — service_request (unified: complaints + bookings + notices)
 * Single table for all resident requests and society communications,
 * distinguished by request_type.
 */
export const x_664892_society_0_service_request = Table({
    name: 'x_664892_society_0_service_request',
    label: 'Service Request',
    autoNumber: {
        number: 1000,
        prefix: 'SR',
    },
    actions: ['read', 'update', 'delete', 'create'],
    allowNewFields: true,
    schema: {
        sys_id: GuidColumn({ primary: true }),
        number: StringColumn({
            label: 'Number',
            unique: true,
        }),
        // Common fields (all types)
        request_type: ChoiceColumn({
            label: 'Request Type',
            choices: {
                complaint: { label: 'Complaint' },
                facility_booking: { label: 'Facility Booking' },
                notice: { label: 'Notice' },
            },
            mandatory: true,
            dropdown: 'dropdown_with_none',
        }),
        title: StringColumn({
            label: 'Title',
            maxLength: 200,
            mandatory: true,
        }),
        description: StringColumn({
            label: 'Description',
            maxLength: 4000,
        }),
        opened_by: ReferenceColumn({
            label: 'Opened By',
            referenceTable: 'sys_user',
            mandatory: true,
            attributes: {
                encode_utf8: false,
            },
        }),
        flat: ReferenceColumn({
            label: 'Flat',
            referenceTable: 'x_664892_society_0_flat',
            attributes: {
                encode_utf8: false,
            },
        }),
        opened_on: DateColumn({
            label: 'Opened On',
        }),
        status: ChoiceColumn({
            label: 'Status',
            choices: {
                open: { label: 'Open' },
                in_progress: { label: 'In Progress' },
                resolved: { label: 'Resolved' },
                confirmed: { label: 'Confirmed' },
                cancelled: { label: 'Cancelled' },
                active: { label: 'Active' },
                expired: { label: 'Expired' },
            },
            default: 'open',
            dropdown: 'dropdown_with_none',
        }),
        assigned_to: ReferenceColumn({
            label: 'Assigned To',
            referenceTable: 'sys_user',
            attributes: {
                encode_utf8: false,
            },
        }),

        // Complaint-specific fields
        category: ChoiceColumn({
            label: 'Category',
            choices: {
                water: { label: 'Water' },
                electricity: { label: 'Electricity' },
                lift: { label: 'Lift' },
                parking: { label: 'Parking' },
                housekeeping: { label: 'Housekeeping' },
                security: { label: 'Security' },
                noise: { label: 'Noise' },
                other: { label: 'Other' },
            },
            dropdown: 'dropdown_with_none',
        }),
        priority: ChoiceColumn({
            label: 'Priority',
            choices: {
                low: { label: 'Low' },
                medium: { label: 'Medium' },
                high: { label: 'High' },
            },
            default: 'medium',
            dropdown: 'dropdown_with_none',
        }),
        vendor_name: StringColumn({
            label: 'Vendor Name',
            maxLength: 100,
        }),
        resolution_notes: StringColumn({
            label: 'Resolution Notes',
            maxLength: 2000,
        }),
        resolved_on: DateColumn({
            label: 'Resolved On',
        }),

        // Facility Booking-specific fields
        facility: ChoiceColumn({
            label: 'Facility',
            choices: {
                gym: { label: 'Gym' },
                community_hall: { label: 'Community Hall' },
                terrace: { label: 'Terrace' },
                guest_room: { label: 'Guest Room' },
                swimming_pool: { label: 'Swimming Pool' },
            },
            dropdown: 'dropdown_with_none',
        }),
        booking_date: DateColumn({
            label: 'Booking Date',
        }),
        start_time: StringColumn({
            label: 'Start Time',
            maxLength: 5,
        }),
        end_time: StringColumn({
            label: 'End Time',
            maxLength: 5,
        }),
        booking_charges: DecimalColumn({
            label: 'Booking Charges',
            default: '0',
        }),

        // Notice-specific fields
        pinned: BooleanColumn({
            label: 'Pinned',
            default: false,
        }),
        expires_on: DateColumn({
            label: 'Expires On',
        }),
    },
    attributes: {
        enforce_dot_walk_cross_scope_access: true,
    },
    index: [
        {
            name: 'index',
            unique: false,
            element: 'assigned_to',
        },
        {
            name: 'index2',
            unique: false,
            element: 'flat',
        },
        {
            name: 'index3',
            unique: true,
            element: 'number',
        },
        {
            name: 'index4',
            unique: false,
            element: 'opened_by',
        },
    ],
})

/**
 * TABLE 4 — visitor_log
 * Gate entry log maintained by security staff.
 */
export const x_664892_society_0_visitor_log = Table({
    name: 'x_664892_society_0_visitor_log',
    label: 'Visitor Log',
    autoNumber: {
        number: 1000,
        prefix: 'VL',
    },
    actions: ['read', 'update', 'delete', 'create'],
    allowNewFields: true,
    schema: {
        sys_id: GuidColumn({ primary: true }),
        number: StringColumn({
            label: 'Number',
            unique: true,
        }),
        visitor_name: StringColumn({
            label: 'Visitor Name',
            maxLength: 100,
            mandatory: true,
        }),
        visitor_phone: StringColumn({
            label: 'Visitor Phone',
            maxLength: 15,
        }),
        purpose: ChoiceColumn({
            label: 'Purpose',
            choices: {
                delivery: { label: 'Delivery' },
                guest: { label: 'Guest' },
                service_vendor: { label: 'Service Vendor' },
                cab: { label: 'Cab' },
                other: { label: 'Other' },
            },
            dropdown: 'dropdown_with_none',
        }),
        host_flat: ReferenceColumn({
            label: 'Host Flat',
            referenceTable: 'x_664892_society_0_flat',
            mandatory: true,
            attributes: {
                encode_utf8: false,
            },
        }),
        vehicle_number: StringColumn({
            label: 'Vehicle Number',
            maxLength: 15,
        }),
        entry_time: DateTimeColumn({
            label: 'Entry Time',
            mandatory: true,
        }),
        exit_time: DateTimeColumn({
            label: 'Exit Time',
        }),
        logged_by: ReferenceColumn({
            label: 'Logged By',
            referenceTable: 'sys_user',
            attributes: {
                encode_utf8: false,
            },
        }),
    },
    attributes: {
        enforce_dot_walk_cross_scope_access: true,
    },
    index: [
        {
            name: 'index',
            unique: false,
            element: 'host_flat',
        },
        {
            name: 'index2',
            unique: false,
            element: 'logged_by',
        },
        {
            name: 'index3',
            unique: true,
            element: 'number',
        },
    ],
})
