import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FieldType } from '@ngx-formly/core';
import * as _ from 'lodash';
import { get, has, isUndefined } from 'lodash';

import { MatDialog } from '@angular/material/dialog';

import { 
    DataLayerService 
} from '../../../../../app/services/http/dataLayer.service';
import { FormSelectDialogComponent } from './form-select-dialog/form-select-dialog.component';

@Component({
    selector: 'dynamic-select',
    templateUrl: './form-select.component.html',
    styleUrls: ['./form-select.component.scss'],
})

export class FormSelectComponent extends FieldType implements OnInit {
    @Input() items: Array<any> = [];

    match: any;
    value: any;
    dropdown: boolean;
    loading: boolean;
    paramQueries: any;
    categories: Array<any> = [];

    constructor(
        private dataLayer: DataLayerService,
        private _dialog: MatDialog,
        private _route: ActivatedRoute) { super() }

    getOptions(searchTerm?) {
        let opts = searchTerm ? 
            { search: searchTerm.term, limit: 1000 } : { limit: 10000 };
        if (!isUndefined(this.paramQueries)) opts = { 
            ...opts, ...this.paramQueries };
        if (this.to.optionsResource) {
            this.dataLayer.list(this.to.optionsResource, opts)
            .subscribe(resp => {
                this.items = resp['results'];
            }, err => console.log(err));
        }
    }

    underScoreReplace(str) {
        return !_.isUndefined(str) && _.isString(str) ? 
            str.replace(/_/g, ' ') : str ;
    }

    checkIfOrg() {
        if (this.to.stateParam['key'] === 'organization') {
            return get(JSON.parse(localStorage.getItem(
                'organization')), 'organization', null);
        } else {
            return null;
        }
    }

    prefillValue() {
        this._route.queryParams.subscribe(params => {
            const val = parseInt(params[this.to.paramValue], 10);
            this.formControl.setValue(val);
        })
    }

    openDialog() {
        const dialogRef = this._dialog.open(FormSelectDialogComponent, {
            data: {
                options: this.to,
            },
            width: '60%',
        })
        dialogRef.afterClosed().subscribe(result => {
            console.log(result);
            if (!isUndefined(result)) {
                this.getOptions();
            }
        })
    }

    addNew() {
        this.dropdown = false;
        this.openDialog();
    }

    setStateParam() {
        const orgId = get(JSON.parse(
            localStorage.getItem('organization')), 'organization', null);
        this._route.queryParams.subscribe(params => {
            this.paramQueries = {
                [this.to.stateParam['key']] : params[this.to.stateParam['value']] ||
                    this.checkIfOrg(),
                current_org_id: orgId,
            };
            this.getOptions();
        });
    }

    ngOnInit() {
        this.items = this.categories;
        if(has(this.to, 'stateParam')) {
            this.setStateParam();
        } else {
            this.getOptions();
        }
        if (has(this.to, 'paramValue')) {
            this.prefillValue();
        }
    }

}