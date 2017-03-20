import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule, XHRBackend, BrowserXhr, ResponseOptions, XSRFStrategy, CookieXSRFStrategy } from '@angular/http';
import { Router, RouterModule } from '@angular/router';
import { removeNgStyles, createNewHosts, createInputTransfer } from '@angularclass/hmr';

/*
 * Platform and Environment providers/directives/pipes
 */
import { TimeAgoPipe } from 'angular2-moment';
import { Ng2PaginationModule } from 'ng2-pagination';

import { ENV_PROVIDERS } from './environment';
import { ROUTES } from './app.routes';
// App is our top level component
import { AppComponent } from './app.component';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { AppState, InteralStateType } from './app.service';
import { Authentication } from './services/authentication';
import { AuthenticationConnectionBackend } from './services/authentication.backend';

import { AboutComponent } from './about';
import { IndexComponent } from './index/index';
import { LoginComponent } from './login/login';
import { PenaltiesComponent, GpsComponent } from './penalties';
import { WhitelistComponent, WhitePlateAdderComponent, WhitePlateEditerComponent, WhitePlateImporterComponent } from './whitelist';
import { DashboardComponent } from './dashboard/dashboard';
import { LaneMapComponent, MapComponent, MapInfoComponent } from './lanemap';

// Application wide providers
const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS,
  AppState,
  Authentication,
  {
    provide: XSRFStrategy,
    useValue: new CookieXSRFStrategy('XSRF-TOKEN', 'csrf-token') },
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
  bootstrap: [ AppComponent ],
  declarations: [
    AppComponent,
    AboutComponent,
    IndexComponent,
    LoginComponent,
    PenaltiesComponent,
    GpsComponent,
    WhitelistComponent, WhitePlateAdderComponent,
    WhitePlateEditerComponent, WhitePlateImporterComponent,
    DashboardComponent,
    LaneMapComponent, MapComponent, MapInfoComponent,
    TimeAgoPipe
  ],
  imports: [ // import Angular's modules
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES, { useHash: true }),
    Ng2PaginationModule
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    ENV_PROVIDERS,
    APP_PROVIDERS
  ]
})
export class AppModule {

  constructor(
    public appRef: ApplicationRef,
    public appState: AppState
  ) {}

  public hmrOnInit(store: StoreType) {
    if (!store || !store.state) {
      return;
    }
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

  public hmrOnDestroy(store: StoreType) {
    const cmpLocation = this.appRef.components.map((cmp) => cmp.location.nativeElement);
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

  public hmrAfterDestroy(store: StoreType) {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }

}
