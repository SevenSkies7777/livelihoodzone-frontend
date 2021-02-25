import { Injectable } from '@angular/core';
import { find, get, indexOf, isNull, isUndefined } from 'lodash';

import { Authorization } from './authorization.service';

@Injectable()
export class AuthCheckerService {
    constructor(private _authConfig: Authorization) {

    }

    isActionAllowed(allowedOrgTypes, roles) {
        const orgType = get(JSON.parse(localStorage.getItem('organization')), 'org_type');
        const organization = get(JSON.parse(localStorage.getItem('organization')), 'organization');
        const user = JSON.parse(this._authConfig.getUser());
        if (isUndefined(roles)) {
            return indexOf(allowedOrgTypes, orgType) >= 0;
        } else {
            const currOrg = find(user.organizations, { organization }, null);
            return ( indexOf(roles, currOrg.group_name) >= 0 
                || isNull(currOrg.group)) 
                && indexOf(allowedOrgTypes, orgType) >= 0;
        }
    }
}