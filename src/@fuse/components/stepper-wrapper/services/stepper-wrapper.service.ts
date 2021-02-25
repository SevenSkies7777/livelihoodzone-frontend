import { Injectable }  from '@angular/core';
import * as _ from 'lodash';

import { StepsConfig } from '../constants/steps.config';

@Injectable()

export class StepperWrapperService {
    stepsArray = StepsConfig;
    currentStep: any;

    getSteps(key) {
        return _.get(_.find(this.stepsArray, { key }), 
            'steps', []);
    }
}
