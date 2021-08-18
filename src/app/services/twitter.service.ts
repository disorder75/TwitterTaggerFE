import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LoggedUser } from '../shared/loggedUser';
import { Tweet } from '../shared/tweet';
import { TwitterRequest } from '../shared/twitterRequest';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TwitterService {

  /* 
   *    examples calls from command line
   *
   */  
  // curl -v "https://sapi.twitter.com/2/users/by/username/_CaptainUnlucky?expansions=pinned_tweet_id&user.fields=created_at&tweet.fields=created_at" -H "Authorization: Bearer $BEARER_TOKEN"
  // "https://api.twitter.com/2/users/by/username/_CaptainUnlucky?expansions=pinned_tweet_id&user.fields=profile_image_url,created_at,description,url,protected,location,entities,username,verified&tweet.fields=created_at";

/* 
   *    BACKEND API
   *
   */  

  private twitterRequest: TwitterRequest = {bearer: '', request : '', twitterRequestReceived : '', twitterRequestSent : ''};
  private trainingSet: {
    text: string;
    classification: string;
  };

  constructor(private http: HttpClient, private processHTTPMsgService: ProcessHTTPMsgService) { 
    this.trainingSet = {
      text: '',
      classification: ''
    };

  }

  doUserAuthentication(username: string, bearer: string = ''): Observable<LoggedUser> {
    this.twitterRequest.bearer = bearer;
    this.twitterRequest.request = environment.twitterApiV2BaseUrl + environment.twitterApiUserByUsername + username + environment.userInfoQueryStringOptions;
    return this.http.post<LoggedUser>(environment.backendUrl + environment.apiV1BackendRequest, this.twitterRequest).pipe(catchError(e => this.processHTTPMsgService.handleError(e)));
  }

  getTweetWithPrediction(): Observable<Tweet> {
    return this.http.get<Tweet>(environment.backendUrl + environment.nbcApiUrl + environment.nbcApiPredict).pipe(catchError(e => this.processHTTPMsgService.handleError(e)));
  }

  getTweetsFilteredByRules(bearer: string = ''): Observable<Tweet[]> {
    this.twitterRequest.bearer = bearer;
    this.twitterRequest.request = ''
    return this.http.post<Tweet[]>(environment.backendUrl + environment.twitterGatewayApiUrl + environment.apiV1BackendStreamed, this.twitterRequest).pipe(catchError(e => this.processHTTPMsgService.handleError(e)));
  }

  train(text: string, classification: string): Observable<Tweet> {
    this.trainingSet.classification = classification;
    this.trainingSet.text = text;
    return this.http.post<Tweet>(environment.backendUrl + environment.nbcApiUrl, this.trainingSet).pipe(catchError(e => this.processHTTPMsgService.handleError(e)));
  }    

}
