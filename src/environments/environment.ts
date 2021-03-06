// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: 'AIzaSyDu9HzgHLCzUQ41Dmus2F24Sd79YCdFYbY',
    authDomain: 'jungle-sweets.firebaseapp.com',
    databaseURL: 'https://jungle-sweets.firebaseio.com',
    projectId: 'jungle-sweets',
    storageBucket: 'jungle-sweets.appspot.com',
    messagingSenderId: '821964923546',
    appId: '1:821964923546:web:6a3c8cbbfef9695cd73523',
    measurementId: 'G-PDDWVBMJHB',
  },
  ssrUrl: 'http://localhost:4200',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
