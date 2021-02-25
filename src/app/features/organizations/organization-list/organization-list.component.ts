import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'organization-list',
    styles: [
        `:host{
            width: 100%;
        }`
    ],
    template: `
        <div>
            <page-header title="Organizations"
            [actions]="pageHeaderActions"
            (navigate)="pageHeaderAction($event)"></page-header>
        </div>
        <div class="w-100-p d-flex px-5">
            <div class="w-100-p px-5">
                <dynamic-table title="Listing"
                class="w-100-p"
                [headers]="headers" [no-card]="false"
                [has-action]="true" store="organizations"
                [hasSearch]="true"
                [actions]="actions" [rows]="rows">
                </dynamic-table>
            </div>
        </div>
    `
})

export class OrganizationsList {
    headers: Array<any> = [
        { title: 'Name' },
        { title: 'Type' },
        { title: 'Phone #' },
        { title: 'Email' },
        { title: 'Actions' }
    ];
    
    rows: Array<any> = [
        { key: 'name', type: 'string' },
        { key: 'org_type_code', type: 'string' },
        { key: 'phone_number', type: 'string' },
        { key: 'email', type: 'string' },
    ];

    actions:Array<any> = [
        {
            btnText: 'MANAGE',
            status: 'accent',
            icon: false,
            disableStatus: 'FINISHED',
            action: 'tabDetails',
            modalConf: {
                link: '/organizations/details',
                queryParams: { current: 1, step: 1 },
            }
        },
    ];

    pageHeaderActions: Array<any> = [
        {
            btnText: 'ADD ORGANIZATION',
            status: 'accent',
            icon: true,
            bpType: [ 'SASDEF'],
            roles: ['SASDEF Admin'],
            modalConf: {
                link: '/organizations/add',
                queryParams: { current: 1, step: 1 },
            }
        },
    ];

    constructor(private _router: Router) {}

    pageHeaderAction(event) {
        this._router.navigate(['/organizations/add'], {
            queryParams: { current: 1 }
        }); 
    }
}