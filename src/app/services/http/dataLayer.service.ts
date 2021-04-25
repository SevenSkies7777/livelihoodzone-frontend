// tslint:disable:whitespace
import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { 
    MatSnackBar,
    MatSnackBarConfig,
    MatSnackBarHorizontalPosition,
    MatSnackBarVerticalPosition,
    MatSnackBarRef,
 } from '@angular/material/snack-bar';

import { map, debounceTime } from 'rxjs/operators';
import * as _ from 'lodash';

import { environment } from '../../../environments/environment';
import { stores } from './stores.service';

import { Authorization } from '../../services/authorization.service';

import { 
    DynamicSnackBarComponent 
} from '@fuse/components/dynamic-snackbar/dynamic-snackbar.component';
/**
 * Update user class.
 * 
 */

 @Injectable()
 export class DataLayerService {
    http: HttpClient;
    configs: any = environment;
    serverUrl = environment.serverURL;
    stores: any[] = stores;
    // snack bar configurations
    snackBarConfig: MatSnackBarConfig;
    snackBarRef: MatSnackBarRef<any>;
    horizontalPosition: MatSnackBarHorizontalPosition = 'center';
    verticalPosition: MatSnackBarVerticalPosition = 'top';
    snackBarAutoHide = '60000';

    constructor(private _http: HttpClient,
        private authServ: Authorization,
        private _snackBar: MatSnackBar) {
        this.http = _http;
    }

    getUrl(name: string) {
        const aStore = _.find(this.stores, { name });
        return aStore.path;
    }

    list(storeName: string, opts: any) {
        const url = this.getUrl(storeName);
        const completeUrl = `${this.serverUrl}${url}`;
        const params = { params: opts };
        return this.http.get(completeUrl, params)
            .pipe(map(result => result));
    }

    update(storeName: string, id:any, patchObj: object, optsParam?) {
        const url = this.getUrl(storeName);
        const headersObj = new HttpHeaders({
            'Content-Type': 'application/json',
        });
        let urlEnd = '';
        if (optsParam) urlEnd = `?${optsParam.key}=${optsParam.value}`;
        const completeUrl = `${this.serverUrl}${url}${id}/${urlEnd}`;
        return this.http.patch(completeUrl, patchObj, { headers: headersObj })
            .pipe(map(result => result));
    }

    putUpdate(storeName: string, putObj: object) {
        const url = this.getUrl(storeName);
        const headersObj = new HttpHeaders({
            'Content-Type': 'application/json',
        });
        return this.http.put(
            `${this.serverUrl}${url}`, putObj, { headers: headersObj })
            .pipe(map(result => result));
    }

    remove(storeName: string, id:any) {
        const url = this.getUrl(storeName);
        const completeUrl = `${this.serverUrl}${url}${id}/`;
        return this.http.delete(completeUrl)
            .pipe(map(result => result));
    }

    get(storeName: string, id:any, opts?: object) {
        const url = this.getUrl(storeName);
        const token:any = this.authServ.getToken();
        const headersObj = new HttpHeaders({
          // 'Authorization': `${token.token_type} ${token.access_token}`,
          'Authorization': `${token.token_type} ${token}`,
          'Content-Type': 'application/json',
        });
        let completeUrl = `${this.serverUrl}${url}${id}/`;
        if (!_.isUndefined(opts)) {
            const key = _.keys(opts)[0];
            completeUrl = `${completeUrl}?${key}=${opts[key]}`
        };
        const resp = this.http.get(
            completeUrl, { headers: headersObj })
            .pipe(map(result => result));
        return resp;
    }

    create(storeName: string, postObj: any, encoded?, optsParam?) {
        const url = this.getUrl(storeName);
        let urlEnd = '';
        if (optsParam) urlEnd = `?${optsParam.key}=${optsParam.value}`;
        const cType = !_.isUndefined(encoded) ? encoded : 'application/json';
        const token:any = this.authServ.getToken();
        const headersObj = new HttpHeaders({
          // 'Authorization': `${token.token_type} ${token.access_token}`,
          'Content-Type': cType,
        });
        const completeUrl = `${this.serverUrl}${url}${urlEnd}`;
        const resp = this.http.post(
            completeUrl, postObj, { headers: headersObj })
            .pipe(map(result => result));
        return resp;
    }

    postTransition(storeName: string, postObj: any, uri?, optsParam?) {
        const url = this.getUrl(storeName);
        let urlEnd = '';
        if (optsParam) urlEnd = `?${optsParam.key}=${optsParam.value}`;
        const cType = 'application/json';
        const token:any = this.authServ.getToken();
        const headersObj = new HttpHeaders({
          // 'Authorization': `${token.token_type} ${token.access_token}`,
          'Content-Type': cType,
        });
        const completeUrl = `${this.serverUrl}${url}${uri}${urlEnd}`;
        const resp = this.http.post(
            completeUrl, postObj, { headers: headersObj })
            .pipe(map(result => result));
        return resp;
    }

    uploadFile(storeName: string, postObj: any, encoded?) {
        const url = this.getUrl(storeName);
        const cType = !_.isUndefined(encoded) ? encoded : 'application/json';
        const token:any = this.authServ.getToken();
        const completeUrl = `${this.serverUrl}${url}`;
        const resp = this.http.post(
            completeUrl, postObj)
            .pipe(map(result => result));
        return resp;
    }

    openDynamicSnackBar(msg, type?) {
        const snackType = type !== undefined ? type : 'success';
        this.snackBarConfig = new MatSnackBarConfig();
        this.snackBarConfig.horizontalPosition = this.horizontalPosition;
        this.snackBarConfig.verticalPosition = this.verticalPosition;
        this.snackBarConfig.duration = parseInt(this.snackBarAutoHide, 0);
        this.snackBarConfig.panelClass = `box-${type}`;
        this.snackBarConfig.data = {
            message: msg, snackType: type, snackBar: this._snackBar
        };
        this._snackBar.openFromComponent(
            DynamicSnackBarComponent, this.snackBarConfig)
    }

    openSnackBar(msg) {
        this.snackBarConfig = new MatSnackBarConfig();
        this.snackBarConfig.horizontalPosition = this.horizontalPosition;
        this.snackBarConfig.verticalPosition = this.verticalPosition;
        this.snackBarConfig.duration = parseInt(this.snackBarAutoHide, 0);
        this.snackBarConfig.panelClass = 'custom-class';
        this.snackBarRef = this._snackBar.open(msg, '', this.snackBarConfig);
    }

    errMap(errObj){
        const errArray = [];
        const keys = _.keys(errObj);
        _.each(keys, (key) => {
            const obj: any = {};
            obj.key = key;
            obj.value = errObj[key];
            errArray.push(obj);
        });
        return errArray;
    }
 }
