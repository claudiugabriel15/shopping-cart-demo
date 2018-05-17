import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { HttpResponse, HttpEventType } from '@angular/common/http';

import 'rxjs/add/operator/debounceTime';

@Injectable()
export class LocationService {

  constructor(
    private http: Http
  ) { }

  getLocationByIP() {
    return this.http.get('http://ip-api.com/json').map(
      (response) => response.json()
    ).toPromise();
  }

  getCountriesList(name) {
    if (name && name.length > 0) {
      return this.http.get(`https://restcountries.eu/rest/v2/name/${name}`).map(
        (response) => response.json()
      ).debounceTime(200).toPromise();
    }
  }
}
