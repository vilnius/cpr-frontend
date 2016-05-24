import {Component} from 'angular2/core';
import {Http, Headers, RequestOptions} from 'angular2/http';

@Component({
  template: require('./dashboard.html'),
})
export class Dashboard {
  piStatuses: any;

  constructor(public http: Http) { }

  ngOnInit() {
    this.getDashbaord();
  }

  log() {
    console.log(arguments);
  }

  getDashbaord() {
    this.http.get('/api/pistatus')
      .map(res => res.json())
      .subscribe(
      data => { this.piStatuses = data; },
      err => console.log(err)
     );
  }

}
