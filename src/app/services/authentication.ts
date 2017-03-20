import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';

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
    return this.http.post('/api/auth/login', JSON.stringify({ username, password }), {
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
        Token: this.token
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
