import {
    Table,
    StringColumn,
    ReferenceColumn,
    DateTimeColumn,
    BooleanColumn,
    IntegerColumn,
    DecimalColumn,
    GuidColumn,
    ChoiceColumn,
} from '@servicenow/sdk/core'

// Facility/Amenities (clubhouse, gym, pool, etc.)
export const x_664892_society_0_facility = Table({
    name: 'x_664892_society_0_facility',
    label: 'Facility',
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
            label: 'Facility Name',
            mandatory: true,
        }),
        facility_type: ChoiceColumn({
            label: 'Facility Type',
            choices: {
                clubhouse: { label: 'Club House' },
                gym: { label: 'Gym' },
                pool: { label: 'Swimming Pool' },
                tennis: { label: 'Tennis Court' },
                badminton: { label: 'Badminton Court' },
                party_hall: { label: 'Party Hall' },
                conference: { label: 'Conference Room' },
                playground: { label: 'Playground' },
                garden: { label: 'Garden' },
                library: { label: 'Library' },
                other: { label: 'Other' },
            },
            mandatory: true,
            dropdown: 'dropdown_with_none',
        }),
        description: StringColumn({
            label: 'Description',
            maxLength: 1000,
        }),
        capacity: IntegerColumn({
            label: 'Capacity',
        }),
        booking_charge: DecimalColumn({
            label: 'Booking Charge',
        }),
        deposit_amount: DecimalColumn({
            label: 'Deposit Amount',
        }),
        available_from: StringColumn({
            label: 'Available From (Time)',
        }),
        available_to: StringColumn({
            label: 'Available To (Time)',
        }),
        max_booking_hours: IntegerColumn({
            label: 'Max Booking Hours',
        }),
        advance_booking_days: IntegerColumn({
            label: 'Advance Booking Days',
        }),
        requires_approval: BooleanColumn({
            label: 'Requires Approval',
            default: false,
        }),
        status: ChoiceColumn({
            label: 'Status',
            choices: {
                available: { label: 'Available' },
                maintenance: { label: 'Under Maintenance' },
                closed: { label: 'Closed' },
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
            element: 'society',
        },
    ],
})

