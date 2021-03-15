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
                title    : 'Reports',
                translate: 'NAV.SAMPLE.TITLE',
                type     : 'collapsable',
                icon     : 'dashboard',
                // url      : '/dashboard',
                children: [
                    {
                        id   : 'labor',
                        title: 'Labor Patterns',
                        type : 'item',
                        icon : '',
                        url  : '/dashboard/labor'
                    },
                    {
                        id   : 'migration',
                        title: 'Migration Patterns',
                        type : 'item',
                        icon : '',
                        url  : '/dashboard/migration'
                    },
                    {
                        id   : 'livestock',
                        title: 'Livestock Ownership',
                        type : 'item',
                        icon : '',
                        url  : '/dashboard/livestock-ownership'
                    },
                    {
                        id   : 'income',
                        title: 'Main Income Source',
                        type : 'item',
                        icon : '',
                        url  : '/dashboard/income'
                    },
                    {
                        id   : 'hunger',
                        title: 'Hunger Patterns',
                        type : 'item',
                        icon : '',
                        url  : '/dashboard/hunger'
                    },
                    {
                        id   : 'hazard',
                        title: 'Hazards',
                        type : 'item',
                        icon : '',
                        url  : '/dashboard/hazard'
                    },
                    {
                        id   : 'expenditure',
                        title: 'Expenditure Patterns',
                        type : 'item',
                        icon : '',
                        url  : '/dashboard/expenditure'
                    },
                    {
                        id   : 'production',
                        title: 'Crop Production',
                        type : 'item',
                        icon : '',
                        url  : '/dashboard/crop-production'
                    },
                    {
                        id   : 'contribution',
                        title: 'Crop Income Contribut...',
                        type : 'item',
                        icon : '',
                        url  : '/dashboard/crop-contribution'
                    },
                    {
                        id   : 'economics',
                        title: 'Economic Activity Con...',
                        type : 'item',
                        icon : '',
                        url  : '/dashboard/economic-activities'
                    },
                    {
                        id   : 'map-wrapper',
                        title: 'Map Report',
                        type : 'item',
                        icon : '',
                        url  : '/dashboard/map-report'
                    },
                ]
            },
            {
                id       : 'users',
                title    : 'Manage Users',
                type     : 'item',
                icon     : 'people',
                url      : '/users',
            },
            {
                id       : 'questionnaires',
                title    : 'Data Collection Tools',
                type     : 'item',
                icon     : 'assignment',
                url      : '/questionnaires',
            },
        ]
    }
];
