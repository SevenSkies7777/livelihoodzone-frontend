export const ApplicationItemForm = [
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
        "className": "full-width mb-12",
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