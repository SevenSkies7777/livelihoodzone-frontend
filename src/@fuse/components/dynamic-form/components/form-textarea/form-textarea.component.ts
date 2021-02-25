import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FieldType } from '@ngx-formly/core';
import * as _ from 'lodash';

@Component({
    selector: 'dynamic-textarea',
    templateUrl: 'form-textarea.component.html',
    styleUrls: ['./form-textarea.component.scss'],
})

export class FormTextareaComponent extends FieldType {
    match: any;

    constructor() { super() }

}