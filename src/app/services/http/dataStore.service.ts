// tslint:disable:whitespace
import { Injectable } from '@angular/core';
import * as _ from 'lodash';

import { DataLayerService } from './dataLayer.service';
/**
 * Update any record.
 */

@Injectable()
export class CrudRecordService {
    redirectDelay: any = 300;

    dataLayer: DataLayerService;
    constructor(_dataLayer: DataLayerService) {
        this.dataLayer = _dataLayer;
    }

    // toast function
    showToast(msg) {}

    errorFxn(cmpt, err) {
        cmpt.submitted = false;
        cmpt.error = err.error;
        const arrErrors = this.dataLayer.errMap(cmpt.error);
        cmpt.errors = _.clone(arrErrors);
    }

    postCreate(cmpt, result?) {
        const msg = `${cmpt.context} saved`;
        this.showToast(msg);
        setTimeout(() => {
            cmpt.postCreateSave(result);
        }, this.redirectDelay);
    }

    createRecord(cmpt, postObj) {
        this.dataLayer.create(cmpt.store, postObj)
        .subscribe(result => {
            cmpt.submitted = false;
            this.postCreate(cmpt, result);
        }, err => {
            cmpt.submitted = false;
            this.errorFxn(cmpt, err);
        });
    }

    getList(cmpt, listObj, opts?) {
        this.dataLayer.list(listObj.store, opts)
        .subscribe((result:any) => {
            cmpt[listObj.loadKey] = false;
            cmpt[listObj.key] = result.data;
        }, err => {
            cmpt[listObj.loadKey] = false;
            this.errorFxn(cmpt, err);
        });
    }

    getRecord(cmpt, id) {
        this.dataLayer.get(cmpt.store, id)
        .subscribe((result: any) => {
            cmpt.item = result;
        }, err => {
            this.errorFxn(cmpt, err);
        });
    }
}
