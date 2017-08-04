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
  styleUrls: [
    './app.component.css',
  ],
  templateUrl: 'app.component.html',
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
