import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';

// import { Observable as ObservableRx } from 'rxjs/Rx';
import { Observable, throwError, Subject, of, observable } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';

import * as moment from 'moment';
import * as _ from 'lodash';
// import { userInfo } from 'os';
import { ConfigAuthUrl, AuthUrls } from '../services/oauth2.service';
import { DataLayerUtils } from './datalayer.utils.service';
// import { isUndefined } from 'utils';

interface LooseObject {
    [key: string]: any;
}


@Injectable()
export class Authorization {
    CREDZ_STORE = 'auth.config.credz';
    USER_STORE = 'auth.config.user';
    STATE_STORE = 'state.dump';
    // authUrls: AuthUrls;
    oauthCredz: any;
    storedUser: Object;
    storedOrganization: any;
    dataLayerUtils: DataLayerUtils;
    http: HttpClient;
    origin: any;
    params: any;

    constructor(
        protected location: Location,
        protected router: ActivatedRoute,
        protected dataUtils: DataLayerUtils,
        protected configAuthUrls: ConfigAuthUrl,
        protected httpClient: HttpClient,
    ) {
        this.dataLayerUtils = dataUtils;
        this.oauthCredz = configAuthUrls.oauthCredz;
        this.http = httpClient;
    }

    windowOrigin(): any {
        return window.location.origin;
    }

    /**
     * @return {Promise}
     * This resolves if urlparams dont have a server error
     * and the token is persisted successfully
     *
     * @params {Object} token
     * @param {Object} urlparams
     *
     * @description
     * Set token retrieved from the server
     * The token is then stored in localstorage
     */

    setAuthDetails = (token: LooseObject, urlParams?: LooseObject): Observable<any> => {
        const tokenFxn = observer => {
            // const urlParamsObj = urlParams as {  error };
            // const loginError = _.has(urlParams, 'error') ? urlParamsObj.error : undefined;
            if(!_.isEmpty(token)) {
                
                const updatedToken = { ...token };
                this.storeToken(token);
                observer.next(updatedToken);
            } else {
                const tokenErrorObj = token as { error };
                if (tokenErrorObj.error) {
                    observer.error(tokenErrorObj.error);
                }
            }
        };
        const authObservable = new Observable<any>(tokenFxn);
        return authObservable;
    }

    /**
     *
     * @name setXHRToken
     * @param {Object | undefined} tokenToken to set in $http. If the tokeb is undefined,
     * it hsall remove the tokens
     *
     * @description
     * Add tokeb to the header so that the tokeb included
     * in every request made to resource server
     */

     setXHRToken = (token?: LooseObject): void => {
        const httpHeaders: HttpHeaders = new HttpHeaders();
        if (!_.isObject(token)) {
            httpHeaders.delete('Authorization');
            return;
        }
        const tokenObject = token as {  access_token; token_type };
        const authToken = `${tokenObject.token_type} ${tokenObject.access_token}`;
        httpHeaders.append('Authorization', authToken);
        // this.refreshTokenTimer(token);
    }

    /**
     * @name storeToken@param {Object}
     *
     * @description
     * Sets to be included in every request and also stores in localstorage
     */

    storeToken = (token?: LooseObject): void => {
        this.setXHRToken(token);
        // const till = moment().add(token.expires_in, 'seconds');
        localStorage.setItem(this.CREDZ_STORE, JSON.stringify(token));
    }

    /**
     * @name revokeToken
     * @param {Object} token
     * Token to revoke
     *
     * @returns {Promise}
     * Promise that resolves when the token is revoked
     *
     * @description
     * Revokes token and clears localStorage to remove
     * user and credentials details
     *
     */

    revokeToken = (token: any): Observable<any> => {
        const dom = this.objectPropChecker(this.configAuthUrls.authUrls, 'domain');
        const url = `${dom}/v1/skika-auth/logout/`;
        const tokenObject = token;
        // server logout request
        localStorage.removeItem(this.CREDZ_STORE);
        this.setXHRToken();

        function invalidTokenFxn(observer) {
            observer.error('Invalid token provided');
        }

        if (!_.isObject(tokenObject)) {
            const tokenError: Observable<string> = new Observable(invalidTokenFxn);
            return tokenError;
        }
        // const accessToken = tokenObject.access_token;
        const payload = `Token ${tokenObject['token']}`;

        // Performed by interceptor
        const myHeaders = new HttpHeaders({
            // 'Contet-Type': 'application/x-www-form-utlencoded',
            Authorization: `Token ${tokenObject['token']}`,
        });
        return this.http.post(url, payload, { headers: myHeaders});
    }

    getToken(): Object {
        const token: LooseObject = JSON.parse(localStorage.getItem(this.CREDZ_STORE));
        if (!_.isNull(token)) {
            // if (moment(token.expires_at) > moment()) {
            // }
            return token;
        }
        return null;
    }

    setUser = (data: any): void => {
        localStorage.setItem(this.USER_STORE, JSON.stringify(data));
        this.storedUser = data;
        // implement event emittion to notify logged in user data stored
    }

    setOrganization = (data: any) => {
        localStorage.setItem('organization', JSON.stringify(data));
        this.storedOrganization = data;
    }

    objectPropChecker(obj, key): object {
        return _.has(obj, key) ? obj[key] : '';
    }

    setUserDetails = (token: LooseObject): Observable<any> => {
        // return observable token stream placeholder
        const tokenFxn = observer => {
            if(!_.isEmpty(token)) {
                
                const updatedToken = { ...token };
                this.storeToken(token);
                observer.next(updatedToken);
            } else {
                const tokenErrorObj = token as { error };
                if (tokenErrorObj.error) {
                    observer.error(tokenErrorObj.error);
                }
            }
        };
        const authObservable = new Observable<any>(tokenFxn);
        return authObservable;
    }

    verifyEmail = (token): any => {
        const dom = this.objectPropChecker(this.configAuthUrls.authUrls, 'domain');
        const url = `${dom}/auth/verify-email/`;
        const postObj = { verification_token: token };
        return this.http.post(url, postObj)
        .pipe(map(data => {
            return data;
        }))
    }

    getUser = (): any => {
        return this.storedUser || localStorage.getItem(this.USER_STORE);
    }

    getOrganization = () => {
        return this.storedOrganization || localStorage.getItem('organization');
    }

    isLoggedIn = (): Boolean => {
        const hasToken = this.getToken();
        return (!_.isNull(hasToken));
    }

    logout = (isTimeout?: boolean) => {
        localStorage.removeItem(this.USER_STORE);
        localStorage.removeItem(this.CREDZ_STORE);
        localStorage.removeItem('organization');
        this.storedUser = null;
        if (!isTimeout) {
            // localStorage.removeItem(this.STATE_STORE)
        }
        // return this.revokeToken(this.getToken());
    }

    resetPassword = (email?: string): Observable<any> => {
        const dom = this.objectPropChecker(this.configAuthUrls.authUrls, 'domain');
        const resetUrl = this.objectPropChecker(this.configAuthUrls.authUrls, 'passwordReset');
        const url = this.dataLayerUtils.urlJoin(dom, resetUrl);
        return this.http.post(url, { email })
        .pipe(map(data => {
            return data;
        }));
    }

    changePassword = (postObj?: object): Observable<any> => {
        const dom = this.objectPropChecker(this.configAuthUrls.authUrls, 'domain');
        const chageUrl = this.objectPropChecker(this.configAuthUrls.authUrls, 'passwordChange');
        const url = this.dataLayerUtils.urlJoin(dom, chageUrl);

        return this.http.post(url, postObj)
        .pipe(map(data => {
            return data;
        }));
    }
}
