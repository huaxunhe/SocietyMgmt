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

// Maintenance charges definition
export const x_664892_society_0_maintenance_charge = Table({
    name: 'x_664892_society_0_maintenance_charge',
    label: 'Maintenance Charge',
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
            label: 'Charge Name',
            mandatory: true,
        }),
        charge_type: ChoiceColumn({
            label: 'Charge Type',
            choices: {
                fixed: { label: 'Fixed Amount' },
                per_sqft: { label: 'Per Sq.Ft' },
                per_unit: { label: 'Per Unit' },
            },
            mandatory: true,
            dropdown: 'dropdown_with_none',
        }),
        amount: DecimalColumn({
            label: 'Amount',
            mandatory: true,
        }),
        frequency: ChoiceColumn({
            label: 'Frequency',
            choices: {
                monthly: { label: 'Monthly' },
                quarterly: { label: 'Quarterly' },
                half_yearly: { label: 'Half Yearly' },
                yearly: { label: 'Yearly' },
            },
            default: 'monthly',
            dropdown: 'dropdown_with_none',
        }),
        effective_from: DateTimeColumn({
            label: 'Effective From',
            mandatory: true,
        }),
        effective_to: DateTimeColumn({
            label: 'Effective To',
        }),
        description: StringColumn({
            label: 'Description',
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
            element: 'society',
        },
    ],
})

