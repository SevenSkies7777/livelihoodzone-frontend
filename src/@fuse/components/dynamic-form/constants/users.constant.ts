export const UsersForm = [
    {
        "className": "full-width",
        "fieldGroup": [
            {
                "key": "firstName",
                "className": "half-width",
                "type": "input",
                "templateOptions": {
                    "type": "text",
                    "label": "First Name",
                    "placeholder": "First Name",
                    "required": true
                }
            },
            {
                "key": "middleName",
                "className": "half-width pl-2",
                "type": "input",
                "templateOptions": {
                    "type": "text",
                    "label": "Middle Name",
                    "placeholder": "Middle Name",
                    "required": false
                }
            },
            {
                "key": "surname",
                "className": "half-width pr-3",
                "type": "input",
                "templateOptions": {
                    "type": "text",
                    "label": "Last Name",
                    "placeholder": "Last Name",
                    "required": true
                }
            },
            {
                "key": "organizationName",
                "className": "half-width pl-2",
                "type": "input",
                "templateOptions": {
                    "type": "text",
                    "label": "Organization",
                    "placeholder": "Organization",
                    "required": true
                }
            },
        ],
    },
    {
        "key": "userEmail",
        "type": "input",
        "templateOptions": {
            "attributes": {
                "autofocus": '',
                "autocomplete": "off",
            },
            "type": "email",
            "label": "Email",
            "pattern": ".+@.+..+",
            "placeholder": "Email address",
            "required": true
        }
    },
    {
        "key": "password",
        "type": "input",
        "className": "less-margin",
        "templateOptions": {
            "attributes": {
                "autocomplete": "off",
            },
            "type": "password",
            "label": "Password",
            "minLength": 4,
            "placeholder": "Password",
            "required": true
        }
    },
    {
        "key": "confirm_password",
        "type": "input",
        "className": "less-margin",
        "templateOptions": {
            "attributes": {
                "autocomplete": "off",
            },
            "type": "password",
            "label": "Confirm Password",
            "minLength": 4,
            "placeholder": "Confirm Password",
            "required": true
        }
    },
    {
        "key": "countyId",
        "type": "select",
        "templateOptions": {
            "bindLabel": "countyName",
            "bindValue": "countyId",
            "label": "Assign County*",
            "optionsResource": "counties",
            "searchable": true,
            "multiple": false,
            "hideSelected": true,
            "closeOnSelect": true,
            "required": false
        }
    },
    {
        "key": "rolesToBeAssigned",
        "type": "select",
        "templateOptions": {
            "bindLabel": "roleDescription",
            "label": "User roles*",
            "optionsResource": "roles",
            "searchable": false,
            "multiple": true,
            "hideSelected": true,
            "closeOnSelect": true,
            "required": true
        }
    },
];