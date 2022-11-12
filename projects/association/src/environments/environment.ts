// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  apiUrl: "http://localhost:8000/",
  // apiUrl: "https://api.netrink.com/",

  baseUrl: "https://www.netrink.com/",
  personalUrl: "https://personal.netrink.com/",
  associationUrl: "https://association.netrink.com/",

  paystackTestPublicKey: "pk_test_275f8f544fab9c9c78a1e8789d8c883f0102f708",
  paystackLivePublicKey: "pk_live_921d89f7a824979fe69d35154cce546431f15d7b",
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