// Maintenance bills/invoices
export const x_664892_society_0_bill = Table({
    name: 'x_664892_society_0_bill',
    label: 'Maintenance Bill',
    autoNumber: {
        number: 1000,
        prefix: 'BILL',
    },
    actions: ['read', 'update', 'delete', 'create'],
    allowNewFields: true,
    schema: {
        sys_id: GuidColumn({ primary: true }),
        bill_number: StringColumn({
            label: 'Bill Number',
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
        unit: ReferenceColumn({
            label: 'Unit',
            referenceTable: 'x_664892_society_0_unit',
            mandatory: true,
            attributes: {
                encode_utf8: false,
            },
        }),
        resident: ReferenceColumn({
            label: 'Resident',
            referenceTable: 'x_664892_society_0_resident',
            attributes: {
                encode_utf8: false,
            },
        }),
        bill_period_month: IntegerColumn({
            label: 'Bill Period Month',
            mandatory: true,
        }),
        bill_period_year: IntegerColumn({
            label: 'Bill Period Year',
            mandatory: true,
        }),
        due_date: DateTimeColumn({
            label: 'Due Date',
            mandatory: true,
        }),
        total_amount: DecimalColumn({
            label: 'Total Amount',
            mandatory: true,
        }),
        paid_amount: DecimalColumn({
            label: 'Paid Amount',
            default: '0',
        }),
        outstanding_amount: DecimalColumn({
            label: 'Outstanding Amount',
        }),
        late_fee: DecimalColumn({
            label: 'Late Fee',
            default: '0',
        }),
        status: ChoiceColumn({
            label: 'Status',
            choices: {
                draft: { label: 'Draft' },
                generated: { label: 'Generated' },
                sent: { label: 'Sent' },
                partial: { label: 'Partially Paid' },
                paid: { label: 'Paid' },
                overdue: { label: 'Overdue' },
                cancelled: { label: 'Cancelled' },
            },
            default: 'draft',
            dropdown: 'dropdown_with_none',
        }),
        bill_date: DateTimeColumn({
            label: 'Bill Date',
        }),
        notes: StringColumn({
            label: 'Notes',
            maxLength: 2000,
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
            element: 'bill_number',
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
    ],
})

// Bill line items
export const x_664892_society_0_bill_line = Table({
    name: 'x_664892_society_0_bill_line',
    label: 'Bill Line Item',
    actions: ['read', 'update', 'delete', 'create'],
    allowNewFields: true,
    schema: {
        sys_id: GuidColumn({ primary: true }),
        bill: ReferenceColumn({
            label: 'Bill',
            referenceTable: 'x_664892_society_0_bill',
            mandatory: true,
            attributes: {
                encode_utf8: false,
            },
        }),
        charge: ReferenceColumn({
            label: 'Maintenance Charge',
            referenceTable: 'x_664892_society_0_maintenance_charge',
            attributes: {
                encode_utf8: false,
            },
        }),
        charge_name: StringColumn({
            label: 'Charge Name',
            mandatory: true,
        }),
        quantity: DecimalColumn({
            label: 'Quantity',
            default: '1',
        }),
        rate: DecimalColumn({
            label: 'Rate',
        }),
        amount: DecimalColumn({
            label: 'Amount',
            mandatory: true,
        }),
        description: StringColumn({
            label: 'Description',
        }),
    },
    attributes: {
        enforce_dot_walk_cross_scope_access: true,
    },
    index: [
        {
            name: 'index',
            unique: false,
            element: 'bill',
        },
        {
            name: 'index2',
            unique: false,
            element: 'charge',
        },
    ],
})

// Payments received
export const x_664892_society_0_payment = Table({
    name: 'x_664892_society_0_payment',
    label: 'Payment',
    autoNumber: {
        number: 1000,
        prefix: 'PAY',
    },
    actions: ['read', 'update', 'delete', 'create'],
    allowNewFields: true,
    schema: {
        sys_id: GuidColumn({ primary: true }),
        payment_number: StringColumn({
            label: 'Payment Number',
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
        bill: ReferenceColumn({
            label: 'Bill',
            referenceTable: 'x_664892_society_0_bill',
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
        resident: ReferenceColumn({
            label: 'Resident',
            referenceTable: 'x_664892_society_0_resident',
            attributes: {
                encode_utf8: false,
            },
        }),
        amount: DecimalColumn({
            label: 'Amount',
            mandatory: true,
        }),
        payment_date: DateTimeColumn({
            label: 'Payment Date',
            mandatory: true,
        }),
        payment_mode: ChoiceColumn({
            label: 'Payment Mode',
            choices: {
                cash: { label: 'Cash' },
                cheque: { label: 'Cheque' },
                neft: { label: 'NEFT/RTGS' },
                upi: { label: 'UPI' },
                card: { label: 'Card' },
                online: { label: 'Online' },
            },
            mandatory: true,
            dropdown: 'dropdown_with_none',
        }),
        transaction_id: StringColumn({
            label: 'Transaction ID',
        }),
        cheque_number: StringColumn({
            label: 'Cheque Number',
        }),
        cheque_date: DateTimeColumn({
            label: 'Cheque Date',
        }),
        bank_name: StringColumn({
            label: 'Bank Name',
        }),
        receipt_number: StringColumn({
            label: 'Receipt Number',
        }),
        status: ChoiceColumn({
            label: 'Status',
            choices: {
                pending: { label: 'Pending' },
                cleared: { label: 'Cleared' },
                bounced: { label: 'Bounced' },
                cancelled: { label: 'Cancelled' },
            },
            default: 'pending',
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
            element: 'bill',
        },
        {
            name: 'index2',
            unique: true,
            element: 'payment_number',
        },
        {
            name: 'index3',
            unique: false,
            element: 'resident',
        },
        {
            name: 'index4',
            unique: false,
            element: 'society',
        },
        {
            name: 'index5',
            unique: false,
            element: 'unit',
        },
    ],
})

// Expense tracking
export const x_664892_society_0_expense = Table({
    name: 'x_664892_society_0_expense',
    label: 'Expense',
    autoNumber: {
        number: 1000,
        prefix: 'EXP',
    },
    actions: ['read', 'update', 'delete', 'create'],
    allowNewFields: true,
    schema: {
        sys_id: GuidColumn({ primary: true }),
        expense_number: StringColumn({
            label: 'Expense Number',
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
        expense_date: DateTimeColumn({
            label: 'Expense Date',
            mandatory: true,
        }),
        category: ChoiceColumn({
            label: 'Category',
            choices: {
                utilities: { label: 'Utilities' },
                maintenance: { label: 'Maintenance' },
                security: { label: 'Security' },
                cleaning: { label: 'Cleaning' },
                gardening: { label: 'Gardening' },
                repairs: { label: 'Repairs' },
                admin: { label: 'Administrative' },
                events: { label: 'Events' },
                other: { label: 'Other' },
            },
            mandatory: true,
            dropdown: 'dropdown_with_none',
        }),
        description: StringColumn({
            label: 'Description',
            mandatory: true,
            maxLength: 1000,
        }),
        amount: DecimalColumn({
            label: 'Amount',
            mandatory: true,
        }),
        vendor: StringColumn({
            label: 'Vendor/Supplier',
        }),
        payment_mode: ChoiceColumn({
            label: 'Payment Mode',
            choices: {
                cash: { label: 'Cash' },
                cheque: { label: 'Cheque' },
                neft: { label: 'NEFT/RTGS' },
                upi: { label: 'UPI' },
            },
            dropdown: 'dropdown_with_none',
        }),
        invoice_number: StringColumn({
            label: 'Invoice Number',
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
                draft: { label: 'Draft' },
                pending_approval: { label: 'Pending Approval' },
                approved: { label: 'Approved' },
                paid: { label: 'Paid' },
                cancelled: { label: 'Cancelled' },
            },
            default: 'draft',
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
            unique: true,
            element: 'expense_number',
        },
        {
            name: 'index3',
            unique: false,
            element: 'society',
        },
    ],
})
