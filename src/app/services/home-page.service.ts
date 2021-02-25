import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import * as _ from 'lodash';
import { environment as e } from '../../environments/environment';
import { Setup } from './setup.service';

interface LooseObject {
    [key: string]: any;
}

@Injectable()
export class HomePageService {
    homePages: string[] = e.AVAILABLE_HOMEPAGES;
    router: Router;

    constructor(
        readonly routerItem: Router,
        readonly currentRouter: ActivatedRoute,
        readonly setup: Setup) {
        this.router = routerItem;
    }

    getAllAvailableState() {
        const allStates = [];
        for (let i = 0; i < this.homePages.length; i++) {
            // this.homePages[i];
        }
        return this.homePages;
    }

    determineHomePage = (): string => {
        const routerConfigs = this.router.config;
        const availableStates = this.getAllAvailableState();
        for (let i = 0; i < availableStates.length; i++) {
            let ans: LooseObject = {};
            const canGoToState = true;
            const toState = _.find(routerConfigs, { path: availableStates[i]});

            if (!_.isUndefined(toState) && toState !== -1) {
                ans.can_view = true;
                return availableStates[i];
            }
        }
        return this.setup.authStates.loginState;
    }

}