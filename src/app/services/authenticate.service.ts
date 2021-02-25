import { Injectable } from '@angular/core';

import * as moment from 'moment';
import * as _ from 'lodash';

@Injectable()
export class AuthenticationService {
    CREDZ_STORE = 'auth.config.credz';
    USER_STORE = 'auth.config.user';

    constructor() {}

    getUser(): Object {
        const user = localStorage.getItem(this.USER_STORE);
        return JSON.parse(user);
    }

    getToken(): Object {
        const token = localStorage.getItem(this.CREDZ_STORE);
        return JSON.parse(token);
    }

    isAuthenticated(): boolean {
        //get token object
        const user = this.getUser();
        const hasToken = this.getToken();
        if (!_.isNull(user) && !_.isNull(hasToken)) {
            const now = moment();
            const expiresAt = 'expires_at';
            const isExpired = now.isAfter(
                moment(hasToken[expiresAt]),
            );
            return !isExpired;
        } else {
            return false;
        }
    }
}
