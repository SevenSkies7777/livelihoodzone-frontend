export const gridConfigs = [
    {
        key: 'budget-items',
        configs: {
            modelKey: 'budget_activity',
            content: 'grid',
            listParams: { 'member_null': true },
            gridConf: {
                getStore: 'organization-budget-activity-items',
                editStore: 'organization-budget-activity-items'
            },
            topActions: [
                {
                    btnText: 'ADD ITEM',
                    status: 'info',
                    icon: 'true',
                    action: 'inline',
                    conf: {
                        context: 'ITEM',
                        store: 'organization-budget-activity-items',
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
                { title: 'Applied Total' },
                { title: 'Approved Totals' },
                { title: 'Actions', oderable: false, searchable: false },
            ],
            actions: [
                {
                    btnText: 'Edit',
                    status: 'info',
                    icon: 'edit',
                    disableStatus: 'FINISHED',
                    action: 'inline',
                    modalConf: {
                        store: 'organization-budget-activity-items',
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
                        store: 'organization-budget-activity-items',
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
                        store: 'organization-budget-activity-items',
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
                        store: 'organization-budget-activity-items',
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
        key: 'budget-attendees',
        configs: {
            modelKey: 'budget_activity',
            listParams: { 'member_null': false },
            gridConf: {
                getStore: 'organization-budget-activity-attendees',
                editStore: 'organization-budget-activity-attendees'
            },
            topActions: [
                {
                    btnText: 'ADD ATTENDEE',
                    status: 'info',
                    icon: 'true',
                    action: 'inline',
                    conf: {
                        context: 'ATTENDEE',
                        store: 'organization-budget-activity-attendees',
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
                { title: 'Item & Member Details' },
                { title: 'Applied Totals' },
                { title: 'Approved Totals' },
                { title: 'Actions', oderable: false, searchable: false },
            ],
            actions: [
                {
                    btnText: 'Edit',
                    status: 'info',
                    icon: 'edit',
                    disableStatus: 'FINISHED',
                    action: 'inline',
                    modalConf: {
                        store: 'organization-budget-activity-attendees',
                        titleKey: 'item',
                        context: 'Attendee',
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
                        store: 'organization-budget-activity-attendees',
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
                        store: 'organization-budget-activity-attendees',
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
                        store: 'organization-budget-activity-attendees',
                        titleKey: 'item',
                        context: 'reject',
                        btnText: 'SAVE',
                        width: '50%',
                    }
                },
            ]
        }
    },
    {
        key: 'budget-allowances',
        configs: {
            modelKey: 'budget_activity',
            listParams: { 'member_null': false },
            gridConf: {
                getStore: 'organization-budget-activity-allowances',
                editStore: 'organization-budget-activity-allowances'
            },
            topActions: [
                {
                    btnText: 'ADD ALLOWANCE',
                    status: 'info',
                    icon: 'true',
                    action: 'inline',
                    conf: {
                        context: 'ALLOWANCE',
                        store: 'organization-budget-activity-allowances',
                        btnText: 'SAVE'
                    }
                }
            ],
            rows: [
                { 
                    key: 'item', 
                    type: 'compact-line',
                    context: 'allowances',
                    fieldType: 'nested_string',
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
                { title: 'Applied Total' },
                { title: 'Approved Totals' },
                { title: 'Actions', oderable: false, searchable: false },
            ],
            actions: [
                {
                    btnText: 'Edit',
                    status: 'info',
                    icon: 'edit',
                    disableStatus: 'FINISHED',
                    action: 'inline',
                    modalConf: {
                        store: 'organization-budget-activity-allowances',
                        titleKey: 'allowance',
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
                        store: 'organization-budget-activity-allowances',
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
                        store: 'organization-budget-activity-allowances',
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
                        store: 'organization-budget-activity-allowances',
                        titleKey: 'item',
                        context: 'reject',
                        btnText: 'SAVE',
                        width: '50%',
                    }
                },
            ]
        },
    },
]; 