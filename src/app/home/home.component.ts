import { Component, OnInit, Inject } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { expand, flyInOut } from '../animations/app.animation';
import { LoggedUser } from '../shared/loggedUser';
import { TwitterService } from '../services/twitter.service';
import { Tweet } from '../shared/tweet';
import { interval, Subscription } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { StatsService } from '../services/stats.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [
    flyInOut(), expand()
  ]  
})
export class HomeComponent implements OnInit {
  baseURL!: string;
  loggedUser!: LoggedUser;
  errorMessage: string;

  tweet: Tweet;
  timeInterval: Subscription;
  randomImage: string;

  tweet02: Tweet;
  timeInterval02: Subscription;
  randomImage02: string;
  
  constructor(private authenticationService: AuthenticationService,
              private twitterService: TwitterService,
              private statsService: StatsService,
              @Inject('BaseURL') baseURL) { 
    this.baseURL = baseURL;

    /*
     *    Subscribe for value change on logged user 
     */
    this.authenticationService.loggedUserChange.subscribe(loggedUser => {
                                                                        console.log("loading logged user " + JSON.stringify(loggedUser));
                                                                        this.loggedUser = loggedUser;
                                                                        this.poolTweets();                                                                  
    });

  }

  ngOnInit(): void {
    this.loggedUser = this.authenticationService.getLoggedUser();
    if (this.loggedUser) { 
      this.poolTweets();
    }
  }

  ngOnDestroy(): void {
    
  }

  poolTweets() { 
    console.log("registering polling tweets");
    if (this.timeInterval)
      this.timeInterval.unsubscribe();
    this.timeInterval = interval(10000).pipe(startWith(0), switchMap(()=> this.twitterService.getTweetWithPrediction()),)
                                        .subscribe(tweet => { 
                                                              if (tweet) {
                                                                this.tweet = tweet; 
                                                                this.randomImage = "../../assets/images/tweet" + this.getRandomArbitrary(1,17) + ".png";
                                                                if (this.tweet.prediction)
                                                                  this.statsService.update(this.tweet.prediction);
                                                              }
                                                            }, err => this.errorMessage = err);
    if (this.timeInterval02)
      this.timeInterval02.unsubscribe();
    this.timeInterval02 = interval(11000).pipe(startWith(0), switchMap(()=> this.twitterService.getTweetWithPrediction()),)
                                        .subscribe(tweet => {this.tweet02 = tweet; this.randomImage02 = "../../assets/images/tweet" + this.getRandomArbitrary(1,17) + ".png";}, err => this.errorMessage = err);
  }

  /**
   * Returns a random number between min (inclusive) and max (exclusive)
   */
  getRandomArbitrary(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }


}
