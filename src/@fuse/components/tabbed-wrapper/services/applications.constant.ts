export const ApplicationsConfigs = {
    key: 'applications',
    tabs: [
        {
            store: 'applications',
            label: 'Basic Details',
            content: 'form',
            context: 'Application',
            parentKey: 'organization',
            count: 1,
            formConf: {
                store: 'applications',
                cancelTxt: 'CANCEL',
                nextTxt: 'SAVE',
                addStore: 'applications',
                editStore: 'applications',
                getStore: 'applications'
            },
            detailsConf: [
                {
                    label: 'Applied Amount',
                    key: 'total',
                    icon: 'account_balance',
                    type: 'currency'
                },
                {
                    label: 'Required By',
                    key: 'date_requested',
                    icon: 'calendar_today',
                    type: 'date',
                },
                {
                    label: 'Financial Year',
                    key: 'financial_year',
                    icon: 'calendar_today',
                    type: 'nested',
                    fieldType: 'nested_range',
                    primaryField: 'financial_year_data.starts_on',
                    secondaryField: 'financial_year_data.ends_on',
                },
                {
                    label: 'Status',
                    key: 'status',
                    icon: 'assessment',
                    type: 'status',
                },
            ],
            bankConfs: [
                { 
                    title: 'Account Name',
                    key: 'account_name',
                },
                { 
                    title: 'Account #',
                    key: 'account_number',
                },
                { 
                    title: 'Bank',
                    key: 'bank_name',
                },
                { 
                    title: 'Branch',
                    key: 'branch_name',
                },
            ],
            extraDetails: 'extraDetails',
            auditTrail: true,
            applicationME: true,
            // orgSummary: true,
            activitySummary: true,
        },
        {
            store: 'application-items',
            label: 'Billable Items',
            modelKey: 'application',
            content: 'grid',
            listParams: { 'member_null': true },
            gridConf: {
                getStore: 'application-items',
                editStore: 'application-items'
            },
            topActions: [
                {
                    btnText: 'ADD BILLABLE ITEM',
                    status: 'info',
                    icon: 'true',
                    action: 'inline',
                    conf: {
                        context: 'BILLABLE ITEM',
                        store: 'application-items',
                        btnText: 'SAVE'
                    }
                }
            ],
            rows: [
                {
                    key: 'item',
                    type: 'compact-line',
                    context: 'billable-item',
                    fieldType: 'nested_string',
                    primaryField: 'item_data.name',
                },
                {
                    key: 'item',
                    type: 'compact-line',
                    context: 'billable-item',
                    fieldType: 'activity_details',
                    primaryField: 'item_data.name',
                },
                { 
                    key: 'item', 
                    type: 'compact-line',
                    context: 'billable-item',
                    fieldType: 'nested_status_total',
                    primaryField: 'item_data.name', 
                },
                { 
                    key: 'item', 
                    type: 'compact-line',
                    context: 'billable-item',
                    fieldType: 'nested_totals',
                    primaryField: 'item_data.name', 
                },
            ],
            headers: [
                { title: 'Item' },
                { title: 'Activity Item' },
                { title: 'Total' },
                { title: 'Approved Totals' },
                { title: 'Actions', oderable: false, searchable: false },
            ],
            dropDownActions: [
                {
                    btnText: 'Edit',
                    status: 'info',
                    icon: 'edit',
                    disableStatus: 'FINISHED',
                    action: 'inline',
                    modalConf: {
                        store: 'application-items',
                        titleKey: 'item',
                        context: 'Billable Item',
                        btnText: 'SAVE'
                    }
                },
                {
                    btnText: 'Rationalize',
                    status: 'draft',
                    icon: 'compare_arrows',
                    disableStatus: 'FINISHED',
                    class: 'text-success',
                    action: 'modal',
                    modalConf: {
                        store: 'application-items',
                        titleKey: 'item',
                        context: 'rationalize',
                        btnText: 'SAVE',
                        width: '50%',
                    }
                },
                {
                    btnText: 'Approve',
                    status: 'rationalized',
                    icon: 'check',
                    class: 'text-success',
                    disableStatus: 'FINISHED',
                    action: 'modal',
                    modalConf: {
                        store: 'application-items',
                        titleKey: 'item',
                        context: 'approve',
                        btnText: 'SAVE',
                        width: '50%',
                    }
                },
                {
                    btnText: 'Reject',
                    status: 'rationalize',
                    icon: 'close',
                    class: 'text-danger',
                    disableStatus: 'FINISHED',
                    action: 'modal',
                    modalConf: {
                        store: 'application-items',
                        titleKey: 'item',
                        context: 'reject',
                        btnText: 'SAVE',
                        width: '50%',
                    }
                },
            ]
        },
        {
            store: 'application-attendees',
            label: 'Attendees',
            content: 'grid',
            modelKey: 'application',
            listParams: { 'member_null': false },
            gridConf: {
                getStore: 'application-attendees',
                editStore: 'application-attendees'
            },
            topActions: [
                {
                    btnText: 'ADD ATTENDEE',
                    status: 'info',
                    icon: 'true',
                    action: 'inline',
                    conf: {
                        context: 'ATTENDEE',
                        store: 'application-attendees',
                        btnText: 'SAVE'
                    }
                }
            ],
            rows: [
                { 
                    key: 'item', 
                    type: 'compact-line',
                    context: 'attendees',
                    fieldType: 'nested_string',
                    primaryField: 'item_data.name', 
                },
                {
                    key: 'item',
                    type: 'compact-line',
                    context: 'billable-item',
                    fieldType: 'activity_details',
                    primaryField: 'item_data.name',
                },
                { 
                    key: 'item', 
                    type: 'compact-line',
                    context: 'billable-item',
                    fieldType: 'nested_status_total',
                    primaryField: 'item_data.name', 
                },
                { 
                    key: 'item', 
                    type: 'compact-line',
                    context: 'billable-item',
                    fieldType: 'nested_totals',
                    primaryField: 'item_data.name', 
                },
            ],
            headers: [
                { title: 'Member' },
                { title: 'Activity Details' },
                { title: 'Totals' },
                { title: 'Approved Totals' },
                { title: 'Actions', oderable: false, searchable: false },
            ],
            dropDownActions: [
                {
                    btnText: 'Edit',
                    status: 'info',
                    icon: 'edit',
                    disableStatus: 'FINISHED',
                    action: 'inline',
                    modalConf: {
                        store: 'application-items',
                        titleKey: 'item',
                        context: 'Billable Item',
                        btnText: 'SAVE'
                    }
                },
                {
                    btnText: 'Rationalize',
                    status: 'draft',
                    icon: 'compare_arrows',
                    disableStatus: 'FINISHED',
                    class: 'text-success',
                    action: 'modal',
                    modalConf: {
                        store: 'application-items',
                        titleKey: 'item',
                        context: 'rationalize',
                        btnText: 'SAVE',
                        width: '50%',
                    }
                },
                {
                    btnText: 'Approve',
                    status: 'rationalized',
                    icon: 'check',
                    class: 'text-success',
                    disableStatus: 'FINISHED',
                    action: 'modal',
                    modalConf: {
                        store: 'application-items',
                        titleKey: 'item',
                        context: 'approve',
                        btnText: 'SAVE',
                        width: '50%',
                    }
                },
                {
                    btnText: 'Reject',
                    status: 'rationalize',
                    icon: 'close',
                    class: 'text-danger',
                    disableStatus: 'FINISHED',
                    action: 'modal',
                    modalConf: {
                        store: 'application-items',
                        titleKey: 'item',
                        context: 'reject',
                        btnText: 'SAVE',
                        width: '50%',
                    }
                },
            ]
        },
        {
            store: 'application-allowances',
            label: 'Allowances',
            content: 'nested-inline-list',
            getStore: 'application-allowances',
            editStore: 'application-allowances',
            gridConf: {
                getStore: 'application-allowances',
                editStore: 'application-allowances',
            },
            topActions: [
                {
                    btnText: 'ADD ALLOWANCE',
                    status: 'info',
                    icon: 'true',
                    action: 'inline',
                    conf: {
                        context: 'ALLOWANCE',
                        store: 'application-allowances',
                        btnText: 'SAVE'
                    }
                }
            ],
            rows: [
                { 
                    key: 'item', 
                    type: 'compact-line',
                    context: 'allowances',
                    fieldType: 'nested_member',
                    primaryField: 'item_data.name', 
                },
                { 
                    key: 'item', 
                    type: 'compact-line',
                    context: 'billable-item',
                    fieldType: 'nested_status_total',
                    primaryField: 'item_data.name', 
                },
                { 
                    key: 'item', 
                    type: 'compact-line',
                    context: 'billable-item',
                    fieldType: 'nested_totals',
                    primaryField: 'item_data.name', 
                },
            ],
            headers: [
                { title: 'Allowance' },
                { title: 'Totals' },
                { title: 'Approved Totals' },
                { title: 'Actions', oderable: false, searchable: false },
            ],
            actions: [
                {
                    btnText: 'EDIT',
                    status: 'info',
                    icon: false,
                    disableStatus: 'FINISHED',
                    action: 'inline',
                    modalConf: {
                        store: 'application-allowances',
                        titleKey: 'item',
                        context: 'Allowance',
                        btnText: 'SAVE'
                    }
                },
                {
                    btnText: 'Rationalize',
                    status: 'draft',
                    icon: 'compare_arrows',
                    disableStatus: 'FINISHED',
                    class: 'text-success',
                    action: 'modal',
                    modalConf: {
                        store: 'application-allowances',
                        titleKey: 'item',
                        context: 'rationalize',
                        btnText: 'SAVE',
                        width: '50%',
                    }
                },
                {
                    btnText: 'Approve',
                    status: 'rationalized',
                    icon: 'check',
                    class: 'text-success',
                    disableStatus: 'FINISHED',
                    action: 'modal',
                    modalConf: {
                        store: 'application-allowances',
                        titleKey: 'item',
                        context: 'approve',
                        btnText: 'SAVE',
                        width: '50%',
                    }
                },
                {
                    btnText: 'Reject',
                    status: 'rationalize',
                    icon: 'close',
                    class: 'text-danger',
                    disableStatus: 'FINISHED',
                    action: 'modal',
                    modalConf: {
                        store: 'application-allowances',
                        titleKey: 'item',
                        context: 'reject',
                        btnText: 'SAVE',
                        width: '50%',
                    }
                },
            ]
        },
        {
            store: 'users',
            label: 'Attachments',
            content: 'attachments',
            gridConf: {
                getStore: 'organisations',
                editStore: 'organisations'
            },
            topActions: [
                {
                    btnText: 'ADD USER',
                    status: 'info',
                    icon: 'true',
                    action: 'inline',
                    conf: {
                        context: 'USER',
                        store: 'users',
                        btnText: 'SAVE'
                    }
                }
            ],
            rows: [
                { key: 'first_name', type: 'string' },
                { key: 'last_name', type: 'string' },
                { key: 'phone_number', type: 'string' },
                { key: 'email', type: 'string' },
            ],
            headers: [
                { title: 'Names' },
                { title: '.' },
                { title: 'Phone Number' },
                { title: 'Email' },
                { title: 'Actions', oderable: false, searchable: false },
            ],
            actions: [
                {
                    btnText: 'EDIT',
                    status: 'info',
                    icon: false,
                    disableStatus: 'FINISHED',
                    action: 'inline',
                    modalConf: {
                        store: 'users',
                        titleKey: 'name',
                        context: 'Users',
                        btnText: 'SAVE'
                    }
                    }
            ]
        },
        {
            store: 'application-alternate-funding-sources',
            label: 'Alternative Funds',
            content: 'grid',
            modelKey: 'application',
            gridConf: {
                getStore: 'application-alternate-funding-sources',
                editStore: 'application-alternate-funding-sources'
            },
            topActions: [
                {
                    btnText: 'ADD ALTERNATIVE FUND',
                    status: 'info',
                    icon: 'true',
                    action: 'inline',
                    conf: {
                        context: 'ALTERNATIVE FUNDING',
                        store: 'application-alternate-funding-sources',
                        btnText: 'SAVE'
                    }
                }
            ],
            rows: [
                { key: 'entity_name', type: 'string' },
                { key: 'estimated_amount', type: 'currency' },
                { key: 'description', type: 'string' },
            ],
            headers: [
                { title: 'Entity Name' },
                { title: 'Estimated Amount' },
                { title: 'Description' },
                { title: 'Actions', oderable: false, searchable: false },
            ],
            actions: [
                {
                    btnText: 'EDIT',
                    status: 'info',
                    icon: false,
                    disableStatus: 'FINISHED',
                    action: 'inline',
                    modalConf: {
                        store: 'application-alternate-funding-sources',
                        titleKey: 'entity_name',
                        context: 'Alternative Funding',
                        btnText: 'SAVE'
                    }
                }
            ]
        }
    ]
}