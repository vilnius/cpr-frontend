import { Component, Input } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Plate } from './plate';

@Component({
  selector: 'white-plate-adder',
  template: `
  <div class="well bs-component col-xs-6">
    <form class="form-horizontal" (submit)="createPlate(newDescription, newPlateNumber)">
      <div class="form-group">
        <label for="inputPlate" class="col-lg-2 control-label">Plate number</label>
        <div class="col-lg-10">
          <input name="inputPlate" id="inputPlate" type="text" class="form-control" placeholder="Plate number" [(ngModel)]="newPlateNumber">
        </div>
      </div>
      <div class="form-group">
        <label for="inputDescription" class="col-lg-2 control-label">Description</label>
        <div class="col-lg-10">
          <input name="inputDescription" id="inputDescription" type="text" class="form-control" placeholder="Description" [(ngModel)]="newDescription">
        </div>
      </div>
      <div class="form-group">
        <div class="col-lg-10 col-lg-offset-2">
          <button type="reset" class="btn btn-default" (click)="cancel()">Cancel</button>
          <button type="submit" class="btn btn-primary">Add</button>
        </div>
      </div>
    </form>
  </div>
  `
})
export class WhitePlateAdderComponent {
  @Input() onCancel: Function;
  @Input() onPlateAdded: Function;

  whitePlates: Plate[];
  newDescription: string;
  newPlateNumber: string;
  constructor(public http: Http) { }
  printDate(dateString) {
    return dateString.replace(/T/, ' ').replace(/\..*/, '');
  }
  logError(err) {
    console.error('There was an error: ' + err);
  }
  createPlate(description, plate) {
    let body = JSON.stringify({ description, plate });
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers });

    return this.http.post('/api/whitelist', body, options)
    .map(res => res.json())
    .subscribe(
      _ => {
        this.onPlateAdded();
        this.clearInputs();
      },
      err => this.logError(err)
    );
  }
  cancel() {
    this.clearInputs();
    this.onCancel();
  }
  clearInputs() {
    this.newDescription = '';
    this.newPlateNumber = '';
  }
}
