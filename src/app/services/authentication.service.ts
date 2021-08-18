import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { LoggedUser } from '../shared/loggedUser';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  username!: string;
  bearer!: string;
  loggedUser!: LoggedUser;

  loggedUserChange: Subject<LoggedUser> = new Subject<LoggedUser>();

  constructor() {     
    this.loggedUserChange.subscribe((value) => {
      this.loggedUser = value;
    });
  }
  
  getBearerToken() {
    return this.bearer;
  }

  setBearerToken(bearer: string) {
    this.bearer = bearer;
  }

  getUsername() {
    return this.username;
  }

  setUserName(username: string) { 
    this.username = username;
  };

  getLoggedUser(): LoggedUser {
    return this.loggedUser;
  }

  setLoggedUser(loggedUser: LoggedUser) {
    this.loggedUserChange.next(loggedUser);
  }

}
