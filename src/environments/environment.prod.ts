export const environment = {
  production: true,
  webAppRootUrl : '/',
  twitterApiV2BaseUrl : 'https://api.twitter.com/2/',
  twitterApiUserByUsername: 'users/by/username/',
  twitterApiQueryStringOptions : '?expansions=pinned_tweet_id&user.fields=created_at&tweet.fields=created_at',
  apiV1BackendRequest: "/twitterv2api/v1/request",
  apiV1BackendStreamed: "/streamed",
  userInfoQueryStringOptions : '?expansions=pinned_tweet_id&user.fields=profile_image_url,created_at,description,url,protected,location,entities,username,verified&tweet.fields=created_at',
  requestedUrl : '',
  backendUrl: 'https://twittertagger.herokuapp.com',
  twitterGatewayApiUrl: '/twitterv2api/v1',
  nbcApiUrl: '/api/v1/naivebayes/',
  nbcApiPredict: 'predict'
};
