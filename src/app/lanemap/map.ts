import {Component, ElementRef, Output, EventEmitter} from 'angular2/core';
import {MapDataService} from './map-data-service';
import {GoogleMapsAPI} from './google-maps-api';

@Component({
  selector: 'map',
  providers: [
      GoogleMapsAPI
  ],
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
    this.mapDataService.data$.subscribe(data => this.api.setGeoJson(data));
    this.api.createMap({
        el: container,
        mapOptions: {
          center: {lat: 54.69, lng: 25.27},
          zoom: 14,
          disableDefaultUI: true
        }
    }).then(() => {
      this.reload();
      this.api.subscribeToMapDataEvent<void>('addfeature').subscribe((data) => {
        console.log("Added polygon!");
        this.api.getGeoJson(this.mapDataService.updateMapData);
    });
    });
  };

  save() {
    this.api.getGeoJson(this.mapDataService.saveMapData);
  }

  reload() {
    this.mapDataService.loadMapData();
  }

  clear() {
    this.mapDataService.updateMapData(/* empty */);
  }
}
