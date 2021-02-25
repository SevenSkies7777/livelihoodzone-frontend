export const OrganizationMembersForm = [
    {
        "className": "full-width",
        "fieldGroup": [
            {
                "key": "federation_number",
                "className": "half-width",
                "type": "input",
                "templateOptions": {
                    "type": "text",
                    "label": "Federation Number",
                    "placeholder": "Federation Number",
                    "required": false
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
        ],
    },
    {
        "className": "full-width",
        "fieldGroup": [
            {
                "key": "first_name",
                "className": "half-width",
                "type": "input",
                "templateOptions": {
                    "type": "text",
                    "label": "First Name*",
                    "placeholder": "First Name",
                    "required": true
                }
            },
            {
                "key": "last_name",
                "className": "half-width",
                "type": "input",
                "templateOptions": {
                    "type": "text",
                    "label": "Last Name*",
                    "placeholder": "Last Name",
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
                "className": "half-width",
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
        "className": "full-width",
        "fieldGroup": [
            {
                "key": "id_number",
                "className": "half-width",
                "type": "input",
                "templateOptions": {
                    "type": "text",
                    "label": "ID Number",
                    "placeholder": "ID Number",
                    "required": false
                }
            },
            {
                "key": "passport_number",
                "className": "half-width",
                "type": "input",
                "templateOptions": {
                    "type": "text",
                    "label": "Passport Number",
                    "placeholder": "Passport Number",
                    "required": false
                }
            },
        ],
    },
    {
        "className": "full-width",
        "fieldGroup": [
            {
                "key": "sports_category",
                "type": "select",
                "className": "half-width",
                "templateOptions": {
                    "bindLabel": "name",
                    "label": "Select sports category",
                    "bindValue": "id",
                    "optionsResource": "sports-categories",
                    "searchable": false,
                    "multiple": false,
                    "closeOnSelect": true,
                    "required": false,
                }
            },
            {
                "key": "group",
                "type": "select",
                "className": "half-width",
                "templateOptions": {
                    "bindLabel": "name",
                    "label": "Assign organization role",
                    "bindValue": "id",
                    "optionsResource": "user-groups",
                    "searchable": true,
                    "multiple": false,
                    "closeOnSelect": true,
                    "required": false,
                    "stateParam": { "key": "organization", "value": "id" },
                }
            },
        ],
    },
    {
        "template": `<div class="w-100-p font-size-16 
            border-bottom pb-3 px-2 mb-20">
                Bank Details
            </div>`
    },
    {
        "className": "full-width",
        "fieldGroup": [
            {
                "key": "account_number",
                "type": "input",
                "className": "half-width",
                "templateOptions": {
                    "type": "text",
                    "label": "Account Number",
                    "placeholder": "Account Number",
                    "required": false
                }
            },
            {
                "key": "account_name",
                "type": "input",
                "className": "half-width",
                "templateOptions": {
                    "type": "text",
                    "label": "Account Name",
                    "placeholder": "Account Name",
                    "required": false
                }
            },
        ],
    },
    {
        "className": "full-width",
        "fieldGroup": [
            {
                "key": "bank_name",
                "type": "input",
                "className": "half-width",
                "templateOptions": {
                    "type": "text",
                    "label": "Bank Name",
                    "placeholder": "Bank Name",
                    "required": false
                }
            },
            {
                "key": "branch_name",
                "type": "input",
                "className": "half-width",
                "templateOptions": {
                    "type": "text",
                    "label": "Branch Name",
                    "placeholder": "Branch Name",
                    "required": false
                }
            },
        ],
    },
];