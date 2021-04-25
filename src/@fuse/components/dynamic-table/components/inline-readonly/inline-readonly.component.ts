import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { DataLayerService } from 'app/services/http/dataLayer.service';
import { findLastIndex } from 'lodash';
import { forkJoin } from 'rxjs';
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
    itemZones: any;

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

    updateLivelihoodzone() {
        const putObj = {
            active: true,
            countyId: this.item.countyId,
            livelihoodZoneIds: this.list
                .filter(zone => zone.selected)
                .map(zone => {
                    return { livelihoodZoneId: zone.livelihoodZoneId }
                })
        };
        this._dataLayer.putUpdate('update-county-livelihoodzones', putObj)
            .subscribe(resp => {
                const msg = 'Livelihoodzones successfully updated';
                this._dataLayer.openDynamicSnackBar(msg, 'success');
                this.fetchItems();
            }, err => {
                this.fetchItems();
                const errMsg = 'An error occurred';
                this._dataLayer.openDynamicSnackBar(errMsg, 'error');
            })
    }

    fetchItems() {
        this.loading = true;
        const allZones = this._dataLayer.list('livelihoodzones', {});
        const countyZones = this._dataLayer.get('county-livelihoodzones', 
            this.item.countyId);
        forkJoin([allZones, countyZones])
            .subscribe((resp:any) => {
                this.loading = false;
                this.list = resp[0];
                this.itemZones = resp[1].livelihoodZones;
                this.list.map(zone => {
                    zone.selected = findLastIndex(this.itemZones, { 
                        livelihoodZoneId: zone.livelihoodZoneCode 
                    }) >= 0;
                })
            }, err => {
                console.log(err);
                this.loading = false;
            });
    }

    ngOnInit() {
        this.organization = JSON.parse(localStorage.getItem('organization'));
        this.fetchItems();
    }
}