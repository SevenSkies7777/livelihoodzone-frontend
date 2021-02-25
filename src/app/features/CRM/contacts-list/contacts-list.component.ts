import { Component } from '@angular/core';

@Component({
    selector: 'contacts-list',
    styles: [
        `:host{
            width: 100%;
        }`
    ],
    template: `
        <div class="w-100-p d-flex px-0">
            <div class="w-100-p d-flex px-0">
                <dynamic-table title="Listing"
                class="w-100-p"
                [headers]="headers" [no-card]="true"
                [has-action]="true" store="contacts"
                [topActions]="topActions" [hasSearch]="true"
                [actions]="actions" [rows]="rows">
                </dynamic-table>
            </div>
        </div>
    `,
})

export class ContactsListComponent {
    headers: Array<any> = [
        { title: 'Names' },
        { title: 'Email' },
        { title: 'Phone Number' },
    ];

    topActions: Array<any> = [
        {
            btnText: 'ADD CONTACT',
            status: 'primary',
            action: 'inline',
            conf: {
                context: 'Contact',
                store: 'contact',
                btnText: 'SAVE',
            }
        }
    ];

    rows: Array<any> = [
        { key: 'name', type: 'string' },
        { key: 'email', type: 'string' },
        { key: 'phone_number', type: 'string' },
    ];

    actions: Array<any> = [
        {
            btnText: 'EDIT',
            status: 'accent',
            icon: false,
            modalConf: {
                store: 'contacts',
                titleKey: 'names',
                context: 'Contacts',
                btnText: 'SAVE',
            },
        }
    ];
}