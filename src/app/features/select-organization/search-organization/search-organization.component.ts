import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute }  from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatDialog } from '@angular/material/dialog';

import { JoinRequestDialogComponent } from '../join-request-dialog/join-request-dialog.component';

import { DataLayerService } from 'app/services/http/dataLayer.service';
import { Authorization } from 'app/services/authorization.service';
import { find, indexOf, isUndefined } from 'lodash';

@Component({
    selector: 'search-organization',
    templateUrl: './search-organization.component.html',
    styleUrls: ['../list-organizations/list-organizations.component.scss',
        '../preselect-dialog/preselect-dialog.component.scss'],
    providers: [DataLayerService],
})

export class SearchOrganizationComponent implements OnInit {
    paramObj: any;
    orgForm: FormGroup;
    list: Array<any> = [];
    loading: boolean;
    addRouteParams: any = { current: 1 };
    organizationTypes: Array<any> = [];
    // grid configs
    headers: Array<any> = [
        { title: 'Name' },
        { title: 'Contacts' },
        { title: 'Actions' }
    ];

    rows: Array<any> = [
        { key: 'name', type: 'string' },
        { key: 'org_type_code', type: 'string' },
    ];

    actions:Array<any> = [
        {
            btnText: 'Request to Join',
            status: 'accent',
            icon: false,
            disableStatus: 'FINISHED',
            action: 'tabDetails',
            modalConf: {
                link: '/organizations/details',
                queryParams: { current: 1, step: 1 },
            }
        },
    ];
    user: any;
    organization: any;
    // end of grid configs

    constructor(private _route: ActivatedRoute,
        private _formBuilder: FormBuilder,
        private _authConfig: Authorization,
        private _dataLayer: DataLayerService,
        public dialog: MatDialog,
        private route: Router,
    ) {}

    get f() { return this.orgForm.controls }

    formInit() {
        this.orgForm = this._formBuilder.group({
            name: ['', Validators.required],
            organizationType: ['', Validators.required],
        });
    }

    submitSearch(frm) {
        if (frm.valid) {
            const params = frm.value;
            this.searchOrganizations(params);
        }
    }

    prefillForm(paramsModel) {
        const paramsObj = { ...paramsModel };
        paramsObj.organizationType = parseInt(
            paramsObj.organizationType, 10);
        this.f.name.setValue(paramsObj.name);
        this.f.organizationType.setValue(paramsObj.organizationType);
    }

    openDialog(org?) {
        const dialogRef = this.dialog.open(JoinRequestDialogComponent, {
            data: { 
                user: this.user,
                organization: org,
            },
            width: '50%',
        });

        dialogRef.afterClosed().subscribe(resp => {
            if (!isUndefined(resp)) {
                const params = {
                    name: this.f.name.value,
                    organizationType: this.f.organizationType.value,
                }
                this.searchOrganizations(params);
            }
        })
    }

    selectOrganization(org) {
        this.openDialog(org);
    }

    searchOrganizations(params?) {
        const fetchParams = {
            search: params.name,
            org_type: params.organizationType,
        }
        this.loading = true;
        this._dataLayer.list('organizations', fetchParams)
            .subscribe(resp => {
                this.loading = false;
                this.list = resp['results'];
                this.fetchMyJoinRequests();
            }, err => {
                console.log(err);
                this.loading = false;
            });
    }

    fetchMyJoinRequests() {
        const getParams = {
            requester: this.user['id'],
        };
        this._dataLayer.list('organization-join-requests', getParams)
            .subscribe(resp => {
                const arrCont = resp['results'];
                arrCont.forEach(request => {
                    const ind = indexOf(this.list, find(
                        this.list, { id: request.organization }));
                    if (ind >= 0) this.list[ind].request = request;
                })
            }, err => {
                console.log(err);
            })
    }

    fetchURLParams() {
        this._route.queryParams.subscribe(params => {
            this.prefillForm(params);
            this.paramObj = { ...params, limit: 15 };
            this.addRouteParams = { ...this.addRouteParams, ...params };
            this.searchOrganizations(params);
        }, err => console.log(err));
    }

    fetchOrgTypes() {
        this._dataLayer.list('organization-types', {})
        .subscribe(resp => {
            this.organizationTypes = resp['results'];
            if (this.organizationTypes['length']) {
                this.organizationTypes.map(orgType => {
                    orgType.org_type_code = orgType.org_type_code.replace(/_/g, ' ');
                    return orgType;
                });
            }
        }, err => console.log(err));
    }

    ngOnInit() {
        this.loading = true;
        this.user = JSON.parse(this._authConfig.getUser());
        this.organization = JSON.parse(this._authConfig.getOrganization());
        this.formInit();
        this.fetchOrgTypes();
        this.fetchURLParams();
    }
}