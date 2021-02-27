import { Component, OnInit } from '@angular/core';

import { DataLayerService } from 'app/services/http/dataLayer.service';
import { Authorization } from 'app/services/authorization.service';
import { each, isNull, keys } from 'lodash';
import * as moment from 'moment';

@Component({
    selector: 'dashboard-wrapper',
    templateUrl: 'dashboard-wrapper.component.html',
    styleUrls: ['dashboard-wrapper.component.scss'],
    providers: [DataLayerService],
})

export class DashboardWrapper implements OnInit {
    user: any;
    organization: any;

    constructor(private _dataLayer: DataLayerService,
        private _authConfig: Authorization) {}

    ngOnInit() {
        this.user = this._authConfig.getToken();
        this.organization = this.user.organizationName;
    }
}