import {Component, Input} from 'angular2/core';
import {Http, Headers, RequestOptions} from 'angular2/http';


@Component({
  selector: 'white-plate-adder',
  directives: [],
  template: `
  <div>
    <span>Description</span><span><input type="text" [(ngModel)]="newDescription"></span>
    <span>Plate number</span><span><input type="text" [(ngModel)]="newPlateNumber"></span>
    <span (click)="createPlate(newDescription, newPlateNumber)" class="btn">Add</span>
    <span (click)="cancel()" class="btn">Cancel</span>
  </div>
  `
})
export class WhitePlateAdder {
  @Input() public onChange: Function;
  whitePlates: any;
  newDescription: string;
  newPlateNumber: string;
  constructor(public http: Http) { }
  ngOnInit() {
  }
  printDate(dateString) {
    return dateString.replace(/T/, ' ').replace(/\..*/, '')
  }
  logError(err) {
    console.error('There was an error: ' + err);
  }
  createPlate(description, plate) {
    let body = JSON.stringify({ description, plate });
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post('/api/whitelist', body, options)
    .map(res => res.json())
    .subscribe(
      _ => {
        this.onChange(false);
        this.clearInputs()
      },
      err => this.logError(err)
    );
  }
  cancel() {
    this.onChange(false);
    this.clearInputs()
  }
  clearInputs() {
    this.newDescription = "";
    this.newPlateNumber = "";
  }
}
