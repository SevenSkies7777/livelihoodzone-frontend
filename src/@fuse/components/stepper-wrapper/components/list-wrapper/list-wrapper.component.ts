import { Component, EventEmitter, Input, OnInit, Output }  from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router';
import { Authorization } from 'app/services/authorization.service';

import { DataLayerService } from 'app/services/http/dataLayer.service';
import { findIndex, get, has } from 'lodash';

@Component({
    selector: 'list-wrapper',
    templateUrl: 'list-wrapper.component.html',
    styleUrls: ['list-wrapper.component.scss'],
})

export class ListWrapperComponent implements OnInit {
    @Input() steps: Array<any>;
    @Input() current: any;

    @Output() onNavigate = new EventEmitter();

    multistepConfig: any;
    submitted: any;
    error: any;
    errors: any;
    item: any;
    showModal: boolean;
    loading: boolean;
    modalConf: any;
    configs: any;
    isLast: any;

    constructor(
        private _route: ActivatedRoute,
        private _authConfig: Authorization,
        private _dataLayer: DataLayerService,
    ) {}

    headers: Array<any> =[];
    rows: Array<any> = [];
    actions: Array<any> = [];

    toggleModal() {
        this.showModal = !this.showModal;
    }

    changeStep(context) {
        this.onNavigate.emit(context);
    }

    setCmptParams() {
        if(has(this.configs, 'modelKey')) {
            const listParams = get(this.configs, 'listParams', {});
            this.configs['cmptParams'] = {
                ...listParams,
                [this.configs['modelKey']]: this.item['id']
            }
        }
    }

    getItem(params) {
        const orgId = get(JSON.parse(
            this._authConfig.getOrganization()), 'organization');
        const opts = { current_org_id: orgId };
        this._dataLayer.get(this.configs.store, params.id, opts)
        .subscribe(resp => {
            this.item = resp;
            this.setCmptParams();
            this.loading = false;
        }, err => {
            console.log(err);
            this.loading = false;
        });
    }

    getItemId() {
        this._route.queryParams.subscribe(params => {
            const current = parseInt(params.current, 10);
            const ind = findIndex(this.steps, { count: current });
            this.isLast = this.steps.length === ind + 1;
            this.configs = this.steps[ind].gridConf;
            this.loading = true;
            this.getItem(params);
        })
    }

    ngOnInit() {
        this.multistepConfig = {
            back: { name: 'CANCEL' }
        };
        this.getItemId();
    }
}