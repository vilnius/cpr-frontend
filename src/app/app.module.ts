import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule, XHRBackend, BrowserXhr, ResponseOptions, XSRFStrategy } from '@angular/http';
import { Router, RouterModule } from '@angular/router';
import { removeNgStyles, createNewHosts, createInputTransfer } from '@angularclass/hmr';

/*
 * Platform and Environment providers/directives/pipes
 */
import { TimeAgoPipe } from 'angular2-moment';
import { PaginatePipe, PaginationControlsCmp, PaginationService } from 'ng2-pagination';

import { ENV_PROVIDERS } from './environment';
import { ROUTES } from './app.routes';
// App is our top level component
import { App } from './app.component';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { AppState, InteralStateType } from './app.service';
import { Authentication, AuthenticationConnectionBackend } from './services/authentication';

import { About } from './about';
import { Index } from './index/index';
import { Login } from './login/login';
import { Penalties, GPS } from './penalties';
import { Whitelist, WhitePlateAdder, WhitePlateEditer, WhitePlateImporter } from './whitelist';
import { Dashboard } from './dashboard/dashboard';
import { LaneMap, Map, MapInfo } from './lanemap';

// Application wide providers
const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS,
  AppState,
  Authentication,
  {
    provide: XHRBackend,
    useFactory: (browserXhr, responseOptions, xsrfStrategy, router) => 
      new AuthenticationConnectionBackend(browserXhr, responseOptions, xsrfStrategy, router),
    deps: [BrowserXhr, ResponseOptions, XSRFStrategy, Router]
  }
];

type StoreType = {
  state: InteralStateType,
  restoreInputValues: () => void,
  disposeOldHosts: () => void
};

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [ App ],
  declarations: [
    App,
    About,
    Index,
    Login,
    Penalties, GPS,
    Whitelist, WhitePlateAdder, WhitePlateEditer, WhitePlateImporter,
    Dashboard,
    LaneMap, Map, MapInfo,
    //
    TimeAgoPipe,
    PaginationControlsCmp, PaginatePipe
  ],
  imports: [ // import Angular's modules
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES, { useHash: true })
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    ENV_PROVIDERS,
    APP_PROVIDERS
  ]
})
export class AppModule {
  constructor(public appRef: ApplicationRef, public appState: AppState) {}

  hmrOnInit(store: StoreType) {
    if (!store || !store.state) return;
    console.log('HMR store', JSON.stringify(store, null, 2));
    // set state
    this.appState._state = store.state;
    // set input values
    if ('restoreInputValues' in store) {
      let restoreInputValues = store.restoreInputValues;
      setTimeout(restoreInputValues);
    }

    this.appRef.tick();
    delete store.state;
    delete store.restoreInputValues;
  }

  hmrOnDestroy(store: StoreType) {
    const cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
    // save state
    const state = this.appState._state;
    store.state = state;
    // recreate root elements
    store.disposeOldHosts = createNewHosts(cmpLocation);
    // save input values
    store.restoreInputValues  = createInputTransfer();
    // remove styles
    removeNgStyles();
  }

  hmrAfterDestroy(store: StoreType) {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }
}

