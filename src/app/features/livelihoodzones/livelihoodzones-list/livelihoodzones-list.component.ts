import { Component } from '@angular/core';

@Component({
    selector: 'livelihoodzones-list',
    styles: [`
        :host ::ng-deep {
            width: 100%;
        }
    `],
    template: `
        <div>
            <page-header title="Livelihoodzones"></page-header>
        </div>
        <div class="w-100-p d-flex px-5">
            <dynamic-table title="Listing"
            class="w-100-p"
            [headers]="headers" [no-card]="false"
            [has-action]="true" store="livelihoodzones"
            [hasSearch]="true"
            [actions]="actions" [rows]="rows">
            </dynamic-table>
        </div>
    `,
})

export class LivelihoodzonesList {
    headers: Array<any> = [
        { title: 'Code' },
        { title: 'Names' },
        { title: 'Actions' }
    ];

    rows: Array<any> = [
        { key: 'livelihoodZoneCode', type: 'string' },
        { key: 'livelihoodZoneName', type: 'string' },
    ];

    actions:Array<any> = [
        {
            btnText: 'EDIT',
            status: 'accent',
            icon: false,
            disableStatus: 'FINISHED',
            action: 'inline',
            modalConf: {
                store: 'livelihoodzones',
                titleKey: 'livelihoodZoneName',
                context: 'Livelihoodzone',
                btnText: 'SAVE',
            }
        },
    ];
}