import { Component } from '@angular/core';

@Component({
    selector: 'email-groups-list',
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
            [has-action]="true" store="email-groups"
            [topActions]="topActions" [hasSearch]="true"
            [actions]="actions" [rows]="rows">
            </dynamic-table>
        </div>
        </div>
    `,
})

export class EmailGroupsListComponent {
    headers: Array<any> = [
        { title: 'Name' },
        { title: 'Subscribers' },
    ];

    topActions: Array<any> = [
        {
            btnText:'ADD EMAIL GROUP',
            status: 'primary',
            action: 'inline',
            conf: {
                context: 'Email Group',
                store: 'email-group',
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
                store: 'email-groups',
                titleKey: 'name',
                context: 'Email Groups',
                btnText: 'SAVE',
            }
        }
    ];
}