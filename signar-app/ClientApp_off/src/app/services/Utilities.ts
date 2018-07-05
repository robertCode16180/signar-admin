import { Injectable } from '@angular/core';
import { HttpResponseBase, HttpResponse, HttpErrorResponse } from '@angular/common/http';


@Injectable()
export class Utilities {

  public static baseUrl() {
    let base = '';

    if (window.location.origin)
      base = window.location.origin;
    else
      base = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port : '');

    return base.replace(/\/$/, '');
  }

  public static JSonTryParse(value: string) {
    try {
      return JSON.parse(value);
    }
    catch (e) {
      if (value === "undefined")
        return void 0;

      return value;
    }
  }

  public static capitalizeFirstLetter(text: string) {
    if (text)
      return text.charAt(0).toUpperCase() + text.slice(1);
    else
      return text;
  }

}
