import {Component, Input} from 'angular2/core';
import {Map} from './map';
import {MapDataService} from './map-data-service';

@Component({
  selector: 'map-info',
  template: `<p>Polygons: {{ data.polygons }}</p>
  `
})
export class MapInfo {
  @Input() data: any;
  constructor() {}
}

@Component({
  selector: 'lane-map',
  providers: [
    MapDataService,
  ],
  directives: [
    Map,
    MapInfo,
  ],
  styles: [ require('./lanemap.css') ],
  template: `
    <div id="map-controls">
      <h2>Lane Map</h2>
      <button (click)="mapWidget.save()" class="btn btn-primary">Save</button>
      <button (click)="mapWidget.reload()" class="btn btn-default">Reload</button>
      <button (click)="mapWidget.clear()" class="btn btn-warning">Clear</button>
      <hr/>
      <map-info [data]="mapInfo"></map-info>
    </div>
    <map #mapWidget></map>
  `
})
export class LaneMap {
  public mapInfo: any = { polygons: 0 };

  constructor(private mapDataService: MapDataService) {}

  ngOnInit() {
    this.mapDataService.data$.subscribe((data) => this.updateMapInfo(data));
  }

  updateMapInfo(data) {
    if (!data) {
      data = { features: [] };
    }
    this.mapInfo = {
      polygons: data.features.length
    };
  }

}
