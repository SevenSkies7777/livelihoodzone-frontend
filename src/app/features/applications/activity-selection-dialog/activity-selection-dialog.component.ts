import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Data } from '@angular/router';

import { DataLayerService } from 'app/services/http/dataLayer.service';
import { get } from 'lodash';

@Component({
    selector: 'activity-selection-dialog',
    templateUrl: 'activity-selection-dialog.component.html',
    styleUrls: ['activity-selection-dialog.component.scss'],
    providers: [DataLayerService],
})

export class ActivitySelectionDialog implements OnInit {
    searchValue: string;
    loading: boolean;
    list: Array<any> = [];
    organization: any;
    tableConfigs: Array<any> = [
        {
            label: 'Title',
            fields: [
                {
                    type: 'string',
                    key: 'title',
                }
            ],
        },
        {
            label: 'Activity Date',
            fields: [
                {
                    type: 'date',
                    key: 'activity_date',
                }
            ],
        },
        {
            label: 'Applied Amount',
            fields: [
                {
                    type: 'currency',
                    key: 'total'
                }
            ],
        },
        {
            label: 'Approved Amount',
            fields: [
                {
                    type: 'currency',
                    key: 'actual_total'
                }
            ],
        },
        {
            label: 'Status',
            fields: [
                {
                    type: 'status',
                    key: 'status'
                }
            ],
        }
    ];

    constructor(private _dataLayer: DataLayerService,
        public _dialogRef: MatDialogRef<ActivitySelectionDialog>) {

        }

    getNested(item, field) {
        return get(item, field, null);
    }

    getActivities() {
        const params = {
            current_org_id: this.organization,
            status: 'SASDEF_APPROVED',
            limit: 1000, 
        };
        this.loading = true;
        this._dataLayer.list('organization-budget-activities', params)
            .subscribe(resp => {
                this.list = resp['results'];
                this.loading = false;
            }, err => {
                this.loading = false;
                console.log(err)
            });
    }

    selectActivity(row) {
        const postParam = {
            current_org_id: this.organization,

        }
        this.closeDialog(row);
    }

    getACtivityStatus(activity) {
        if (activity.applications.length) {
            let cumulative = 0;
            activity.applications.forEach(app => {
                cumulative += parseFloat(app.amount_requested);
            });
            const estimate = parseFloat(activity.estimated_amount);
            if (cumulative < estimate) {
                // TODO: bring back a more meaningful comparison
                // return false;
                return false;
            } else {
                return false;
            }
        }
    }

    setAppliedAmount(act) {
        if (act.applications.length) {
            let accumulated = 0;
            act.applications.forEach(app => {
                accumulated += parseFloat(app.amount_requested);
            })
            return accumulated;
        } else {
            return 0;
        }
    }

    closeDialog(row) {
        this._dialogRef.close(row);
    }

    ngOnInit() {
        const org = JSON.parse(localStorage.getItem('organization'));
        this.organization = get(org, 'organization', null);
        this.getActivities();
    }
}