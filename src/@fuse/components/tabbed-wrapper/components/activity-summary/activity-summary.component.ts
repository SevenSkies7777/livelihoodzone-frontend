import { Component, Input, OnInit } from '@angular/core';

import { DataLayerService } from 'app/services/http/dataLayer.service';
import { Authorization } from 'app/services/authorization.service';
import { get } from 'lodash';

@Component({
    selector: 'activity-summary',
    templateUrl: 'activity-summary.component.html',
    styleUrls: ['../main-wrapper/main-wrapper.component.scss'],
    providers: [DataLayerService]
})

export class ActivitySummaryComponent implements OnInit {
    @Input() activity;
    @Input() item;

    organization: any;
    orgId: string;
    activityDetails: any;
    activityBudget: any;
    panelOpenState: boolean;

    gridConf: Array<any> = [
        { title: 'Title', key: 'title' },
        { title: 'Activity Date', key: 'activity_date' },
        { title: 'Applied', key: 'total' },
        { title: 'Rationalized', key: 'rationalized_total' },
        { title: 'Approved Total', key: 'actual_total' },
    ]

    constructor(private _dataLayer: DataLayerService,
        private _authConfig: Authorization) {}

    getItemBudget() {
        const params = { current_org_id:  this.orgId };
        this._dataLayer.get('organization-budgets', this.item['budget'], params)
        .subscribe(resp => {
            this.activityBudget = resp;
            // const listParams = { org_budget: this.item['budget'], current_org_id: this.orgId };
            const listParams = { 
                current_org_id: this.orgId,
                org_budget: this.item['budget'],
            };
            this._dataLayer.list('organization-budget-activities', listParams)
            .subscribe(resp => {
                this.activityBudget['activities'] = resp['results'];
            }, err => console.log(err));
        }, err => console.log(err));
    }

    getItemActivity() {
        const params = { current_org_id: this.orgId };
        this._dataLayer.get('organization-budget-activities', 
            this.item['activity'], params)
            .subscribe(resp => {
                this.activityDetails = resp;
            }, err => console.log(err));
    }

    ngOnInit() {
        this.organization = JSON.parse(this._authConfig.getOrganization());
        this.orgId = get(this.organization, 'organization');
        this.getItemActivity();
        this.getItemBudget();
    }
}