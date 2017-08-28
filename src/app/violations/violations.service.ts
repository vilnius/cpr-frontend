import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import {Observable} from 'rxjs/Observable';

const VIOLATIONS_API = '/api/violations'

@Injectable()
export class ViolationsService {
  constructor(private http: Http) {
  }

  getViolations() {
    let params: URLSearchParams = new URLSearchParams();
    params.set('page', '1');
    params.set('perPage', '1000');
    return this.http
      .get(VIOLATIONS_API, { search: params })
      .map(value => value.json().objects);
  }

  getViolation(id) {
    const url = VIOLATIONS_API + '/' + id;
    return this.http.get(url).map(value => value.json());
  }
}
