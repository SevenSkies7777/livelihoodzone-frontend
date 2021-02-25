import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
    {
        id       : 'menu',
        title    : 'MENU',
        translate: 'MENU',
        type     : 'group',
        children : [
            {
                id       : 'dashboard',
                title    : 'Dashboard',
                translate: 'NAV.SAMPLE.TITLE',
                type     : 'item',
                icon     : 'dashboard',
                url      : '/dashboard',
            },
            {
                id       : 'budgets',
                title    : 'Calendar of Events',
                type     : 'item',
                icon     : 'calendar_today',
                url      : '/budgets',
            },
            {
                id       : 'applications',
                title    : 'Applications',
                type     : 'item',
                icon     : 'assignment',
                url      : '/applications',
            },
            {
                id       : 'organizations',
                title    : 'Organizations',
                type     : 'item',
                icon     : 'account_balance',
                url      : '/organizations',
                bpType   : ['SASDF'],
            },
            {
                id       : 'join-requests',
                title    : 'Join Requests',
                type     : 'item',
                icon     : 'person_add',
                url      : '/organization-join-requests',
            },
            {
                id       : 'sports-categories',
                title    : 'Sports Categories',
                type     : 'item',
                icon     : 'directions_run',
                url      : '/sports-categories',
                bpType   : ['SASDF'],
            },
            {
                id       : 'billable-items',
                title    : 'Billable Items',
                type     : 'item',
                icon     : 'reorder',
                url      : '/billable-items',
                bpType   : ['SASDF'],
            },
            {
                id       : 'allowances',
                title    : 'Allowances',
                type     : 'item',
                icon     : 'account_balance_wallet',
                url      : '/allowances',
                bpType   : ['SASDF'],
            },
            {
                id       : 'document-types',
                title    : 'Document Types',
                type     : 'item',
                icon     : 'description',
                url      : '/document-types',
                bpType   : ['SASDF'],
            },
            {
                id       : 'financial-years',
                title    : 'Financial Years',
                type     : 'item',
                icon     : 'description',
                url      : '/financial-years',
                bpType   : ['SASDF'],
            },
            // TODO Bring back when ready
            // {
            //     id       : 'crm',
            //     title    : 'CRM',
            //     type     : 'item',
            //     icon     : 'headset_mic',
            //     url      : '/crm',
            //     bpType   : ['SASDF'],
            // },
            {
                id       : 'my-organization',
                title    : 'My Organization',
                type     : 'item',
                icon     : 'business',
                url      : '/my-organization',
            },
        ]
    }
];
