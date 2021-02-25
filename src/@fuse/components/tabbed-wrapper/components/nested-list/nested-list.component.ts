import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { DataLayerService } from 'app/services/http/dataLayer.service';
import { find, findIndex, get, indexOf, isObject, isUndefined } from 'lodash';
import { Observable, Observer } from 'rxjs';

import { gridConfigs } from './constants/grid-configs.constant';
import { NestedCrudReviewDialog } from './nested-crud-review-dialog/nested-crud-review-dialog.component';
import { NesteMainDialogComponent } from './nested-main-dialog/nested-main-dialog.component';

@Component({
    selector: 'nested-list',
    styleUrls: ['nested-list.component.scss'],
    templateUrl: 'nested-list.component.html',
    providers: [DataLayerService],
})

export class NestedListComponent implements OnInit {
    @Input() item;
    @Input() steps: Array<any> = [];
    @Input() current: any;

    @Output() onNavigate = new EventEmitter();

    public selectedIndexBinding = 0;
    list: Array<any> = [];
    asyncTabs: Observable<[]>;
    organization = {};
    selectedAct:any;
    tabConfigs:any = gridConfigs[0].configs;
    cmptParams: any;
    loading:boolean;
    activeInd;
    actActions: Array<any> = [];

    tabsList: any = [
        { label: 'Items', icon: 'list' },
        { label: 'Attendees', icon: 'people' },
        { label: 'Allowances', icon: 'account_balance_wallet' },
    ];
    itemId: number;
    configs: any;

    constructor(private _dataLayer: DataLayerService,
        private _route: ActivatedRoute,
        private _dialog: MatDialog) {}

    changeStep(context) {
        this.onNavigate.emit(context);
    }

    openDialog() {
        const dialogRef = this._dialog.open(NesteMainDialogComponent, {
            data: {
                context: 'Budget Activity',
                budget: this.item,
            },
            width: '50%',
        });
        dialogRef.afterClosed().subscribe(result => {
            if (isObject(result)) {
                this.fetchList(result['id']);
            }
        })
    }

    openCRUDDialog(context?) {
        const dialogRef = this._dialog.open(NestedCrudReviewDialog, {
            data: {
                context,
                store: 'organization-budget-activities',
                activity: this.selectedAct
            },
            width: '50%',
        });
        dialogRef.afterClosed().subscribe(resp => {
            console.log(resp);
            if (resp === 'refresh') {
                this.loading = true;
                this.refreshSelected();
            }
        })
    }

    refreshSelected() {
        const opts = { current_org_id: get(this.organization, 'organization', null) };
        this._dataLayer.get('organization-budget-activities', 
            this.selectedAct.id, opts)
            .subscribe(resp => {
                this.selectedAct = { ...resp, active: true };
                this.list = this.list.map(act => {
                    if (act.id === resp['id']) {
                        act = { ...resp, active: true };
                    }
                    return act;
                })
                this.loading = false;
            }, err => {
                this.loading = false;
                console.log(err);
            });
    }

    onTabChange(tab) {
        this.selectedIndexBinding = tab['index'];
        if (tab['index'] === 1) {
            this.tabConfigs = gridConfigs[1].configs;
            this.cmptParams = {
                ...this.cmptParams,
                member_null: false,
                budget_activity: this.selectedAct.id,
            }
        } else if(tab['index'] === 2) {
            this.tabConfigs = gridConfigs[2].configs;
            delete this.cmptParams.member_null;
            this.cmptParams = {
                ...this.cmptParams,
                budget_activity: this.selectedAct.id,
            };
        } else {
            this.tabConfigs = gridConfigs[0].configs;
            this.cmptParams = {
                ...this.cmptParams,
                member_null: true,
                budget_activity: this.selectedAct.id,
            }
        }
    }

    loadTabs() {
        this.asyncTabs = new Observable((observer: Observer<any>) => {
            setTimeout(() => {
                observer.next([...this.tabsList]);
            }, 250);
        })
    }

