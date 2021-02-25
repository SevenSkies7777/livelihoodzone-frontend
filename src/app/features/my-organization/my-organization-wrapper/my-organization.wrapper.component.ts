import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router }  from '@angular/router';
import * as _ from 'lodash';

@Component({
    selector: 'my-organization-wrapper',
    templateUrl: './my-organization-wrapper.component.html',
    styles: [
        `
            :host {
                width: 100%;
            }
        `
    ],
})

export class MyOrganizationWrapper implements OnInit {
    orgId: number;
    showTabs: boolean;

    constructor(private _router: Router,
        private _route: ActivatedRoute) {

    }

    idParamChecker() {
        this._route.queryParams.subscribe(params => {
            const id = params['id'];
            if (!_.isUndefined(id)) {
                this.showTabs = true;
            } else {
                this._router.navigate(['/my-organization/details'], 
                    { queryParams: { id: this.orgId } });
            }
        });
    }

    ngOnInit() {
        this.orgId = JSON.parse(
            localStorage.getItem('organization')).organization;
        this.idParamChecker()
    }
}