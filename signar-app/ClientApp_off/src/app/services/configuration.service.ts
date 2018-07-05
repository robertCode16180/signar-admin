import { Injectable } from '@angular/core';
import { Utilities } from './utilities';
import { environment } from '../../environments/environment';


@Injectable()
export class ConfigurationService {

  public baseUrl = environment.baseUrl || Utilities.baseUrl();
  public loginUrl = environment.loginUrl;

}
