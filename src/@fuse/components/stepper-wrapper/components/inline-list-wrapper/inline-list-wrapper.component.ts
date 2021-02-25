import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Authorization }  from 'app/services/authorization.service';
import { DataLayerService }  from 'app/services/http/dataLayer.service';
import { findIndex, get, has } from 'lodash';

@Component({
    selector: 'inline-list-wrapper',
    templateUrl: 'inline-list-wrapper.component.html',
    styleUrls: ['../list-wrapper/list-wrapper.component.scss'],
})

export class InlineListWrapper implements OnInit {
    @Input() steps: Array<any>;
    @Input() current: any;

    @Output() onNavigate = new EventEmitter();

    multistepConfig: any;
    list: Array<any>;
    submitted: any;
    item: any;
    loading: boolean = true;
    showForm: boolean;
    isLast: boolean;
    configs: any;
    orgId: any;

    gridConf: Array<any> = [
        {
            name: 'Account Name',
            key: 'account_name',
        },
        {
            name: 'Account #',
            key: 'account_number',
        },
        {
            name: 'Bank Name',
            key: 'bank_name',
        },
        {
            name: 'Branch Name',
            key: 'branch_name',
        }
    ];

    constructor(private _route: ActivatedRoute,
        private _authConfig: Authorization,
        private _dataLayer: DataLayerService) {}
    
    toggleForm() {
        this.showForm = !this.showForm;
    }

    changeStep(context) {
        this.onNavigate.emit(context);
    }

    addListItem(model) {
        model = { ...model, organization: this.orgId };
        this._dataLayer.create('organization-bank-accounts', model)
        .subscribe(() => {
            this.getRelatedList();
            this.loading = false;
        }, err => { this.loading = false; console.log(err)});
    }

    updateListItem(model) {
        const params = { current_org_id: this.orgId };
        this._dataLayer.update('organization-bank-account', 
        model.id, model, params).subscribe(() => {
            this.getRelatedList();
            this.loading = false;
        }, err => { this.loading = false; console.log(err)});
    }

    receiveModel(model) {
        if (has(model, 'id')) {
            this.updateListItem(model);
        } else {
            this.addListItem(model);
        }
    }

    getRelatedList(params?) {
        const opts = {
            organization: this.orgId, 
            current_org_id: this.orgId 
        };
        this._dataLayer.list('organization-bank-accounts', opts)
        .subscribe(resp => {
            this.list = resp['results'];
            this.loading = false;
            this.showForm =  this.list.length > 0;
        }, err => { this.loading = false; console.log(err)});
    }

    getItemId() {
        this._route.queryParams.subscribe(params => {
            const current = parseInt(params.current, 10);
            this.orgId = parseInt(params['id'], 10);
            const ind = findIndex(this.steps, { count: current });
            this.isLast = this.steps.length === ind + 1;
            this.configs = this.steps[ind].gridConf;
            this.getRelatedList();
        })
    }

    ngOnInit() {
        this.getItemId();
    }
}