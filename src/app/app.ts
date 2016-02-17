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
import {Cameras, Videos, Penalties} from './static';


/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  providers: [ ...FORM_PROVIDERS ],
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
              <!--<li router-active>
                <a [routerLink]=" ['Home'] ">Home</a>
              </li>-->
              <li router-active>
                <a [routerLink]=" ['Cameras'] ">Cameras</a>
              </li>
              <li router-active>
                <a [routerLink]=" ['Videos'] ">Videos</a>
              </li>
              <li router-active>
                <a [routerLink]=" ['Penalties'] ">Penalties</a>
              </li>
              <li router-active>
                <a [routerLink]=" ['LaneMap'] " style="color: #C66">Lane Map</a>
              </li>
              <li router-active>
                <a [routerLink]=" ['About'] ">About</a>
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
  { path: '/cameras', component: Cameras, name: 'Cameras' },
  { path: '/videos', component: Videos, name: 'Videos' },
  { path: '/penalties', component: Penalties, name: 'Penalties' },
  // Async load a component using Webpack's require with es6-promise-loader
  { path: '/about', loader: () => require('./about/about')('About'), name: 'About' },
  { path: '/**', redirectTo: ['Index'] }
])
export class App {
  name = 'Car Plate Reader';
  constructor() {

  }
}
