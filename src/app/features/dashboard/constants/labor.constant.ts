export const LaborConfigs = {
    livelihood_zones: [
        {
            title: 'Agro Pastrol',
            headers: [
                { title: 'Activity' },
                { title: 'Percent Women' },
                { title: 'Percent Men' },
            ],
            row: [
                { key: 'activity', type: 'string' },
                { key: 'percent_women', type: 'number' },
                { key: 'percent_men', type: 'number' },
            ],
            data: [
                {
                    activity: 'Domestic (unpaid) work including child',
                    percent_women: 2,
                    percent_men: 1
                },
                {
                    activity: 'Labor on won farms (crop production)',
                    percent_women: 30,
                    percent_men: 10,
                }
            ],
        },
        {
            title: 'Irrigated Cropping',
            headers: [
                { title: 'Activity' },
                { title: 'Percent Women' },
                { title: 'Percent Men' },
            ],
            row: [
                { key: 'activity', type: 'string' },
                { key: 'percent_women', type: 'number' },
                { key: 'percent_men', type: 'number' },
            ],
            data: [
                {
                    activity: 'Domestic (unpaid) work including child',
                    percent_women: 2,
                    percent_men: 1
                }
            ],
        },
        {
            title: 'Mixed Farming',
            headers: [
                { title: 'Activity' },
                { title: 'Percent Women' },
                { title: 'Percent Men' },
            ],
            row: [
                { key: 'activity', type: 'string' },
                { key: 'percent_women', type: 'number' },
                { key: 'percent_men', type: 'number' },
            ],
            data: [
                {
                    activity: 'Domestic (unpaid) work including child',
                    percent_women: 2,
                    percent_men: 1
                }
            ],
        },
        {
            title: 'Pastoral - all species',
            headers: [
                { title: 'Activity' },
                { title: 'Percent Women' },
                { title: 'Percent Men' },
            ],
            row: [
                { key: 'activity', type: 'string' },
                { key: 'percent_women', type: 'number' },
                { key: 'percent_men', type: 'number' },
            ],
            data: [
                {
                    activity: 'Domestic (unpaid) work including child',
                    percent_women: 2,
                    percent_men: 1
                }
            ],
        },
    ]
}