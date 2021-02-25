export const ApplicationAllowanceForm = [
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
]