import { Component, OnInit } from '@angular/core';
import { Headers, RequestOptions } from '@angular/http';
import { PaginationService } from 'ng2-pagination';

import { AuthHttp } from '../auth/http';
import { Plate } from './plate';

@Component({
  selector: 'whitelist',
  templateUrl: 'whitelist.html',
  providers: [PaginationService],
  styles: ['.pagination-container {text-align: center;}']
})
export class WhitelistComponent implements OnInit {
  public p: number = 1;
  public whitePlates: Plate[];
  public adderVisible: boolean = false;
  public editerVisible: boolean = false;
  public editerPlate: Plate;

  constructor(public http: AuthHttp) { }

  public changeEditerCallback = (visible) => {
    this.setEditerVisibility(visible);
  }

  public ngOnInit() {
    this.editerPlate = {_id: 1, description: 'test', plate: ''};
    this.editerVisible = false;
    this.getPlates();
  }

  public getPlates() {
    this.http.get('/api/whitelist')
      .map((res) => res.json())
      .subscribe(
        (data) => this.whitePlates = data,
        (err) => this.logError(err)
      );
  }

  public logError(err) {
    console.error('There was an error: ' + err);
  }

  public deletePlate(_id) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers });

    return this.http.delete('/api/whitelist/' + _id, options)
      .map((res) => res.json())
      .subscribe(
        () => this.getPlates(),
        (err) => this.logError(err)
      );
  }

  public showAdder = () => {
    this.adderVisible = true;
  }

  public hideAdder = () => {
    this.adderVisible = false;
  }

  public handlePlateAdded = () => {
    this.hideAdder();
    this.getPlates();
  }

  public onPlateImported = () =>  {
    this.getPlates();
  }

  public editPlate(plate) {
    this.editerPlate = plate;
    this.setEditerVisibility(true);
  }

  public setEditerVisibility(visible) {
    this.editerVisible = visible;
    this.getPlates();
  }

  public isEditerVisible() {
    return this.editerVisible;
  }
}
