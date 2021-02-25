import {
    Component, OnDestroy, ChangeDetectorRef,
    SimpleChange, OnInit, Output, EventEmitter, ViewChild, 
    SimpleChanges, OnChanges, Input
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, Form, Validators } from '@angular/forms';
import { 
    FormlyFieldConfig, 
    FormlyFormOptions, 
    FormlyForm 
} from '@ngx-formly/core';
import { FormlyService } from '../../services/form-store.service';
import { Subject } from 'rxjs';

import * as _ from 'lodash';
import * as moment from 'moment';
import { has } from 'lodash';

import { DataLayerService } from 'app/services/http/dataLayer.service';

@Component({
    selector: 'dynamic-form',
    templateUrl: './form-wrapper.component.html',
    styleUrls: ['./form-wrapper.component.scss'],
    providers: [FormlyService, DataLayerService],
})

export class FormWrapperComponent implements OnDestroy, OnInit, OnChanges {
    @Input() btnTxt: string;
    @Input() btnClass: string;
    @Input() cancelTxt: string;
    @Input() cancelBtn: boolean;
    @Input() baseCancel: boolean;
    @Input() btnStatus: string;
    @Input() noAction: boolean;
    @Input() store: string = 'Save';
    @Input() submitted: boolean = false;
    @Input() multiStep: any = false;
    @Input() config: any = undefined;
    @Input() model: any = {};

    @Input() saveOnChanges: void = _.noop();
    @Input() btnContClass: string = 'Save';

    @Input() resetModel: boolean = false;
    @Input() fullWidth: boolean = false;
    @Input() formSettings: Array<any>;
    @Input() stepConfig: any;
    @Input() feedback: any;

    @Input() noItem: boolean;
    @Input() editMode: boolean;
    @Input() clearForm: boolean;

    @Output() submitModel = new EventEmitter();
    @Output() onSkip = new EventEmitter();
    @Output() onBack = new EventEmitter();
    @Output() cancelFxn = new EventEmitter();
    @Output() onPrestine = new EventEmitter(); 

    onDestroy$ = new Subject<void>();
    formModel: any = {};

    self = this;
    item: any;

    form = new FormGroup({});
    options: FormlyFormOptions = {};
    fields: FormlyFieldConfig[] = [];

    constructor(
        private _dataLayer: DataLayerService,
        private _route: ActivatedRoute,
        private _formServ: FormlyService) {

    }

    setFieldsConfigs() {
        if (!_.isUndefined(this.config) && !_.isEmpty(this.config)) {
            // TODO: Insert fields
            this._formServ[this.config](this.self);
        }
    }

    prefillModel(field) {
        const valId = field.formControl.value;
        this._dataLayer.get('allowances', valId)
            .subscribe(resp => {
                this.fields[2].formControl.setValue(Number(resp['amount']));
            }, err => console.log(err));
    }

    watchFieldChanges() {
        this.fields = this.fields.map(f => {
            if (f.templateOptions && 
                has(f.templateOptions, 'changeExpr')) {
                    f.templateOptions.change = Function(
                        'field', f.templateOptions.changeExpr).bind(this);
                }
            return f;
        });
    }

    getItem(params) {
        const opts = {};
        const itemId = params.id;
        // TODO: insert http service hear
        /**
         * this.dataLayer.get(this.stepConfig.getStore, itemId)
         * .subscribe((resp:any) => {
         *     this.item = resp.data;
         *     this.formModel = { ...resp.data };
         * })
         */
    }

    getItemId() {
        this._route.queryParams.subscribe((params: any) => {
            if (_.has(params, 'id') && !this.noItem) {
                this.getItem(params);
            }
        })
    }

    getFields() {
        // TODO: uncomment once service done
        this.fields = this._formServ.getFields(this.store).field;
        this.setFieldsConfigs();
        this.watchFieldChanges();
        /**
         * this.formlyService.getFields(this.store)
         * .subscribe(fields => {
         *    this.fields = fields;
         *    this.setFieldsConfigs();
         * })
         */
    }

    skip() { this.onSkip.emit() };
    back() { this.onBack.emit() };
    cancelForm() { this.cancelFxn.emit() };

    submitForm(model, form) {
        if (!form.dirty && form.status === 'VALID') {
            this.onPrestine.emit(form);
            return;
        }
        if (form.valid) {
            let resultModel = this.formModel || form.value;
            if (_.has(resultModel, 'starts_on')) {
                const startsOn = moment(resultModel.starts_on).format('YYYY-MM-DD');
                resultModel = { ...resultModel, starts_on: startsOn };
            }
            if (_.has(resultModel, 'ends_on')) {
                const endsOn = moment(resultModel.ends_on).format('YYYY-MM-DD');
                resultModel = { ...resultModel, ends_on: endsOn };
            }
            this.submitModel.emit(resultModel);
            if (this.resetModel) {
                _.each(this.fields, field => {
                    field.formControl.setValue(null);
                    // field.formControl.status = 'VALID';
                })
            }
        }
    }

    ngOnInit() {
        this.getFields();
    }

    ngOnDestroy() {
        this.onDestroy$.next();
        this.onDestroy$.complete();
    }

    ngOnChanges(changes: { [property: string]: SimpleChange}) {
        this.store = !_.isUndefined(changes['store'])
            ? changes['store']['currentValue']: this.store;
        this.model = !_.isUndefined(changes['model'])
            ? changes['model']['currentValue'] : this.model;
        if (this.model) {
            this.formModel = this.model;
        }
    }
}