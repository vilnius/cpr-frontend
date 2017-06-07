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
              <li routerLinkActive="active">
                <a [routerLink]=" ['./dashboard'] ">Dashboard</a>
              </li>
              <li routerLinkActive="active">
                <a [routerLink]=" ['./shots'] ">Shots</a>
              </li>
              <li routerLinkActive="active">
                <a [routerLink]=" ['./lane-map'] ">Lane Map</a>
              </li>
              <li routerLinkActive="active">
                <a [routerLink]=" ['./whitelist'] ">Plate Whitelist</a>
              </li>
              <li routerLinkActive="active">
                <a [routerLink]=" ['./about'] ">About</a>
              </li>
            </ul>
            <ul class="nav navbar-nav navbar-right">
              <li *ngIf="!auth.loggedIn" routerLinkActive="active">
                <a [routerLink]=" ['./login'] ">Login</a>
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
export class AppComponent {
  name = 'Car Plate Reader';
  constructor(public auth: Authentication, public router: Router) {}
  logout(event: any) {
    event.preventDefault();
    this.auth.logout();
    this.router.navigate(['./login']);
  }
}
