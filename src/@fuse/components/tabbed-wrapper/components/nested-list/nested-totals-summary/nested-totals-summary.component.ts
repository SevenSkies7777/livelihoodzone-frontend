import { Component, Input, OnChanges, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { DataLayerService } from 'app/services/http/dataLayer.service';
import { get, has } from 'lodash';

@Component({
    selector: 'nested-totals-summary',
    templateUrl: 'nested-totals-summary.component.html',
    styleUrls: ['nested-totals-summary.component.scss'],
})

export class NestedTotalsSummaryComponent implements OnInit, OnChanges{
    @Input() item;

    constructor(private _dataLayer: DataLayerService) {}

    refreshItem() {
        const orgId = get(JSON.parse(localStorage.getItem('organization')), 'organization', null);
        const orgObj = { current_org_id: orgId };
        this._dataLayer.get('organization-budget-activities', this.item.id, orgObj)
            .subscribe(resp => {
                this.item = { ...this.item, ...resp };
            })
    }

    ngOnInit() {}

    ngOnChanges(changes: SimpleChanges) {
        if (has(changes, 'item') && 
            !changes['item'].firstChange) {
                this.refreshItem();
            }
    }
}