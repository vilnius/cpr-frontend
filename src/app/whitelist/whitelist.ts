import {Component} from 'angular2/core';
import {WhitePlateAdder} from "./white-plate-adder"
import {WhitePlateEditer} from "./white-plate-editer"
import {Http, Headers, RequestOptions} from 'angular2/http';
import {Plate} from './plate';  

@Component({
  selector: 'whitelist',
  directives: [WhitePlateAdder, WhitePlateEditer],
  template: require('./whitelist.html')
})
export class Whitelist {
  whitePlates: Plate[];
  adderVisible: boolean;
  editerVisible: boolean;
  editerPlate: Plate;
  public changeAdderCallback = (visible) => {
    this.setAdderVisibility(visible);
  }  
  public changeEditerCallback = (visible) => {
    this.setEditerVisibility(visible);
  }
  constructor(public http: Http) { }
  ngOnInit() {
    this.editerPlate = {_id: 1, description:'test', plate:''};
    this.adderVisible = false;
    this.editerVisible = false;
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

  editPlate(plate) {
    this.editerPlate = plate;
    this.setEditerVisibility(true);
  }

  setAdderVisibility(visible) {
    this.adderVisible = visible;
    this.getPlates();
  }
  isAdderVisible() {
    return this.adderVisible
  }
  setEditerVisibility(visible) {
    this.editerVisible = visible;
    this.getPlates();
  }
  isEditerVisible() {
    return this.editerVisible;
  }
}
