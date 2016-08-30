import {XHRBackend, BrowserXhr, ResponseOptions} from '@angular/http';
import {Provider} from '@angular/core';
import {RouteConfig, Router} from '@angular/router-deprecated';

// App
export * from './app.component';
export * from './app.service';
import {GoogleMapsAPI} from './lanemap/google-maps-api';

import {Authentication, AuthenticationConnectionBackend} from './services/authentication';
import {AppState} from './app.service';

// Application wide providers
export const APP_PROVIDERS = [
  AppState,
  Authentication,
  GoogleMapsAPI,
  new Provider(XHRBackend, {
    useFactory: (browserXhr, responseOptions, router) => new AuthenticationConnectionBackend(browserXhr, responseOptions, router),
    deps: [BrowserXhr, ResponseOptions, Router]
  })
];
