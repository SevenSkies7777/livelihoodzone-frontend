import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataLayerService } from 'app/services/http/dataLayer.service';
import { get, isUndefined } from 'lodash';

@Component({
    selector: 'feed-back',
    templateUrl: './feedback.component.html',
    styleUrls: ['../sign-in/sign-in.component.scss'],
    providers: [DataLayerService],
})

export class FeedbackComponent implements OnInit {
    loading: boolean;

    constructor(private _dataLayer: DataLayerService,
        private _router: Router,
        private _route: ActivatedRoute) {}
    
    verifyUser(token, uid) {
        this.loading = true;
        const postObj = { token, uid };
        this._dataLayer.create('email-verification', postObj)
            .subscribe(resp => {
                this.loading = false;
                const msg = 'Email verified successfully'
                this._dataLayer.openDynamicSnackBar(msg, 'success');
            }, err => {
                this.loading = false;
                console.log(err);
                const errArr = get(err.error, 'error', null);
                const msg = 'An error occurred during verification. ' +
                    'Kindly click the link and try again.';
                const errMsg = !isUndefined(errArr) ? errArr[0] : msg;
                this._dataLayer.openDynamicSnackBar(errMsg, 'error');
            })
    }

    getToken() {
        this._route.queryParams.subscribe(params => {
            const token = params['verify_token'];
            const uid = params['uid'];
            this.verifyUser(token, uid);
        })
    }

    goToLogin() {
        console.log('called');
    }

    checkRoute() {
        if (this._router.url !== '/auth/feedback') {
            this.getToken();
        }
    }

    ngOnInit() {
        this.checkRoute();
    }
    
}