import { Component }  from '@angular/core';

@Component({
    selector: 'complaints-listing',
    styles: [
        `:host{
            width: 100%;
        }`,
    ],
    template: `
        <div class="w-100-p d-flex">
            <div class="w-100-p d-flex">
                <dynamic-table title="Complaints Listing"
                class="w-100-p" 
                [headers]="headers" [no-card]="true" [addOrg]="true"
                [has-action]="true" store="complaints"
                [topActions]="topActions" [hasSearch]="true"
                [actions]="actions" [rows]="rows">
                </dynamic-table>
            </div>
        </div>
    `,
})

export class ComplaintsListing {
    headers: Array<any> = [
        { title: 'Names' },
        { title: 'Email' },
        { title: 'Phone #'},
        { title: 'Status' },
        { title: 'Actions' }
    ];

    topActions: Array<any> = [];

    rows: Array<any> = [
        { key: 'full_name', type: 'string' },
        { key: 'email', type: 'string' },
        { key: 'phone_number', type: 'string' },
        { key: 'status', type: 'status' }
    ];

    actions:Array<any> = [
        {
            btnText: 'VIEW',
            status: 'success',
            icon: false,
            action: 'inlineReadOnly',
            modalConf: {
                store: 'complaints',
                action: 'in_review',
                btnText: 'REVIEW',
            }
        }
    ];
}