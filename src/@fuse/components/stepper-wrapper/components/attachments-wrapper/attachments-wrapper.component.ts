import { Component, Input, OnInit, Output, EventEmitter }  from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataLayerService } from 'app/services/http/dataLayer.service';
import { Authorization } from 'app/services/authorization.service';

import { findIndex, find, isUndefined, has, each, indexOf } from 'lodash';
import { AttachmentWrapperDialog } from './attachment-wrapper-dialog/attachment-wrapper-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'attachment-wrapper',
    templateUrl: 'attachments-wrapper.component.html',
    styleUrls: ['../list-wrapper/list-wrapper.component.scss', 
        'attachments-wrapper.component.scss'],
})

export class AttachmentsWrapper implements OnInit {
    @Input() steps: any;
    @Input() current: any;

    @Output() onNavigate = new EventEmitter();

    configs: any;
    organization: any;
    list: Array<any> = [];
    attachmentsList: Array<any> = [];
    loading: boolean = true;
    uploadLoader: boolean;
    isLast: boolean = false;
    itemId: any;

    constructor(private _route: ActivatedRoute,
        private _authConfig: Authorization,
        private _dialog: MatDialog,
        private _dataLayer: DataLayerService) {}

    changeStep(context) {
        this.onNavigate.emit(context);
    }

    budgetAttachmentUpload(files) {
        const file = files.target.files[0];
        const fileFormat = {
            file,
            attachment_type: 'ORGANIZATION_BUDGET',
            budget: this.itemId,
        };
        let attachmentObj = {
            attachment: '',
            organization: this.organization['organization'],
            org_budget: this.itemId,
        };
        const formData = new FormData();
        formData.append('file', fileFormat.file);
        formData.append('attachment_type', fileFormat.attachment_type);
        this.uploadLoader = true;
        this._dataLayer.uploadFile('attachments', formData)
            .subscribe(resp => {
                attachmentObj = { ...attachmentObj, attachment: resp['id'] };
                const params = { 
                    key: 'current_org_id', 
                    value: this.organization['organization' ]
                };
                this._dataLayer.create(this.configs.attachmentStore, attachmentObj, undefined, params)
                    .subscribe(resp => {
                        const msg = 'File succesfully uploaded';
                        this._dataLayer.openDynamicSnackBar(msg, 'success');
                        this.getBudgetAttachments();
                        this.uploadLoader = false;
                    }, err => {
                        console.log(err);
                        const msg = 'An error occurred while uploading file. Kindly try again';
                        this._dataLayer.openDynamicSnackBar(msg, 'error');
                        this.uploadLoader = false;
                    })
            }, err => {
                this.uploadLoader = false;
                console.log(err);
            })
    }

    fileChange(files, docType) {
        const file = files.target.files[0];
        const fileFormData = {
            file,
            attachment_type: 'APPLICATION_DOCUMENT',
            document_type: docType.id,
            organization: this.organization['organization'],
        };
        const formData = new FormData();
        formData.append('file', fileFormData.file);
        formData.append('attachment_type', fileFormData.attachment_type);

        let attachmentObj = {
            attachment: '',
            organization: this.organization['organization'],
            // application: this.itemId,
            document_type: fileFormData.document_type
        };
        this._dataLayer.uploadFile('attachments', formData)
        .subscribe(resp => {
            const params = { 
                key: 'current_org_id', 
                value: this.organization['organization' ]
            };
            attachmentObj = { ...attachmentObj, attachment: resp['id'] };
            this._dataLayer.create('organization-attachments', attachmentObj, undefined, params)
            .subscribe(resp => {
                console.log(resp);
                this.getApplicationAttachments();
            }, err => console.log(err));
        }, err => console.log(err));
    }

    selectDocType(docType) {
        const dialogRef = this._dialog.open(AttachmentWrapperDialog, {
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
            organization: this.organization['organization'],
            current_org_id: this.organization['organization'],
        }
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

            // this.list = this.list.map(docTypeObj => {
            //     const linkedFile = find(appAttachments, { 
            //         document_type: docTypeObj['id']
            //     });
            //     if (!isUndefined(linkedFile)) {
            //         docTypeObj['fileObj'] = linkedFile;
            //         docTypeObj['linkedAttachment'] = linkedFile['id'];
            //         docTypeObj['attachment_data'] = linkedFile['attachment_data'];
            //         return docTypeObj;
            //     } else {
            //         return docTypeObj;
            //     }
            // })
        }, err => console.log(err));
    }

    getBudgetAttachments() {
        this.organization = JSON.parse(localStorage.getItem('organization')) || {};
        const params = {
            current_org_id: this.organization['organization'],
            org_budget: this.itemId,
        };
        this.loading = true;
        this._dataLayer.list(this.configs.attachmentStore, { ...params })
            .subscribe(resp => {
                const attachArray = resp['results'];
                attachArray.map(obj => {
                    this._dataLayer.get('attachments', obj['attachment'],
                    { current_org_id: this.organization['organization']})
                    .subscribe(fileResp => {
                        obj['file'] = fileResp;
                        this.attachmentsList.push(obj);
                        this.list.push(obj);
                    })
                });
                this.loading = false;
            }, err => {
                console.log(err);
                this.loading = false;
                const msg = 'An error message occurred while retrieving list';
                this._dataLayer.openDynamicSnackBar(msg, 'error');
            })
    }

    getDocumentTypes() {
        // TODO: Bring back once API fixed
        const params = { 
            org_type__org_type_code: this.organization.org_type,
            current_org_id: this.organization['organization'],
        };
        // const params = { };
        this._dataLayer.list('document-types', { ...params })
        .subscribe(resp => {
            this.loading = false;
            this.list = resp['results'];
            this.getApplicationAttachments();
        }, err => console.log(err));
    }

    getItem(params) {
        this.organization = JSON.parse(localStorage.getItem('organization')) || {};
        this.getDocumentTypes();
    }

    getItemId() {
        this._route.queryParams.subscribe(params => {
            const current = parseInt(params.current, 10);
            this.itemId = params['id'];
            const ind = findIndex(this.steps, { count: current });
            this.isLast = this.steps.length === ind + 1;
            this.configs = this.steps[ind].gridConf;
            if (has(this.configs, 'attachmentStore')) {
                this.getBudgetAttachments();
            } else {
                this.getItem(params);
            }
        })
    }

    ngOnInit() {
        this.getItemId();
    }
}