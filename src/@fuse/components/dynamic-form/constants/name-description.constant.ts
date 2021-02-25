export const NameDescriptionForm = [
    {
        "key": "name",
        "type": "input",
        "templateOptions": {
            "attributes": {
                "autofocus": '',
                "autocomplete": "off",
            },
            "type": "text",
            "label": "Name",
            "placeholder": "Name",
            "required": true
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