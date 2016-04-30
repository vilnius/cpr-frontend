import {Component} from 'angular2/core';
import {Http, Headers, RequestOptions} from 'angular2/http';


@Component({
  selector: 'white-plate-adder',
  directives: [],
  template: `
  <div>
      <div><input type="text" [(ngModel)]="newDescription" ></div>
      <div><input type="text" [(ngModel)]="newPlateNumber" ></div>
      <div>N/A</div>
      <div><div (click)="createPlate(newDescription, newPlateNumber)" class="btn">Add</div></div>
      <div><div (click)="cancel()" class="btn">Cancel</div></div>
  </div>
  `
})
export class WhitePlateAdder {
  whitePlates: any;

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
        data => this.whitePlates.push(data),
        err => this.logError(err)
      );
  }
  cancel() 
  {
    
  }
}
