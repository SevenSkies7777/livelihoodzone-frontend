import { Component } from '@angular/core';

@Component({
    selector: 'sports-catgeories-list',
    styles: [
        `:host{
            width: 100%;
        }`
    ],
    template: `
        <div><page-header title="Sports Categories"></page-header></div>
        <div class="w-100-p d-flex px-5">
            <div class="w-100-p d-flex px-5">
                <dynamic-table title="Listing"
                class="w-100-p"
                [headers]="headers" [no-card]="false"
                [has-action]="true" store="sports-categories"
                [topActions]="topActions" [hasSearch]="true"
                [actions]="actions" [rows]="rows">
                </dynamic-table>
            </div>
        </div>
    `
})

export class SportsCategoriesList {
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
                context: 'Sports Category',
                store: 'sports-categories',
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
                store: 'sports-categories',
                titleKey: 'title',
                context: 'Sports Categories',
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
        //         store: 'sports-categories',
        //         titleKey: 'title',
        //         context: 'Sports Categories',
        //         btnText: 'SAVE',
        //     }
        // }
    ];
}