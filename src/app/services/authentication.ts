// authentication.ts
import {Injectable} from 'angular2/core';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class Authentication {
  token: string;
  loggedIn: boolean = false;

  constructor() {
    this.token = localStorage.getItem('token');
    if (this.token) {
      this.loggedIn = true;
    }
  }

  login(username: String, password: String) {
    /*
     * If we had a login api, we would have done something like this

    return this.http.post('/api/auth/login', JSON.stringify({
        username: username,
        password: password
      }), {
        headers: new Headers({
          'Content-Type': 'application/json'
        })
      })
      .map((res : any) => {
        let data = res.json();
        this.token = data.token;
        localStorage.setItem('token', this.token);
      });

      for the purpose of this cookbook, we will juste simulate that
    */

    let observable;

    if (username === 'admin' && password === 'admin') {
      this.token = 'token';
      this.loggedIn = true;
      localStorage.setItem('token', this.token);
      observable = Observable.of('token');
    } else {
      observable = Observable.throw('authentication failure');
    }

    return observable;
  }

  logout() {
    /*
     * If we had a login api, we would have done something like this

    return this.http.post('/api/auth/logout', {
      headers: new Headers({
        'x-security-token': this.token
      })
    })
    .map((res : any) => {
      this.token = undefined;
      localStorage.removeItem('token');
    });
     */

    this.token = undefined;
    this.loggedIn = false;
    localStorage.removeItem('token');

    return Observable.of(true);
  }
}
