import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms'; 
import { AuthenticationService } from '../services/authentication.service';
import { TwitterService } from '../services/twitter.service';
import { LoggedUser } from '../shared/loggedUser';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user = {username: '', bearer: ''};
  loggedUser!: LoggedUser;
  errMess: string;

  constructor(public dialogRef: MatDialogRef<LoginComponent>, 
              private authenticationService: AuthenticationService,
              private twitterService: TwitterService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log("User: ", this.user);
    this.authenticationService.setUserName(this.user.username);
    this.authenticationService.setBearerToken(this.user.bearer);

    this.twitterService.doUserAuthentication(this.authenticationService.getUsername(), 
                                             this.authenticationService.getBearerToken()).subscribe(loggedUser => { 
      console.log("storing new logged user " + JSON.stringify(loggedUser));
      this.authenticationService.setLoggedUser(loggedUser);
    },
    errmess => { 
                  this.authenticationService.setLoggedUser(null);
                  this.errMess = <any>errmess; 
                }
    );

    this.dialogRef.close();
  }

}
