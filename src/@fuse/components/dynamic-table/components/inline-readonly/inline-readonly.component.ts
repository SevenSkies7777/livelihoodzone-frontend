import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { DataLayerService } from 'app/services/http/dataLayer.service';
import { InlineReadOnlyDialog } from '../inline-readonly-dialog/inline-readonly-dialog.component';

@Component({
    selector: 'inline-readonly',
    templateUrl: './inline-readonly.component.html',
    styleUrls: ['inline-readonly.component.scss', 
        '../dynamic-table/dynamic-table.component.scss'],
    providers: [DataLayerService],
})

export class InlineReadonlyComponent implements OnInit {
    @Input() item: any;

    @Output() toggleRow = new EventEmitter();
    @Output() refreshList = new EventEmitter();

    list: Array<any> = [];
    loading: boolean;
    organization: any;
    configs: any;

    constructor(private _dataLayer: DataLayerService,
        private _dialog: MatDialog) {}

    setConfigs(action) {
        switch(action) {
            case 'Review':
                return {
                    title: 'Review Complaint',
                    description: `Kidnly verify that you would indeed like
                        to review this complaint.`,
                    action: 'REVIEW',
                    context: 'Review',
                };
            case 'Resolve':
                return {
                    title: 'Resolve Complaint',
                    description: ``,
                    action: 'RESOLVE',
                    context: 'Resolve',
                };
            case 'Close':
                return {
                    title: 'Close Complaint',
                    description: ``,
                    action: 'CLOSE',
                    context: 'Close',
                }
            default: 
                throw Error('Provide a valid choice');
        }
    }

    openDialog(action) {
        const item = this.item;
        const configs:any = this.setConfigs(action);
        const dialogRef = this._dialog.open(InlineReadOnlyDialog, {
            data: {
                item,
                configs,
                context: configs.context,
            },
            width: '45%',
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result === 'refresh') {
                this.refreshList.emit();
            }
        })
    }

    toggleReadOnly() {
        this.toggleRow.emit(this.item);
    }

    fetchItemReviews() {
        const params = {
            current_org_id: this.organization.organization,
            complaint: this.item.id,
        };
        this.loading = true;
        this._dataLayer.list('complaint-reviews', params)
            .subscribe((resp: any) => {
                this.list = resp['results'];
                this.loading = false;
                this.list.forEach(review => {
                    const params = {
                        current_org_id: this.organization.organization,
                        complaint_review: review['id'],
                    };
                    this._dataLayer.list('complaint-review-attachments', params)
                        .subscribe((resp: any) => {
                            const attachList = resp['result'] || [];
                            if (attachList.length) {
                                review['file'] = attachList[0]['attachment_data'];
                            }
                        })
                })
            }, err => {
                console.log(err);
                this.loading = false;
            });
    }

    ngOnInit() {
        this.organization = JSON.parse(localStorage.getItem('organization'));
        this.fetchItemReviews();
    }
}