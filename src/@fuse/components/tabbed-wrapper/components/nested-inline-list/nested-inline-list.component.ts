import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';
import { DataLayerService } from 'app/services/http/dataLayer.service';
import { find, findIndex, get, indexOf, isUndefined } from 'lodash';
import { NestedInlineDialog } from './nested-inline-dialog/nested-inline-dialog.component';

@Component({
    selector: 'nested-inline-tabbed-list',
    templateUrl: 'nested-inline-list.component.html',
    styleUrls: [
'../../../stepper-wrapper/components/nested-inline-list/nested-inline-list.component.scss'],
    providers: [DataLayerService],
})

export class NestedTabbedInlineList implements OnInit {
    @Input() tab: any;
    @Input() current: any;

    @Output() onNavigate = new EventEmitter();

    multistepConfig: any;
    list: Array<any> = [];
    nestedList: Array<any> = [];
    submitted: any;
    item: any;
    loading:boolean = true;
    isLast: boolean;
    configs: any;
    orgId: any;
    itemId: any;
    selectedAllowance: any;
    cmptParams: any = { };
    actActions: Array<any> = [];

    constructor(private _route: ActivatedRoute,
        private _dataLayer: DataLayerService,
        private _dialog: MatDialog) {}

    changeStep(context) {
        this.onNavigate.emit(context);
    }

    loadActions() {
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
            const statusInd = indexOf(act.status, this.item.status);
            if (orgInd >= 0 && statusInd >= 0) return act;
        });
    }

    openDialog(context?) {
        const dialogRef = this._dialog.open(NestedInlineDialog, {
            data: {
                context,
                store: 'application-allowances',
                activity: this.selectedAllowance,
            },
            width: '50%',
        });
        dialogRef.afterClosed().subscribe(resp => {
            console.log(resp);
            if (resp === 'refresh') {
                this.loading = false;
                this.refreshSelected();
            }
        })
    }

    refreshSelected() {
        const opts = { current_org_id: this.orgId };
        this._dataLayer.get('application-allowances', 
            this.selectedAllowance.id, opts)
            .subscribe(resp => {
                this.selectedAllowance = { ...resp, active: true };
                this.list = this.list.map(all => {
                    if (all.id === resp['id']) {
                        all = { ...resp, active: true };
                    }
                    return all;
                })
            }, err => {
                this.loading = false;
                console.log(err);
            })
    }

    setSelected(allowanceId?) {
        if (this.list.length) {
            let selected = find(this.list, { active: true });
            if (isUndefined(selected) && isUndefined(allowanceId)) {
                this.list[0].active = true;
                this.selectedAllowance = undefined;
                this.presetAllowance(0);
            } else {
                if (!isUndefined(allowanceId)) {
                    const currInd = indexOf(this.list, find(this.list, { id: allowanceId }));
                    console.log(currInd);
                    this.selectedAllowance = undefined;
                    this.presetAllowance(currInd);
                } else {
                    this.selectedAllowance = indexOf(this.list, selected);
                }
            }
        }
    }

    presetAllowance(currInd: number) {
        this.loading = true;
        const oldInd = indexOf(this.list, find(this.list, { active: true }));
        this.selectedAllowance = undefined;
        if (oldInd >= 0) {
            this.list[oldInd].active = false;
        }
        this.list[currInd].active = true;
        this.getNestedList(this.list[currInd].id);
        const opts = { current_org_id: this.orgId };
        this._dataLayer.get('organization-budget-activity-allowances', 
            this.list[currInd].id, opts)
            .subscribe(resp => {
                this.selectedAllowance = this.list[currInd] || resp;
                this.cmptParams = {
                    ...this.cmptParams, 
                    budget_activity_allowance: this.list[currInd].id
                }
                this.loading = false;
            }, err => { console.log(err); this.loading = false; });
    }

    getNestedList(id: any) {
        const params = {
            current_org_id: this.orgId,
            budget_activity_allowance: id,
        };
        this._dataLayer.list('application-allowances', params)
            .subscribe(resp => {
                this.nestedList = resp['results'];
            }, err => console.log(err));
    }

    getMainList() {
        const params = {
            current_org_id: this.orgId,
            budget_activity: this.item.activity,
        };
        this._dataLayer.list('organization-budget-activity-allowances', params)
            .subscribe(resp => {
                this.list = resp['results'];
                this.setSelected();
            }, err => console.log(err));
    }

    getItem() {
        const getParams = { 'current_org_id': this.orgId };
        this._dataLayer.get('applications', this.itemId, getParams)
            .subscribe(resp => {
                console.log(resp);
                this.item = resp;
                this.getMainList();
            }, err => console.log(err));
    }

    getItemId() {
        this._route.queryParams.subscribe(params => {
            const current = parseInt(params.current, 10);
            this.itemId = parseInt(params['id'], 10);
            this.configs = this.tab;
            console.log(this.configs);
            this.getItem();
        })
    }

    ngOnInit() {
        this.orgId = get(JSON.parse(
            localStorage.getItem('organization')), 'organization', null);
        console.log('Called', this.orgId)
        this.getItemId();
    }
}