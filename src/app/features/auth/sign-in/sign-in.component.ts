import { 
    Component,
    ChangeDetectorRef,
    Inject, OnInit, ChangeDetectionStrategy
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { MatDialog } from '@angular/material/dialog';

import { DataLayerService } from '../../../services/http/dataLayer.service';
import { Authorization } from '../../../services/authorization.service';
import { CompleteService } from '../../../services/login.service';
import { Session }  from '../../../services/session.service';
import { get, isEmpty, isUndefined } from 'lodash';
import { ComplaintDialogComponent } from '../complaint-dialog/complaint-dialog.component';

@Component({
    selector: 'sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.scss'],
    providers: [DataLayerService],
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class SignInComponent implements OnInit {
    submitted: boolean;
    logout: any;
    authError = false;
    errors: any;
    redirectDelay: number = 200;
    formToggle: boolean = false;
    progressMsg =  'Starting your session';

    constructor(
        protected cd: ChangeDetectorRef,
        protected _router: Router,
        protected _route: ActivatedRoute,
        protected _dataLayer: DataLayerService,
        protected _authConfig: Authorization,
        protected _complete: CompleteService,
        protected _session: Session,
        private _dialog: MatDialog,
    ) { }

    showToast() { }

    logoutUser() {
        if (this.logout === 'is_logged_out') {
            this._authConfig.logout();
            this.showToast();
        } else {
            const isLoggedIn = this._authConfig.isLoggedIn();
            if (isLoggedIn) {
                this._complete.postLoginRedirect();
            }
        }
    }

    checkParams() {
        this._route.queryParams.subscribe(params => {
            this.logout = params.logout;
            this.logoutUser();
        })
    }

    openDialog() {
        const dialogRef = this._dialog.open(
            ComplaintDialogComponent, {
                width: '50%',
            }
        )

        dialogRef.afterClosed().subscribe(resp => {});
    }

    postLogin(result) {
        this.submitted = false;
        const redirect = '/select-organization';
        setTimeout(() => {
            return this._router.navigateByUrl(redirect);
        }, this.redirectDelay);
    }

    completeAuth(resp: any, result:any) {
        this._complete.completeAuth(resp)
        .subscribe(msg => {
            this.progressMsg = msg;
            this.postLogin(result);
        }, err => {
            this.authError = true;
            this.submitted = false;
            this.progressMsg = 'Sorry, an error occured while ' +
                'signing in. Please try again';
            this._dataLayer.openSnackBar(this.progressMsg);
            this.errors = err.errors;
            this._dataLayer.openDynamicSnackBar(this.progressMsg, 'error');
        });
    }

    login(model) {
        this.errors = [];
        this.submitted = true;
        this._dataLayer.create('signin', model)
        .subscribe(resp => {
            const token = resp;
            this.completeAuth(token, resp);
            this.cd.detectChanges();
        }, err => {
            const errArr = get(err.error, 'error', 
                ['Sorry an error occurred. Kindly contact the administrator']);
            this.submitted = false;
            const msg = 'Sorry, an error occured while ' +
                'signing in. Please try again';
            const errMsg = !isUndefined(errArr) ? errArr[0] : msg;
            this._dataLayer.openDynamicSnackBar(errMsg, 'error');
        });
    }

    receiveModel(model) {
        this.login(model);
    }

    ngOnInit() {
        this.formToggle = true;
        this.checkParams();
    }
    
}