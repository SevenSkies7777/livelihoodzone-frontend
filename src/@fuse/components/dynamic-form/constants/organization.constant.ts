export const OrganizationForm = [
    {
        "key": "name",
        "type": "input",
        "templateOptions": {
            "type": "text",
            "label": "Organization Name*",
            "placeholder": "Organization Name",
            "required": true
        }
    },
    {
        "className": "full-width",
        "fieldGroup": [
            {
                "key": "parent_organization",
                "type": "select",
                "className": "half-width",
                "templateOptions": {
                    "bindLabel": "name",
                    "label": "Select Ministry*",
                    "bindValue": "id",
                    "optionsResource": "organizations",
                    "searchable": true,
                    "multiple": false,
                    "closeOnSelect": true,
                    "required": false
                }
            },
            {
                "key": "org_type",
                "type": "select",
                "className": "half-width",
                "templateOptions": {
                    "bindLabel": "org_type_code",
                    "label": "Select Organization Type*",
                    "bindValue": "id",
                    "optionsResource": "organization-types",
                    "searchable": false,
                    "multiple": false,
                    "closeOnSelect": true,
                    "required": true
                }
            },
        ],
    },
    {
        "className": "full-width",
        "fieldGroup": [
            {
                "key": "phone_number",
                "type": "input",
                "className": "half-width",
                "templateOptions": {
                    "type": "text",
                    "label": "Phone Number",
                    "placeholder": "Phone Number",
                    "required": false
                }
            },
            {
                "key": "email",
                "type": "input",
                "className": "half-width",
                "templateOptions": {
                    "attributes": {
                        "autofocus": '',
                        "autocomplete": "off",
                    },
                    "type": "email",
                    "label": "Email",
                    "pattern": ".+@.+..+",
                    "placeholder": "Email address",
                    "required": false
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
            "label": "Enter any other details about the organization...",
            "placeholder": "Description...",
            "required": false
        }
    },
]