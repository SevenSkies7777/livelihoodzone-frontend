import { Component, OnInit }  from '@angular/core';
import { Router } from '@angular/router';
import {MatDialog} from '@angular/material/dialog';

import { PreselectOrganizationDialog }  from '../preselect-dialog/preselect-dialog.component'; 

import { Authorization } from '../../../services/authorization.service';
import { DataLayerService } from 'app/services/http/dataLayer.service';

@Component({
    selector: 'list-organizations',
    templateUrl: './list-organizations.component.html',
    styleUrls: ['./list-organizations.component.scss'],
    providers: [Authorization, DataLayerService],
})

export class ListOrganizationComponent implements OnInit {
    organizations: Array<any> = [
        {
            name: 'FKF',
            type: 'FEDERATION',
            request: 'PENDING',
        }
    ];
    user: any;
    searchText: string = '';
    limitTo: number = 10;
    pageSize: number = 10;
    organizationTypes: Array<any>;

    constructor(private _authConfig: Authorization,
        private _dataLayer: DataLayerService,
        public dialog: MatDialog,
        private _router: Router,
    ) { }

    selectOrganization(org) {
        this._authConfig.setOrganization(org);
        this._router.navigateByUrl('/dashboard');
    }

    openDialog() {
        const organizationTypes = this.organizationTypes;
        this.dialog.open(PreselectOrganizationDialog, {
            data: { 
                context: 'Register', 
                organizationTypes,
            },
            width: '50%',
        });
    }

    loadMore() {
        const newLength = this.limitTo + this.pageSize;
        this.limitTo = this.user.organizations.length > 
            newLength ? newLength : this.user.organizations.length;
    }

    getOrganizationTypes() {
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

    logoutUser() {
        this._router.navigate(['/auth/signin'], {
            queryParams: { logout: 'is_logged_out'}
        })
    }

    ngOnInit() {
        const user = JSON.parse(this._authConfig.getUser());
        this.user = { ...user };
        this.getOrganizationTypes();
    }

}