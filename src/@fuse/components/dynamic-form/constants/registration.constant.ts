export const RegistrationForm = [
    {
        "key": "first_name",
        "type": "input",
        "templateOptions": {
            "type": "text",
            "label": "First Name",
            "placeholder": "First Name",
            "required": true
        }
    },
    {
        "key": "last_name",
        "type": "input",
        "templateOptions": {
            "type": "text",
            "label": "Last Name",
            "placeholder": "Last Name",
            "required": true
        }
    },
    {
        "key": "phone_number",
        "type": "input",
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
            "minLength": 8,
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
            "minLength": 8,
            "placeholder": "Confirm Password",
            "required": true
        }
    },
];