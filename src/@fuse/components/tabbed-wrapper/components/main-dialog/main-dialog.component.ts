import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { DataLayerService } from 'app/services/http/dataLayer.service';
import { get, has, isEmpty, isUndefined } from 'lodash';

@Component({
    selector: 'tabbed-dialog',
    templateUrl: 'main-dialog.component.html',
    styleUrls: ['main-dialog.component.scss'],
    providers: [DataLayerService]
})

export class MainDialogComponent implements OnInit {
    loading: boolean;
    organization: any;
    comment: string;

    commentForm: FormGroup;
    revisedAmountForm: FormGroup;
    activities: Array<any> = [];
    allApproved: boolean = false;
    attachedDoc: any = {};
    fileName: string;

    constructor(@Inject(MAT_DIALOG_DATA) public data: any,
        private _formBuilder: FormBuilder,
        private _snackBar: MatSnackBar,
        private _dataLayer: DataLayerService,
        public dialogRef: MatDialogRef<MainDialogComponent>) {
    }

    setFileName() {
        const strArr = this.attachedDoc.file.split('/');
        this.fileName = strArr[strArr.length - 1];
    }

    formInit() {
        this.commentForm = this._formBuilder.group({
            comment: ['', Validators.required],
        });
        this.revisedAmountForm = this._formBuilder.group({
            revised_amount: ['', Validators.required],
        });
        if (has(this.data.configs, 'revisedAmount')) {
            this.rA.revised_amount.setValue(this.data.item.amount_requested);
        }
    }

    openSnackBar(message: string, action: string) {
        this._snackBar.open(message, action, {
          duration: 4000,
        });
    }

    getUserOrganization() {
        const organization = JSON.parse(localStorage.getItem('organization'));
        this.organization = get(organization, 'organization', null);
    }

    transitionDocument(transitionObj?, feedback?) {
        this._dataLayer.create(this.data.configs.store, transitionObj)
            .subscribe(resp => {
                this.loading = false;
                this.closeDialog('refresh');
                this._dataLayer.openDynamicSnackBar(feedback.successMsg, 'success');
                if (!isUndefined(this.fileName)) {
                    const postObj = {
                        organization: this.organization,
                        application_review: resp['id'],
                        attachment: this.attachedDoc['id'],
                    }
                    const params = { key: 'current_org_id', value: this.organization };
                    this._dataLayer.create('application-review-attachments',
                        postObj, undefined, params)
                        .subscribe(resp => {
                        }, err => {
                            console.log(err);
                            this._dataLayer.openDynamicSnackBar('An error occurred', 'error');
                        })
                }
            }, err => {
                console.log(err);
                this.loading = false;
                this._dataLayer.openDynamicSnackBar('An error occurred', 'error');
            })
    }

    submitComment(frm) {
        if (frm.valid) {
            const comment = frm.value['comment'];
            this.dialogActions[this.data.configs.action](comment);
        }
    }

    submitRevisedAmount(frm) {
        if (frm.valid) {
            const revised_amount = frm.value['revised_amount'];
            this.dialogActions[this.data.configs.action](revised_amount);
        }
    }

    get f() { return this.commentForm.controls };
    get rA() { return this.revisedAmountForm.controls };

