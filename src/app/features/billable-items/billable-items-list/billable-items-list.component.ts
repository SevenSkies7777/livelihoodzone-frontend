import { Component } from '@angular/core';

@Component({
    selector: 'billable-items-list',
    styles: [
        `:host{
            width: 100%;
        }`
    ],
    template: `
        <div><page-header title="Billable Items"></page-header></div>
        <div class="w-100-p d-flex px-5">
            <div class="w-100-p d-flex px-5">
                <dynamic-table title="Listing"
                class="w-100-p"
                [headers]="headers" [no-card]="false"
                [has-action]="true" store="billable-items"
                [topActions]="topActions" [hasSearch]="true"
                [actions]="actions" [rows]="rows">
                </dynamic-table>
            </div>
        </div>
    `
})

export class BillableItemsList {
    headers: Array<any> = [
        { title: 'Title' },
        { title: 'Description' },
        { title: 'Actions' }
    ];

    topActions: Array<any> = [
        {
            btnText: 'CREATE',
            status: 'primary',
            action: 'inline',
            conf: {
                context: 'Billable Item',
                store: 'billable-items',
                btnText: 'SAVE',
            }
        }
    ];

    rows: Array<any> = [
        { key: 'name', type: 'string' },
        { key: 'description', type: 'string' },
    ];

    actions:Array<any> = [
        {
            btnText: 'EDIT',
            status: 'accent',
            icon: false,
            disableStatus: 'FINISHED',
            action: 'inline',
            modalConf: {
                store: 'billable-items',
                titleKey: 'title',
                context: 'Billable Items',
                btnText: 'SAVE',
            }
        },
        // TODO: Bring  back when working right
        // {
        //     btnText: 'DELETE',
        //     status: 'warn',
        //     icon: false,
        //     disableStatus: 'FINISHED',
        //     customClass: 'btn-danger',
        //     action: 'inline',
        //     modalConf: {
        //         store: 'document-types',
        //         titleKey: 'title',
        //         context: 'Document Purpose',
        //         btnText: 'SAVE',
        //     }
        // }
    ];
}