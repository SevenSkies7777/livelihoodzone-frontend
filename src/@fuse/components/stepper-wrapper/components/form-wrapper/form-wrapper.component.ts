import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { registerLocaleData }  from '@angular/common';
import * as _ from 'lodash';
import { DataLayerService } from 'app/services/http/dataLayer.service';
import { Authorization } from 'app/services/authorization.service';
import { isUndefined } from 'lodash';

@Component({
    selector: 'form-wrapper',
    templateUrl: 'form-wrapper.component.html',
    styleUrls: ['form-wrapper.component.scss'],
    providers: [DataLayerService],
})

export class FormWrapperComponent implements OnInit {
    @Input() steps: Array<any>;
    @Input() current: any;
    @Input() tabbed: boolean = false;


    @Output() onNavigate = new EventEmitter();

    multistepConfig: any;
    submitted: boolean;
    error: any;
    errors: any;
    item: any = {};
    organization: any = {};
    readItem: any;
    showModal: boolean;
    modelId: any;

    itemId: number;
    formStore: string;
    configs: any;
    inlineConfs: any;

    constructor(
        private _router: Router,
        private _route: ActivatedRoute,
        private _authConfig: Authorization,
        private _dataLayer: DataLayerService,
    ) {}

    showToast(configs?) {

    }

    stepperNext(direction) {
        this.onNavigate.emit(direction);
    }

    stepBack() {
        this.onNavigate.emit('prev');
    }

    toggleModal() {
        this.showModal = !this.showModal;
    }

    postCrud(resp) {
        const paramObj = { id: resp['id'] };
        const evtObj = { direction: 'next', params: paramObj };
        this.onNavigate.emit(evtObj);
        this.showToast();
    }

    receiveModel(model) {
        const store = _.isUndefined(this.modelId)
            ? this.configs.addStore : this.configs.editStore;
        const paramsObj = !isUndefined(this.organization)
            ? { key: 'current_org_id', value: this.organization }
            : {} ;
        if (_.isUndefined(this.modelId)) {
            model = { ...model, organization: this.organization };
            this._dataLayer.create(store, model, undefined, paramsObj)
            .subscribe(resp => {
                this.postCrud(resp);
            }, err => console.log(err));
        } else {
            this._dataLayer.update(store, this.modelId, model, paramsObj)
            .subscribe(resp => {
                this.postCrud(resp);
            }, err => console.log(err));
        }
    }

    noChanges($event) {
        this.stepperNext('next');
    }

    getItem(params) {
        this.item = {};
        if (_.has(params, 'id')) {
            this.modelId = params.id;
            const opts = { current_org_id: this.organization };
            const store = !_.isUndefined(this.configs)
                ? this.configs.getStore : this.inlineConfs.getStore;
            this._dataLayer.get(store, this.modelId, opts)
            .subscribe(resp => {
                this.readItem = resp;
                this.item = resp;
            }, err => console.log(err));
        }
    }

    getConfs() {
        this._route.queryParams.subscribe(params => {
            if (this.tabbed) {

            } else {
                this.multistepConfig = { back: {} };
                const current = parseInt(params['current'], 10);
                const ind = _.findIndex(this.steps, { count: current });
                if (_.has(this.steps[ind], 'formConf')) {
                    this.configs = this.steps[ind].formConf;
                    this.formStore = this.configs.store;
                }
                if (_.has(this.steps[ind], 'inlineConf')) {
                    this.inlineConfs = this.steps[ind].inlineConf;
                }
                this.getItem(params);
            }
        });
    }

    ngOnInit() {
        const orgObj = JSON.parse(
            this._authConfig.getOrganization());
        
        this.organization = !_.isUndefined(orgObj) && !_.isNull(orgObj) 
            ? orgObj['organization'] : null;
        this.getConfs();
    }
}