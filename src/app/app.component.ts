/*
 * Angular 2 decorators and services
 */
import {Component} from 'angular2/core';
import {RouteConfig, Router, ROUTER_DIRECTIVES} from 'angular2/router';
import {FORM_PROVIDERS} from 'angular2/common';

import {RouterActive} from './directives/router-active';
import {Home} from './home/home';
import {Index} from './index/index';
import {LaneMap} from './lanemap/lanemap';
import {Login} from './login/login';
import {Penalties} from './penalties/penalties';

import {Authentication} from './services/authentication';
import {isLoggedin}  from './services/is-loggedin';

import {GoogleMapsAPI} from './lanemap/google-maps-api';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  providers: [
    ...FORM_PROVIDERS,
    GoogleMapsAPI,  // this causes our service to maintain state even when switching routes
  ],
  directives: [ ...ROUTER_DIRECTIVES, RouterActive ],
  pipes: [],
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
            <a class="navbar-brand" [routerLink]=" ['Index'] ">{{ name }}</a>
          </div>
          <div id="navbar" class="navbar-collapse collapse">
            <ul class="nav navbar-nav">
              <li router-active>
                <a [routerLink]=" ['Index'] ">Index</a>
              </li>
              <li router-active *ngIf="!auth.loggedIn">
                <a [routerLink]=" ['Login'] ">Login</a>
              </li>
            </ul>
            <ul *ngIf="auth.loggedIn" class="nav navbar-nav">
              <!--<li router-active>
                <a [routerLink]=" ['Home'] ">Home</a>
              </li>-->
              <li router-active>
                <a [routerLink]=" ['Penalties'] ">Penalties</a>
              </li>
              <li router-active>
                <a [routerLink]=" ['LaneMap'] ">Lane Map</a>
              </li>
              <li router-active>
                <a [routerLink]=" ['About'] ">About</a>
              </li>
              <li router-active>
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
@RouteConfig([
  { path: '/', component: Index, name: 'Index' },
  { path: '/home', component: Home, name: 'Home' },
  { path: '/lane-map', component: LaneMap, name: 'LaneMap' },
  { path: '/penalties', component: Penalties, name: 'Penalties' },
  // Async load a component using Webpack's require with es6-promise-loader and webpack `require`
  { path: '/about', name: 'About', loader: () => require('es6-promise!./about')('About') },
  { path: '/login', component: Login, name: 'Login' },
  { path: '/**', redirectTo: ['Index'] }
])
export class App {
  name = 'Car Plate Reader';
  constructor(public auth: Authentication, public router: Router) {}
  logout(event: any) {
    event.preventDefault();
    this.auth.logout();
    this.router.navigate(['Index'])
  }
}