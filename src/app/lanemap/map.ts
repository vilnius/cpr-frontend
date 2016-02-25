import {Component, ElementRef, Output, EventEmitter} from 'angular2/core';
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
    this.mapDataService.data$.subscribe(data => this.api.setGeoJson(data));
    this.api.events.addfeature$.subscribe((data) => {
      // Updates data on data service
      this.api.getGeoJson(this.mapDataService.updateMapData);
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
    this.api.getGeoJson(this.mapDataService.saveMapData);
  }

  reload() {
    this.mapDataService.loadMapData();
  }

  clear() {
    this.mapDataService.updateMapData(/* empty */);
  }
}
