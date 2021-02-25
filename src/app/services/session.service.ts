import { Injectable } from '@angular/core';
import { Authorization } from './authorization.service';

@Injectable()
export class Session {
    STATE_STORE = 'state.dump';

    constructor(public authConfig: Authorization) {}
    dumpState(state: string, params: Object, opts?: any): void {
        const user = this.authConfig.getUser() as { id };
        const stateObj = JSON.parse(state) as { name };
        const stateDump = {
            name: stateObj.name,
            params: opts,
            queryParams: params,
            uid: null,
        };

        if (user) {
            stateDump.uid = user.id;
        }

        localStorage.setItem(this.STATE_STORE, JSON.stringify(stateDump));
    }

    loadState = (): Object => {
        const dump = JSON.parse(localStorage.getItem(this.STATE_STORE)) as { uid; name; params;
            queryParams; extraParams; };
        const user = this.authConfig.getUser();
        if (dump && (
            (dump.uid && user.id === dump.uid) ||
            (dump && !dump.uid))) {
            return {
                uid: dump.uid,
                name: dump.name,
                params: dump.params,
                queryParams: dump.queryParams,
                extraParams: dump.extraParams,
            };
        }

        return null;
    }

    clearState(): void {
        localStorage.removeItem(this.STATE_STORE);
        return;
    }
}