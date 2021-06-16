import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DataLayerService } from 'app/services/http/dataLayer.service';
import { has, isEmpty, isNull, isUndefined } from 'lodash';
import { fromEvent, Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, mergeMap, startWith, throttleTime } from 'rxjs/operators';
import { barChartData } from '../../data/bar-chart';

@Component({
    selector: 'sbar-chart',
    styleUrls: ['bar-chart.component.scss'],
    templateUrl: './bar-chart.component.html',
    providers: [DataLayerService]
})

export class SharedBarChartComponent implements 
OnInit, OnChanges {
    @Input() chartData: any = {};
    @Input() countyId: string = '';

    multi: any[] = [];
    view: any[] = [1175, 450];
    // data: any[] = barChartData;
    data: any[] = barChartData;
    fomartedData: any[] = [];
    chartConfig: any = [];

    // chart options
    showXAxis: boolean = true;
    showYAxis: boolean = true;
    gradient: boolean = false;
    showLegend: boolean = true;
    showXAxisLabel: boolean = true;
    yAxisLabel: string = 'Livelihood Zones';
    showYAxisLabel: boolean = true;
    xAxisLabel: string = 'Average % of Population';
    trimYAxisTicks:boolean = false;
    fitContainer:boolean = true;
    trimXAxisTicks:boolean = true;
    showDataLabel:boolean = true;

    colorScheme = {
        domain: ['#2196F3', '#5AA454', '#A10A28', 
            '#C7B42C', '#AAAAAA', '#9e326F'
        ]
    };

    constructor(private _dataLayer: DataLayerService) {}

    size$: Observable<number> = fromEvent(window, 'resize').pipe(
        debounceTime(250),
        throttleTime(300),
        mergeMap(() => of(document.body.clientHeight)),
        distinctUntilChanged(),
        startWith(document.body.clientHeight),
    );

    onSelect(event) {
        console.log(event);
    }

    setChartConfigs(chartData) {
        const configureSeries = (seriesData) => {
            return Object.keys(seriesData).map(key =>  {
                return { name: key, value: seriesData[key]}});
        }

        const getWealthGroupData = () => {
            // get livelihood related releated data
            this.data = [ ];
            const arrayCont = [];
            const { 
                countyId, 
                livelihoodZones } = chartData;
            
            livelihoodZones.forEach(zone => {
                const params = {
                    countyId,
                    livelihoodZoneId: zone['livelihoodZoneId']
                };
                this._dataLayer.list('wealthgroup-distribution', params)
                    .subscribe(resp => {
                        arrayCont.push({
                            name: zone['livelihoodZoneName'],
                            series: !isNull(resp) 
                                ? configureSeries(resp)
                                : []
                        })
                        this.data = [ ...arrayCont ];
                        // console.log(this.chartConfig, 'Called');
                    }, err => console.log(err));
            })
        }
        if (has(chartData, 'livelihoodZones'))
            getWealthGroupData();
    }

    ngOnInit() {
        this.size$.subscribe((g) => {
            // console.log('clientHeight', g);
        });
    }

    ngOnChanges(changes: SimpleChanges) {
        const dataChanges = changes['chartData'];
        this.setChartConfigs(dataChanges['currentValue']);
    }
}