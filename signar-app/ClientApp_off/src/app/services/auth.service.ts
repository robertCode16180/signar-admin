
import { map, take } from 'rxjs/operators';
import { of } from 'rxjs';

import { Injectable } from '@angular/core';
import { Router, NavigationExtras } from "@angular/router";
import { Observable ,  Subject } from 'rxjs';


import { LocalStoreManager } from './local-store-manager.service';
import { EndpointFactory } from './endpoint-factory.service';
import { ConfigurationService } from './configuration.service';
import { DBkeys } from './db-Keys';
import { JwtHelper } from './jwt-helper';
import { User } from '../models/user.model';

import { LoginResponse, IdToken } from '../models/login-response.model';


@Injectable()
export class AuthService {

  constructor(private router: Router,
              private configurations: ConfigurationService,
              private endpointFactory: EndpointFactory,
              private localStorage: LocalStoreManager)
  {

  }

  login(userName: string, password: string, rememberMe?: boolean) {

    //if (this.isLoggedIn)
    //  this.logout();

    return this.endpointFactory.getLoginEndpoint<LoginResponse>(userName, password).pipe(
      map(response => this.processLoginResponse(response)));
  }

  private processLoginResponse(response: LoginResponse) {

    let accessToken = response.access_token;

    if (accessToken == null)
      throw new Error("Received accessToken was empty");

    //let refreshToken = response.refresh_token || this.refreshToken;
    let expiresIn = response.expiration;

    let tokenExpiryDate = new Date();
    tokenExpiryDate.setSeconds(tokenExpiryDate.getSeconds() + expiresIn);

    let accessTokenExpiry = tokenExpiryDate;

    let jwtHelper = new JwtHelper();
    let decodedIdToken = <IdToken>jwtHelper.decodeToken(accessToken);

    let user = new User(
        decodedIdToken.sub,
        decodedIdToken.nameid);
        user.isEnabled = true;

    this.saveUserDetails(user, accessToken, accessTokenExpiry);

    return user;
  }

  private saveUserDetails(user: User, accessToken: string, expiresIn: Date) {

    this.localStorage.savePermanentData(accessToken, DBkeys.ACCESS_TOKEN);
    this.localStorage.savePermanentData(expiresIn, DBkeys.TOKEN_EXPIRES_IN);
    this.localStorage.savePermanentData(user, DBkeys.CURRENT_USER);

  }

}
