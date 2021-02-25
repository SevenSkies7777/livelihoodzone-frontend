export const LoginForm = [
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
];