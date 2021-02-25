import { NameDescriptionForm } from './name-description.constant';

export const DocumentTypesForm = [
    {
        "key": "code",
        "type": "input",
        "templateOptions": {
            "attributes": {
                "autofocus": '',
                "autocomplete": "off",
            },
            "type": "text",
            "label": "Code",
            "placeholder": "Code",
            "required": true
        }
    },
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
        "key": "org_type",
        "type": "select",
        "templateOptions": {
            "bindLabel": "org_type_code",
            "label": "Select Organization Type",
            "bindValue": "id",
            "optionsResource": "organization-types",
            "searchable": false,
            "multiple": false,
            "closeOnSelect": true,
            "required": true
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
];