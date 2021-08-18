import { Component, Inject, OnInit } from '@angular/core';
import { expand, flyInOut } from '../animations/app.animation';
import { TwitterService } from '../services/twitter.service';
import { AuthenticationService } from '../services/authentication.service';
import { Tweet } from '../shared/tweet';
import { LoggedUser } from '../shared/loggedUser';
import { jsDocComment } from '@angular/compiler';

@Component({
  selector: 'app-train',
  templateUrl: './train.component.html',
  styleUrls: ['./train.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [
    flyInOut(), expand()
  ]  
})
export class TrainComponent implements OnInit {

  baseURL!: string;
  tweets: Tweet[];
  errorMessage: string;
  loggedUser: LoggedUser;
  trainResp: any;
  isLoading: boolean;

  constructor(private twitterService: TwitterService,
              private authenticationService: AuthenticationService,
              @Inject('BaseURL') baseURL) { 
    this.baseURL = baseURL;
    /*
     *    Subscribe for value change on logged user 
     */
    this.authenticationService.loggedUserChange.subscribe(loggedUser => {
      this.loggedUser = loggedUser;
    });

  }

  ngOnInit(): void {
    this.loggedUser = this.authenticationService.getLoggedUser();
    console.log("train loggedUser: " + JSON.stringify(this.loggedUser));
  }

  getTweets() {
    this.tweets = null;
    this.isLoading = true;
    this.twitterService.getTweetsFilteredByRules(this.authenticationService.getBearerToken()).subscribe(tweets => {
      this.tweets = tweets;
      for (var i=0; i < this.tweets.length; i++) {
        this.tweets[i].visible = true;
      }
      this.isLoading = false;
    }, error => this.errorMessage = error);

  }


  train(classification:string, tweet:Tweet) {
    tweet.visible=false;
    console.log("classification: " + classification + " tweet: " + JSON.stringify(tweet))
    this.twitterService.train(tweet.data.text, classification).subscribe(resp => {
      this.trainResp = resp;
      console.log("training response: " + JSON.stringify(this.trainResp));
    }, error => this.errorMessage = error);
  }

}
