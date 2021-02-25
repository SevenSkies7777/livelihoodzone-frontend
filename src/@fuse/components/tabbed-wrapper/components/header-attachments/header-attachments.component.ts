import { Component, Input, OnInit } from '@angular/core';

import { find, get, isUndefined } from 'lodash';

import { DataLayerService } from 'app/services/http/dataLayer.service';
import { Authorization } from 'app/services/authorization.service';

@Component({
    selector: 'header-attachments',
    templateUrl: 'header-attachments.component.html',
    styleUrls: ['header-attachments.component.scss'],
})

export class HeaderAttachmentsComponent {
    @Input() context: string;
    @Input() item: any;

    organization: any = {};
    list: Array<any> = [];
    storesMap: Array<any> = [
        {
            context: 'Budget',
            store: 'organization-budget-attachments',
            paramKey: 'org_budget',
        }
    ];

    constructor(private _dataLayer: DataLayerService,
        private _authConfig: Authorization) {}

    fileChange(files) {
        const file = files.target.files[0];
        const fileFormData = {
            file,
            attachment_type: 'ORGANIZATION_BUDGET',
            budget: this.item.id,
        };
        // attachment object
        let attachmentObj = {
            attachment: '',
            organization: this.item['organization'],
            org_budget: this.item['id'],
        }
        const formData = new FormData();
        formData.append('file', fileFormData.file);
        formData.append('attachment_type', fileFormData.attachment_type);

        this._dataLayer.uploadFile('attachments', formData)
        .subscribe(resp => {
            // console.log(resp);
            attachmentObj = { ...attachmentObj, attachment: resp['id'] };
            this._dataLayer.create('organization-budget-attachments', attachmentObj)
            .subscribe(resp => {
                // console.log(resp);
                const config = find(this.storesMap, { context: this.context });
                this.getAuditTrail(config);
            }, err => console.log(err))
        }, err => console.log(err));
    }

    getAuditTrail(config) {
        if (!isUndefined(config)) {
            const params = { 
                current_org_id: this.organization,
                [config.paramKey]: this.item.id,
            };
            this._dataLayer.list(config.store, { ...params })
            .subscribe(resp => {
                const attachArray = resp['results'];
                attachArray.map(obj => {
                    this._dataLayer.get('attachments', obj['attachment'],
                    { current_org_id: this.organization })
                    .subscribe(fileResp => {
                        obj['file'] = fileResp;
                        this.list.push(obj);
                    }, err => {
                        console.log(err);
                    })
    
                });
                console.log(this.list);
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