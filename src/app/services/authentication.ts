import {Injectable} from '@angular/core';
import {Router} from '@angular/router-deprecated';
import {Http, Headers, Request, Response, XHRBackend, BrowserXhr, ResponseOptions} from '@angular/http';
import {Observable} from 'rxjs/Rx';


export class AuthenticationConnectionBackend extends XHRBackend {
  constructor(_browserXHR: BrowserXhr, _baseResponseOptions: ResponseOptions, private _router: Router) {
    super(_browserXHR, _baseResponseOptions);
  }
  isUnauthorized(status: Number): Boolean {
    return status === 401 || status === 403;
  }
  createConnection(request: Request) {
    let xhrConnection = super.createConnection(request);
    xhrConnection.response = xhrConnection.response.catch((error: any) => {
      if (this.isUnauthorized(error.status)) {
        // Navigate to login page when 'Unauthorized' is received
        this._router.navigate(['Login']);
      }
      return Observable.throw(error);
    });
    return xhrConnection;
  }
}


@Injectable()
export class Authentication {
  token: string;
  loggedIn: boolean = false;

  constructor(public http: Http) {
    this.token = localStorage.getItem('token');
    if (this.token) {
      this.loggedIn = true;
    }
  }

  login(username: String, password: String) {
    return this.http.post('/api/auth/login', JSON.stringify({
        username: username,
        password: password
      }), {
        headers: new Headers({
          'Content-Type': 'application/json'
        })
      })
      .map(res => res.json())
      .map(data => {
        this.token = data.token;
        this.loggedIn = true;
        localStorage.setItem('token', this.token);
      });
  }

  logout() {
    return this.http.post('/api/auth/logout', null, {
      headers: new Headers({
        'Token': this.token
      })
    }).subscribe(
      data => {
        this.token = undefined;
        this.loggedIn = false;
        localStorage.removeItem('token');
      },
      err => console.error(err)
    );
  }
}
