import { Injectable, Injector } from '@angular/core';
import { Router, NavigationExtras } from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


import { EndpointFactory } from './endpoint-factory.service';
import { ConfigurationService } from './configuration.service';

@Injectable()
export class AccountEndpoint extends EndpointFactory {

  private readonly _usersUrl: string = "/api/account/user";

  usersUrl() { return this.configurations.baseUrl + this._usersUrl; }

  constructor(http: HttpClient, configurations: ConfigurationService, injector: Injector)
  {
    super(http, configurations, injector);

  }

  //getUser(userId?: string) {
  //  return this.getUserEndpoint<User>(userId);
  //}

  //getUserEndpoint<T>(userId?: string): Observable<T> {
  //  let endpointUrl = userId ? `${this.usersUrl}/${userId}` : this.currentUserUrl;

  //  return this.http.get<T>(endpointUrl, this.getRequestHeaders())
  //    .catch(error => {
  //      return this.handleError(error, () => this.getUserEndpoint(userId));
  //    });
  //}

}
