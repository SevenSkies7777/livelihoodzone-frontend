import { HttpClient, HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';

import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';

import { pipe } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { requiredFileType } from '@fuse/components/dynamic-form/common/upload-file-validators';

import { DataLayerService } from 'app/services/http/dataLayer.service';
import { environment as e } from 'environments/environment';
import { get } from 'lodash';

export function uploadProgress<T>(cb: (progress: number) => void) {
    return tap((event: HttpEvent<T>) => {
        if (event.type === HttpEventType.UploadProgress) {
            cb(Math.round((100 * event.loaded)/ event.total));
        }
    })
}

export function toResponseBody<T>() {
    return pipe(
        filter((event: HttpEvent<T>) => event.type === HttpEventType.Response),
        map((res: HttpResponse<T>) => res.body)
    );
}

@Component({
    selector: 'attachment-dialog',
    styleUrls: ['attachment-wrapper-dialog.component.scss'],
    templateUrl: 'attachment-wrapper-dialog.component.html',
    providers: [DataLayerService],
})

export class AttachmentWrapperDialog implements OnInit {
    loading: boolean;
    submitted: boolean;
    orgId: string;
    context: string;
    progress = 0;

    sUrl = e.serverURL;

    model: any;
    success: false;
    uploadForm: FormGroup;

    constructor(
        private http: HttpClient,
        private _formBuilder: FormBuilder,
        public _dialogRef: MatDialogRef<AttachmentWrapperDialog>,
        private _dataLayer: DataLayerService,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {}

    formInit() {
        this.uploadForm = this._formBuilder.group({
            description: [''],
            attachment: ['', [Validators.required, requiredFileType('pdf')]],
        });
    }

    get f() { return this.uploadForm.controls }

    submitForm(frm) {
        console.log(frm, this.uploadForm);
        if (!frm.valid) {
            markAllAsDirty(this.uploadForm);
            return;
        }
        this.loading = true;
        const { attachment, description } = this.uploadForm.value;
        const fileObj = { file: attachment, attachment_type: 'APPLICATION_DOCUMENT' };
        let attachmentObj = {
            attachment: '',
            description,
            document_type: this.data.document_type,
            organization: this.data.organization,
        };
        this.http.post(`${this.sUrl}/common/attachments/`, toFormData(fileObj), {
            reportProgress: true,
            observe: 'events',
        }).pipe(
            uploadProgress(progress => (this.progress = progress)),
            toResponseBody()
        ).subscribe(resp => {
            this.progress = 0;
            attachmentObj = { ...attachmentObj, attachment: resp['id'] };
            this._dataLayer.create('organization-attachments', attachmentObj)
                .subscribe(resp => {
                    console.log(resp);
                    this.uploadForm.reset();
                    this.loading = false;
                    this.closeDialog('regresh');
                    const msg = 'File sucessfully uploaded';
                    this._dataLayer.openDynamicSnackBar(msg, 'success');
                }, err => {
                    console.log(err);
                    this.loading = false;
                })
        }, err => {
            console.log(err);
            this.loading = false;
        });

    }

    closeDialog(resp?) {
        this._dialogRef.close(resp);
    }

    hasError(field: string, error: string) {
        const control =  this.uploadForm.get(field);
        return control.dirty && control.hasError(error);
    }

    ngOnInit() {
        console.log(this.data);
        this.formInit();
    }
}

export function markAllAsDirty( form: FormGroup ) {
    for ( const control of Object.keys(form.controls) ) {
      form.controls[control].markAsDirty();
    }
  }
  
export function toFormData<T>( formValue: T ) {
    const formData = new FormData();
  
    for ( const key of Object.keys(formValue) ) {
      const value = formValue[key];
      formData.append(key, value);
    }
  
    return formData;
}