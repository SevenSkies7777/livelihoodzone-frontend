import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { DataLayerService } from 'app/services/http/dataLayer.service';
import { Authorization }  from 'app/services/authorization.service';
import { each, find, get, indexOf, isUndefined } from 'lodash';
import { AttachmentDialog } from './attachment-dialog/attachment-dialog.component';

@Component({
    selector: 'attachments-listing',
    templateUrl: 'attachments-listing.component.html',
})

export class AttachmentsListing implements OnInit {
    @Input() tab: any;
    @Input() item: any;

    loading:  boolean = true;
    list: Array<any> = [];
    linkedOrgId: string;
    linkedOrganization: any;
    organization: any;

    constructor(private _dataLayer: DataLayerService,
        private _authConfig: Authorization,
        private _dialog: MatDialog,
        private _route: ActivatedRoute) {}

    fileChange(files, docType) {
        const file = files.target.files[0];
        const fileFormData = {
            file,
            attachment_type: 'APPLICATION_DOCUMENT',
            document_type: docType.id,
            organization: this.organization,
        };
        const formData = new FormData();
        formData.append('file', fileFormData.file);
        formData.append('attachment_type', fileFormData.attachment_type);

        let attachmentObj = {
            attachment: '',
            organization: this.organization,
            // application: this.item['id'],
            document_type: fileFormData.document_type
        };
        this._dataLayer.uploadFile('attachments', formData)
        .subscribe(resp => {
            attachmentObj = { ...attachmentObj, attachment: resp['id'] };
            const params = { key: 'current_org_id', value: this.organization };
            this._dataLayer.create('organization-attachments', 
                attachmentObj, undefined, params)
                .subscribe(resp => {
                    this.getApplicationAttachments();
                }, err => console.log(err));
        }, err => console.log(err));
    }

    selectDocType(docType) {
        const dialogRef = this._dialog.open(AttachmentDialog, {
            data: {
                organization: this.organization,
                document_type: docType,
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log(result);
            if (result === 'refresh') {
                this.getDocumentTypes();
            }
        })
    }

    getApplicationAttachments() {
        const params = { 
            organization: this.organization,
            current_org_id: this.organization,
        };
        this._dataLayer.list('organization-attachments', params)
        .subscribe(resp => {
            const appAttachments = resp['results'];

            each(appAttachments, (attachment) => {
                const ind = indexOf(this.list, find(
                    this.list, { id: attachment.document_type }));
                if (ind >= 0) {
                    this._dataLayer.get('attachments', attachment.attachment)
                        .subscribe(resp => {
                            this.list[ind]['attachment_data'] = resp;
                        }, err => console.log(err));
                }
            });
        }, err => console.log(err));
    }

    getDocumentTypes() {
        const params = { 
            org_type: this.linkedOrganization.org_type,
            current_org_id: this.organization,
        };
        this.loading = true;
        this._dataLayer.list('document-types', { ...params })
        .subscribe(resp => {
            this.loading = false;
            this.list = resp['results'];
            this.getApplicationAttachments();
        }, err => {this.loading = false; console.log(err) });
    }

    getOrgnization(orgId) {
        this._dataLayer.get('organizations', orgId, 
        { current_org_id: this.organization })
        .subscribe(resp => {
            this.linkedOrganization = resp;
            this.getDocumentTypes();
        }, err => console.log(err));
    }

    getParams() {
        this._route.queryParams.subscribe(params => {
            this.linkedOrgId = params['organization'];
            this.getOrgnization(params['organization']);
        })
    }

    ngOnInit() {
        this.organization = get(
            JSON.parse(this._authConfig.getOrganization()), 
            'organization', null
        );
        this.getParams();
    }
}