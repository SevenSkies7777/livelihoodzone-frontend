import { Component, Input,  OnInit,  ViewChild, 
    OnDestroy, SimpleChange, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { FormControl } from '@angular/forms';

import * as _ from 'lodash';
import { find, get, has, indexOf, isUndefined } from 'lodash';

import { MatDialog } from '@angular/material/dialog';
import { 
    DynamicTableDialog 
} from '../dynamic-table-dialog/dynamic-table-dialog.component';

import { 
    DataLayerService 
} from '../../../../../app/services/http/dataLayer.service';
import { 
    DynamicTableService } from '../../services/dynamic-table.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

    @Component({
        selector: 'dynamic-table',
        styleUrls: ['./dynamic-table.component.scss'],
        templateUrl: './dynamic-table.component.html',
        providers: [DataLayerService, DynamicTableService],
    })

    export class DynamicTableComponent implements OnInit, OnChanges ,OnDestroy {

        @Input() title: string;
        @Input() headers: Array<any> = [];
        @Input() list: Array<any> = [];
        @Input() listParams: any;
        @Input() rows: Array<any> = [];
        @Input() buttons: Array<any> =  [];
        @Input ('no-card') noCard: boolean;
        @Input ('has-action') hasAction: boolean;
        @Input() topActions: Array<any> = [];
        @Input() actions: Array<any> = [];
        @Input() dropDownActions: Array<any> = [];
        @Input() store: string;
        @Input() tabbedItem: any = {};
        @Input() hasSearch: boolean;
        @Input() largeForms: boolean;
        @Input() customHeader: boolean;

        @Input() cmptParams: any;
        @Input() modelKey: string;


        @Input() addOrg: boolean = false;

        @Output() postCRUDFxn = new EventEmitter();

        self = this;
        loading: boolean = false;
        showModal: boolean;
        submitted: boolean;
        errors: any;
        selectedItem: any;
        inlineDetails: any;
        paginationCtrl: any;
        searchControl: FormControl;
        debounce: number = 400;

        modalConf: any;
        msgSubscription: any;
        inlineModalConf: any;
        modalStatus: boolean = false;
        inlineModalStatus: boolean = false;
        headerInline: boolean = false;
        inlineConf: any;
        inlineHeaderConf: any;
        cancelled: boolean;
        organization: any = {};
        params: any = {};

        constructor(
            private router: Router,
            private http: HttpClient,
            public _dialog: MatDialog,
            protected dataLayer: DataLayerService,
            private dataTableServ: DynamicTableService,
        ) {

        }

        showToast() {}

        openDialog(configs?, action?) {
            const item = this.selectedItem;
            const dialogRef = this._dialog.open(DynamicTableDialog, {
                data: { item, configs, action },
                width: configs.width || '40%',
            });


            dialogRef.afterClosed().subscribe(result => {
                if (result === 'refresh') {
                    this.getData();
                }
            })
        }

        toggleModal(row) {
            this.selectedItem = row;
            this.showModal = !this.showModal;
        }

        toggleReadOnly(event) {
            console.log(event);
            const currIndex = indexOf(this.list, find(this.list, { id: event.id }));
            console.log(currIndex);
            this.list[currIndex].readOnly = false;
            this.list[currIndex].showInline = false;
        }

        fetchInline(row) {
            const orgId = get(JSON.parse(
                localStorage.getItem('organization')), 'organization', null);
            let params = { current_org_id: orgId };
            this.dataLayer.get(this.inlineConf.store, row.id, params)
                .subscribe(resp => {
                    this.selectedItem = resp;
                }, err => {
                    console.log(err);
                })
        }

        toggleInlineRow(row) {
            row.showInline = !row.showInline;
            let params = {};
            if (this.addOrg) {
                const orgId = get(JSON.parse(
                    localStorage.getItem('organization')), 'organization', null);
                params = { current_org_id: orgId };
                if (this.store === 'organization-join-requests') {
                    params = { ...params, organization: orgId };
                }
                
            }
            if (row.id) {
                this.dataLayer.get(this.inlineConf.store, row.id, params)
                .subscribe(resp => {
                    this.selectedItem = this.store === 'organization-members' 
                        ? this.dataTableServ.preProcessModel(resp)
                        : resp;
                }, err => {
                    console.log(err);
                })
            }
        }

        stateChecker(row, btnConfigs) {
            if (has(btnConfigs, 'disableStatus')) {
                return indexOf(
                    btnConfigs['disableStatus'], row['review_state']) >= 0;
            }
        }

        gridActions = {
            modal: (row, modalConf) => {
                this.modalConf = modalConf;
                this.selectedItem = row;
                this.openDialog(modalConf, modalConf.btnText);
            },
            inline: (row, inlineConf) => {
                this.inlineConf = inlineConf;
                this.toggleInlineRow(row);
            },
            inlineReadOnly: (row, inlineConf) => {
                this.inlineConf = inlineConf;
                row.showInline = !row.showInline;
                row.readOnly = !row.readOnly;
                this.fetchInline(row);
            },
            inlineForm: (row, inlineConf) => {
                this.inlineModalStatus = !this.inlineModalStatus;
                this.selectedItem = row;
                this.modalConf = row.editConfig;
            },
            route: (row, inlineConf) => {
                const params = { id: row.id, ...inlineConf.queryParams };
                this.router.navigate([inlineConf.link], {
                    queryParams: params
                })
            },
            tabDetails: (row, inlineConf) => {
                let queryParams = { 
                    current: 1, step: 1, 
                    id: row.id,
                };
                if (has(inlineConf, 'qParam')) 
                    queryParams = { 
                        ...queryParams, 
                        [inlineConf.qParam]: row[inlineConf.qParam] 
                    }
                this.router.navigate([inlineConf.link], { queryParams });
            }
        }

        toggleHeaderInline() {
            this.headerInline = !this.headerInline;
        }

        activateAction = {
            inline: (conf?) => {
                this.headerInline = !this.headerInline;
                this.inlineHeaderConf = conf;
            }
        };

        getData(dtParams?) {
            this.loading = true;
            const pageSize = { limit: 50 };
            dtParams = {  ...dtParams, ...pageSize };
            if (this.addOrg) {
                this.organization = JSON.parse(localStorage.getItem('organization'));
                const orgId = get(this.organization, 'organization', 'null');
                dtParams = { ...dtParams, current_org_id: orgId };
                if (this.store === 'organization-join-requests') {
                    const orgType = get(this.organization, 'org_type', null);
                    if (orgType !== 'SASDEF') {
                        dtParams = { ...dtParams, organization: orgId };
                    }
                }
            }
            if (this.listParams) dtParams = { ...dtParams, ...this.listParams };
            this.dataLayer.list(this.store, dtParams)
            .subscribe(resp => {
                this.loading = false;
                this.list = has(resp, 'results') ? resp['results'] : resp;
                this.paginationCtrl = { ...resp };
            }, err => {
                console.log(err);
                this.loading = false;
                const errMsg = 'An error occurred while retrieving records';
                this.dataLayer.openDynamicSnackBar(errMsg, 'error');
            })
        }

        addExternalParams(params) {
            this.listParams = { ...this.listParams, ...params};
            this.getData();
        }

        paginate(event) {
            this.getData(event);
        }

        actChecker(item) {
            const orgType = get(
                JSON.parse(localStorage.getItem('organization')), 'org_type', null);
            const statsChecker = (statusArr, bpTypesArr) => 
                indexOf(statusArr, item.status) >= 0 &&
                    indexOf(bpTypesArr, orgType) >= 0
            return !isUndefined(this.dropDownActions) ? this.dropDownActions.filter(item => {
                const context = item.modalConf.context;
                switch (context) {
                    case 'Billable Item':
                        const statusArr = ['DRAFT'];
                        const bpTypesArr = ['SPORTS_ORGANIZATION', 'GOVERNMENT_AGENCY'];
                        if (statsChecker(statusArr, bpTypesArr)) return item;
                        break;
                    case 'Attendee':
                        const attStatusArr = ['DRAFT'];
                        const attBpTypesArr = ['SPORTS_ORGANIZATION', 'GOVERNMENT_AGENCY'];
                        if (statsChecker(attStatusArr, attBpTypesArr)) return item;
                        break;
                    case 'Allowance':
                        const allStatusArr = ['DRAFT'];
                        const allBpTypesArr = ['SPORTS_ORGANIZATION', 'GOVERNMENT_AGENCY'];
                        if (statsChecker(allStatusArr, allBpTypesArr)) return item;
                        break;
                    case 'rationalize':
                        const ratStatusArr = ['DRAFT'];
                        const ratBpTypesArr = ['MINISTRY', 'SASDEF'];
                        if (statsChecker(ratStatusArr, ratBpTypesArr)) return item;
                        break;
                    case 'approve':
                        const appStatusArr = ['RATIONALIZED'];
                        const appBpTypesArr = ['SASDEF'];
                        if (statsChecker(appStatusArr, appBpTypesArr)) return item;
                        break;
                    case 'reject':
                        const rejStatusArr = ['DRAFT', 'RATIONALIZED'];
                        const rejBpTypesArr = ['MINISTRY', 'SASDEF'];
                        if (statsChecker(rejStatusArr, rejBpTypesArr)) return item;
                        break;
                    default:
                        throw new Error('Provide a valid action or context');
                }
                // return item;
            }) : [];
        }

        ngOnInit() {
            this.getData();
            this.searchControl = new FormControl('');
            this.searchControl.valueChanges
            .pipe(debounceTime(this.debounce),
            distinctUntilChanged())
            .subscribe(query => {
                if (query.length > 3) {
                    let queryObj = { search: query };
                    this.getData(queryObj);
                }
                if (_.isEmpty(query)) {
                    this.getData();
                }
            });
        }

        ngOnChanges(changes: SimpleChanges) {
            this.listParams = !_.isUndefined(changes['listParams'])
                ? changes['listParams']['currentValue']
                : this.listParams;
            if (_.has(changes, 'tabbedItem')) {
                if (!_.isEmpty(changes['tabbedItem']['currentValue'])) {
                    this.tabbedItem = { 
                        ...this.tabbedItem,
                        ...changes['tabbedItem']['currentValue']
                    }
                }
            }
            if (_.has(changes, 'cmptParams')) {
                if (!_.isEmpty(changes['cmptParams']['currentValue'])) {
                    const externalParams = changes['cmptParams']['currentValue'];
                    this.addExternalParams(externalParams);
                }
            }
        }

        replaceUnderscore(str) {
            return !_.isUndefined(str) && _.isString(str) ? 
                str.replace(/_/g, ' ') : str;
        }

        ngOnDestroy() {
            
        }

        receiveModel(model, store) {
            if (this.modelKey) {
                const key = this.modelKey;
                model = { 
                    ...model, 
                    [key]: this.tabbedItem['id'], 
                    organization: this.modelKey === 'organization' 
                        ? this.cmptParams['organization'] 
                        : get(this.organization, 'organization', null),
                };
            }
            this.dataTableServ.receiveModel(model, store, this.self);
        }

        searchTerm(term) {
            console.log(term);
        }
    }
