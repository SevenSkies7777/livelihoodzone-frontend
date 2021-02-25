export const OrganizationAcitivityAllowance = [
    {
        "key": "head_count",
        "type": "input",
        "templateOptions": {
            "attributes": {
                "autofocus": '',
                "autocomplete": "off",
            },
            "type": "number",
            "label": "Number of Attendees",
            "placeholder": "Number of Attendees",
            "required": true,
        }
    },
    {
        "key": "allowance",
        "type": "select",
        "templateOptions": {
            "bindLabel": "name",
            "label": "Select allowance*",
            "bindValue": "id",
            "changeExpr": "this.prefillModel(field)",
            "optionsResource": "allowances",
            "searchable": false,
            "multiple": false,
            "closeOnSelect": true,
            "required": true,
        }
    },
    {
        "key": "unit_price",
        "className": "mb-12 full-width",
        "type": "input",
        "templateOptions": {
            "attributes": {
                "autofocus": '',
                "autocomplete": "off",
            },
            "type": "number",
            "label": "Unit Price",
            "placeholder": "Unit Price",
            "required": true,
            "hint": true,
        }
    },
    {
        "key": "days",
        "className": "pt-16",
        "defaultValue": 1,
        "type": "input",
        "templateOptions": {
            "type": "text",
            "label": "Days",
            "placeholder": "Days",
            "required": true
        }
    },
]