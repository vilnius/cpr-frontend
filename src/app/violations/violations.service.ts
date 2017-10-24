import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Violation } from './models';

const VIOLATIONS_API = '/api/violations';

@Injectable()
export class ViolationsService {
  constructor(private http: Http) {
  }

  public getViolations(): Observable<Violation[]> {
    let params: URLSearchParams = new URLSearchParams();
    params.set('page', '1');
    params.set('perPage', '1000');
    return this.http
      .get(VIOLATIONS_API, { search: params })
      .map((value) => value.json().objects);
  }

  public getViolation(id): Observable<Violation> {
    const url = VIOLATIONS_API + '/' + id;
    return this.http.get(url).map((value) => value.json());
  }

  public saveViolation(violation: Violation) {
    let url = VIOLATIONS_API;
    if (violation._id) {
      url += '/' + violation._id;
    }
    return this.http.post(url, violation).map((value) => value.json());
  }
}
