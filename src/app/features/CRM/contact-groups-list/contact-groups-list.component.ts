import { Component } from '@angular/core';

@Component({
    selector: 'contact-groups-list',
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
            [has-action]="true" store="contact-groups"
            [topActions]="topActions" [hasSearch]="true"
            [actions]="actions" [rows]="rows">
            </dynamic-table>
        </div>
        </div>
    `,
})

export class ContactGroupsListComponent {
    headers: Array<any> = [
        { title: 'Name' },
        { title: 'Subscribers' },
    ];

    topActions: Array<any> = [
        {
            btnText:'ADD CONTACT GROUP',
            status: 'primary',
            action: 'inline',
            conf: {
                context: 'Contact Group',
                store: 'contact-group',
                btnText: 'SAVE',
            }
        },
    ];

    rows: Array<any> = [
        { key: 'name', type: 'string' },
        { key: 'subscribers', type: 'count' },
    ];

    actions: Array<any> = [
        {
            btnText: 'EDIT',
            status: 'accent',
            icon: false,
            modalConf: {
                store: 'contact-groups',
                titleKey: 'name',
                context: 'Contact Groups',
                btnText: 'SAVE',
            }
        }
    ];
}