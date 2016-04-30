import {Component} from 'angular2/core';
import {WhitePlateAdder} from "./white-plate-adder"
import {Http, Headers, RequestOptions} from 'angular2/http';


@Component({
  selector: 'whitelist',
  directives: [WhitePlateAdder],
  template: `<h2>Whitelist</h2>
  <div [hidden]="isAdderVisible()" title="this plate will not be penalised">
    <div (click)="createPlate()" class="btn">Add New White Plate</div>
  </div>
  <div [hidden]="!isAdderVisible()"><white-plate-adder [onChange]="changeCallback"></white-plate-adder></div>
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
    <tr *ngFor="#whitePlate of whitePlates; #i = index">
      <td>{{i + 1}}</td>
      <td>{{whitePlate.description}}</td>
      <td>{{whitePlate.plate}}</td>
      <td>{{printDate(whitePlate.createdAt)}}</td>
      <td><div (click)='deletePlate(whitePlate._id)' class="btn warning">Remove</div></td>
    </tr>
  </table>
  `
})
export class Whitelist {
  whitePlates: any;
  adderVisible: boolean;
  public changeCallback = (visible) => {
    this.setAdderVisibility(visible);
  }
  constructor(public http: Http) { }
  ngOnInit() {
    this.adderVisible = false;
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
  createPlate() {
    this.setAdderVisibility(true);
  }
  setAdderVisibility(visible) {
    this.adderVisible = visible;
    this.getPlates();
  }
  isAdderVisible() {
    return this.adderVisible
  }
}
