import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { has, get, isNull } from 'lodash';
import { DataLayerService } from 'app/services/http/dataLayer.service';
import { ReportsService } from '../services/reports.service';
import { concat, forkJoin, from, zip } from 'rxjs';
import { mergeAll, map, tap, toArray, mergeMap } from 'rxjs/operators';

@Component({
    selector: 'reports-wrapper',
    styleUrls: ['reports-wrapper.component.scss'],
    templateUrl: 'reports-wrapper.component.html',
    providers: [ReportsService, DataLayerService],
})

export class ReportWrapperComponent implements OnInit {
    configs: any;
    gridConfigs: any;
    showForm: boolean = false;
    countData: Array<any> = [];
    lhZonesData: Array<any> = [];
    filterForm: FormGroup;
    selectOptions: any = {}
    arrCont = [];
    formFields = [
        {
            key: 'countyId',
            type: 'select',
            label: 'County',
            bindLabel: 'countyName',
            bindValue: 'countyId',
            required: true,
            optionsResource: 'counties',
            className: 'col-lg-12',
        },

        // {
        //     key: 'livelihoodZoneId',
        //     type: 'select',
        //     label: 'Livelihoodzones',
        //     required: true,
        //     bindLabel: 'livelihoodZoneName',
        //     bindValue: 'livelihoodZoneId',
        //     optionsResource: 'livelihoodzones',
        //     className: 'col-lg-6 pr-lg-16',
        // },
    ];
    reportData: Array<any> = [];
    countyLhZones: any;
    loading: boolean;

    constructor(private _route: ActivatedRoute,
        private _dataLayer: DataLayerService,
        private _reportSvc: ReportsService) {
    }

    onFormSubmit() {
        this.loading = true;
        const { countyId } = this.filterForm.value;
        const configureReportData = (seriesData) => {
            return Object.keys(seriesData).map(key =>  {
                return { name: key, value: seriesData[key]}});
        }
        const setWealthGroups = () => {
            this.countyLhZones.livelihoodZones.forEach(zone => {
                const params = {
                    countyId,
                    livelihoodZoneId: zone.livelihoodZoneId,
                };
                this._dataLayer.list(
                    'wealthgroup-distribution', params)
                    .subscribe(resp => {
                        zone['reportData'] = !isNull(resp)
                            ? configureReportData(resp)
                            : [];
                    }, err => console.log(err));
            });
        }

        this._dataLayer.get('county-livelihoodzones', countyId)
            .subscribe((resp:any) => {
                const lhZones = resp['livelihoodZones'];
                this.countyLhZones = resp;
                setWealthGroups();
            });
    }

    toggleFilterForm = () => this.showForm = !this.showForm;

    getOptionsData(optsResource) {
        this._dataLayer.list(optsResource, {})
            .subscribe(resp => {
                this.selectOptions[optsResource] = resp;
            }, err => console.log(err));
    }

    configureForm() {
        const inputCtrl = {};
        const setDefault = (ctrl) => { 
            ctrl['defaultValue'] = ctrl.type === 'date' 
                ? new Date()
                : ctrl['defaultValue'];
            return ctrl['defaultValue'] || undefined; 
        }
        const setFrmCtrl = (ctrl) => new FormControl(
            setDefault(ctrl),
            ctrl['required'] 
                ? [Validators.required] : []
        );
        this.formFields.forEach(ctrl => {
            if (ctrl.type !== 'template') {
                inputCtrl[ctrl.key] = setFrmCtrl(ctrl);
            }
            if (has(ctrl, 'optionsResource'))
                this.getOptionsData(ctrl['optionsResource']);
        });
        console.log(inputCtrl);
        this.filterForm = new FormGroup({ ...inputCtrl });
    }

    get frm() {
        return !this.filterForm.controls
            ? null : this.filterForm.controls;
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
        this.configureForm();
    }
}