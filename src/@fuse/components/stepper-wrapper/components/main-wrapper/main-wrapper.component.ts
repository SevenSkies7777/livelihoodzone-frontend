import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Authorization } from 'app/services/authorization.service';
import { DataLayerService } from 'app/services/http/dataLayer.service';
import { StepperWrapperService } from '../../services/stepper-wrapper.service';

import * as _ from 'lodash';

@Component({
    selector: 'stepper-wrapper',
    templateUrl: 'main-wrapper.component.html',
    styleUrls: ['main-wrapper.component.scss'],
    providers: [DataLayerService],
})

export class MainStepperWrapperComponent implements OnInit {
    @ViewChild('one') one: TemplateRef<any>;
    @ViewChild('two') two: TemplateRef<any>;
    @ViewChild('three') three: TemplateRef<any>;
    @ViewChild('four') four: TemplateRef<any>;
    @ViewChild('five') five: TemplateRef<any>;
    @ViewChild('six') six: TemplateRef<any>;
    // global stepper variables
    user: any;
    context: string;
    title: string;
    subHeaderKey: string;
    store: string;
    // item container variables
    item: any = {};
    itemId: string;
    listRoute: string;
    configs: any;
    isEdit: boolean;
    // stepper logic variables
    steps: Array<any>;
    step: string;
    originalSteps: Array<any>;
    cmpt: string;
    current: any;
    currentStep: any;
    furthest: any;
    otherParams: any;

    constructor(
        private _router: Router,
        private _route: ActivatedRoute,
        private _authConfig: Authorization,
        private _datalayer: DataLayerService,
        private _stepperService: StepperWrapperService,
    ) {}

    setFurthest(params: any, otherParams?) {
        const routeParams = { ...params, ...otherParams };
        this._router.navigate([], { queryParams: routeParams });
    }

    checkStep(otherParams?) {
        if (_.isUndefined(this.furthest) || this.furthest === 0) {
            this.steps[0].active = true;
            this.currentStep = this.steps[0];
            this.furthest = 1;
            this.current = 1;
            this.cmpt = 'one';
            const params = { step: 1, current: 1, ...this.otherParams };
            this.setFurthest(params, otherParams);
        } else {
            const furthestStep = this.furthest - 1;
            this.currentStep = _.find(this.steps, { count: this.current });
            const indVal = _.findIndex(this.steps, this.currentStep);
            this.steps = this.steps.map((step, ind) => {
                if (ind < furthestStep && furthestStep !== 0) {
                    return { ...step, done: true, active: false };
                }
                if (furthestStep === 0 && ind !== 0) {
                    return { ...step, done: false, active: false };
                }
                return step;
            });
            this.steps[furthestStep].active = true;
            this.steps[indVal].active = true;
            this.cmpt = this.steps[indVal].template;
        }
    }

    goToNext(qParams?) {
        const ind = _.findIndex(this.steps, { count: this.current });
        if ((ind + 1) < this.steps.length) {
            this.cmpt = this.steps[ind + 1].template;
            const current = this.steps[ind + 1].count;
            this.furthest = (this.steps[ind + 1].count > this.furthest)
                ? (this.furthest + 1) 
                : this.furthest;
            const params = { step: this.furthest, current, id: this.itemId };
            // check for any additional params
            if (qParams) {
                const keys = _.keys(qParams);
                _.each(keys, aKey => {
                    params[aKey] = qParams[aKey];
                });
            }
            // navigate to set new params to be used
            this.setFurthest(params);
        } else if ((ind + 1) === this.steps.length) {
            this.steps = this.originalSteps;
            setTimeout(() => {
                this.steps = [];
                this.furthest = undefined;
                this._router.navigateByUrl(this.listRoute);
            }, 250);
        }
    }

    goToPrev() {
        const ind = _.findIndex(this.steps, { count: this.current });
        if (ind === 0) {
            this._router.navigateByUrl(this.listRoute);
        } else {
            this.current = this.steps[ind - 1].count;
            this.steps[this.current].active = true;
            const params = { 
                step: this.furthest, 
                current: this.current, 
                id: this.itemId 
            };
            this.setFurthest(params);
        }
    }
    // executed from nested component
    navigate($event, qParams?) {
        const evt = _.isObject($event) ? $event['direction'] : $event;
        if (evt === 'next') {
            this.goToNext($event.params);
        } else {
            this.goToPrev();
        }
    }

    setParams() {
        this._route.queryParams
        .subscribe(params => {
            console.log(params);
            this.step = params['step'];
            this.current = parseInt(params['current'], 10) || 1;
            this.itemId = params['id'];
            this.furthest = !_.isUndefined(params['step'])
                ? parseInt(params['step'], 10) : undefined;
            this._route.data.subscribe(data => {
                const stepsCont = this._stepperService.getSteps(data['stepsKey']);
                this.steps = [ ...stepsCont ];
                this.originalSteps = this.steps;
                this.listRoute = data['listRoute'];
                this.context = data['context'];
                this.checkStep(params);
            });
        })
    }

    ngOnInit() {
        this.otherParams = {};
        this.current = 'one';
        this.user = JSON.parse(this._authConfig.getUser());
        this.isEdit = this._router.url.includes('edit');
        setTimeout(() => {
            this.cmpt = 'one';
            this.setParams();
        })
    }
}