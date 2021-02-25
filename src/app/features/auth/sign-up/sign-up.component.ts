import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { get, isUndefined } from 'lodash';

import { DataLayerService } from 'app/services/http/dataLayer.service';

@Component({
    selector: 'sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['../sign-in/sign-in.component.scss'],
    providers: [DataLayerService],
})

export class SignUpComponent implements OnInit {
    submitted: boolean;
    
    constructor(private _dataLayer: DataLayerService,
        private _router: Router,
        private _route: ActivatedRoute) {}

    regiserUser(userModel) {
        this.submitted = true;
        this._dataLayer.create('register', userModel)
            .subscribe(resp => {
                console.log(resp);
                this.submitted = false;
                const msg = 'Registration to E-Fund was successfull';
                this._dataLayer.openDynamicSnackBar(msg, 'success');
                this._router.navigate(['/auth/feedback']);
            }, err => {
                console.log(err);
                this.submitted = false;
                const errArr = get(err.error, 'error', null);
                const msg = 'Sorry, an error occured while ' +
                'signing up. Please try again, if persists please contact the administrator';
                const errMsg = !isUndefined(errArr) ? errArr[0] : msg;
                this._dataLayer.openDynamicSnackBar(errMsg, 'error');
            })
    }
    
    receiveModel(model) {
        this.regiserUser(model);
    }

    ngOnInit() {
    }
}