import { Component } from '@angular/core';

@Component({
    selector: 'allowances-list',
    styles: [
        `:host{
            width: 100%;
        }`
    ],
    template: `
        <div><page-header title="Allowances"></page-header></div>
        <div class="w-100-p d-flex px-5">
            <div class="w-100-p d-flex px-5">
                <dynamic-table title="Listing"
                class="w-100-p"
                [headers]="headers" [no-card]="false"
                [has-action]="true" store="allowances"
                [topActions]="topActions" [hasSearch]="true"
                [actions]="actions" [rows]="rows">
                </dynamic-table>
            </div>
        </div>
    `,
})

export class AllowancesListComponent {
    headers: Array<any> = [
        { title: 'Ttile' },
        { title: 'Rates' },
        { title: 'Description' },
        { title: 'Action' },
    ];

    topActions: Array<any> = [
        {
            btnText: 'CREATE',
            status: 'primary',
            action: 'inline',
            conf: {
                context: 'Allowance',
                store: 'allowances',
                btnText: 'SAVE',
            }
        }
    ];

    rows: Array<any> = [
        { key: 'name', type: 'string' },
        { key: 'amount', type: 'currency' },
        { key: 'description', type: 'string' },
    ];

    actions: Array<any> = [
        {
            btnText: 'EDIT',
            status: 'accent',
            icon: false,
            disableStatus: 'FINISHED',
            action: 'inline',
            modalConf: {
                store: 'allowances',
                titleKey: 'title',
                context: 'Allowances',
                btnText: 'SAVE',
            },
        }
    ];
}