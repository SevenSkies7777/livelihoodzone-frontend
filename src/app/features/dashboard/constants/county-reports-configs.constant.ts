export const countyReportsConfigs = {
    header: [
        { label: 'County Name', key: 'countyName' },
        { label: 'Questionnaire Unique Id', key: 'uniqueId' },
        { label: 'Livelihood Zone', key: 'selectedLivelihoodZone.livelihoodZoneName' },
        { label: 'Questionnaire Name', key: 'questionnaireName' },
        { label: 'Latitude', key: 'latitude' },
        { label: 'Longitude', key: 'longitude' },
    ],
    
    wealthGroupResponse: [
        { label: 'Very Poor', key: 'wealthGroupResponse.verPoorResponse' },
        { label: 'Poor', key: 'wealthGroupResponse.poorResponse' },
        { label: 'Medium Response', key: 'wealthGroupResponse.mediumResponse' },
        { label: 'Better of response', key: 'wealthGroupResponse.betterOfResponse' },
    ],
    ethnicGroupResponseList: {
        title: 'ETHNIC GROUP RESPONSES',
        header: ['Ethnic Group', 'Population Percentage'],
        rows: [],
        content: [],
    },
    hazardResponses: {
        title: 'HAZARD RESPONSES',
        header: [],
        rows: [],
        content: [],
    },
    hungerPatternsResponses: {
        title: 'HUNGER PATTERNS RESPONSES',
        header: ['Season', 'No of Years of Widespread Hunger'],
        content: [],
    },
    waterSourceResponses: {
        title: 'WATER SOURCE RESPONSES',
        header: [],
        rows: [],
        content: [],
    },
    marketTransactionItems: {
        title: 'MARKET TRANSACTIONS',
        header: [],
        rows: [],
        content: [],
    },
    lzCropProductionResponses: {
        title: 'CROP PRODUCTION RESPONSE',
        header: [],
        rows: [],
        content: [],
    },
    livelihoodZoneSeasonsResponses: {
        title: 'SEASON RESPONSES',
        seasonContent: [],
        landContent: [],
    }
}

export const monthsList = [ 
    { monthName: "January", monthId: 1 },
    { monthName: "February", monthId: 2 },
    { monthName: "March", monthId: 3 },
    { monthName: "April", monthId: 4 },
    { monthName: "May", monthId: 5 },
    { monthName: "June", monthId: 6 },
    { monthName: "July", monthId: 7 },
    { monthName: "August", monthId: 8 },
    { monthName: "September", monthId: 9 },
    { monthName: "October", monthId: 10 },
    { monthName: "November", monthId: 11 },
    { monthName: "December", monthId: 12 },
];