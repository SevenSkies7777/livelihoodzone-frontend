import { Component } from '@angular/core';

@Component({
    selector: 'counties-list',
    styles: [`
        :host ::ng-deep {
            width: 100%;
        }
    `],
    template: `
        <div>
            <page-header title="Counties"></page-header>
        </div>
        <div class="w-100-p d-flex px-5">
            <dynamic-table title="Listing"
            class="w-100-p"
            [headers]="headers" [no-card]="false"
            [has-action]="true" store="counties"
            [hasSearch]="true"
            [actions]="actions" [rows]="rows">
            </dynamic-table>
        </div>
    `,
})

export class CountiesList {
    headers: Array<any> = [
        { title: 'Code' },
        { title: 'Names' },
        { title: 'Livelihoodzones'},
        { title: 'Actions' }
    ];

    rows: Array<any> = [
        { key: 'countyCode', type: 'string' },
        { key: 'countyName', type: 'string' },
        { key: 'livelihodzones', type: 'counter' },
    ];

    actions:Array<any> = [
        {
            btnText: 'MANAGE',
            status: 'accent',
            icon: false,
            disableStatus: 'FINISHED',
            action: 'inlineReadOnly',
            modalConf: {
                store: 'livelihoodzones',
                titleKey: 'livelihoodZoneName',
                context: 'Livelihoodzone',
                btnText: 'SAVE',
            }
        },
    ];
}