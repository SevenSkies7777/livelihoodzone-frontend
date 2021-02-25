import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: "root",
})
export class AppConfigService {
    appConfig;
    constructor(private readonly http: HttpClient) {}
    loadAppConfig = () => {
        return this.http.get('assets/data/appConfig.json')
        .toPromise()
        .then(data => {
            this.appConfig = data;
        });
    }
    getConfig() {
        return this.appConfig;
    }
}

export function appInitializeFn(appConfig: AppConfigService) {
    return () => {
        return appConfig.loadAppConfig();
    }
};
