import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { DataLayerService } from 'app/services/http/dataLayer.service';

@Component({
    selector: 'complaint-dialog',
    templateUrl: 'complaint-dialog.component.html',
    styleUrls: ['complaint-dialog.component.scss'],
    providers: [DataLayerService],
})

export class ComplaintDialogComponent implements OnInit {
    complaintForm: FormGroup;
    loading: boolean;
    fields: Array<any> = [
        {
            field: 'full_name',
            type: 'text',
            label: 'Full name',
            required: true,
        },
        {
            field: 'email',
            type: 'text',
            label: 'Email',
            required: false,
        },
        {
            field: 'phone_number',
            type: 'text',
            label: 'Phone Number',
            required: false,
        },
        {
            field: 'subject',
            type: 'text',
            label: 'Subject',
            required: false,
        },
        {
            field: 'body',
            type: 'text-area',
            label: 'Message',
            required: true,
        },
    ]

    constructor(private _formBuilder: FormBuilder,
        private _dataLayer: DataLayerService,
        public _dialogRef: MatDialogRef<ComplaintDialogComponent>) {}

    formInit() {
        let formFields = {};
        this.fields.forEach(ctrl => {
            formFields[ctrl.field] = ctrl.required 
                ? new FormControl('', [Validators.required])
                : new FormControl('');
        })
        this.complaintForm = new FormGroup({
            ...formFields,
        })
    }

    closeDialog() {
        this._dialogRef.close();
    }

    get f() { return this.complaintForm.controls };

    submitComplaint() {
        const model = this.complaintForm.value;
        this.loading = true;
        console.log(this.complaintForm.valid, model);
        this._dataLayer.create('complaints', model)
            .subscribe(resp => {
                console.log(resp)
                const msg = 'Thank you for your feedback. We will be working on it.';
                this.closeDialog();
                this._dataLayer.openDynamicSnackBar(msg, 'success');
            }, err => {
                console.log(err);
                const errMsg = 'An error occurred, during submission. Kindly try again';
                this._dataLayer.openDynamicSnackBar(errMsg, 'error');
            })
    }

    ngOnInit() {
        this.formInit();
    }
}