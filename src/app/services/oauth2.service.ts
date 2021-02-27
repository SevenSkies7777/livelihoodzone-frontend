import { Injectable } from '@angular/core';
import { environment as e } from '../../environments/environment';
import { AppConfigService } from './../app-config.service';


@Injectable()
export class AuthUrls {
    domain = e.AUTH_SERVER_DOMAIN;
    token = '/oauth2/token/';
    authorize = '/oauth2/authorize/';
    revoke = '/token/logout/';
    redirect = '/auth/complete';
    silentRedirect = '/token.html';
    userInfo = '/users/me';
    passwordReset = '/auth/request-password-reset/';
    passwordChange = '/auth/reset-password/';
}

export class OauthCredz {
    responseType = 'token';
    clientId = e.CLIENT_ID;
}

@Injectable()
export class ConfigAuthUrl {
    configs: ['domain', 'token', 'authorize', 'revoke',
        'redirect', 'userInfo', 'passwordReset',
        'passwordResetConfirm', 'passwordChange',
        'silentRedirect'];

    creditConfigs: ['clientId', 'approvalPrompt'];
    arrayOfKeys: string[];
    authUrls: any = new AuthUrls();
    oauthCredz: OauthCredz = new OauthCredz();
    settings: any;

    constructor(private readonly configServ: AppConfigService) {
        this.settingConfigs(configServ.appConfig);
        this.arrayOfKeys = Object.keys(this.authUrls);
    }

    settingConfigs(settings: object) {
        this.settings = settings;
        this.authUrls.domain = this.settings ? this.settings.AUTH_SERVER_DOMAIN :
            this.authUrls.domain;
        this.oauthCredz.clientId = this.settings ? this.settings.CLIENT_ID : 
            this.oauthCredz.clientId;
        return;
    }

    setStuff(vars: any[], config?: any, obj?: any): void {
        vars.forEach((key: any) => {
            const cfg = config[key];
            if (!config[key]) {
                return;
            }
            this.authUrls[key] = cfg;
        });
    }

    setAuthUrls(setting?: any): void {
        this.arrayOfKeys = this.configs;
        this.setStuff(this.arrayOfKeys, setting, this.authUrls);
    }

    setOAuthCredz(setting?: any): void {
        this.arrayOfKeys = this.creditConfigs;
        this.setStuff(this.arrayOfKeys, setting, this.oauthCredz);
    }
}