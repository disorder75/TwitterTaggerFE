// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  webAppRootUrl : 'http://localhost:3000/',
  twitterApiV2BaseUrl : 'https://api.twitter.com/2/',
  twitterApiUserByUsername: 'users/by/username/',
  twitterApiQueryStringOptions : '?expansions=pinned_tweet_id&user.fields=created_at&tweet.fields=created_at',
  apiV1BackendRequest: "/twitterv2api/v1/request",
  apiV1BackendStreamed: "/streamed",
  userInfoQueryStringOptions : '?expansions=pinned_tweet_id&user.fields=profile_image_url,created_at,description,url,protected,location,entities,username,verified&tweet.fields=created_at',
  requestedUrl : '',
  backendUrl: 'http://localhost:8080',
  twitterGatewayApiUrl: '/twitterv2api/v1',
  nbcApiUrl: '/api/v1/naivebayes/',
  nbcApiPredict: 'predict'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
