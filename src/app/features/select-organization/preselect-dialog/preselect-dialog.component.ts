import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'preselect-organization-dialog',
    templateUrl: './preselect-dialog.component.html',
    styleUrls: ['./preselect-dialog.component.scss'],
})

export class PreselectOrganizationDialog implements OnInit {
    organizationTypes: Array<any> = [];
    orgForm: FormGroup;

    constructor(private _formBuilder: FormBuilder,
        private _router: Router,
        @Inject(MAT_DIALOG_DATA) public data: any,
        public dialogRef: MatDialogRef<PreselectOrganizationDialog>) {}

    formInit() {
        this.orgForm = this._formBuilder.group({
            name: ['', Validators.required],
            organizationType: ['', Validators.required],
        });
    }

    closeDialogue() {
        this.dialogRef.close();
    }

    submitQuery(frm) {
        if (frm.valid) {
            const queryParams = { ...frm.value };
            this.closeDialogue();
            this._router.navigate(['/select-organization/search'], { queryParams });
        }
    }

    get f() { return this.orgForm.controls }

    ngOnInit() {
        this.formInit();
        this.organizationTypes = this.data.organizationTypes;
    }
}