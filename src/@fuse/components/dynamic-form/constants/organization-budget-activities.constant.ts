export const OrganizationBudgetActivitiesForm = [
    {
        "key": "title",
        "type": "input",
        "templateOptions": {
            "attributes": {
                "autofocus": '',
                "autocomplete": "off",
            },
            "type": "text",
            "label": "Title",
            "placeholder": "Title of activity",
            "required": true
        }
    },
    {
        "key": "activity_date",
        "type": "datepicker",
        "templateOptions": {
            "attributes": {
                "autofocus": '',
                "autocomplete": "off",
            },
            "type": "text",
            "label": "Start Date",
            "placeholder": "Start Date",
            "required": true,
            "hint": true,
        }
    },
    // {
    //     "key": "estimated_amount",
    //     "type": "input",
    //     "templateOptions": {
    //         "attributes": {
    //             "autofocus": '',
    //             "autocomplete": "off",
    //         },
    //         "type": "number",
    //         "label": "Estimated amount",
    //         "placeholder": "Enter activity estimated amount",
    //         "required": true,
    //         "hint": true,
    //     }
    // },
]