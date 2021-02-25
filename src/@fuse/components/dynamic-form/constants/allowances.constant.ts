export const AllowancesForm = [
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
        "key": "amount",
        "type": "input",
        "templateOptions": {
            "attributes": {
                "autofocus": '',
                "autocomplete": "off",
            },
            "type": "number",
            "label": "Rate",
            "placeholder": "Rate",
            "required": true,
            "hint": true,
        }
    },
    {
        "key": "participant_type",
        "className": "half-width",
        "type": "select",
        "templateOptions": {
            "bindLabel": "title",
            "label": "Select member's type*",
            "bindValue": "value",
            "options": [
                { "title": "Athlete", "value": "ATHLETE" },
                { "title": "Official", "value": "OFFICIAL" },
            ],
            "searchable": false,
            "multiple": false,
            "closeOnSelect": true,
            "required": true,
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
]