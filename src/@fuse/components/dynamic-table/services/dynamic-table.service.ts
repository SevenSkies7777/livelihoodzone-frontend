import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { each, get, has, isUndefined } from 'lodash';
import * as moment from 'moment';
import { 
    DataLayerService 
} from '../../../../app/services/http/dataLayer.service';

@Injectable()

export class DynamicTableService {
    funcArr = [
        { store: 'accept-events', func: 'acceptEvent' },
        { store: 'assign-vehicle', func: 'assignVehicle' },
        { store: 'visit-purposes', func: 'editInline' },
        { store: 'invites', func: 'editInline' },
        { store: 'organisations', func: 'editInline' },
        { store: 'document-types', func: 'editInline' },
        { store: 'organization-financial-years', func: 'editInline' },
        { 
            store: 'organization-budget-activities', 
            func: 'setOrgInline',
            extraParams: {
                key: 'current_org_id',
            }
        },
        {
            store: 'organization-budget-activity-items',
            func: 'setOrgInline',
        },
        {
            store: 'organization-budget-activity-attendees',
            func: 'setOrgInline',
        },
        {
            store: 'organization-budget-activity-allowances',
            func: 'setOrgInline',
        },
        { store: 'organization-roles', func: 'editInline' },
        { store: 'organization-members', func: 'editInlineMultiple' },
        { store: 'application-items', func: 'setOrgInline' },
        { store: 'application-allowances', func: 'setOrgInline' },
        { store: 'application-activity-items', func: 'setOrgInline' },
        { store: 'application-attendees', func: 'setOrgInline' },
        { store: 'application-activity-attendees', func: 'setOrgInline' },
        { store: 'application-alternate-funding-sources', func: 'setOrgInline' },
        { store: 'sports-categories', func: 'editInline' },
        { store: 'billable-items', func: 'editInline' },
        { store: 'allowances', func: 'editInline' },
        { store: 'users', func: 'editInline' }
    ];

    constructor(private dataLayer: DataLayerService) {}

    getServiceFxn(store) {
        const fxnObj = _.find(this.funcArr, { store });
        if (!_.isUndefined(fxnObj)) {
            return fxnObj.func;
        }
    }

    errHandler(cmpt) {
        cmpt.errors = [];
        cmpt.submitted = false;
        cmpt.error = ['Sorry an error occurred'];
        cmpt.errors.push(cmpt.error[0]);
    }

    prefillModel(cmpt?, model?, store?) {
        if (store === 'branches') {
            const obj = {
                organization_name: cmpt.tabbedItem['name']
            };
            model = { ...model, ...cmpt.listParams };
            model = {...model, ...obj };
        } else if (store === 'users') {
            model = { ...model, ...cmpt.listParams };
        }
    }

    setOrgInline(model, cmpt, store) {
        const modelObj = { 
            ...model, 
            organization: get(cmpt.tabbedItem, 'organization', null)
        };
        const orgId = get(JSON.parse(
            localStorage.getItem('organization')), 'organization', null);
        const editParam = { key: 'current_org_id', value: orgId };
        this.editInline(modelObj, cmpt, store, editParam);
    }

    editInlineMultiple(model, cmpt, store) {
        const userFields = ['first_name', 'last_name', 'other_names',
            'email', 'phone_number', 'dob', 'gender', 'id_number',
            'passport_number', 'federation_number' ];
        each(userFields, field => {
            model['user'] = { ...model['user'], [field]:  model[field] };
            delete model[field];
        });
        const orgId = get(JSON.parse(
            localStorage.getItem('organization')), 'organization', null);
        const editParam = { key: 'current_org_id', value: orgId };
        // if (has(model, 'id')) delete model['user']['email'];
        if (has(model, 'id')) delete model['user'];
        this.editInline(model, cmpt, store, editParam);
    }

    preProcessModel(prefillObj) {
        const userFields = ['first_name', 'last_name', 'other_names',
            'email', 'phone_number', 'dob', 'gender', 'id_number',
            'passport_number', 'federation_number' ];
        each(userFields, field => {
            prefillObj = { ...prefillObj, [field]: get(prefillObj['user'], field, null) }
        });
        delete prefillObj['user'];
        return prefillObj;
    }

    editInline(model, cmpt, store, editParam?) {
        store = store === 'users' ? 'register' : store;
        if (model.id) {
            cmpt.submitted = true;
            this.dataLayer.update(store, model.id, model, editParam)
            .subscribe((resp: any) => {
                cmpt.submitted = false;
                const lngMsg = 'Record updated successful';
                this.dataLayer.openDynamicSnackBar(lngMsg, 'success');
                cmpt.showToast('bottom-right', 'success', 'Updating record', lngMsg);
                cmpt.getData();
                if (!isUndefined(cmpt.postCRUDFxn)) {
                    cmpt.postCRUDFxn.emit();
                }
            }, err => { 
                this.errHandler(err); 
                cmpt.submitted = false;
                const errMsg = 'An error occurred during updated. Try again';
                this.dataLayer.openDynamicSnackBar(errMsg, 'error');
            })
        } else {
            if (store === 'register') {
                model.rolesToBeAssigned.map(role => {
                    delete role.roleCode;
                    delete role.roleDescription;
                    role.toBeAssignedThisRole = true;
                    return role;
                })
                model.countyId = model.countyId || 1;
                model.middleName = model.middleName || '';
                delete model.confirm_password;
            }
            this.prefillModel(cmpt, model, store);
            this.dataLayer.create(store, model, undefined, editParam)
            .subscribe((resp: any) => {
                cmpt.submitted = false;
                const lngMsg = 'Record created successful';
                this.dataLayer.openDynamicSnackBar(lngMsg, 'success')
                cmpt.showToast('bottom-right', 'success', 'Creating record', lngMsg);
                cmpt.toggleHeaderInline();
                cmpt.getData();
                if (!isUndefined(cmpt.postCRUDFxn)) {
                    cmpt.postCRUDFxn.emit();
                }
            }, err => { 
                this.errHandler(err); 
                cmpt.submitted = false; 
                const errMsg = 'An error occurred during creation. Try again';
                this.dataLayer.openDynamicSnackBar(errMsg, 'error');
            })
        }
    }

    addingItemtoModel(store) {
        const storesArr = ['accept-events'];
        const ind = _.indexOf(storesArr, store);
        return ind >= 0;
    }

    receiveModel(model, store, cmpt) {
        cmpt.submitted = true;
        const currFxn = this.getServiceFxn(store);
        this[currFxn](model, cmpt, store);
    }
}