import { Component, Inject, OnInit } from '@angular/core';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { DataLayerService } from 'app/services/http/dataLayer.service';
import { get } from 'lodash';

@Component({
    selector: 'form-select-dialog',
    templateUrl: 'form-select-dialog.component.html',
    providers: [DataLayerService],
})

export class FormSelectDialogComponent implements OnInit {
    loading: boolean;
    submitted: boolean;

    constructor(private _dataLayer: DataLayerService,
        @Inject(MAT_DIALOG_DATA) public data: any,
        public _dialogRef: MatDialogRef<FormSelectDialogComponent>) {

        }

    receiveModel(model) {
        console.log(model);
        this.submitted = true;
        const organization = get(JSON.parse(
            localStorage.getItem('organization')), 'organization', null);
        const params = {
            key: 'current_org_id',
            value: organization,
        }
        model = { ...model, organization };
        this._dataLayer.create('organization-bank-accounts', model, undefined, params)
            .subscribe(resp => {
                const msg = 'Account successfully added';
                this._dataLayer.openDynamicSnackBar(msg, 'success');
                this.closeDialog('refresh');
                this.submitted = false;
            }, err => {
                console.log(err);
                const errMsg = 'An error occurred. Kindly try again.'
                this._dataLayer.openDynamicSnackBar(errMsg, 'error');
                this.submitted = false;
            });
    }

    closeDialog(arg?) {
        this._dialogRef.close(arg);
    }

    ngOnInit() {}
}