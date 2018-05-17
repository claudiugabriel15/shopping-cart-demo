import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import 'rxjs/add/operator/catch';
import * as _ from 'lodash';

@Injectable()
  export class Config {
    private _config: {};

    constructor(private http: Http) {
    }

    load(): Promise<boolean> {
      return this.http.get('assets/locale.json')
        .map(res => res.json())
        .toPromise()
        .catch((error: any) => {
          this.setDefaultValues();
          return false;
        })
        .then((config) => {
          _.set(this, '_config.currency', config.currency);
          _.set(this, '_config.dateFormat', config.dateFormat);

          return true;
        });
    }

    get(key: any) {
      return this._config[key];
    }

    setDefaultValues() {
      _.set(this, '_config.currency', 'USD');
      _.set(this, '_config.dateFormat', 'en-us');
    }
}