    loadActActions() {
        const defaultActions = [
            {
                text: 'Edit', icon: 'edit',
                iconClass: 'text-primary',
                context: 'edit', status: ['DRAFT'],
                bpType: ['SPORTS_ORGANIZATION', 'GOVERNMENT_AGENCY'],
            },
            {
                text: 'Rationalize', icon: 'compare_arrows',
                iconClass: 'text-success',
                context: 'rationalize', status: ['DRAFT'],
                bpType: ['MINISTRY', 'SASDEF'],
            },
            {
                text: 'Approve', icon: 'check',
                iconClass: 'text-success',
                context: 'approve', status: ['RATIONALIZED'],
                bpType: ['SASDEF'],
            },
            {
                text: 'Reject', icon: 'close',
                iconClass: 'text-danger',
                context: 'reject', status: ['DRAFT', 'RATIONALIZED'],
                bpType: ['MINISTRY', 'SASDEF'],
            }
        ];
        const orgType = get(
            JSON.parse(localStorage.getItem('organization')), 'org_type', null);
        this.actActions = defaultActions.filter(act => {
            const orgInd = indexOf(act.bpType, orgType);
            const statusInd = indexOf(act.status, this.selectedAct.status);
            if (orgInd >= 0 && statusInd >= 0) return act;
        });
        // defaultActions.map(act => {
        //     const orgInd = indexOf(act.bpType, orgType);
        //     const statusInd = indexOf(act.status, this.selectedAct.status);
        //     if (orgInd >= 0 && statusInd >= 0) return this.actActions.push(act);
        // });
    }

    selectActivity(currInd) {
        this.loading = true;
        const oldInd = indexOf(this.list, find(this.list, { active: true }));
        this.selectedAct = undefined;
        if (oldInd >= 0) {
            this.list[oldInd].active = false;
        }
        this.list[currInd].active = true;
        const opts = { current_org_id: get(this.organization, 'organization', null) };
        this._dataLayer.get('organization-budget-activities', 
            this.list[currInd].id, opts)
            .subscribe(resp => {
                this.selectedAct = this.list[currInd];
                this.cmptParams = {
                    ...this.cmptParams,
                    budget_activity: this.selectedAct.id,
                    member_null: true,
                }
                this.loadTabs();
                this.loading = false;
                this.loadActActions();
            }, err => {
                console.log(err);
                this.loading = false;
            });
    }

    setSelected(actId?) {
        if (this.list.length) {
            let selectedAct = find(this.list, { active: true });
            if (isUndefined(selectedAct) && isUndefined(actId)) {
                this.list[0].active = true;
                // this.selectedAct = this.list[0];
                this.selectedAct = undefined;
                this.selectActivity(0);
                this.cmptParams = {
                    budget_activity: this.list[0].id,
                    member_null: true,
                };
            } else {
                if (!isUndefined(actId)) {
                    const currInd = indexOf(this.list, find(this.list, { id: actId }));
                    this.selectedAct = undefined;
                    this.selectActivity(currInd);
                } else {
                    this.selectedAct = indexOf(this.list, selectedAct);
                }
            }
        }
    }

    fetchList(activityId?) {
        const orgId = get(this.organization, 'organization', null);
        const params = {
            current_org_id: orgId,
            org_budget: get(this.item, 'id', this.itemId || null),
        };
        this._dataLayer.list('organization-budget-activities', params)
            .subscribe(resp => {
                this.list = resp['results'];
                this.setSelected(activityId);
            }, err => console.log(err));
    }

    getItem() {
        this._route.queryParams.subscribe(params => {
            const current = parseInt(params.current, 10);
            this.itemId = parseInt(params['id'], 10);
            const ind = findIndex(this.steps, { count: current });
            this.configs = this.steps[ind].gridConf;
            const getObj = { 'current_org_id': this.organization['organization'] };
            this._dataLayer.get('organization-budgets', this.itemId, getObj)
                .subscribe(resp => {
                    this.item = resp;
                }, err => console.log(err));
            this.fetchList();
        })
    }

    ngOnInit() {
        this.organization = JSON.parse(localStorage.getItem('organization'));
        if (!this.steps.length) {
            this.fetchList();
        } else {
            this.getItem();
        }
    }
}