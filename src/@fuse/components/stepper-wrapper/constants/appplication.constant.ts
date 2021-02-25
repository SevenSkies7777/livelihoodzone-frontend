export const ApplicationStepsConfig = [
    { 
        count: 1,
        label: 'Basic Details',
        shortLabel: 'Basic',
        help_text: 'Step 1',
        icon: 'work',
        template: 'one',
        formConf: {
            store: 'applications',
            cancelTxt: 'CANCEL',
            nextTxt: 'NEXT',
            addStore: 'auto-create-application',
            editStore: 'applications',
            getStore: 'applications'
        },
        active: false
    },
    { 
        count: 2,
        label: 'Application Billabe Items',
        shortLabel: 'Items',
        help_text: 'Step 2',
        icon: 'list_alt',
        template: 'two',
        inlineConf: {
            store: 'visit',
            cancelTxt: 'BACK',
            nextTxt: 'COMPLETE',
            editStore: 'visits',
            getStore: 'visits'
        },
        active: false,
        modelKey: 'application',
        listParams: { 'member_null': true },
        gridConf: {
            store: 'applications',
            modelKey: 'application',
            listParams: { 'member_null': true },
            getStore: 'application-items',
            editStore: 'application-items',
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
            actions: [
                {
                    btnText: 'EDIT',
                    status: 'info',
                    icon: false,
                    disableStatus: 'FINISHED',
                    action: 'inline',
                    modalConf: {
                        store: 'application-items',
                        titleKey: 'item',
                        context: 'Billable Item',
                        btnText: 'SAVE'
                    }
                },
            ]
        },
    },
    { 
        count: 3,
        label: 'Event Attendees',
        shortLabel: 'Attendees',
        help_text: 'Step 3',
        icon: 'people',
        template: 'two',
        inlineConf: {
            store: 'visit',
            cancelTxt: 'BACK',
            nextTxt: 'COMPLETE',
            editStore: 'visits',
            getStore: 'visits'
        },
        active: false,
        gridConf: {
            store: 'applications',
            modelKey: 'application',
            listParams: { 'member_null': false },
            getStore: 'application-attendees',
            editStore: 'application-attendees',
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
            actions: [
                {
                    btnText: 'EDIT',
                    status: 'info',
                    icon: false,
                    disableStatus: 'FINISHED',
                    action: 'inline',
                    modalConf: {
                        store: 'application-attendees',
                        titleKey: 'item',
                        context: 'Attendee',
                        btnText: 'SAVE'
                    }
                }
            ]
        },
    },
    { 
        count: 4,
        label: 'Event Allowances',
        shortLabel: 'Allowances',
        help_text: 'Step 4',
        icon: 'account_balance_wallet',
        template: 'five',
        inlineConf: {
            store: 'visit',
            cancelTxt: 'BACK',
            nextTxt: 'COMPLETE',
            editStore: 'visits',
            getStore: 'visits'
        },
        active: false,
        gridConf: {
            store: 'applications',
            modelKey: 'application',
            getStore: 'application-allowances',
            editStore: 'application-allowances',
            topActions: [
                {
                    btnText: 'ADD ALLOWANCE',
                    status: 'info',
                    icon: 'true',
                    action: 'inline',
                    conf: {
                        context: 'ALLOWANCES',
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
                    icon: 'edit',
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
    },
    { 
        count: 5,
        label: 'Application Attachments',
        shortLabel: 'Attachments',
        help_text: 'Step 5',
        icon: 'attach_file',
        template: 'three',
        inlineConf: {
            store: 'visit',
            cancelTxt: 'BACK',
            nextTxt: 'COMPLETE',
            editStore: 'visits',
            getStore: 'visits'
        },
        active: false,
        gridConf: {
            store: 'applications',
            getStore: 'application-attachments',
            editStore: 'application-attachments',
            topActions: [
                {
                    btnText: 'ADD ACTIVITY',
                    status: 'info',
                    icon: 'true',
                    action: 'inline',
                    conf: {
                        context: 'BRANCH',
                        store: 'branches',
                        btnText: 'SAVE'
                    }
                }
            ],
            rows: [
                { key: 'amount', type: 'string' },
                { key: 'financial_year', type: 'string' },
                { key: 'status', type: 'string' },
            ],
            headers: [
                { title: 'Amount' },
                { title: 'Financial Year' },
                { title: 'Status' },
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
                        store: 'organization-budgets',
                        titleKey: 'name',
                        context: 'Organization Budget',
                        btnText: 'SAVE'
                    }
                    }
            ]
        },
    },
    { 
        count: 6,
        label: 'Alternative Fundings',
        shortLabel: 'Other Funds',
        help_text: 'Step 6',
        icon: 'attach_money',
        template: 'two',
        inlineConf: {
            store: 'visit',
            cancelTxt: 'BACK',
            nextTxt: 'COMPLETE',
            editStore: 'visits',
            getStore: 'visits'
        },
        active: false,
        gridConf: {
            store: 'applications',
            modelKey: 'application',
            getStore: 'application-alternate-funding-sources',
            editStore: 'application-alternate-funding-sources',
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
                },
            ]
        },
    },
];