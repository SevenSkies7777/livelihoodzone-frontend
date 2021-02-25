import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataLayerService } from 'app/services/http/dataLayer.service';
import { find, findIndex, get, indexOf, isUndefined } from 'lodash';

@Component({
    selector: 'nested-inline-list',
    templateUrl: 'nested-inline-list.component.html',
    styleUrls: ['nested-inline-list.component.scss'],
    providers: [DataLayerService],
})

export class NestedInlineList implements OnInit {
    @Input() steps: Array<any>;
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
        private _dataLayer: DataLayerService) {}

    changeStep(context) {
        this.onNavigate.emit(context);
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
                    this.selectedAllowance = undefined;
                    this.presetAllowance(currInd);
                } else {
                    this.selectedAllowance = indexOf(this.list, selected);
                }
            }
        }
    }

    loadActions() {
        const defaultActions = [
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
                this.loadActions();
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
                this.item = resp;
                this.getMainList();
            }, err => console.log(err));
    }

    getItemId() {
        this._route.queryParams.subscribe(params => {
            const current = parseInt(params.current, 10);
            this.itemId = parseInt(params['id'], 10);
            const ind = findIndex(this.steps, { count: current });
            this.configs = this.steps[ind].gridConf;
            this.getItem();
        })
    }

    ngOnInit() {
        this.orgId = get(JSON.parse(
            localStorage.getItem('organization')), 'organization', null);
        this.getItemId();
    }
}