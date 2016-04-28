import {Component} from 'angular2/core';
import {Http, Headers, RequestOptions} from 'angular2/http';


@Component({
  selector: 'whitelist',
  directives: [],
  template: `<h2>Whitelist</h2>
  <table class="table">
    <thead>
      <tr>
        <th>ID</th>
        <th>Description</th>
        <th>Plate number</th>
        <th>Date Added</th>
        <th>Action</th>
      </tr>
    </thead>
    <tr>
      <td>N/A</td>
      <td><input type="text" [(ngModel)]="newDescription" ></td>
      <td><input type="text" [(ngModel)]="newPlateNumber" ></td>
      <td>N/A</td>
      <td><div (click)="createPlate(newDescription, newPlateNumber)" class="btn">Add</div></td>
    </tr>
    <tr *ngFor="#whitePlate of whitePlates; #i = index">
      <td>{{i + 1}}</td>
      <td>{{whitePlate.description}}</td>
      <td>{{whitePlate.plate}}</td>
      <td>{{printDate(whitePlate.createdAt)}}</td>
      <td><div (click)='removePlate(whitePlate._id)' class="btn warning">Remove</div></td>
    </tr>
  </table>
  `
})
export class Whitelist {
  whitePlates: any;

  constructor(public http: Http) { }
  ngOnInit() {
    this.getPlates();
  }
  printDate(dateString) {
    return dateString.replace(/T/, ' ').replace(/\..*/, '')
  }
  getPlates() {
    this.http.get('/api/whitelist')
      .map(res => res.json())
      .subscribe(
      data => this.whitePlates = data,
      err => this.logError(err)
      );
  }
  logError(err) {
    console.error('There was an error: ' + err);
  }
  deletePlate(_id) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.delete('/api/whitelist/'+_id, options)
      .map(res => res.json())
      .subscribe(
        _ => this.getPlates(),
        err => this.logError(err)
      );
  }
  createPlate(description, plate) {
    let body = JSON.stringify({ description, plate });
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post('/api/whitelist', body, options)
      .map(res => res.json())
      .subscribe(
        data => this.whitePlates.push(data),
        err => this.logError(err)
      );
  }
}
