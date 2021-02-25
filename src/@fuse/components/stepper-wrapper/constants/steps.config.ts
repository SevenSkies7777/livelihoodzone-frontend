import { ApplicationStepsConfig } from './appplication.constant';
import { OrganizationStepsConfig } from './organization.constant';

export const StepsConfig = [
    {
        key: 'application',
        context: 'Application',
        steps: ApplicationStepsConfig,
    },
    {
        key: 'organization',
        context: 'Organization',
        steps: OrganizationStepsConfig,
    },
    {
        key: 'budget',
        context: 'Calendar of Events',
        steps: [
            { 
                count: 1,
                label: 'Basic Details',
                shortLabel: 'Basic',
                help_text: 'Step 1',
                icon: 'work',
                template: 'one',
                formConf: {
                    store: 'organization-budgets',
                    cancelTxt: 'CANCEL',
                    nextTxt: 'NEXT',
                    addStore: 'organization-budgets',
                    editStore: 'organization-budgets',
                    getStore: 'organization-budgets'
                },
                active: false
            },
            { 
                count: 2,
                label: 'Budgeted Activities',
                shortLabel: 'Activities',
                help_text: 'Step 2',
                icon: 'directions_run',
                template: 'six',
                inlineConf: {
                    store: 'visit',
                    cancelTxt: 'BACK',
                    nextTxt: 'COMPLETE',
                    editStore: 'visits',
                    getStore: 'visits'
                },
                active: false,
                gridConf: {
                    store: 'organization-budgets',
                    modelKey: 'org_budget',
                    getStore: 'organization-budget-activities',
                    editStore: 'organization-budget-activities',
                    topActions: [
                        {
                            btnText: 'ADD ACTIVITY',
                            status: 'info',
                            icon: 'true',
                            action: 'inline',
                            conf: {
                                context: 'Budget Activity',
                                store: 'organization-budget-activities',
                                btnText: 'SAVE'
                            }
                        }
                    ],
                    rows: [
                        { key: 'title', type: 'string' },
                        { key: 'activity_date', type: 'date' },
                        { key: 'estimated_amount', type: 'currency' },
                        { key: 'status', type: 'status' },
                    ],
                    headers: [
                        { title: 'Title' },
                        { title: 'Activity Date' },
                        { title: 'Estimated Amount' },
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
                                store: 'organization-budget-activities',
                                titleKey: 'name',
                                context: 'Budget Activity',
                                btnText: 'SAVE'
                            }
                            }
                    ]
                },
            },
            { 
                count: 3,
                label: 'Statutory Attachments',
                shortLabel: 'Attachments',
                help_text: 'Step 3',
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
                count: 4,
                label: 'Additional Attachments',
                shortLabel: 'Documents',
                help_text: 'Step 4',
                icon: 'insert_drive_file',
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
                    store: 'organization-budgets',
                    getStore: 'organization-budgets',
                    editStore: 'organization-budgets',
                    attachmentStore: 'organization-budget-attachments',
                    headerAction: true,
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
            }
        ],
    }
]