import { Component, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { MapDataService } from './map-data-service';
import { GoogleMapsAPI } from './google-maps-api';

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
    this.api.updatedData$.subscribe(data => this.mapDataService.update(data));
    this.mapDataService.data$.subscribe((data) => this.setmap(data));

    this.api.createMap({
        el: container,
        mapOptions: {
          center: {lat: 54.69, lng: 25.27},
          zoom: 14,
          disableDefaultUI: true
        }
    }).then(() => {
      this.mapDataService.load();
    });
  };

  save() {
    this.mapDataService.save();
  }

  setmap(geoJSON) {
    this.api.setGeoJson(geoJSON);
  }

  clear() {
    this.api.setGeoJson(null);
    this.mapDataService.update(null);
  }

}
