import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { DataLayerService } from 'app/services/http/dataLayer.service';
import { get } from 'lodash';

@Component({
    selector: 'nested-crud-dialog',
    templateUrl: 'nested-inline-dialog.component.html',
    providers: [DataLayerService],
})

export class NestedInlineDialog implements OnInit {
    loading: boolean;
    submitted: boolean;
    orgId: string;
    context: string;

    configs: any;
    model:any;
    organization: any;
    item: any;
    // form configs
    comment: string;
    commentForm: FormGroup;
    adjustedAmountForm: FormGroup;

    constructor(
        private _formBuilder: FormBuilder,
        public _dialogRef: MatDialogRef<NestedInlineDialog>,
        private _dataLayer: DataLayerService,
        @Inject(MAT_DIALOG_DATA) public data: any) {}

    formInit() {
        this.commentForm = this._formBuilder.group({
            comment: ['', Validators.required],
        });
        this.adjustedAmountForm = this._formBuilder.group({
            adjustedAmount: ['', Validators.required],
        });
        // TODO: Add conditional logic at line level to prefill
        // rationalized/actual amounts
    }

    get f() { return this.commentForm.controls };
    get aF() { return this.adjustedAmountForm.controls };

    submitTransition(transObj, feedback) {
        const store = this.data.store;
        this.loading = true;
        const paramObj = { key: 'current_org_id', value: this.organization };
        this._dataLayer.update(store, this.item.id, transObj, paramObj)
            .subscribe(resp => {
                console.log(resp);
                this.loading = false;
                this.closeDialog('refresh');
                const msg = feedback.succMsg;
                this._dataLayer.openDynamicSnackBar(msg, 'success');
            }, err => {
                console.log(err);
                this.loading = false;
                const errMsg = feedback.errMsg;
                this._dataLayer.openDynamicSnackBar(errMsg, 'error');
            })
    }

    transitionActions(frmObj?) {
        const context = this.context;
        let succStr = (status) => `Item ${status} successfully`;
        let errStr = (status) => `An error occurred during ${status}ing`;
        switch (context) {
            case 'rationalize':
                const ratObj = { status: 'RATIONALIZED' };
                const ratFeedback = {
                    succMsg: succStr('rationalized'),
                    errMsg: errStr('rationaliz'),
                };
                this.submitTransition(ratObj, ratFeedback);
                break;
            case 'approve':
                const appObj = { status:'SASDEF_APPROVED' };
                const appFeedback = {
                    succMsg: succStr('approved'),
                    errMsg: errStr('approv'),
                };
                this.submitTransition(appObj, appFeedback);
                break;
            case 'reject':
                const rejFeedback = {
                    succMsg: succStr('rejected'),
                    errMsg: errStr('reject'),
                };
                const rejObj = { ...frmObj };
                this.submitTransition(rejObj, rejFeedback);
                break;
            default:
                throw new Error('No relevant transition action given');
                break;
        }
    }

    submitForm(frm) {
        console.log(frm);
        if (frm.valid) {
            if (this.context === 'rejected') {
                const comment = frm.value['comment'];
                const frmObj = { comment, status: 'REJECTED' };
                this.transitionActions(frmObj);
            }
        }
    }

    closeDialog(resp?) {
        this._dialogRef.close(resp);
    }

    getUserOrganization() {
        const organization = JSON.parse(localStorage.getItem('organization'));
        this.organization = get(organization, 'organization', null);
    }

    receiveModel(model) {
        console.log(model);
    }

    dialogActions: any = {
        approveApplication: () => {
            this.getUserOrganization();
            this.loading = true;
            const postObj = {
                review_status: 'APPROVE',
                organization: this.organization,
                activity: this.data.activity.id,
            };
        }
    }

    setConfigs() {
        const context = this.data.context;
        this.context =  this.data.context;
        this.formInit();
        this.getUserOrganization();
        switch (context) {
            case 'edit':
                return {
                    title: 'Update Activity',
                    type: 'form',
                };
            case 'approve':
                return {
                    title: 'Approve Activity',
                    type: 'dialog',
                };
            case 'rationalize':
                return {
                    title: 'Rationalize Activity',
                    type: 'dialog',
                    validationKey: 'rationalized_total',
                }
            case 'reject':
                return {
                    title: 'Reject Activity',
                    type: 'comment',
                };
            default:
                throw new Error('Provide a valid option');
        }
    }

    ngOnInit() {
        this.model = this.data.activity;
        this.item = this.data.activity;
        this.configs = this.setConfigs();
    }
}