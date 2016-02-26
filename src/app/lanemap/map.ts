import {Component, ElementRef, Input, Output, EventEmitter} from 'angular2/core';
import {MapDataService} from './map-data-service';
import {GoogleMapsAPI} from './google-maps-api';

@Component({
  selector: 'map',
  styles: [ require('./lanemap.css') ],
  template: `
    <div id="map"></div>
  `
})
export class Map {

  constructor(
    private _elem: ElementRef,
    private api: GoogleMapsAPI,
    private mapDataService: MapDataService
  ) {}

  ngOnInit() {
    const container = this._elem.nativeElement.querySelector('#map');
    //this.mapDataService.data$.subscribe(data => data));
    this.api.updatedData$.subscribe((data) => {
      this.mapDataService.update(data)
    });

    this.api.createMap({
        el: container,
        mapOptions: {
          center: {lat: 54.69, lng: 25.27},
          zoom: 14,
          disableDefaultUI: true
        }
    }).then(() => {
      this.reload();
    });
  };

  save() {
    this.mapDataService.save();
  }

  reload() {
    this.api.setGeoJson(this.mapDataService.load());
  }

  clear() {
    this.mapDataService.update(/* empty */);
  }

}
