import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { get, isNull, isUndefined } from 'lodash';

import { DataLayerService } from 'app/services/http/dataLayer.service';

@Component({
    selector: 'email-verification',
    templateUrl: './email-verification.component.html',
    styleUrls: ['../auth/sign-in/sign-in.component.scss'],
    providers: [DataLayerService],
})

export class EmailVerificationComponent implements OnInit {
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
                const errMsg = !isUndefined(errArr) && !isNull(errArr) ? errArr[0] : msg;
                this._dataLayer.openDynamicSnackBar(errMsg, 'error');
            })
    }

    getParams() {
        this._route.queryParams.subscribe(params => {
            const token = params['verify_token'];
            const uid = params['uid'];
            this.verifyUser(token, uid);
        });
    }

    ngOnInit() {
        this.loading = true;
        this.getParams();
    }
}