export const OrganizationBudgetActivityAttendee = [
    {
        "key": "member",
        "type": "select",
        "templateOptions": {
            "bindLabel": "user_name",
            "label": "Select organization member*",
            "bindValue": "id",
            "optionsResource": "organization-members",
            "searchable": false,
            "multiple": false,
            "closeOnSelect": true,
            "stateParam": { "key": "organization", "value": "organization" },
            "required": true,
        }
    },
    {
        "key": "item",
        "type": "select",
        "templateOptions": {
            "bindLabel": "name",
            "label": "Select billable item*",
            "bindValue": "id",
            "optionsResource": "billable-items",
            "searchable": false,
            "multiple": false,
            "closeOnSelect": true,
            "required": true,
        }
    },
    {
        "key": "unit_price",
        "type": "input",
        "templateOptions": {
            "type": "text",
            "label": "Unit Price*",
            "placeholder": "Unit Price",
            "required": false,
            "hint": true,
        }
    },
    {
        "key": "quantity",
        "defaultValue": 1,
        "type": "input",
        "templateOptions": {
            "type": "text",
            "label": "Quantity",
            "placeholder": "Quantity",
            "required": true
        }
    },
]