    dialogActions: any = {
        submitApplication: () => {
            this.getUserOrganization();
            this.loading = true;
            const postObject = {
                comment: this.comment || 'Application submitted',
                review_status: 'SUBMITTED',
                organization: this.organization,
                application: this.data.item.id,
            };
            const feedback = {
                successMsg: 'Record has been submitted successfully'
            }
            this.transitionDocument(postObject, feedback);
        },
        firstApproveApplication: () => {
            this.getUserOrganization();
            this.loading = true;
            const postObject = {
                comment: this.comment || 'Application authorized',
                review_status: 'FIRST_LEVEL_APPROVED',
                organization: this.organization,
                application: this.data.item.id,
            }
            const feedback = {
                successMsg: 'Record has been authorized successfully',
            };
            this.transitionDocument(postObject, feedback);
        },
        authorizeApplication: (revised_amount?) => {
            this.getUserOrganization();
            this.loading = true;
            const params = {
                key: 'current_org_id',
                value: this.organization,
            }
            const updateObj = {
                revised_amount,
            };
            this._dataLayer.update('applications', this.data.item.id,
                updateObj, params)
                .subscribe(resp => {
                    this.dialogActions.firstApproveApplication();
                }, err => {
                    console.log(err);
                    const errMsg = 'An error occurred while authorizing application';
                    this._dataLayer.openDynamicSnackBar(errMsg, 'error');
                })
        },
        rationalizeApplication: (comment?) => {
            this.getUserOrganization();
            const ratObj = {
                comment: comment || 'Application rationalized',
                review_status: 'RATIONALIZED',
                organization: this.organization,
                application: this.data.item.id,
            };
            const params = {
                key: 'current_org_id',
                value: this.organization,
            };
            this.loading = true;
            this._dataLayer.create(this.data.configs.store, ratObj, undefined, params)
            .subscribe(resp => {
                console.log(resp);
                this.loading = false;
                this.closeDialog('refresh');
                this._dataLayer.openDynamicSnackBar(
                    'Application rationalized successfully', 'success'
                );
            }, err => {
                console.log(err);
                this.loading = false;
                this._dataLayer.openDynamicSnackBar(
                    'An error occurred', 'error'
                );
            })
        },
        approveApplication: (comment?) => {
            this.getUserOrganization();
            this.loading = true;
            const approveObj = {
                comment: comment || 'Calendar of events approved',
                review_status: 'SASDEF_APPROVED',
                organization: this.organization,
                application: this.data.item.id,
            };
            const params = {
                key: 'current_org_id',
                value: this.organization,
            };
            this._dataLayer.create(this.data.configs.store, approveObj, undefined, params)
            .subscribe(resp => {
                this.loading = false;
                this.closeDialog('refresh');
                this._dataLayer.openDynamicSnackBar(
                    'Application has been approved successfully', 'success');
            }, err => {
                console.log(err);
                this.loading = false;
                this._dataLayer.openDynamicSnackBar('An error occurred', 'error');
            })
        },
        rejectApplication: (comment?) => {
            this.getUserOrganization();
            this.loading = true;
            const postObject = {
                comment: this.comment || 'Application rejected',
                review_status: 'REJECTED',
                organization: this.organization,
                application: this.data.item.id,
            }
            const params = {
                key: 'current_org_id',
                value: this.organization,
            };
            const feedback = {
                successMsg: 'Record has been rejected successfully',
            };
            this._dataLayer.create(this.data.configs.store, postObject, undefined, params)
            .subscribe(resp => {
                this.loading = false;
                this.closeDialog('refresh');
                this._dataLayer.openDynamicSnackBar(
                    'Application has been rejected successfully', 'success');
            }, err => {
                console.log(err);
                this.loading = false;
                this._dataLayer.openDynamicSnackBar('An error occurred', 'error');
            })
        },
        update: () => {
            this.getUserOrganization();
            this.loading = true;
            const patchParams = {key: 'current_org_id', value: this.organization };
            this._dataLayer.update(this.data.configs.store, 
                this.data.item.id, { status: 'SUBMITTED' }, patchParams)
                .subscribe(resp => {
                    this.loading = false;
                    this.closeDialog('refresh');
                    this.openSnackBar('Record has been submitted successfully', 'CLOSE');
                }, err => {
                    console.log(err);
                    this.loading = false;
                    this.openSnackBar('An error occurred', 'CLOSE');
                });
        },
        submitted: () => {
            this.getUserOrganization();
            this.loading = true;
            const approveObj = {
                comment: this.comment || 'Budget submitted',
                review_status: 'SUBMITTED',
                organization: this.organization,
                org_budget: this.data.item.id,
            };
            this._dataLayer.create(this.data.configs.store, approveObj)
            .subscribe(resp => {
                this.loading = false;
                this.closeDialog('refresh');
                this._dataLayer.openDynamicSnackBar(
                    'Budget has been submitted successfully', 'success');
            }, err => {
                console.log(err);
                this.loading = false;
                this._dataLayer.openDynamicSnackBar('An error occurred', 'error');
            })
        },
        approve: (comment?) => {
            this.getUserOrganization();
            this.loading = true;
            const approveObj = {
                comment: comment || 'Calendar of events approved',
                review_status: 'SASDEF_APPROVED',
                organization: this.organization,
                org_budget: this.data.item.id,
            };
            this._dataLayer.create(this.data.configs.store, approveObj)
            .subscribe(resp => {
                this.loading = false;
                this.closeDialog('refresh');
                this._dataLayer.openDynamicSnackBar(
                    'Calendar of events has been approved successfully', 'success');
            }, err => {
                console.log(err);
                this.loading = false;
                this._dataLayer.openDynamicSnackBar('An error occurred', 'error');
            })
        },
        rationalize: (comment?) => {
            this.getUserOrganization();
            const ratObj = {
                comment: comment || 'Calendar of events rationalized',
                review_status: 'RATIONALIZED',
                organization: this.organization,
                org_budget: this.data.item.id,
            };
            const params = {
                key: 'current_org_id',
                value: this.organization,
            };
            this.loading = true;
            this._dataLayer.create(this.data.configs.store, ratObj, undefined, params)
            .subscribe(resp => {
                console.log(resp);
                this.loading = false;
                this.closeDialog('refresh');
                this._dataLayer.openDynamicSnackBar(
                    'Calendar of events rationalized successfully', 'success'
                );
            }, err => {
                console.log(err);
                this.loading = false;
                this._dataLayer.openDynamicSnackBar(
                    'An error occurred', 'error'
                );
            })
        },
        approveBudget: (comment?) => {
            const params = {
                key: 'current_org_id',
                value: this.organization,
            }
            this.loading = true;
            this.activities.forEach((activity, ind) => {
                const updateObj = {
                    status: activity.approved ? 'APPROVED' : 'REJECTED',
                };
                this._dataLayer.update('organization-budget-activities', 
                    activity['id'], updateObj, params)
                    .subscribe(resp => {
                        if (ind === this.activities.length - 1) {
                            this.dialogActions.approve(comment);
                        }
                    }, err => {
                        console.log(err);
                        this.loading = false;
                    })
            })
        },
        reject: (comment?) => {
            this.getUserOrganization();
            this.loading = true;
            const rejectObj = {
                comment: comment || 'Calendar of events rejected',
                review_status: 'REJECTED',
                organization: this.organization,
                org_budget: this.data.item.id,
            };
            this._dataLayer.create(this.data.configs.store, rejectObj)
            .subscribe(resp => {
                this.loading = false;
                this.closeDialog('refresh');
                this._dataLayer.openDynamicSnackBar(
                    'Calendar of events has been rejected successfully', 'success');
            }, err => {
                console.log(err);
                this.loading = false;
                this.openSnackBar('An error occurred', 'CLOSE');
            })
        }
    };

    submitAction() {
        console.log('Submit called');
    }

    closeDialog(arg?) {
        this.dialogRef.close(arg);
    }

    updateAllApproved() {
        this.allApproved = !isEmpty(this.activities) &&
            this.activities.every(activity => activity.approved);
    }

    someApproved(): boolean {
        if (isEmpty(this.activities)) {
            return false;
        }
        return this.activities.filter(activity => activity.approved).length > 0
            && !this.allApproved; 
    }

    setAllApproved(completed: boolean) {
        this.allApproved = completed;
        if (isEmpty(this.activities)) return;
        this.activities.forEach(activity => activity.approved = completed);
    }

    fetchNested() {
        this.getUserOrganization();
        const params = {
            current_org_id: this.organization,
            org_budget: this.data.item.id,
        }
        this._dataLayer.list('organization-budget-activities', params)
            .subscribe(resp => {
                this.activities = resp['results'];
                this.setAllApproved(true);
            }, err => {
                console.log(err);
            })
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
            })
    }

    ngOnInit() {
        this.formInit();
        if (this.data.configs.store === 'organization-budget-reviews') {
            this.fetchNested();
        }
    }
}