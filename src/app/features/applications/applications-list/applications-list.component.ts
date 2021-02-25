import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { get, isObject, isUndefined } from 'lodash';

import { 
    ActivitySelectionDialog 
} from '../activity-selection-dialog/activity-selection-dialog.component';

@Component({
    selector: 'applications-list',
    styles: [
        `:host{
            width: 100%;
        }`
    ],
    template: `
        <div><page-header title="Applications"
        [actions]="pageHeaderActions"
        (navigate)="pageHeadeAction($event)"></page-header></div>
        <div class="w-100-p d-flex px-5">
            <div class="w-100-p d-flex px-5">
                <dynamic-table title="Listing"
                class="w-100-p" [addOrg]="true"
                [headers]="headers" [no-card]="false"
                [has-action]="true" store="applications"
                [hasSearch]="true"
                [actions]="actions" [rows]="rows">
                </dynamic-table>
            </div>
        </div>
    `
})

export class ApplicationsList {
    headers: Array<any> = [
        { title: 'Organization' },
        { title: 'Applied Amount' },
        { title: 'Required By' },
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
        { key: 'amount_requested', type: 'currency' },
        { key: 'date_requested', type: 'date' },
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
                link: '/applications/details',
                queryParams: { current: 2, step: 1 },
            }
        },
    ];

    pageHeaderActions: Array<any> = [
        {
            btnText: 'APPLY FUNDS',
            status: 'accent',
            icon: true,
            bpType: [
                'GOVERNMENT_AGENCY', 
                'PROFESSIONAL_SPORTPERSON',
                'SPORTS_ORGANIZATION',
                'MINISTRY'
            ],
            roles: ['Admin', 
                'Representative',
                'Budget Reviewer', 
                'Ministry Approver'
            ],
            modalConf: {
                link: '/applications/add',
                queryParams: { current: 1, step: 1 },
            }
        },
    ];

    constructor(private _router: Router,
        private _dialog: MatDialog) {}

    openDialog() {
        const dialogRef = this._dialog.open(ActivitySelectionDialog, {
            data: {
                context: 'Application',
            },
            width: '75%',
        });
        dialogRef.afterClosed().subscribe(result => {
            if (isObject(result)) {
                const paramsObj = {
                    activity: result['id'],
                    budget: result['org_budget'],
                    organization: result['organization'],
                    amount: result['actual_total'],
                    activity_date: result['activity_date'],
                }
                this._router.navigate(['/applications/add'], {
                    queryParams: { current: 1, ...paramsObj },
                });
            }
        })
    }

    pageHeadeAction(event) {
        const orgId = get(JSON.parse(
            localStorage.getItem('organization')), 
            'organization', null
        );
        this.openDialog();
        // this._router.navigate(['/applications/add'], {
        //     queryParams: { current: 1, organization: orgId }
        // });
    }
}