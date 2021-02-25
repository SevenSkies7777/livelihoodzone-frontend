import { Component, Input, OnInit }  from '@angular/core';

import { DataLayerService } from 'app/services/http/dataLayer.service';
import { Authorization } from 'app/services/authorization.service';
import { get, has } from 'lodash';

@Component({
    selector: 'tabbed-inline-list',
    templateUrl: 'tabbed-inline-list.component.html',
})

export class TabbedInlinedList implements OnInit {
    @Input() tab: any;
    @Input() item: any;
    @Input() parentKey: string;

    organization: any;
    loading: boolean = true;
    showForm: boolean;
    list: Array<any> = [];
    submitted: false;

    constructor(private _dataLayer: DataLayerService,
        private _authConfig: Authorization) {

    }

    toggleForm(item) {
        item.showInline = !item.showInline;
    }

    toggleCreateForm() {
        this.showForm = !this.showForm;
    }

    getBankAccount() {
        const params = { 
            current_org_id: this.organization, 
            organization: this.parentKey ? 
               this.item[this.parentKey] : this.item['id'],
        };
        this._dataLayer.list('organization-bank-accounts', params)
        .subscribe(resp => {
            this.list = resp['results'];
            this.loading = false;
        }, err => { this.loading = false; console.log(err); });
    }

    receiveModel(model) {
        if (has(model, 'id')) {
            this._dataLayer.update(
                'organization-bank-accounts', 
                model['id'], model,
                { key: 'current_org_id', value: this.organization }
            ).subscribe(() => {
                this.getBankAccount();
            }, err => console.log(err));
        } else {
            model = { ...model, organization: this.item['id'] };
            this._dataLayer.create('organization-bank-accounts', model)
            .subscribe(() => {
                this.getBankAccount();
            }, err => console.log(err));
        }
    }

    ngOnInit() {
        this.organization = get(
            JSON.parse(this._authConfig.getOrganization()), 
            'organization', null
        );
        this.getBankAccount();
    }
}