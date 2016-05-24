import {Component} from 'angular2/core';
import {Http, Headers, RequestOptions} from 'angular2/http';
import {TimeAgoPipe} from 'angular2-moment';

@Component({
  template: require('./dashboard.html'),
  pipes: [TimeAgoPipe],
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
        data => {
          if (data.length)
            this.piStatuses = data;
          else
            this.piStatuses = { error: 'No data' };
        },
        err => {
          this.piStatuses = { error: 'Bad response from server' };
        }
    );
  }

}
