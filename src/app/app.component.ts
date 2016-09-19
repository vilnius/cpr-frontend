/*
 * Angular 2 decorators and services
 */
import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Authentication } from './services/authentication';
import { GoogleMapsAPI } from './lanemap/google-maps-api';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  providers: [
    GoogleMapsAPI,
  ],
  styles: [`
    main {
      padding-top: 60px;
    }
  `],
  template: `
    <header>
      <nav class="navbar navbar-default navbar-fixed-top">
        <div class="container-fluid">
          <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
              <span class="sr-only">Toggle navigation</span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" [routerLink]=" ['./'] ">{{ name }}</a>
          </div>
          <div id="navbar" class="navbar-collapse collapse">
            <ul *ngIf="auth.loggedIn" class="nav navbar-nav">
              <li>
                <a [routerLink]=" ['./dashboard'] " routerLinkActive="active">Dashboard</a>
              </li>
              <li>
                <a [routerLink]=" ['./penalties'] " routerLinkActive="active">Penalties</a>
              </li>
              <li>
                <a  [routerLink]=" ['./lane-map'] " routerLinkActive="active">Lane Map</a>
              </li>
              <li>
                <a [routerLink]=" ['./whitelist'] " routerLinkActive="active">Plate Whitelist</a>
              </li>
              <li>
                <a  [routerLink]=" ['./about'] " routerLinkActive="active">About</a>
              </li>
            </ul>
            <ul class="nav navbar-nav navbar-right">
              <li *ngIf="!auth.loggedIn">
                <a [routerLink]=" ['./login'] " routerLinkActive="active">Login</a>
              </li>
              <li *ngIf="auth.loggedIn">
                <a href="#" (click)="logout($event)">Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>

    <main>
      <div class="container-fluid">
        <router-outlet></router-outlet>
      </div>
    </main>

    <footer>
      <div class="container-fluid"></div>
    </footer>
  `
})
export class App {
  name = 'Car Plate Reader';
  constructor(public auth: Authentication, public router: Router) {}
  logout(event: any) {
    event.preventDefault();
    this.auth.logout();
    this.router.navigate(['./login']);
  }
}
