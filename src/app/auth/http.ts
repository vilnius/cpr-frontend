import { Injectable } from '@angular/core';
import { Http, XHRBackend, RequestOptions, Request, RequestOptionsArgs, Response, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class AuthHttp extends Http {

  constructor(private backend: XHRBackend, options: RequestOptions, private router: Router) {
    super(backend, options);
  }

  public request(url: string|Request, options?: RequestOptionsArgs): Observable<Response> {
    if (typeof url !== 'string') {
      let token = localStorage.getItem('token');
      url.headers.set('Authorization', `jwt ${token}`);
    }
    return super.request(url, options).catch(this.catchAuthError());
  }

  private catchAuthError() {
    return (res: Response) => {
      if (res.status === 401) {
        this.router.navigate(['./login']);
      } else if (res.status === 403) {
        alert('You have no permission!');
      }
      return Observable.throw(res);
    };
  }
}
