import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { removeNgStyles, createNewHosts, createInputTransfer } from '@angularclass/hmr';

/*
 * Platform and Environment providers/directives/pipes
 */
import { MomentModule } from 'angular2-moment';
import { Ng2PaginationModule } from 'ng2-pagination';
import { LeafletModule } from '@asymmetrik/angular2-leaflet';

import { ENV_PROVIDERS } from './environment';
import { ROUTES } from './app.routes';
// App is our top level component
import { AppComponent } from './app.component';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { AppState, InternalStateType } from './app.service';
import { AuthService } from './auth/auth.service';
import { AuthHttp } from './auth/http';
import { IsoDatePipe } from './pipes/iso-date';
import { DurationPipe } from './pipes/duration';
import { FormatFileSizePipe } from './pipes/format-file-size';
import { ViolationsService } from './violations/violations.service';
import { SortableColumnDirective } from './dashboard/dashboard';

import { AboutComponent } from './about';
import { IndexComponent } from './index/index';
import { LoginComponent } from './login/login';
import { ShotsComponent, GpsComponent } from './shots';
import { ShotOverviewComponent } from './shots/shot-overview';
import { ViolationsComponent } from './violations';
import { ViolationOverviewComponent } from './violations/violation-overview';
import { PaginationComponent } from './components/pagination/pagination';
import {
  WhitelistComponent,
  WhitePlateAdderComponent,
  WhitePlateEditerComponent,
  WhitePlateImporterComponent
} from './whitelist';
import { DashboardComponent } from './dashboard/dashboard';
import { LaneMapComponent, MapComponent, MapInfoComponent } from './lanemap';

// Application wide providers
const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS,
  AppState,
  AuthService,
  AuthHttp,
  ViolationsService,
];

type StoreType = {
  state: InternalStateType,
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
    ShotsComponent,
    ShotOverviewComponent,
    ViolationsComponent,
    ViolationOverviewComponent,
    PaginationComponent,
    GpsComponent,
    WhitelistComponent,
    WhitePlateAdderComponent,
    WhitePlateEditerComponent,
    WhitePlateImporterComponent,
    DashboardComponent,
    LaneMapComponent,
    MapComponent,
    MapInfoComponent,
    /* Pipes */
    IsoDatePipe,
    DurationPipe,
    FormatFileSizePipe,
    /* Directives */
    SortableColumnDirective,
  ],
  imports: [ // import Angular's modules
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES, { useHash: false }),
    Ng2PaginationModule,
    LeafletModule,
    MomentModule,
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
