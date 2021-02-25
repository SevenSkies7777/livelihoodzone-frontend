export const ApplicationAlternateFundingSourcesForm = [
    {
        "key": "entity_name",
        "type": "input",
        "templateOptions": {
            "attributes": {
                "autofocus": '',
                "autocomplete": "off",
            },
            "type": "text",
            "label": "Entity Name",
            "placeholder": "Entity Name",
            "required": true
        }
    },
    {
        "key": "estimated_amount",
        "type": "input",
        "templateOptions": {
            "attributes": {
                "autofocus": '',
                "autocomplete": "off",
            },
            "type": "number",
            "label": "Estimated Amount",
            "placeholder": "Estimated Amount",
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
            "placeholder": "Description...",
            "required": false
        }
    },
];