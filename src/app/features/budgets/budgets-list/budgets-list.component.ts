import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { get } from 'lodash';

@Component({
    selector: 'budgets-list',
    styles: [
        `:host{
            width: 100%;
        }`
    ],
    template: `
        <div>
            <page-header title="Calendar of Events"
            [actions]="pageHeaderActions"
            (navigate)="pageHeadeAction($event)">
            </page-header>
        </div>
        <div class="w-100-p d-flex px-5">
            <div class="w-100-p d-flex px-5">
                <dynamic-table title="Listing"
                class="w-100-p" [addOrg]="true"
                [headers]="headers" [no-card]="false"
                [has-action]="true" store="organization-budgets"
                [hasSearch]="true" [actions]="actions" [rows]="rows">
                </dynamic-table>
            </div>
        </div>
    `
})

export class BudgetsList {

    constructor(private _router: Router) {}

    headers: Array<any> = [
        { title: 'Organization' },
        { title: 'Applied Total' },
        { title: 'Approved Total' },
        { title: 'Financial Year' },
        { title: 'Status' },
        { title: 'Actions' }
    ];

    rows: Array<any> = [
        { 
            key: 'organization', 
            type: 'nested',
            fieldType: 'nested_string',
            primaryField: 'organization_data.name',
        },
        { key: 'total', type: 'currency' },
        { key: 'actual_total', type: 'currency' },
        { 
            key: 'financial_year', 
            type: 'nested',
            fieldType: 'nested_range',
            primaryField: 'financial_year_data.starts_on',
            secondaryField: 'financial_year_data.ends_on', 
        },
        { key: 'status', type: 'status' },
    ];

    actions:Array<any> = [
        {
            btnText: 'MANAGE',
            status: 'accent',
            icon: false,
            disableStatus: 'FINISHED',
            action: 'tabDetails',
            modalConf: {
                qParam: 'organization',
                link: '/budgets/details',
                queryParams: { current: 1, step: 1 },
            }
        },
    ];

    pageHeaderActions: Array<any> = [
        {
            btnText: 'ADD NEW',
            status: 'accent',
            icon: true,
            bpType: ['GOVERNMENT_AGENCY', 
                'PROFESSIONAL_SPORTPERSON',
                'SPORTS_ORGANIZATION',
                'MINISTRY'
            ],
            roles: ['Admin', 
                'Budget Reviewer', 
                'Ministry Approver'
            ],
            modalConf: {
                link: '/budgets/add',
                queryParams: { current: 1, step: 1 },
            }
        },
    ];

    pageHeadeAction(event) {
        const organization = get(
            JSON.parse(localStorage.getItem('organization')), 
            'organization', null);
        this._router.navigate(['/budgets/add'], { 
            // queryParams: { current: 1, step: 1 }
            queryParams: { current: 1, organization }
        }); 
    }
}