// Facility bookings
export const x_664892_society_0_facility_booking = Table({
    name: 'x_664892_society_0_facility_booking',
    label: 'Facility Booking',
    autoNumber: {
        number: 1000,
        prefix: 'BOOK',
    },
    actions: ['read', 'update', 'delete', 'create'],
    allowNewFields: true,
    schema: {
        sys_id: GuidColumn({ primary: true }),
        booking_number: StringColumn({
            label: 'Booking Number',
            unique: true,
        }),
        society: ReferenceColumn({
            label: 'Society',
            referenceTable: 'x_664892_society_0_society',
            mandatory: true,
            attributes: {
                encode_utf8: false,
            },
        }),
        facility: ReferenceColumn({
            label: 'Facility',
            referenceTable: 'x_664892_society_0_facility',
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
        booking_date: DateTimeColumn({
            label: 'Booking Date',
            mandatory: true,
        }),
        start_time: StringColumn({
            label: 'Start Time',
            mandatory: true,
        }),
        end_time: StringColumn({
            label: 'End Time',
            mandatory: true,
        }),
        purpose: StringColumn({
            label: 'Purpose',
            maxLength: 500,
        }),
        number_of_guests: IntegerColumn({
            label: 'Number of Guests',
        }),
        booking_charge: DecimalColumn({
            label: 'Booking Charge',
        }),
        deposit_amount: DecimalColumn({
            label: 'Deposit Amount',
        }),
        total_amount: DecimalColumn({
            label: 'Total Amount',
        }),
        payment_status: ChoiceColumn({
            label: 'Payment Status',
            choices: {
                pending: { label: 'Pending' },
                paid: { label: 'Paid' },
                refunded: { label: 'Refunded' },
            },
            default: 'pending',
            dropdown: 'dropdown_with_none',
        }),
        status: ChoiceColumn({
            label: 'Status',
            choices: {
                requested: { label: 'Requested' },
                approved: { label: 'Approved' },
                rejected: { label: 'Rejected' },
                cancelled: { label: 'Cancelled' },
                completed: { label: 'Completed' },
            },
            default: 'requested',
            dropdown: 'dropdown_with_none',
        }),
        approved_by: ReferenceColumn({
            label: 'Approved By',
            referenceTable: 'sys_user',
            attributes: {
                encode_utf8: false,
            },
        }),
        approval_date: DateTimeColumn({
            label: 'Approval Date',
        }),
        notes: StringColumn({
            label: 'Notes',
            maxLength: 1000,
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
            element: 'approved_by',
        },
        {
            name: 'index2',
            unique: true,
            element: 'booking_number',
        },
        {
            name: 'index3',
            unique: false,
            element: 'facility',
        },
        {
            name: 'index4',
            unique: false,
            element: 'resident',
        },
        {
            name: 'index5',
            unique: false,
            element: 'society',
        },
        {
            name: 'index6',
            unique: false,
            element: 'unit',
        },
    ],
})

// Complaints/Service Requests
export const x_664892_society_0_complaint = Table({
    name: 'x_664892_society_0_complaint',
    label: 'Complaint',
    autoNumber: {
        number: 1000,
        prefix: 'CMP',
    },
    actions: ['read', 'update', 'delete', 'create'],
    allowNewFields: true,
    schema: {
        sys_id: GuidColumn({ primary: true }),
        complaint_number: StringColumn({
            label: 'Complaint Number',
            unique: true,
        }),
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
        building: ReferenceColumn({
            label: 'Building',
            referenceTable: 'x_664892_society_0_building',
            attributes: {
                encode_utf8: false,
            },
        }),
        category: ChoiceColumn({
            label: 'Category',
            choices: {
                plumbing: { label: 'Plumbing' },
                electrical: { label: 'Electrical' },
                security: { label: 'Security' },
                cleanliness: { label: 'Cleanliness' },
                parking: { label: 'Parking' },
                lift: { label: 'Lift/Elevator' },
                water: { label: 'Water Supply' },
                noise: { label: 'Noise Complaint' },
                common_area: { label: 'Common Area' },
                intercom: { label: 'Intercom' },
                other: { label: 'Other' },
            },
            mandatory: true,
            dropdown: 'dropdown_with_none',
        }),
        subject: StringColumn({
            label: 'Subject',
            mandatory: true,
        }),
        description: StringColumn({
            label: 'Description',
            mandatory: true,
            maxLength: 2000,
        }),
        priority: ChoiceColumn({
            label: 'Priority',
            choices: {
                '1_critical': { label: '1 - Critical' },
                '2_high': { label: '2 - High' },
                '3_moderate': { label: '3 - Moderate' },
                '4_low': { label: '4 - Low' },
            },
            default: '3_moderate',
            dropdown: 'dropdown_with_none',
        }),
        location: StringColumn({
            label: 'Location',
        }),
        assigned_to: ReferenceColumn({
            label: 'Assigned To',
            referenceTable: 'sys_user',
            attributes: {
                encode_utf8: false,
            },
        }),
        assigned_group: ReferenceColumn({
            label: 'Assigned Group',
            referenceTable: 'sys_user_group',
            attributes: {
                encode_utf8: false,
            },
        }),
        resolution_notes: StringColumn({
            label: 'Resolution Notes',
            maxLength: 2000,
        }),
        resolved_at: DateTimeColumn({
            label: 'Resolved At',
        }),
        resolved_by: ReferenceColumn({
            label: 'Resolved By',
            referenceTable: 'sys_user',
            attributes: {
                encode_utf8: false,
            },
        }),
        status: ChoiceColumn({
            label: 'Status',
            choices: {
                new: { label: 'New' },
                in_progress: { label: 'In Progress' },
                on_hold: { label: 'On Hold' },
                resolved: { label: 'Resolved' },
                closed: { label: 'Closed' },
                rejected: { label: 'Rejected' },
            },
            default: 'new',
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
            element: 'assigned_group',
        },
        {
            name: 'index2',
            unique: false,
            element: 'assigned_to',
        },
        {
            name: 'index3',
            unique: false,
            element: 'building',
        },
        {
            name: 'index4',
            unique: true,
            element: 'complaint_number',
        },
        {
            name: 'index5',
            unique: false,
            element: 'resident',
        },
        {
            name: 'index6',
            unique: false,
            element: 'resolved_by',
        },
        {
            name: 'index7',
            unique: false,
            element: 'society',
        },
        {
            name: 'index8',
            unique: false,
            element: 'unit',
        },
    ],
})

// Notices/Announcements
export const x_664892_society_0_notice = Table({
    name: 'x_664892_society_0_notice',
    label: 'Notice',
    autoNumber: {
        number: 1000,
        prefix: 'NTC',
    },
    actions: ['read', 'update', 'delete', 'create'],
    allowNewFields: true,
    schema: {
        sys_id: GuidColumn({ primary: true }),
        notice_number: StringColumn({
            label: 'Notice Number',
            unique: true,
        }),
        society: ReferenceColumn({
            label: 'Society',
            referenceTable: 'x_664892_society_0_society',
            mandatory: true,
            attributes: {
                encode_utf8: false,
            },
        }),
        title: StringColumn({
            label: 'Title',
            mandatory: true,
        }),
        content: StringColumn({
            label: 'Content',
            mandatory: true,
            maxLength: 5000,
        }),
        notice_type: ChoiceColumn({
            label: 'Notice Type',
            choices: {
                general: { label: 'General' },
                meeting: { label: 'Meeting' },
                maintenance: { label: 'Maintenance' },
                event: { label: 'Event' },
                important: { label: 'Important' },
                emergency: { label: 'Emergency' },
            },
            default: 'general',
            dropdown: 'dropdown_with_none',
        }),
        posted_by: ReferenceColumn({
            label: 'Posted By',
            referenceTable: 'sys_user',
            attributes: {
                encode_utf8: false,
            },
        }),
        posted_date: DateTimeColumn({
            label: 'Posted Date',
        }),
        effective_from: DateTimeColumn({
            label: 'Effective From',
            mandatory: true,
        }),
        effective_to: DateTimeColumn({
            label: 'Effective To',
        }),
        target_audience: ChoiceColumn({
            label: 'Target Audience',
            choices: {
                all: { label: 'All Residents' },
                owners: { label: 'Owners Only' },
                tenants: { label: 'Tenants Only' },
                committee: { label: 'Committee Members' },
            },
            default: 'all',
            dropdown: 'dropdown_with_none',
        }),
        is_pinned: BooleanColumn({
            label: 'Pinned',
            default: false,
        }),
        status: ChoiceColumn({
            label: 'Status',
            choices: {
                draft: { label: 'Draft' },
                published: { label: 'Published' },
                expired: { label: 'Expired' },
                archived: { label: 'Archived' },
            },
            default: 'draft',
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
            unique: true,
            element: 'notice_number',
        },
        {
            name: 'index2',
            unique: false,
            element: 'posted_by',
        },
        {
            name: 'index3',
            unique: false,
            element: 'society',
        },
    ],
})

// Visitor management
export const x_664892_society_0_visitor = Table({
    name: 'x_664892_society_0_visitor',
    label: 'Visitor',
    autoNumber: {
        number: 1000,
        prefix: 'VIS',
    },
    actions: ['read', 'update', 'delete', 'create'],
    allowNewFields: true,
    schema: {
        sys_id: GuidColumn({ primary: true }),
        visitor_number: StringColumn({
            label: 'Visitor Number',
            unique: true,
        }),
        society: ReferenceColumn({
            label: 'Society',
            referenceTable: 'x_664892_society_0_society',
            mandatory: true,
            attributes: {
                encode_utf8: false,
            },
        }),
        visitor_name: StringColumn({
            label: 'Visitor Name',
            mandatory: true,
        }),
        visitor_phone: StringColumn({
            label: 'Visitor Phone',
            mandatory: true,
        }),
        visitor_company: StringColumn({
            label: 'Company/Organization',
        }),
        purpose: StringColumn({
            label: 'Purpose of Visit',
            mandatory: true,
        }),
        visiting_unit: ReferenceColumn({
            label: 'Visiting Unit',
            referenceTable: 'x_664892_society_0_unit',
            mandatory: true,
            attributes: {
                encode_utf8: false,
            },
        }),
        visiting_resident: ReferenceColumn({
            label: 'Visiting Resident',
            referenceTable: 'x_664892_society_0_resident',
            attributes: {
                encode_utf8: false,
            },
        }),
        visitor_type: ChoiceColumn({
            label: 'Visitor Type',
            choices: {
                guest: { label: 'Guest' },
                delivery: { label: 'Delivery' },
                service: { label: 'Service Provider' },
                vendor: { label: 'Vendor' },
                cab: { label: 'Cab/Taxi' },
                other: { label: 'Other' },
            },
            default: 'guest',
            dropdown: 'dropdown_with_none',
        }),
        expected_date: DateTimeColumn({
            label: 'Expected Date',
        }),
        check_in_time: DateTimeColumn({
            label: 'Check-in Time',
        }),
        check_out_time: DateTimeColumn({
            label: 'Check-out Time',
        }),
        vehicle_number: StringColumn({
            label: 'Vehicle Number',
        }),
        id_proof_type: StringColumn({
            label: 'ID Proof Type',
        }),
        id_proof_number: StringColumn({
            label: 'ID Proof Number',
        }),
        approved_by: ReferenceColumn({
            label: 'Approved By',
            referenceTable: 'sys_user',
            attributes: {
                encode_utf8: false,
            },
        }),
        status: ChoiceColumn({
            label: 'Status',
            choices: {
                expected: { label: 'Expected' },
                checked_in: { label: 'Checked In' },
                checked_out: { label: 'Checked Out' },
                cancelled: { label: 'Cancelled' },
                denied: { label: 'Entry Denied' },
            },
            default: 'expected',
            dropdown: 'dropdown_with_none',
        }),
        notes: StringColumn({
            label: 'Notes',
            maxLength: 1000,
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
            element: 'approved_by',
        },
        {
            name: 'index2',
            unique: false,
            element: 'society',
        },
        {
            name: 'index3',
            unique: false,
            element: 'visiting_resident',
        },
        {
            name: 'index4',
            unique: false,
            element: 'visiting_unit',
        },
        {
            name: 'index5',
            unique: true,
            element: 'visitor_number',
        },
    ],
})
