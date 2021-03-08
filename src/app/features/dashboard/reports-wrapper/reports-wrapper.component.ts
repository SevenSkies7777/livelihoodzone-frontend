import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReportsService } from '../services/reports.service';

@Component({
    selector: 'reports-wrapper',
    styleUrls: ['reports-wrapper.component.scss'],
    templateUrl: 'reports-wrapper.component.html',
    providers: [ReportsService],
})

export class ReportWrapperComponent implements OnInit {
    configs: any;
    gridConfigs: any;

    constructor(private _route: ActivatedRoute,
        private _reportSvc: ReportsService) {
    }

    setRouteConfigs() {
        this._route.data.subscribe(data => {
            this.configs = data;
            this.gridConfigs = this._reportSvc.getConfigs('labor');
            console.log(this.gridConfigs);
        })
    }

    ngOnInit() {
        this.setRouteConfigs();
    }
}