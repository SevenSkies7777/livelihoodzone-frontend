import { Component } from '@angular/core';

@Component({
    selector: 'users-list',
    styles: [
        `:host{
            width: 100%;
        }`
    ],
    template: `
        <div><page-header title="Users"></page-header></div>
        <div class="w-100-p d-flex px-5">
            <div class="w-100-p d-flex px-5">
                <dynamic-table title="Listing"
                class="w-100-p"
                [headers]="headers" [no-card]="false"
                [has-action]="true" store="users"
                [topActions]="topActions" [hasSearch]="true"
                [actions]="actions" [rows]="rows">
                </dynamic-table>
            </div>
        </div>
    `
})

export class UsersList {
    headers: Array<any> = [
        { title: 'Names' },
        { title: 'Email' },
        { title: 'County' },
        { title: 'Organization' },
        { title: 'Actions' }
    ];

    topActions: Array<any> = [
        {
            btnText: 'ADD',
            status: 'primary',
            action: 'inline',
            conf: {
                context: 'User',
                store: 'users',
                btnText: 'SAVE',
            }
        }
    ];

    rows: Array<any> = [
        // { key: 'firstName', type: 'string' },
        { 
            key: 'firstName', 
            type: 'nested',
            fieldType: 'nested_multistrings',
            primaryField: 'firstName',
            secondaryField: 'surname',
        },
        { key: 'email', type: 'string' },
        { key: 'countyName', type: 'string' },
        { key: 'organizationName', type: 'string' },
    ];

    actions:Array<any> = [
        {
            btnText: 'EDIT',
            status: 'accent',
            icon: false,
            disableStatus: 'FINISHED',
            action: 'inline',
            modalConf: {
                store: 'users',
                titleKey: 'firstName',
                context: 'User',
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