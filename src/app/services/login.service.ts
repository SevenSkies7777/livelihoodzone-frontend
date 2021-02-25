import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Observable, Subject, throwError } from 'rxjs';

import * as _ from 'lodash';

import { DataLayerUtils } from './datalayer.utils.service';
import { ConfigAuthUrl } from './oauth2.service';
import { Setup } from './setup.service';
import { HomePageService } from './home-page.service';
import { Authorization } from './authorization.service';

interface LooseObject {
    [key: string]: any;
}

@Injectable()
export class CompleteService {
    customSessionLoadState = null;
    router: any;
    route: ActivatedRoute;

    constructor(
        readonly _router: Router,
        readonly activeRoute: ActivatedRoute,
        location: Location,
        readonly dataLayerUtils: DataLayerUtils,
        readonly authUrlConfig: Authorization,
        readonly setup: Setup,
        protected oauthConfig: ConfigAuthUrl,
        protected homePageServ: HomePageService,
    ) {
        this.router = _router;
        this.route = activeRoute;
    }


    postLoginRedirect = (): void => {
        const loadState = { params: {} };
        const user = this.authUrlConfig.getUser().data;
        const nxt = 'select-organization/list';
        this.router.navigate([`/${nxt}`], { queryParams: loadState.params });
    }

    setSessionLoadState(fxn: any): void {
        this.customSessionLoadState = fxn;
    }

    getRouteFragment(): any {
        return _.has(this.route, 'snapshot') ?
            this.route.snapshot.fragment : null;
    }


    getQueryParams(): any {
        return _.has(this.route, 'snapshot') ?
            this.route.snapshot.queryParams : null;
    }

    completeAuth = (authToken: any): Observable<any> => {
        const rawAuthInfo = this.getRouteFragment();
        const authUrl = this.authUrlConfig;
        const setup = this.setup;

        const deferredSub = new Subject<any>();
        const deferredResult = deferredSub.asObservable();
        const outerPostLogin = this.postLoginRedirect;

        deferredSub.next('loading authentication...');

        function loadUser(aToken?: LooseObject) {
            deferredSub.next('Loading user info...');
            if (!_.isUndefined(aToken)) {
                authUrl.setUserDetails(aToken)
                .subscribe((user) => {
                    deferredSub.next('Start Session...');
                    outerPostLogin(); 
                    try {
                        if (setup.availableFeatures.allowCompleteRedirect === 'allow') {
                            outerPostLogin();
                        }
                    } catch (e) {
                        deferredSub.error('Login not complete, ${e}');
                    } finally {
                        deferredSub.next('Session started succesfully');
                    }
                }, err => {
                    const errStr = `Error fetching user info: ${JSON.stringify(err)}`;
                    deferredSub.error(errStr);
                });
            }
        }

        const token = authToken;
        const qParams = this.getQueryParams();
        this.authUrlConfig.setAuthDetails(token, qParams)
        .subscribe(() => { loadUser(token); }, err => { deferredSub.error(err); });
        return deferredResult ;
    }
}