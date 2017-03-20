import { Component, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

@Component({
  template: require('./dashboard.html'),
})
export class DashboardComponent implements OnInit {
  error: string;
  piStatuses: any[];

  constructor(public http: Http) { }

  ngOnInit() {
    this.getDashbaord();
  }

  getDashbaord() {
    this.http.get('/api/pistatus')
      .map(res => res.json())
      .subscribe(
        data => {
          if (data.length) {
            this.error = null;
            this.piStatuses = data;
          } else {
            this.error = 'No PIs found';
          }
        },
        err => {
          this.error = 'Bad response from server';
        }
    );
  }

}
