import {Component, Input} from 'angular2/core';
import {Http, Headers, RequestOptions} from 'angular2/http';
import {Plate} from './plate';

@Component({
  selector: 'white-plate-editer',
  directives: [],
  styles: [`.padding-5{ padding: 5px;}`],
  template: `
  <div>
    <span>Description</span><span><input type="text" class="padding-5" [(ngModel)]="whitePlate.description"></span>
    <span>Plate number</span><span><input type="text" class="padding-5" [(ngModel)]="whitePlate.plate"></span>
    <span (click)="updatePlate()" class="btn">Update</span>
    <span (click)="cancel()" class="btn">Cancel</span>
  </div>
  `
})
export class WhitePlateEditer {
  @Input() public whitePlate: Plate;
  @Input() public onChange: Function;
  constructor(public http: Http) { }
  ngOnInit() {
  }
  printDate(dateString) {
    return dateString.replace(/T/, ' ').replace(/\..*/, '')
  }
  logError(err) {
    console.error('There was an error: ' + err);
  }
  updatePlate() {
    let body = JSON.stringify(this.whitePlate);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post('/api/whitelist/' + this.whitePlate._id, body, options)
    .map(res => res.json())
    .subscribe(
      _ => this.onChange(false),
      err => this.logError(err)
    );
  }
  cancel() {
    this.onChange(false);
  }
}
