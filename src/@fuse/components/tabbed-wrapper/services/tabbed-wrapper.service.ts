import { Injectable } from '@angular/core';
import * as _ from 'lodash';

import { TabsConfigs } from './configs.constant';

@Injectable()
export class TabbedWrapperService {
    configArray = TabsConfigs;

    getTabs(key) {
        return _.find(this.configArray, { key });
    }
}