import { ApplicationsConfigs } from './applications.constant';
import { BudgetsConfigs } from './budgets.constant';

export const TabsConfigs = [
    {
        key: 'application',
        tabs: ApplicationsConfigs.tabs,
        headerConfig: {
            icon: 'assignment',
            headerLabel: 'Application',
            headerValue: 'id',
            subTitleLabel: 'By',
            subTitleValue: 'organization_data.name',
            actions: [
                {
                    'btnText': 'SUBMIT',
                    'action': 'submit',
                    'color':'default',
                    'context': 'APPLICATION',
                    'activeStates': ['DRAFT'],
                    'bpType': [
                        'GOVERNMENT_AGENCY', 
                        'PROFESSIONAL_SPORTPERSON',
                        'SPORTS_ORGANIZATION',
                        'MINISTRY'
                    ],
                    'roles': [
                        'Admin',
                        'Budget Reviewer', 
                        'Ministry Approver',
                    ],
                    'configs': {
                        'title': 'Submit Application',
                        'context': 'APPLICATION',
                        'store': 'applications',
                        'action': 'update',
                        'description':  `Kindly verify that you would indeed like to
                            submit the following application for review. Once submitted 
                            you will not be able to make any further updates to it. 
                            Click Submit below to proceed`,
                    }
                },
                // {
                //     'btnText': 'APPROVE',
                //     'action': 'approve',
                //     'context': 'APPLICATION',
                //     'color': 'default',
                //     'activeStates': [
                //         'FIRST_LEVEL_APPROVED',
                //     ], // TODO: Give correct status
                //     'bpType': [
                //         'SASDEF',
                //     ],
                //     'roles': [
                //         'Ministry Approver',
                //         'SASDEF Admin',
                //     ],
                //     'configs': {
                //         'title': 'Approve Application',
                //         'context': 'APPLICATION',
                //         'store': 'application-reviews',
                //         'action': 'finalApproveApplication',
                //         'description':  `Kindly verify that you would indeed like to
                //             approve the following application. Confirm that you have reviewed
                //             and approve the application before you can
                //             continue`,
                //         'approveNested': false,
                //         'reviewAttachment': true,
                //     }
                // },
                // {
                //     'btnText': 'REJECT',
                //     'action': 'reject',
                //     'context': 'APPLICATION',
                //     'color': 'warn',
                //     'activeStates': ['FIRST_LEVEL_APPROVED', 'SUBMITTED'], // TODO: Give correct status
                //     'bpType': [
                //         'MINISTRY',
                //         'SASDEF',
                //     ],
                //     'roles': [
                //         'Ministry Approver',
                //         'SASDEF Admin',
                //     ],
                //     'configs': {
                //         'title': 'Reject Application',
                //         'context': 'APPLICATION',
                //         'store': 'application-reviews',
                //         'action': 'rejectApplication',
                //         'description':  `Kindly verify that you would indeed like to
                //             reject the following application. Confirm that you have reviewed
                //             and reject the application before you can
                //             continue`,
                //         'comment': true,
                //     }
                // },
                {
                    'btnText': 'RATIONALIZE',
                    'action': 'rationalize',
                    'context': 'APPLICATIONS',
                    'color': 'default',
                    'activeStates': ['SUBMITTED'],
                    'bpType': [
                        'MINISTRY', 'SASDEF',
                    ],
                    'roles': [
                        'Admin',
                        'Budget Reviewer', 
                        'Ministry Approver',
                    ],
                    'configs': {
                        'title': 'Rationalize Application',
                        'context': 'APPLICATIONS',
                        'store': 'application-reviews',
                        'action': 'rationalizeApplication',
                        'description':  `Kindly verify that you would indeed like to 
                            rationalize the following application. Confirm that you have reviewed
                            and rationalized or rejected activity lines before you can
                            continue`,
                        'approveNested': false,
                        'comment': false,
                    }
                },
                {
                    'btnText': 'APPROVE',
                    'action': 'approve',
                    'context': 'APPLICATIONS',
                    'color': 'default',
                    'activeStates': ['RATIONALIZED'],
                    'bpType': [
                        'SASDEF',
                    ],
                    'roles': [
                        'Budget Reviewer', 
                        'Ministry Approver',
                        'SASDEF Admin',
                    ],
                    'configs': {
                        'title': 'Approve Application',
                        'context': 'APPLICATION  ',
                        'store': 'application-reviews',
                        'action': 'approveApplication',
                        'description':  `Kindly verify that you would indeed like to
                            approve the following application. Confirm that you have reviewed
                            and approved or rejected activity lines before you can
                            continue`,
                        'approveNested': false,
                        'comment': false,
                    }
                },
                {
                    'btnText': 'REJECT',
                    'action': 'reject',
                    'context': 'APPLICATIONS',
                    'color': 'warn',
                    'activeStates': ['SUBMITTED', 'RATIONALIZED'],
                    'bpType': [
                        'MINISTRY',
                        'SASDEF',
                    ],
                    'roles': [
                        'Budget Reviewer', 
                        'Ministry Approver',
                        'SASDEF Admin',
                    ],
                    'configs': {
                        'title': 'Reject Application',
                        'context': 'APPLICATIONS',
                        'hasComment': true,
                        'store': 'application-reviews',
                        'action': 'rejectApplication',
                        'description':  `Kindly verify that you would indeed like to
                            reject the following application. Once rejected you will
                            not be able to approve any of the activities lines`,
                        'comment': true,
                    }
                },
            ],
        },
    },
    {
        key: 'organization-budget',
        headerConfig: {
            icon: 'work',
            headerLabel: 'Calendar of Event',
            headerValue: 'id',
            subTitleLabel: 'By',
            subTitleValue: 'organization_data.name',
            actions: [
                {
                    'btnText': 'SUBMIT',
                    'action': 'submit',
                    'color':'default',
                    'context': 'CALENDAR OF EVENTS',
                    'activeStates': ['DRAFT'],
                    'bpType': [
                        'GOVERNMENT_AGENCY', 
                        'PROFESSIONAL_SPORTPERSON',
                        'SPORTS_ORGANIZATION',
                        'MINISTRY'
                    ],
                    'roles': [
                        'Admin',
                        'Budget Reviewer', 
                        'Ministry Approver',
                    ],
                    'configs': {
                        'title': 'Submit Calendar of Events',
                        'context': 'CALENDAR OF EVENTS',
                        'store': 'organization-budgets',
                        'action': 'update',
                        'description':  `Kindly verify that you would indeed like to
                            submit the following calendar of events. Once submitted you will not
                            be able to make any further updates to it. Click Submit
                            below to proceed`,
                    }
                },
                {
                    'btnText': 'RATIONALIZE',
                    'action': 'rationalize',
                    'context': 'CALENDAR OF EVENTS',
                    'color': 'default',
                    'activeStates': ['SUBMITTED'],
                    'bpType': [
                        'MINISTRY',
                    ],
                    'roles': [
                        'Admin',
                        'Budget Reviewer', 
                        'Ministry Approver',
                    ],
                    'configs': {
                        'title': 'Rationalize Calendar of Events',
                        'context': 'CALENDAR OF EVENTS',
                        'store': 'organization-budget-reviews',
                        'action': 'rationalize',
                        'description':  `Kindly verify that you would indeed like to 
                            rationalize the following calendar of events. Confirm that you have reviewed
                            and rationalized or rejected activities and activity lines before you can
                            continue`,
                        'approveNested': false,
                        'comment': false,
                    }
                },
                {
                    'btnText': 'APPROVE',
                    'action': 'approve',
                    'context': 'CALENDAR OF EVENTS',
                    'color': 'default',
                    'activeStates': ['RATIONALIZED'],
                    'bpType': [
                        'SASDEF',
                    ],
                    'roles': [
                        'Budget Reviewer', 
                        'Ministry Approver',
                        'SASDEF Admin',
                    ],
                    'configs': {
                        'title': 'Approve Calendar of Events',
                        'context': 'CALENDAR OF EVENTS  ',
                        'store': 'organization-budget-reviews',
                        'action': 'approve',
                        'description':  `Kindly verify that you would indeed like tO
                            approve the following calendar of events. Confirm that you have reviewed
                            and approved or rejected activities and activity lines before you can
                            continue`,
                        'approveNested': false,
                        'comment': false,
                    }
                },
                {
                    'btnText': 'REJECT',
                    'action': 'reject',
                    'context': 'CALENDAR OF EVENTS',
                    'color': 'warn',
                    'activeStates': ['SUBMITTED', 'RATIONALIZED'],
                    'bpType': [
                        'MINISTRY',
                        'SASDEF',
                    ],
                    'roles': [
                        'Budget Reviewer', 
                        'Ministry Approver',
                        'SASDEF Admin',
                    ],
                    'configs': {
                        'title': 'Reject Calendar of Events',
                        'context': 'CALENDAR OF EVENTS',
                        'hasComment': true,
                        'store': 'organization-budget-reviews',
                        'action': 'reject',
                        'description':  `Kindly verify that you would indeed like to
                            reject the following calendar of events. Once rejected you will
                            not be able to approve any of the activities or activity`,
                        'comment': true,
                    }
                },
            ],
        },
        tabs: BudgetsConfigs.tabs,
    },
    {
        key: 'organization',
        tabs: [
            {
                store: 'organisations',
                label: 'Basic Details',
                content: 'form',
                // icon: 'work',
                count: 1,
                formConf: {
                    store: 'organisations',
                    cancelTxt: 'CANCEL',
                    nextTxt: 'SAVE',
                    addStore: 'organisations',
                    editStore: 'organisations',
                    getStore: 'organisations'
                },
                detailsConf: [
                    {
                        label: 'Name',
                        key: 'name',
                        icon: 'business'
                    },
                    {
                        label: 'Organization Type',
                        key: 'org_type_code',
                        icon: 'account_balance',
                    },
                    {
                        label: 'Phone #',
                        key: 'phone_number',
                        icon: 'phone'
                    },
                    {
                        label: 'Email',
                        key: 'email',
                        icon: 'email'
                    }
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
                ]
            },
            {
                store: 'organization-members',
                label: 'Athletes & Officials',
                content: 'grid',
                modelKey: 'organization',
                gridConf: {
                    getStore: 'organization-members',
                    editStore: 'organization-members'
                },
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
                    { 
                        key: 'sports_category', 
                        type: 'nested',
                        fieldType: 'nested_string',
                        primaryField: 'sports_category_data.name',
                    },
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
                          context: 'MEMBER',
                          btnText: 'SAVE'
                        }
                      }
                ]
            },
            // {
            //     store: 'organization-roles',
            //     label: 'Organization Roles',
            //     modelKey: 'organization',
            //     content: 'grid',
            //     gridConf: {
            //         getStore: 'organization-roles',
            //         editStore: 'organization-roles'
            //     },
            //     topActions: [
            //         {
            //             btnText: 'ADD ROLE',
            //             status: 'info',
            //             icon: 'true',
            //             action: 'inline',
            //             conf: {
            //               context: 'ROLE',
            //               store: 'organization-roles',
            //               btnText: 'SAVE'
            //             }
            //         }
            //     ],
            //     rows: [
            //         { key: 'description', type: 'string' },
            //     ],
            //     headers: [
            //         { title: 'Description' },
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
            //               store: 'organization-roles',
            //               titleKey: 'description',
            //               context: 'Role',
            //               btnText: 'SAVE'
            //             }
            //           }
            //     ]
            // },
            // {
            //     store: 'users',
            //     label: 'Users',
            //     content: 'grid',
            //     modelKey: 'organization',
            //     gridConf: {
            //         getStore: 'users',
            //         editStore: 'users'
            //     },
            //     rows: [
            //         { 
            //             key: 'first_name',
            //             fieldType: 'nested_multistrings',
            //             type: 'nested',
            //             primaryField: 'first_name',
            //             secondaryField: 'last_name',
            //         },
            //         { key: 'phone_number', type: 'string' },
            //         { key: 'email', type: 'string' },
            //     ],
            //     headers: [
            //         { title: 'Names' },
            //         { title: 'Phone Number' },
            //         { title: 'Email' },
            //         { title: 'Actions', oderable: false, searchable: false },
            //     ],
            //     actions: [
            //         {
            //             btnText: 'MANAGE',
            //             status: 'info',
            //             icon: false,
            //             disableStatus: 'FINISHED',
            //             action: 'inline',
            //             modalConf: {
            //               store: 'users',
            //               titleKey: 'name',
            //               context: 'Users',
            //               btnText: 'SAVE'
            //             }
            //           }
            //     ]
            // },
            // TODO: Bring back when fixed to work well
            // {
            //     store: 'organization-join-requests',
            //     label: 'Join Requests',
            //     content: 'grid',
            //     modelKey: 'organization',
            //     gridConf: {
            //         getStore: 'organization-join-requests',
            //         editStore: 'organization-join-requests'
            //     },
            //     rows: [
            //         { key: 'requester', type: 'string' },
            //         { key: 'organization', type: 'string' },
            //         { key: 'requested_on', type: 'date' },
            //         { key: 'review_state', type: 'status' }
            //     ],
            //     headers: [
            //         { title: 'Requsted by' },
            //         { title: 'Requested on'},
            //         { title: 'Status' },
            //         { title: 'Actions' }
            //     ],
            //     actions: [
            //         {
            //             btnText: 'APPROVE',
            //             status: 'info',
            //             icon: false,
            //             disableStatus: 'FINISHED',
            //             action: 'inline',
            //             modalConf: {
            //               store: 'organization-join-requests',
            //               titleKey: 'name',
            //               context: 'Join Request',
            //               btnText: 'SAVE'
            //             }
            //           }
            //     ]
            // }
        ]
    }
]