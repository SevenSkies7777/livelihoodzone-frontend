import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { DataLayerService } from 'app/services/http/dataLayer.service';
import { get, isUndefined } from 'lodash';

@Component({
    selector: 'tabbed-dialog',
    templateUrl: 'dynamic-table-dialog.component.html',
    styles: ['dynamic-table-dialog.component.scss'],
    providers: [DataLayerService],
})

export class DynamicTableDialog implements OnInit {
    loading: boolean;
    organization: any;
    comment: string;
    configs: any;
    context: string;
    commentForm: FormGroup;
    dialogForm: FormGroup;
    adjustAmountForm: FormGroup;
    item: any;
    roles: Array<any> = [];

    constructor(@Inject(MAT_DIALOG_DATA) public data: any,
        private _snackBar: MatSnackBar,
        private _dataLayer: DataLayerService,
        private _formBuilder: FormBuilder,
        private _dialogRef: MatDialogRef<DynamicTableDialog>) {}

    openSnackBar(msg: string, action: string) {
        this._snackBar.open(msg, action, {
            duration: 20000,
        });
    }

    formInit() {
        this.dialogForm = this._formBuilder.group({
            'group': ['', Validators.required],
        });
        this.adjustAmountForm = this._formBuilder.group({
            'amount': ['', Validators.required],
        });
        this.commentForm = this._formBuilder.group({
            'comment': ['', Validators.required],
        });
    }

    submitForm(frm) {
        if (frm.valid) {
            this.dialogActions.approve(frm.value);
        }
    }

    submitTransitionFrm(frm) {
        if (frm.valid) {
            console.log(frm);
            this.transitionActions(frm.value);
        }
    }

    submitTransition(transObj, feedback) {
        const params = { 
            key: 'current_org_id', 
            value: this.organization 
        };
        this._dataLayer.update(
            this.configs.store, this.item.id, transObj, params)
                .subscribe(resp => {
                    console.log(resp);
                    this.loading = false;
                    this.closeDialog('refresh');
                    this.openSnackBar(feedback.successMsg, 'CLOSE');
                }, err => {
                    this.loading = false;
                    this.openSnackBar(feedback.errorMsg, 'CLOSE'); 
                });
    }

    transitionActions(frmObj) {
        console.log(frmObj);
        const amount = frmObj ? frmObj.amount : 0;
        switch(this.context) {
            case 'rationalize':
                const ratObj = {
                    rationalized_price: amount,
                    status: 'RATIONALIZED',
                };
                const ratFeedbackObj = {
                    successMsg: 'Item appproved successfully',
                    errorMsg: 'An error occurred. Kindly try again',
                };
                this.submitTransition(ratObj, ratFeedbackObj);
                break;
            case 'approve':
                const apprObj = {
                    actual_price: amount,
                    status: 'SASDEF_APPROVED',
                };
                const apprFeedbackObj = {
                    successMsg: 'Item appproved successfully',
                    errorMsg: 'An error occurred. Kindly try again',
                };
                this.submitTransition(apprObj, apprFeedbackObj);
                break;
            case 'reject':
                const rejectFeedbackObj = {
                    status: 'REJECTED',
                    comment: frmObj.comment,
                };
                const rejFeedbackObj = {
                    successMsg: 'Item rejected successfully',
                    errorMsg: 'An error occurred. Kindly try again',
                };
                this.submitTransition(rejectFeedbackObj, rejFeedbackObj);
                break;
            default:
                throw new Error('No relevant transition action given');
        }
    }

    get f() { return this.dialogForm.controls };
    get cF() { return this.commentForm.controls };
    get aF() { return this.adjustAmountForm.controls };

    getUserOrganization() {
        const organization = JSON.parse(
            localStorage.getItem('organization'));
        this.organization = get(organization, 'organization', null);
    }

    getRoles() {
        this._dataLayer.list('user-groups', {})
            .subscribe(resp => {
                this.roles = resp['results'];
            }, err => console.log(err));
    }

    updateRecord(patchObj, feedback, urlEnd) {
        this.loading = true;
        const params = { 
            key: 'current_org_id', 
            value: this.organization 
        };
        const idUrlEnd = `${this.data.item.id}/${urlEnd}/`;
        this._dataLayer.postTransition(this.configs.store, 
            patchObj, idUrlEnd, params)
            .subscribe(resp => {
                this.loading = false;
                this.closeDialog('refresh');
                this.openSnackBar(feedback.successMsg, 'CLOSE');
            }, err => {
                this.loading = false;
                this.openSnackBar(feedback.errorMsg, 'CLOSE');
            })
    }

    dialogActions: any = {
        approve: (frmVal?) => {
            const approveObj = {
                ...this.data.item,
                ...frmVal,
                review_state: 'APPROVED',
                review_comment: this.comment || 'Request approved',
            };
            const feedback = {
                successMsg: 'Request has been appproved successfully',
                errorMsg: 'An error occurred. Kindly try again',
            };
            this.updateRecord(approveObj, feedback, 'approve');
        },
        reject: () => {
            const rejectObj = {
                ...this.data.item,
                review_state: 'REJECTED',
                review_comment: this.comment || 'Request rejected',
            };
            const feedback = {
                successMsg: 'Request has been rejected successfully',
                errorMsg: 'An error occurred. Kindly try again'
            };
            this.updateRecord(rejectObj, feedback, 'reject');
        }
    }

    setConfigs() {
        const context = this.data.configs.context;
        this.context = context;
        if (!isUndefined(context)) {
            switch(context) {
                case 'rationalize':
                    this.configs = {
                        ...this.configs,
                        title: 'Rationalize item amount',
                    };
                    this.item = { ...this.data.item };
                    this.aF.amount.setValue(this.item.unit_price);
                    break;
                case 'approve':
                    this.configs = {
                        ...this.configs,
                        title: 'Approve item amount'
                    };
                    this.item = { ...this.data.item };
                    this.aF.amount.setValue(this.item.rationalized_price);
                    break;
                case 'reject':
                    this.configs = {
                        ...this.configs,
                        title: 'Reject item',
                    };
                    this.item = { ...this.data.item };
                    break;
                default:
                    throw new Error('Provide a valid choice');
            }
        }
    }

    closeDialog(arg?) {
        this._dialogRef.close(arg);
    }

    ngOnInit() {
        this.getUserOrganization();
        this.formInit();
        this.getRoles();
        this.configs = { ...this.data.configs };
        this.setConfigs();
    }
}