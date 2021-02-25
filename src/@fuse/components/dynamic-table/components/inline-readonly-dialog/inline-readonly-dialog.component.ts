import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { DataLayerService } from 'app/services/http/dataLayer.service';
import { isUndefined } from 'lodash';
import { InlineReadonlyComponent } from '../inline-readonly/inline-readonly.component';

@Component({
    selector: 'inline-dialog',
    templateUrl: 'inline-readonly-dialog.component.html',
    styleUrls: ['inline-readonly-dialog.component.scss'],
    providers: [DataLayerService],
})

export class InlineReadOnlyDialog implements OnInit {
    loading: boolean;
    organization: any;
    comment: string;
    commentForm: FormGroup;
    attachedDoc: any = {};
    fileName: string;

    constructor(@Inject(MAT_DIALOG_DATA) public data: any,
        private _formBuilder: FormBuilder,
        private _dataLayer: DataLayerService,
        public _dialogRef: MatDialogRef<InlineReadOnlyDialog>) {}

    setFileName() {
        const strArr = this.attachedDoc.file.split('/');
        this.fileName = strArr[strArr.length - 1];
    }

    fileChange(files) {
        const file = files.target.files[0];
        const fileFormData = {
            file,
            attachment_type: 'APPLICATION_DOCUMENT',
        };
        const formData = new FormData();
        formData.append('file', fileFormData.file);
        formData.append('attachment_type', fileFormData.attachment_type);

        this._dataLayer.uploadFile('attachments', formData)
            .subscribe(resp => {
                this.attachedDoc = resp;
                this.setFileName();
            }, err => {
                console.log(err);
                const errMsg = 'An error occurred during file upload. Kindly try again';
                this._dataLayer.openDynamicSnackBar(errMsg, 'error');
            });
    }

    formInit() {
        this.commentForm = this._formBuilder.group({
            notes: [''],
        });
    }

    submitTransition(configs, feedback) {
        this.loading = true;
        this._dataLayer.create('complaint-reviews', configs)
            .subscribe(resp => {
                console.log(resp);
                this.loading = false;
                this.closeDialog('refresh');
                this._dataLayer.openDynamicSnackBar(feedback, 'success');
                if (!isUndefined(this.fileName)) {
                    const postObj = {
                        organization: this.organization.organization,
                        complaint_review: resp['id'],
                        attachment: this.attachedDoc['id'],
                    }
                    const params = { 
                        key: 'current_org_id', 
                        value: this.organization.organization 
                    };
                    this._dataLayer.create('complaint-review-attachments', 
                        postObj, undefined, params)
                        .subscribe(resp => {
                            
                        }, err => {
                            console.log(err);
                            const errMsg = 'An error occurred. Kindly try again later';
                            this._dataLayer.openDynamicSnackBar(errMsg, 'error');
                        })
                } else {
                    this._dataLayer.openDynamicSnackBar(feedback, 'success');
                }
            }, err => {
                console.log(err);
                const errMsg = 'An error occurred. Kindly try again later';
                this._dataLayer.openDynamicSnackBar(errMsg, 'error');
            })
    }

    transitionDoc(model) {
        const config = {
            review_status: 'IN_REVIEW',
            complaint: this.data.item.id,
            notes: model.notes,
            organization: this.organization.organization,
        };
        let feedback = 'Complaint has been successfully reviewed';
        switch(this.data.context) {
            case 'Review':
                config.review_status = 'IN_REVIEW';
                this.submitTransition(config, feedback);
                break;
            case 'Resolve':
                config.review_status = 'RESOLVED';
                feedback = 'Complaint has been successfully resolved';
                this.submitTransition(config, feedback);
            case 'Close':
                config.review_status = 'CLOSED',
                feedback = 'Complaint has been successfully closed';
                this.submitTransition(config, feedback);
                break;
            default:
                throw Error('You need to provide a valid state');
        }
    }

    submitReview() {
        if (this.commentForm.valid) {
            const model = this.commentForm.value;
            this.transitionDoc(model);
        }
    }

    get f() { return this.commentForm.controls }

    closeDialog(arg?) {
        this._dialogRef.close(arg);
    }

    ngOnInit() {
        this.formInit();
        this.organization = JSON.parse(
            localStorage.getItem('organization'));
    }
}