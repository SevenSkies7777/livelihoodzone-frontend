// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    hmr       : false,
    serverURL: 'http://46.101.179.235:8070',
    AUTH_SERVER_DOMAIN: 'http://46.101.179.235:8070',
    CLIENT_ID: '',
    TIMEOUT: {
        idle: 2400,
        warning: 60,
    },
    AVAILABLE_HOMEPAGES: [
        'profile',
    ],
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
