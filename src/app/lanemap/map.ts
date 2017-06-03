import { Component, ElementRef, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { MapDataService } from './map-data-service';
import { GoogleMapsAPI } from './google-maps-api';

@Component({
  selector: 'map',
  styleUrls: [
    './lanemap.css'
  ],
  template: `
    <div id="map"></div>
  `
})
export class MapComponent implements OnInit {

  constructor(
    private _elem: ElementRef,
    private api: GoogleMapsAPI,
    private mapDataService: MapDataService
  ) {}

  ngOnInit() {
    const container = this._elem.nativeElement.querySelector('#map');
    this.api.mapData$.subscribe((data) => this.mapDataService.update(data));

    this.api.createMap({
      el: container,
      mapOptions: {
        center: {lat: 54.69, lng: 25.27},
        zoom: 14,
        disableDefaultUI: true,
        mapTypeControl: true
      }
    }).then(() => {
      this.reload();
    });
  };

  save() {
    this.mapDataService.save();
  }

  reload() {
    this.mapDataService.load((data) => this.api.setGeoJson(data));
  }

  clear() {
    if (confirm('Do you really want to delete all polygons?')) {
      this.mapDataService.update(null);
      this.api.setGeoJson(null);
    }
  }

}
