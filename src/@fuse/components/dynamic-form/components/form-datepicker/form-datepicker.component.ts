import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FieldType } from '@ngx-formly/core';
import { has } from 'lodash';

import * as moment from 'moment';

@Component({
    selector: 'dynamic-datepicker',
    templateUrl: './form-datepicker.component.html',
    styleUrls: ['./form-datepicker.component.scss'],
})

export class FormDatePickerComponent extends FieldType implements OnInit {
    constructor(private _route: ActivatedRoute) {
        super();
    }

    prefillValue() {
        this._route.queryParams.subscribe(params => {
            const val = params[this.to.paramValue];
            this.formControl.setValue(val);
        })
    }

    ngOnInit() {
        if (this.formControl.value) {
            const date = new Date(this.formControl.value);
            this.formControl.setValue(date);
        } else {
            if (has(this.to, 'paramValue')) {
                this.prefillValue();
            } else {
                const today = new Date();
                this.formControl.setValue(today);
            }
        }
    }
}