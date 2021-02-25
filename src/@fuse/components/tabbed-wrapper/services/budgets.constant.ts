export const BudgetsConfigs = {
    key: 'organization-budget',
    tabs: [
        {
            store: 'organizaation-budgets',
            label: 'Basic Details',
            content: 'form',
            icon: 'work',
            context: 'Calendar of Events',
            count: 1,
            formConf: {
                store: 'organization-budgets',
                cancelTxt: 'CANCEL',
                nextTxt: 'SAVE',
                addStore: 'organization-budgets',
                editStore: 'organization-budgets',
                getStore: 'organization-budgets'
            },
            detailsConf: [
                {
                    label: 'Applied Total',
                    key: 'total',
                    icon: 'account_balance',
                    type: 'currency',
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
                {
                    label: 'Organization Type',
                    key: 'organization',
                    icon: 'business',
                    type: 'nested',
                    fieldType: 'nested_string',
                    primaryField: 'organization_data.org_type_code',
                }
            ],
            auditTrail: true,
            orgSummary: true,
            attachments:  true,
            totalsSummary: true,
        },
        // {
        //     store: 'branches',
        //     label: 'Activities',
        //     content: 'grid',
        //     modelKey: 'org_budget',
        //     gridConf: {
        //         getStore: 'organization-budget-activities',
        //         editStore: 'organization-budget-activities'
        //     },
        //     topActions: [
        //         {
        //             btnText: 'ADD ACTIVITY',
        //             status: 'info',
        //             icon: 'true',
        //             action: 'inline',
        //             conf: {
        //                 context: 'ACTIVITY',
        //                 store: 'organization-budget-activities',
        //                 btnText: 'SAVE'
        //             }
        //         }
        //     ],
        //     rows: [
        //         { key: 'title', type: 'string' },
        //         { key: 'activity_date', type: 'date' },
        //         { key: 'estimated_amount', type: 'currency' },
        //         { key: 'status', type: 'status' },
        //     ],
        //     headers: [
        //         { title: 'Title' },
        //         { title: 'Activity Date' },
        //         { title: 'Estimated Amount' },
        //         { title: 'Status' },
        //         { title: 'Actions', oderable: false, searchable: false },
        //     ],
        //     actions: [
        //         {
        //             btnText: 'EDIT',
        //             status: 'info',
        //             icon: false,
        //             disableStatus: 'FINISHED',
        //             action: 'inline',
        //             modalConf: {
        //                 store: 'organization-budget-activities',
        //                 titleKey: 'name',
        //                 context: 'Budget Acitivity',
        //                 btnText: 'SAVE'
        //             }
        //         },
        //     ]
        // },
        {
            store: 'branches',
            label: 'Activities',
            content: 'nested-list',
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
    ]
}