export const FinancialYearForm = [
    {
        "key": "starts_on",
        "type": "datepicker",
        "templateOptions": {
            "attributes": {
                "autofocus": '',
                "autocomplete": "off",
            },
            "type": "text",
            "label": "Start Date",
            "placeholder": "Start Date",
            "required": true
        }
    },
    {
        "key": "ends_on",
        "type": "datepicker",
        "templateOptions": {
            "attributes": {
                "autofocus": '',
                "autocomplete": "off",
            },
            "type": "text",
            "label": "End Date",
            "placeholder": "End date",
            "required": true
        }
    },
    {
        "key": "is_current",
        "type": "checkbox",
        "templateOptions": {
            "label": "Is currently financial year",
            "required": false,
        }
    },
];