export const ApplicationForm = [
    {
        "className": "full-width",
        "fieldGroup": [
            {
                "key": "financial_year",
                "className": "half-width",
                "type": "select",
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
            {
                "key": "budget",
                "type": "select",
                "className": "hidden",
                "templateOptions": {
                    "bindLabel": "amount",
                    "label": "Select organization budget*",
                    "bindValue": "id",
                    "optionsResource": "organization-budgets",
                    "searchable": false,
                    "multiple": false,
                    "closeOnSelect": true,
                    "stateParam": { "key": "organization", "value": "organization" },
                    "paramValue": "budget",
                    "required": true,
                }
            },
            {
                "key": "budget_activity",
                "className": "half-width",
                "type": "select",
                "templateOptions": {
                    "bindLabel": "title",
                    "label": "Select budgeted activity*",
                    "bindValue": "id",
                    "optionsResource": "organization-budget-activities",
                    "searchable": false,
                    "multiple": false,
                    "closeOnSelect": true,
                    "stateParam": { "key": "organization", "value": "organization" },
                    "paramValue": "activity",
                    "required": true,
                }
            },
        ],
    },
    {
        "className": "full-width",
        "fieldGroup": [
            {
                "key": "amount_requested",
                // "className": "half-width",
                "hideExpression": true,
                "defaultValue": 0.0,
                "type": "input",
                "templateOptions": {
                    "attributes": {
                        "autofocus": '',
                        "autocomplete": "off",
                    },
                    "type": "number",
                    "label": "Amount Requested*",
                    "placeholder": "Enter amount being requested for",
                    "paramValue": "amount",
                    "required": true,
                    "hint": true,
                }
            },
            {
                "key": "date_requested",
                "className": "half-width",
                "type": "datepicker",
                "templateOptions": {
                    "attributes": {
                        "autofocus": '',
                        "autocomplete": "off",
                    },
                    "type": "text",
                    "label": "Required by",
                    "placeholder": "Required by",
                    "paramValue": "activity_date",
                    "required": true
                }
            },
            {
                "key": "type",
                "className": "half-width",
                "type": "select",
                "templateOptions": {
                    "bindLabel": "title",
                    "label": "Select application type*",
                    "bindValue": "value",
                    "options": [
                        { "title": "Event", "value": "EVENT" },
                        { "title": "Project", "value": "PROJECT" },
                    ],
                    "searchable": false,
                    "multiple": false,
                    "closeOnSelect": true,
                    "required": true,
                }
            },
        ],
    },
    {
        "className": "full-width",
        "fieldGroup": [
            {
                "key": "bank_account",
                "className": "half-width pl-0",
                "type": "select",
                "templateOptions": {
                    "bindLabel": "account_name",
                    "label": "Select bank account*",
                    "bindValue": "id",
                    "optionsResource": "organization-bank-accounts",
                    "searchable": false,
                    "multiple": false,
                    "closeOnSelect": true,
                    "stateParam": { "key": "organization", "value": "organization" },
                    "required": true,
                    "addNew": true,
                }
            },
        ],
    },
]