import { Component, Input, OnInit } from '@angular/core';
import * as _ from 'lodash';

@Component({
    selector: 'nested-string',
    template: `
        <span *ngIf="type === 'nested_string'"
        class="font-size-14">
            {{ primaryField | removeUnderscore }}
            <mat-icon *ngIf="!primaryField">remove</mat-icon>
        </span>
        <span *ngIf="type === 'nested_currency'">
            {{ primaryField | currency: 'Kshs '}}
        </span>
        <span *ngIf="type === 'nested_multistrings'">
            {{ primaryField }} {{ secondaryField }}
        </span>
        <span *ngIf="type === 'nested_total'">
            {{ sum(primaryField, secondaryField) | currency: 'Kshs ' }}
        </span>
        <div *ngIf="type === 'nested_range'"
        class="d-flex">
            <div class="font-size-14">{{ primaryField | date: 'MM/yy' }}&nbsp;</div>
            <div style="margin-top:-1.05rem;">
                <mat-icon >minimize</mat-icon>&nbsp;
            </div>
            <div class="font-size-14">{{ secondaryField | date: 'MM/yy' }}</div>
        </div>
    `
})

export class NestedStringComponent implements OnInit {
    @Input() type: string;
    @Input() item: any;
    @Input() config: any;

    primaryField: any;
    secondaryField: any;

    sum(primary, secondary) {
        return parseFloat(primary) * parseFloat(secondary);
    }

    ngOnInit() {
        this.primaryField = _.get(this.item, this.config['primaryField'], null);
        this.secondaryField = _.get(this.item, this.config['secondaryField'], null);
    }
}