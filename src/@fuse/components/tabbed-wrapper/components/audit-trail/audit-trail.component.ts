import { Component, Input, OnInit } from '@angular/core';

import { find, get, isUndefined } from 'lodash';

import { DataLayerService } from 'app/services/http/dataLayer.service';
import { Authorization } from 'app/services/authorization.service';

@Component({
    selector: 'audit-trail',
    templateUrl: 'audit-trail.component.html',
    styleUrls: ['audit-trail.component.scss'],
    providers: [DataLayerService],
})

export class AuditTrailComponent implements OnInit {
    @Input() context: string;
    @Input() item: any;

    organization: any = {};
    list: Array<any> = [];
    storesMap: Array<any> = [
        {
            context: 'Budget',
            store: 'organization-budget-reviews',
            paramKey: 'org_budget',
        },
        {
            context: 'Application',
            store: 'application-reviews',
            paramKey: 'application',
        },
    ];
    hasAction: boolean = false;

    constructor(private _dataLayer: DataLayerService,
        private _authConfig: Authorization) {}

    getAuditTrail(config) {
        let params;
        if (!isUndefined(config)) {
            params = {
                current_org_id: this.organization,
                [config.paramKey]: this.item.id,
            };
            this._dataLayer.list(config.store, { ...params })
            .subscribe(resp => {
                this.list = resp['results'];
                if (config.store === 'application-reviews') {
                    this.hasAction = true;
                    this.list.forEach(review => {
                        const params = {
                            current_org_id: this.organization,
                            application_review: review['id'],
                        };
                        this._dataLayer.list('application-review-attachments', params)
                            .subscribe((resp: any) => {
                                const attachList = resp['results'] || [];
                                if (attachList.length) {
                                    review['file'] = attachList[0]['attachment_data'];
                                }
                            }, err => console.log(err));
                    });
                }
            }, err => console.log(err));
        }
    }

    ngOnInit() {
        this.organization = get(
            JSON.parse(this._authConfig.getOrganization()), 
            'organization', null
        );
        const config = find(this.storesMap, { context: this.context });
        this.getAuditTrail(config);
    }
}