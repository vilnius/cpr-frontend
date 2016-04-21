// authentication.ts
import {Injectable} from 'angular2/core';
import {Observable} from 'rxjs/Rx';
import {Http, Headers} from 'angular2/http';

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
        console.log("BABABA")
        this.token = data.token;
        this.loggedIn = true;
        localStorage.setItem('token', this.token);
      });

    /*
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
    */
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

    /*
    this.token = undefined;
    this.loggedIn = false;
    localStorage.removeItem('token');

    return Observable.of(true);
    */
  }
}
