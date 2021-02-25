import { Component, Input, OnInit } from '@angular/core';

import { DataLayerService } from 'app/services/http/dataLayer.service';
import { Authorization } from 'app/services/authorization.service';
import { get, has } from 'lodash';

@Component({
    selector: 'application-me',
    templateUrl: 'application-me.component.html',
})

export class ApplicationMEComponent implements OnInit {
    @Input() item;

    orgId:string;
    orgType: string;
    list: Array<any> = [];
    submitted: boolean;
    showForm: boolean;
    loading: boolean;
    gridConf: Array<any> = [
        { title: 'Attendees', key: 'head_count' },
        { title: 'Total', key: 'total' },
        { title: 'Description', key: 'description' },
    ]

    postObj = {
        organiazation: '',
        application: '',
        // amount: '', Use as unit price
        amount: '',
        quantity: '',
        description: '',
    }

    constructor(private _dataLayer: DataLayerService,
        private _authConfig: Authorization) {}

    toggleForm(item) {
        item.showInline = !item.showInline;
    }

    toggleCreateForm() {
        this.showForm = !this.showForm;
    }

    getList() {
        this.loading = true;
        const params = { 
            current_org_id: this.orgId, 
            application: this.item.id 
        };
        this._dataLayer.list('application-mes', params)
            .subscribe(resp => {
                this.loading = false;
                this.list = resp['results'];
            }, err => { this.loading = false; console.log(err); });
    }

    receiveModel(model) {
        if (has(model, 'id')) {
            this._dataLayer.update(
                'application-mes', 
                model['id'], model,
                { key: 'current_org_id', value: this.orgId }
            ).subscribe(() => {
                this.getList();
            }, err => console.log(err));
        } else {
            model = { ...model, organization: this.orgId, application: this.item['id'] };
            const params = { key: 'current_org_id', value: this.orgId };
            this._dataLayer.create('application-mes', model, undefined, params)
            .subscribe(() => {
                this.getList();
                this.toggleCreateForm();
                const msg = 'M&E Item succesfully added';
                this._dataLayer.openDynamicSnackBar(msg, 'success');
            }, err => { 
                const errMsg = 'An error occurred while adding M&E item. Try again';
                this._dataLayer.openDynamicSnackBar(errMsg, 'error');
            });
        }
    }

    ngOnInit() {
        const orgDetails = JSON.parse(
            this._authConfig.getOrganization());
        this.orgId = get(orgDetails, 'organization', null);
        this.orgType = get(orgDetails, 'org_type', null);
        this.getList();
    }
}