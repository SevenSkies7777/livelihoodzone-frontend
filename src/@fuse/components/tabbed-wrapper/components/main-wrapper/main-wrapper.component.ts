import { Component, OnInit } from '@angular/core';
import {Observable, Observer} from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';

import * as _ from 'lodash';

import { TabbedWrapperService } from '../../services/tabbed-wrapper.service';
import { DataLayerService } from '../../../../../app/services/http/dataLayer.service';
import { Authorization } from '../../../../../app/services/authorization.service';
import { has, get, indexOf } from 'lodash';

import { MainDialogComponent } from '../main-dialog/main-dialog.component';
import { AuthCheckerService } from 'app/services/auth-checkers.service';

@Component({
    selector: 'tabbed-wrapper',
    templateUrl: './main-wrapper.component.html',
    styleUrls: ['./main-wrapper.component.scss'],
    providers: [DataLayerService, AuthCheckerService],
})

export class MainWrapperComponent implements OnInit {
    user: any;
    context: string;
    title: string;
    subTitle: string;
    store: string;
    apiStore: string;

    item: any = {};
    itemId: string;
    listRoute: string;
    configs: any;
    listParams: any;
    tabs: any = [];
    asyncTabs: Observable<[]>;
    currIndex: number = 0;
    organization: any;
    headerConfig: any;
    cmptParams: any = {};
    orgType: string;

    constructor(
        private _router: Router,
        private _route: ActivatedRoute,
        private _authConfig: Authorization,
        private _tabsService: TabbedWrapperService,
        private _dataLayer: DataLayerService,
        public _dialog: MatDialog,
        private _authChecker: AuthCheckerService,
    ) {}

    goBack() {
        this._router.navigate([this.listRoute]);
    }

    openDialog(configs?, action?) {
        const item = this.item;
        const dialogRef = this._dialog.open(MainDialogComponent, {
            data: { item, configs, action },
            width: '40%',
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log(result);
            if (result === 'refresh') {
                this.getItem();
            }
        })
    }

    headerActions: any = {
        submit: (configs, btnText) => {
            this.openDialog(configs, btnText);
        },
        rationalize: (configs, btnText) => {
            this.openDialog(configs, btnText);
        },
        approve: (configs, btnText) => {
            this.openDialog(configs, btnText);
        },
        reject: (configs, btnText) => {
            this.openDialog(configs, btnText);
        }
    };

    statusChecker(action) {
        return indexOf(action.activeStates, this.item.status) >= 0;
    }

    authChecker(action) {
        if (has(action, 'bpType')) {
            return this._authChecker.isActionAllowed(
                action.bpType, action.roles);
        } else {
            return true;
        }
    }

    setCmptParams() {
        this.tabs.tabs = this.tabs.tabs.map(tab => {
            if(has(tab, 'modelKey')) {
                const listParams = get(tab, 'listParams', {});
                return { 
                    ...tab, 
                    cmptParams: { 
                        [tab['modelKey']]: this.item['id'],
                        ...listParams,
                    } 
                };
            } else {
                return tab;
            }
        });
        this.loadTabs(this.tabs.tabs);
    }

    getItem() {
        this.item = {};
        const opts = { current_org_id: this.organization };
        this._dataLayer.get(this.apiStore, this.itemId, opts)
        .subscribe(result => {
            this.item = result;
            this.setCmptParams();
        }, err => console.log(err));
    }

    loadTabs(tabs) {
        this.asyncTabs = new Observable((observer: Observer<any>) => {
            setTimeout(() => {
              observer.next([...tabs]);
            }, 250);
        });
    }

    getNested(str) {
        return !_.isUndefined(str) && _.isString(str)
            ? _.get(this.item, str, null) : str;
    }

    removeUnderscore(str) {
        return !_.isUndefined(str) && _.isString(str) ? 
                str.replace(/_/g, ' ') : str;
    }

    getRouteConfigs() {
        this._route.data.subscribe(data => {
            this.store = data['store'];
            this.apiStore = data['endPoint'],
            this.listRoute = data['listRoute'],
            this.tabs = this._tabsService.getTabs(this.store);
            const tabs = this.tabs.tabs;
            this.headerConfig = { ...this.tabs.headerConfig };
            this.loadTabs(tabs);
            this.configs = data['itemConfig'];
            this.getItem();
        })
    }

    setParams() {
        this._route.queryParams.subscribe(params => {
            this.itemId = params['id'];
            this.listParams = { organization: params['id'] },
            this.getRouteConfigs();
        })
    }

    tabSelectChange(event) {
        this.currIndex = event['index'];
    }

    printPage() {
        window.print();
    }

    downloadSummary() {
        console.log('Called');
        // uri /applications/applications/16/summary_report/
        const idUri = `${this.itemId}/summary_report`;
        const getParams = { 'current_org_id': this.organization };
        this._dataLayer.get('applications', idUri, getParams)
            .subscribe(resp => {
                console.log(resp);
                this.printPage();
            }, err => {
                console.log(err);
                // TODO: Remove once fixed
                this.printPage();
            });
    }

    ngOnInit() {
        this.headerConfig = {};
        this.user = JSON.parse(this._authConfig.getUser());
        this.organization = JSON.parse(
            this._authConfig.getOrganization()).organization;
        this.orgType = get(JSON.parse(localStorage.getItem('organization')), 'org_type', null);
        this.setParams();
    }
}

