import {Component} from 'angular2/core';
import {Http, Headers} from 'angular2/http';

import {GPS} from './gps';

@Component({
  selector: 'penalties',
  directives: [ GPS ],
  template: `<h2>Penalties</h2>
  <table class="table">
    <thead>
      <tr>
        <th>ID</th>
        <th>Image</th>
        <th>Plate number</th>
        <th>Coordinates</th>
        <th>Time</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tr *ngFor="#penalty of penalties; #i = index">
      <td>{{i + 1}}</td>
      <td><a href="#"><img height="40"
src="http://www.gdsimage.com/smr/Lukas/images/Lukas-LK-5900HD-DUO/Lukas-LK-5900HD-DUO-16GB-F2.2-Wide-Angle-HD-2Ch-Dash-Cam-Car-Camera-Black-Box-03.jpg"/>
</a></td>
      <td>{{penalty.plate}}</td>
      <td><gps [coords]="penalty.gps"></gps></td>
      <td>{{printDate(penalty.shotAt)}}</td>
      <td><a href="#">Send to Delfi.lt</a> | <a href="#">Send to Avilys</a></td>
    </tr>
  </table>
  `
})
export class Penalties {
  penalties: any;

  constructor(public http: Http) {}
  ngOnInit() {
    this.getPenalties();
  }
  printDate(dateString) {
    return dateString.replace(/T/, ' ').replace(/\..*/, '')
  }
  getPenalties() {
    this.http.get('/api/penalties')
    .map(res => res.json())
    .subscribe(
      data => this.penalties = data,
      err => this.logError(err)
    );
  }
  logError(err) {
    console.error('There was an error: ' + err);
  }
}
