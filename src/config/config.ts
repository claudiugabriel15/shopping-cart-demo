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

    load() {
      return this.http.get('assets/locale.json')
        .map(res => res.json())
        .catch((error: any) => {
          this.setDefaultValues();
          return error;
        })
        .subscribe((config) => {
          _.set(this, '_config.currency', config.currency);
          _.set(this, '_config.language', config.language);
          _.set(this, '_config.dateFormat', config.dateFormat);
          _.set(this, '_config.dictionary', config.dictionary);
        });
    }

    get(key: any) {
      return this._config[key];
    }

    setDefaultValues() {
      _.set(this, '_config.currency', 'USD');
      _.set(this, '_config.language', 'en-us');
      _.set(this, '_config.dateFormat', 'en-us');
      _.set(this, '_config.dictionary', {});
    }
}