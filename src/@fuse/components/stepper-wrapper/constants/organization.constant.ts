export const OrganizationStepsConfig = [
    { 
        count: 1,
        label: 'Basic Details',
        shortLabel: 'Basic',
        help_text: 'Step 1',
        icon: 'work',
        template: 'one',
        formConf: {
            store: 'organizations',
            cancelTxt: 'CANCEL',
            nextTxt: 'MEMBERS',
            addStore: 'organizations',
            editStore: 'organizations',
            getStore: 'organizations'
        },
        active: false
    },
    // { 
    //     count: 2,
    //     label: 'Organization Roles',
    //     shortLabel: 'Roles',
    //     help_text: 'Step 2',
    //     icon: 'ballot',
    //     template: 'two',
    //     inlineConf: {
    //         store: 'visit',
    //         cancelTxt: 'BACK',
    //         nextTxt: 'COMPLETE',
    //         editStore: 'visits',
    //         getStore: 'visits'
    //     },
    //     active: false,
    //     gridConf: {
    //         store: 'organizations',
    //         getStore: 'organization-roles',
    //         editStore: 'organization-roles',
    //         modelKey: 'organization',
    //         topActions: [
    //             {
    //                 btnText: 'ADD ROLE',
    //                 status: 'info',
    //                 icon: 'true',
    //                 action: 'inline',
    //                 conf: {
    //                     context: 'ROLE',
    //                     store: 'organization-roles',
    //                     btnText: 'SAVE'
    //                 }
    //             }
    //         ],
    //         rows: [
    //             { key: 'description', type: 'string' },
    //         ],
    //         headers: [
    //             { title: 'Description' },
    //             { title: 'Actions', oderable: false, searchable: false },
    //         ],
    //         actions: [
    //             {
    //                 btnText: 'EDIT',
    //                 status: 'info',
    //                 icon: false,
    //                 disableStatus: 'FINISHED',
    //                 action: 'inline',
    //                 modalConf: {
    //                     store: 'organization-roles',
    //                     titleKey: 'description',
    //                     context: 'Role',
    //                     btnText: 'SAVE'
    //                 }
    //                 }
    //         ]
    //     },
    // },
    { 
        count: 2,
        label: 'Athletes & Officials',
        shortLabel: 'Members',
        help_text: 'Step 2',
        icon: 'group',
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
            store: 'organizations',
            getStore: 'organization-members',
            editStore: 'organization-members',
            modelKey: 'organization',
            topActions: [
                {
                    btnText: 'ADD MEMBER',
                    status: 'info',
                    icon: 'true',
                    action: 'inline',
                    conf: {
                        context: 'MEMBER',
                        store: 'organization-members',
                        btnText: 'SAVE'
                    }
                }
            ],
            rows: [
                { 
                    key: 'federation_number', 
                    fieldType: 'nested_string',
                    type: 'nested',
                    primaryField: 'user.federation_number',
                },
                { 
                    key: 'user.first_name', 
                    fieldType: 'nested_multistrings',
                    type: 'nested',
                    primaryField: 'user.first_name',
                    secondaryField: 'user.last_name',
                },
                { 
                    key: 'user.dob',
                    fieldType: 'nested_string',
                    type: 'nested',
                    primaryField: 'user.dob',
                },
                { 
                    key: 'user.email', 
                    fieldType: 'nested_string',
                    type: 'nested',
                    primaryField: 'user.email',
                },
                { 
                    key: 'user.phone_number', 
                    fieldType: 'nested_string',
                    type: 'nested',
                    primaryField: 'user.phone_number',
                },
                { key: 'sports_category', type: 'string' },
            ],
            headers: [
                { title: 'Federation #' },
                    { title: 'Names' },
                    { title: 'Date of Birth' },
                    { 
                        title: 'Email' 
                    },
                    { title: 'Phone #' },
                    { title: 'Sports Category' },
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
                        store: 'organization-members',
                        titleKey: 'first_name',
                        context: 'Member',
                        btnText: 'SAVE'
                    }
                    }
            ]
        },
    },
    { 
        count: 3,
        label: 'Bank Account',
        shortLabel: 'Account',
        help_text: 'Step 3',
        icon: 'account_balance',
        template: 'four',
        inlineConf: {
            store: 'visit',
            cancelTxt: 'BACK',
            nextTxt: 'COMPLETE',
            editStore: 'visits',
            getStore: 'visits'
        },
        active: false,
        gridConf: {
            store: 'organizations',
            modelKey: 'organization',
            getStore: 'organization-bank-accounts',
            editStore: 'organization-bank-accounts',
            topActions: [
                {
                    btnText: 'ADD BANK ACCOUNT',
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
    }
]