import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { DataLayerService } from 'app/services/http/dataLayer.service';
import { get } from 'lodash';

@Component({
    selector: 'nested-main-dialog',
    templateUrl: 'nested-main-dialog.component.html',
    styleUrls: ['nested-main-dialog.component.scss'],
    providers: [DataLayerService],
})

export class NesteMainDialogComponent implements OnInit {
    loading: boolean;
    submitted: boolean;
    orgId: string;

    constructor(public _dialogRef: MatDialogRef<NesteMainDialogComponent>,
        private _dataLayer: DataLayerService,
        @Inject(MAT_DIALOG_DATA) public data: any) {}

    receiveModel(model) {
        this.submitted = true;
        model = {
            ...model,
            org_budget: this.data.budget.id,
            organization: this.orgId,
        }
        const createParams = { key: 'current_org_id', value: this.orgId };
        this._dataLayer.create('organization-budget-activities', 
            model, undefined, createParams)
            .subscribe(resp => {
                this.submitted = false;
                const msg = 'Activity successfuilly added';
                this._dataLayer.openDynamicSnackBar(msg, 'success');
                this.closeDialog(resp);
            }, err => {
                this.submitted = false;
                const errMsg = 'An error occurred while adding activity. Try again';
                this._dataLayer.openDynamicSnackBar(errMsg, 'error');
            });
    }

    closeDialog(model?) {
        this._dialogRef.close(model);
    }

    ngOnInit() {
        const organization = JSON.parse(localStorage.getItem('organization'));
        this.orgId = get(organization, 'organization', null);
    }
}