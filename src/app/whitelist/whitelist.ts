import { Component } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { PaginatePipe, PaginationControlsCmp, PaginationService } from 'ng2-pagination';

import { WhitePlateAdder } from './white-plate-adder';
import { WhitePlateEditer } from './white-plate-editer';
import { WhitePlateImporter } from './white-plate-importer';
import { Plate } from './plate';


@Component({
  selector: 'whitelist',
  directives: [WhitePlateAdder, WhitePlateEditer, WhitePlateImporter, PaginationControlsCmp],
  template: require('./whitelist.html'),
  pipes: [PaginatePipe],
  providers: [PaginationService],
  styles: ['.pagination-container{text-align: center;}']
})
export class Whitelist {
  whitePlates: Plate[];
  adderVisible: boolean = false;
  editerVisible: boolean = false;
  editerPlate: Plate;

  public changeEditerCallback = (visible) => {
    this.setEditerVisibility(visible);
  }

  constructor(public http: Http) { }
  ngOnInit() {
    this.editerPlate = {_id: 1, description: 'test', plate: ''};
    this.editerVisible = false;
    this.getPlates();
  }
  printDate(dateString) {
    return dateString.replace(/T/, ' ').replace(/\..*/, '');
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
