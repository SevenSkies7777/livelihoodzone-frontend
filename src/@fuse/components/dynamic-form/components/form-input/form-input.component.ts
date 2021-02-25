import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FieldType } from '@ngx-formly/core';
import { has } from 'lodash';

@Component({
    selector: 'dynamic-input',
    templateUrl: 'form-input.component.html',
    styleUrls: ['./form-input.component.scss'],
})

export class FormInputComponent extends FieldType implements OnInit {
    match: any;

    constructor(private _route: ActivatedRoute) { super() }

    prefillValue() {
        this._route.queryParams.subscribe(params => {
            const val = parseFloat(params[this.to.paramValue]);
            this.formControl.setValue(val);
        })
    }

    ngOnInit() {
        if (has(this.to, 'paramValue')) {
            this.prefillValue();
        }
    }
}