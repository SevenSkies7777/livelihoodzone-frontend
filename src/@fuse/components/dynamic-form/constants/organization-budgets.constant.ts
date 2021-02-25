export const OrganizationBudgetForm = [
    {
        "className": "full-width",
        "fieldGroup": [
            {
                "key": "amount",
                "type": "input",
                "hideExpression": true,
                "defaultValue": 0,
                "className": "half-width",
                "templateOptions": {
                    "attributes": {
                        "autofocus": '',
                        "autocomplete": "off",
                    },
                    "type": "number",
                    "label": "Amount",
                    "placeholder": "Amount",
                    "required": true,
                    "hint": true,
                }
            },
            {
                "key": "financial_year",
                "type": "select",
                "className": "full-width",
                "templateOptions": {
                    "bindLabel": "starts_on",
                    "label": "Select Financial Year",
                    "bindValue": "id",
                    "optionsResource": "organization-financial-years",
                    "searchable": false,
                    "multiple": false,
                    "closeOnSelect": true,
                    "required": true,
                    "template": "financial_year",
                }
            },
        ],
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