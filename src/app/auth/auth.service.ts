import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { tokenNotExpired } from 'angular2-jwt';
import { AuthHttp } from './http';
import 'rxjs/add/operator/map';

interface LoginResponse {
  token: string;
  expiresIn: number;
}

@Injectable()
export class AuthService {
  constructor(private http: HttpClient, private authHttp: AuthHttp) {
    if (this.loggedIn()) {
      this.refresh();
    }
  }

  public loggedIn() {
    return tokenNotExpired();
  }

  public login(username: String, password: String) {
    return this.http.post<LoginResponse>('/api/tokens/login', { username, password })
      .map((data) => {
        this.setToken(data.token);
      });
  }

  public logout() {
    localStorage.removeItem('token');
  }

  private refresh() {
    this.authHttp.post('/api/tokens/refresh', null)
      .map((res) => res.json())
      .subscribe((data) => this.setToken(data.token));
  }

  private setToken(token) {
    localStorage.setItem('token', token);
  }
}
