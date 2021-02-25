import { Component } from '@angular/core';

@Component({
    selector: 'document-types-list',
    styles: [
        `:host{
            width: 100%;
        }`
    ],
    template: `
        <div><page-header title="Financial Years"></page-header></div>
        <div class="w-100-p d-flex px-5">
            <div class="w-100-p d-flex px-5">
                <dynamic-table title="Listing"
                class="w-100-p"
                [headers]="headers" [no-card]="false"
                [has-action]="true" 
                store="organization-financial-years"
                [topActions]="topActions" [hasSearch]="true"
                [actions]="actions" [rows]="rows">
                </dynamic-table>
            </div>
        </div>
    `
})

export class FinancialYearsList {
    headers: Array<any> = [
        { title: 'Starts On' },
        { title: 'Ends On' },
        { title: 'Is Current' },
        { title: 'Days to Expiry' },
        { title: 'Actions' }
    ];

    topActions: Array<any> = [
        {
            btnText: 'CREATE',
            status: 'primary',
            action: 'inline',
            conf: {
                context: 'Financial Year',
                store: 'organization-financial-years',
                btnText: 'SAVE',
            }
        }
    ];

    rows: Array<any> = [
        { key: 'starts_on', type: 'date' },
        { key: 'ends_on', type: 'date' },
        { key: 'is_current', type: 'boolean' },
        { key: 'days_to_expiry', type: 'string' },
    ];

    actions:Array<any> = [
        {
            btnText: 'EDIT',
            status: 'accent',
            icon: false,
            disableStatus: 'FINISHED',
            action: 'inline',
            modalConf: {
                store: 'organization-financial-years',
                titleKey: 'title',
                context: 'Financial Years',
                btnText: 'SAVE',
            }
        },
        // {
        //     btnText: 'DELETE',
        //     status: 'warn',
        //     icon: false,
        //     disableStatus: 'FINISHED',
        //     customClass: 'btn-danger',
        //     action: 'inline',
        //     modalConf: {
        //         store: 'organization-financial-years',
        //         titleKey: 'title',
        //         context: 'Document Purpose',
        //         btnText: 'SAVE',
        //     }
        // }
    ];
}