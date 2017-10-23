import { Component, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { PaginationService } from 'ng2-pagination';

import { Plate } from './plate';

@Component({
  selector: 'whitelist',
  template: require('./whitelist.html'),
  providers: [PaginationService],
  styles: ['.pagination-container{text-align: center;}']
})
export class WhitelistComponent implements OnInit {
  whitePlates: Plate[];
  adderVisible: boolean = false;
  editerVisible: boolean = false;
  editerPlate: Plate;

  constructor(public http: Http) { }

  public changeEditerCallback = (visible) => {
    this.setEditerVisibility(visible);
  }
  ngOnInit() {
    this.editerPlate = {_id: 1, description: 'test', plate: ''};
    this.editerVisible = false;
    this.getPlates();
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
    let options = new RequestOptions({ headers });

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
  onPlateImported = () =>  {
    this.getPlates();
  }
  editPlate(plate) {
    this.editerPlate = plate;
    this.setEditerVisibility(true);
  }
  setEditerVisibility(visible) {
    this.editerVisible = visible;
    this.getPlates();
  }
  isEditerVisible() {
    return this.editerVisible;
  }
}
