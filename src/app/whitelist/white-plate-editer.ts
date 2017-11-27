import { Component, Input } from '@angular/core';
import { Headers, RequestOptions } from '@angular/http';

import { AuthHttp } from '../auth/http';
import { Plate } from './plate';

@Component({
  selector: 'white-plate-editer',
  styles: [`.padding-5 { padding: 5px;}`],
  template: `
  <div class="well bs-component col-xs-6">
    <form class="form-horizontal" (submit)="updatePlate()">
      <div class="form-group">
        <label for="inputPlate" class="col-lg-2 control-label">Plate number</label>
        <div class="col-lg-10">
          <input name="inputPlate" id="inputPlate" type="text" class="form-control"
            placeholder="Plate number" [(ngModel)]="whitePlate.plate">
        </div>
      </div>
      <div class="form-group">
        <label for="inputDescription" class="col-lg-2 control-label">Description</label>
        <div class="col-lg-10">
          <input name="inputDescription" id="inputDescription" type="text" class="form-control"
            placeholder="Description" [(ngModel)]="whitePlate.description">
        </div>
      </div>
      <div class="form-group">
        <div class="col-lg-10 col-lg-offset-2">
          <button type="reset" class="btn btn-default" (click)="cancel()">Cancel</button>
          <button type="submit" class="btn btn-primary">Update</button>
        </div>
      </div>
    </form>
  </div>
  `
})
export class WhitePlateEditerComponent {
  @Input() public whitePlate: Plate;
  @Input() public onChange: Function;

  constructor(public http: AuthHttp) { }

  public logError(err) {
    console.error('There was an error: ' + err);
  }

  public updatePlate() {
    const body = JSON.stringify(this.whitePlate);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers });

    return this.http.post('/api/whitelist/' + this.whitePlate._id, body, options)
      .map((res) => res.json())
      .subscribe(
        () => this.onChange(false),
        (err) => this.logError(err)
      );
  }

  public cancel() {
    this.onChange(false);
  }
}
