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
    applications: Array<any> = [];
    budgets: Array<any> = [];
    dashboardData: any = {};
    currentFinancialYear: any;
    budgetSummary: any;
    pieChartContext: string = 'Budget';

    countConfigs = [
        {
            count: 0,
            label: 'DRAFT',
            title: 'DRAFT',
            description: 'Yet to be submitted',
            bgColor: 'amber',
            icon: 'assignment',
        },
        {
            count: 0,
            label: 'SUBMITTED',
            title: 'SUBMITTED',
            description: 'Submitted for approval',
            bgColor: 'accent',
            icon: 'assignment',
        },
        {
            count: 0,
            label: 'FINAL_APPROVED',
            title: 'APPROVED',
            description: 'Accepted & disbursed',
            bgColor: 'teal',
            icon: 'assignment',
        },
        {
            count: 0,
            label: 'REJECTED',
            title: 'REJECTED',
            description: 'Rejected by SASDF',
            bgColor: 'red-400-bg',
            icon: 'assignment',
        },
    ];

    barChartOptions = {
        scaleShowVerticalLines: false,
        responsive: true
    };

    barChartData = [
        {data: [], label: 'Applied'},
        {data: [], label: 'Available'},
        {data: [], label: 'Approved'},
    ];

    barChartLabels = [];
    barChartType = 'bar';
    barChartLegend = true;

    // Start of doughnut chart
    doughnutChartLabels = ['Available', 'Applied', 'Approved'];
    doughnutChartData = [1500000, 850000, (1500000 - 850000)];
    doughnutChartType = 'doughnut';

    pieChartColors = [{
        backgroundColor: ['#4caf50', '#00bcd4', 'indigo'],
    }];

    budgetConfigs = {
        labels: [],
        data: [],
        totals: [],
        chartType: 'doughnut',
        totalAmount: 0,
        totalCount: 0,
        colors: [{
            backgroundColor: ['#4caf50', '#00bcd4', 'indigo',
                '#2196F3'],
        }],
    };

    constructor(private _dataLayer: DataLayerService,
        private _authConfig: Authorization) {}

    getRecentApplications() {
        const params = { 
            limit: 5,
            current_org_id: this.organization['organization']
        };
        this._dataLayer.list('applications', params)
        .subscribe(resp => {
            this.applications = resp['results'];
        }, err => console.log(err));
    }

    getApplicationStatus() {
        this.countConfigs.forEach(config => {
            const params = { 
                current_org_id: this.organization['organization'],
                status: config.label,
            }
            this._dataLayer.list('applications', params)
                .subscribe(resp => {
                    config['count'] = resp['count'];
                }, err => console.log(err));
        })
    }

    getRecentBudgets() {
        const params = { 
            limit: 5,
            current_org_id: this.organization['organization']
        }
        this._dataLayer.list('organization-budgets', params)
        .subscribe(resp => {
            this.budgets = resp['results'];
        }, err => console.log(err));
    }

    getActiveFinancialYear() {
        const params = { 
            is_current: true,
            current_org_id: this.organization['organization']
        }
        this._dataLayer.list('organization-financial-years', params)
        .subscribe(resp => {
            this.currentFinancialYear = resp['results'].length ? 
                resp['results'][0] : null;
        }, err => console.log(err));
    }

    getSummaries(arrSummary, key) {
        return !isNull(arrSummary) && !!arrSummary[key] ?
            arrSummary[key] : 0;
    }

    getDataRequest(params, key) {
        this._dataLayer.list('dashboard-data', params)
            .subscribe(resp => {
                this.dashboardData[key] = resp;
                if (key === 'budget') {
                    if (this.pieChartContext === 'Applications') {
                        this.budgetSummary = resp;
                        this.doughnutChartData = [
                            this.getSummaries(resp, 'available'),
                            this.getSummaries(resp, 'applied'),
                            this.getSummaries(resp, 'approved'),
                        ]
                    } else {
                        this.budgetSummary = {};
                        const keyArr = keys(resp);
                        keyArr.forEach(key => {
                            this.budgetConfigs.data.push(resp[key]['count']);
                            const label = key[0].toUpperCase() + key.slice(1);
                            this.budgetConfigs.labels.push(label);
                            this.budgetConfigs.totals.push({
                                label,
                                amount: resp[key]['total'],
                            });
                            this.budgetConfigs.totalCount += resp[key]['count'];
                            this.budgetConfigs.totalAmount += resp[key]['total'];
                        });
                    }
                } else if(key === 'balance') {
                    const arrCont: any = resp || [];
                    arrCont.forEach(summary => {
                        const month = moment(summary.month).format('MMM, YYYY');
                        this.barChartLabels.push(month);
                        this.barChartData[0].data.push(summary.data.applied);
                        this.barChartData[1].data.push(summary.data.available);
                        this.barChartData[2].data.push(summary.data.approved);
                    });
                } else if(key === 'status') {
                    this.countConfigs.forEach(conf => {
                        conf.count = !isNull(resp) ? resp[conf.title] || 0 : 0;
                    });
                }
            }, err => console.log(err));
    }

    getDashboardData() {
        const paramsArr = [
            { key: 'balance', param: 'BALANCE_HISTORY' }, 
            { 
                key:'budget', 
                param: this.organization['org_type'] !== 'SASDEF' 
                    ? 'APPLICATION_SUMMARY' : 'BUDGET_SUMMARY',
            }, 
            { key: 'status', param: 'STATUS_COUNTS' }
        ];
        this.pieChartContext = this.organization['org_type'] !== 'SASDEF'
            ? 'Applications' : 'Budgets';
        each(paramsArr, paramObj => {
            const listParam = { 
                report_type: paramObj['param'],
                current_org_id: this.organization['organization'] 
            };
            this.getDataRequest(listParam, paramObj['key']);
        })
    }

    ngOnInit() {
        this.user = JSON.parse(this._authConfig.getUser());
        this.organization = JSON.parse(this._authConfig.getOrganization());
        this.getDashboardData();
        this.getRecentBudgets();
        // this.getApplicationStatus();
        this.getRecentApplications();
        this.getActiveFinancialYear();
    }
}