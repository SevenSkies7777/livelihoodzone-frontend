import { Component } from '@angular/core';

@Component({
    selector: 'document-types-list',
    styles: [
        `:host{
            width: 100%;
        }`
    ],
    template: `
        <div><page-header title="Document Types"></page-header></div>
        <div class="w-100-p d-flex px-5">
            <div class="w-100-p d-flex px-5">
                <dynamic-table title="Listing"
                class="w-100-p"
                [headers]="headers" [no-card]="false"
                [has-action]="true" store="document-types"
                [topActions]="topActions" [hasSearch]="true"
                [actions]="actions" [rows]="rows">
                </dynamic-table>
            </div>
        </div>
    `
})

export class DocumentTypesList {
    headers: Array<any> = [
        { title: 'Code' },
        { title: 'Title' },
        { title: 'Organization Type' },
        { title: 'Description' },
        { title: 'Actions' }
    ];

    topActions: Array<any> = [
        {
            btnText: 'CREATE',
            status: 'primary',
            action: 'inline',
            conf: {
                context: 'Document Type',
                store: 'document-types',
                btnText: 'SAVE',
            }
        }
    ];

    rows: Array<any> = [
        { key: 'code', type: 'string' },
        { key: 'name', type: 'string' },
        { key: 'org_type_name', type: 'string' },
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
                store: 'document-types',
                titleKey: 'title',
                context: 'Document Type',
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
        //         store: 'document-types',
        //         titleKey: 'name',
        //         context: 'Document Purpose',
        //         btnText: 'SAVE',
        //     }
        // }
    ];
}