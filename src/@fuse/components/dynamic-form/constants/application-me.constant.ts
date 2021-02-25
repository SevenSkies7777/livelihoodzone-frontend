export const ApplicationMEForm = [
    {
        "key": "head_count",
        "type": "input",
        "className": "full-width mb-12",
        "templateOptions": {
            "type": "number",
            "label": "Number of attendees*",
            "placeholder": "Number of attendees",
            "required": false,
        }
    },
    {
        "key": "days",
        "type": "input",
        "className": "full-width mb-12",
        "templateOptions": {
            "type": "number",
            "label": "Days*",
            "placeholder": "Days",
            "required": false,
        }
    },
    {
        "key": "unit_price",
        "className": "full-width mb-12",
        "type": "input",
        "templateOptions": {
            "type": "text",
            "label": "Unit Price",
            "placeholder": "Unit Price",
            "required": true,
            "hint": true,
        }
    },
    {
        "key": "description",
        "type": "textarea",
        "templateOptions": {
            "attributes": {
                "autofocus": '',
                "autocomplete": "off",
            },
            "rows": 3,
            "label": "Description",
            "placeholder": "Indicate the relevant allowance e.g...",
            "required": false
        }
    },
]