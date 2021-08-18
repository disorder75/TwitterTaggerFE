import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { AuthenticationService } from '../authentication.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth: AuthenticationService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // Get the auth token from the service.
    const authToken = this.auth.getBearerToken();

    /*
    * The verbose way:
    // Clone the request and replace the original headers with
    // cloned headers, updated with the authorization.
    const authReq = req.clone({
      headers: req.headers.set('Authorization', authToken)
    });
    */
    // Clone the request and set the new header in one step.
    const authReq = req.clone({ setHeaders: { Authorization: this.auth.getBearerToken(), 
                                              'Access-Control-Allow-Origin': '*',
                                              'Access-Control-Allow-Credentials': 'true',
                                              'Access-Control-Allow-Headers': 'Content-Type',
                                              'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
                                              'Accept': 'application/json'
                                            }
                              });

    // send cloned request with header to the next handler.
    console.log("Request intercepted");
    return next.handle(authReq);
  }
}