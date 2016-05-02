import {Component} from 'angular2/core';
import {WhitePlateAdder} from "./white-plate-adder"
import {Http, Headers, RequestOptions} from 'angular2/http';


@Component({
  selector: 'whitelist',
  directives: [WhitePlateAdder],
  template: `<h2>Plate Whitelist</h2>
  <div [hidden]="adderVisible" title="This plate will not be penalised">
    <button (click)="showAdder()" class="btn btn-primary">Add New Plate</button>
  </div>
  <white-plate-adder [hidden]="!adderVisible" [onCancel]="hideAdder" [onPlateAdded]="handlePlateAdded"></white-plate-adder>
  <table class="table">
    <thead>
      <tr>
        <th>ID</th>
        <th>Plate number</th>
        <th>Description</th>
        <th>Date Added</th>
        <th>Action</th>
      </tr>
    </thead>
    <tr *ngFor="let whitePlate of whitePlates; let i=index">
      <td>{{i + 1}}</td>
      <td>{{whitePlate.plate}}</td>
      <td>{{whitePlate.description}}</td>
      <td>{{printDate(whitePlate.createdAt)}}</td>
      <td><div (click)='deletePlate(whitePlate._id)' class="btn btn-warning">Remove</div></td>
    </tr>
  </table>
  `
})
export class Whitelist {
  whitePlates: any;
  adderVisible: boolean = false;

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

    return this.http.delete('/api/whitelist/' + _id, options)
      .map(res => res.json())
      .subscribe(
        _ => this.getPlates(),
        err => this.logError(err)
      );
  }
  showAdder = () => {
    this.adderVisible = true;
  }
  hideAdder = () => {
    this.adderVisible = false;
  }
  handlePlateAdded = () => {
    this.hideAdder();
    this.getPlates();
  }
}
