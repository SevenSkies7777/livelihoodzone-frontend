import { Injectable } from '@angular/core';
import { find } from 'lodash';
import { LaborConfigs } from '../constants/labor.constant';

@Injectable()
export class ReportsService {
    reportsConfigs: Array<any> = [
        { context: 'labor', configs: LaborConfigs },
        { context: 'migration', configs: '' },
        { context: 'livestock-ownership', configs: '' },
        { context: 'income', configs: '' },
        { context: 'hunger', configs: '' },
        { context: 'hazard', configs: '' },
        { context: 'expenditure', configs: '' },
        { context: 'crop-production', configs: '' },
        { context: 'crop-contribution', configs: '' },
        { context: 'economic-activities', configs: '' },
    ];

    getConfigs(context) {
        return find(this.reportsConfigs, { context });
    }
}