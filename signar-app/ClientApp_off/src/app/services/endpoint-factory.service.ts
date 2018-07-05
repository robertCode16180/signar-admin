import { Injectable, Injector } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable ,  Subject } from 'rxjs';





import { ConfigurationService } from './configuration.service';
import { AuthService } from './auth.service';

@Injectable()
export class EndpointFactory {

  static readonly apiVersion: string = "1";

  private readonly _loginUrl: string = "/api/Authorize/login";

  private get loginUrl() { return this.configurations.baseUrl + this._loginUrl; }

  constructor(protected http: HttpClient,
              protected configurations: ConfigurationService,
              private injector: Injector)
  {
   
  }

  getLoginEndpoint<T>(userName: string, password: string) {

    return this.http.post<T>(this.loginUrl, { userAD: userName, password: password },
                             {
                               headers: new HttpHeaders().set('Content-Type', 'application/json')
                             });

  }


}
