import {Component, Input} from 'angular2/core';
import {Map} from './map';
import {MapDataService} from './map-data-service';

@Component({
  selector: 'map-info'
})
export class MapInfo {}

@Component({
  selector: 'lane-map',
  providers: [
    MapDataService,
  ],
  directives: [
    Map,
  ],
  styles: [ require('./lanemap.css') ],
  template: `
    <div id="map-controls">
      <h2>Lane Map</h2>
      <button (click)="mapWidget.save()" class="btn btn-primary">Save</button>
      <button (click)="mapWidget.reload()" class="btn btn-default">Reload</button>
      <button (click)="mapWidget.clear()" class="btn btn-warning">Clear</button>
      <hr/>
      <p>
        Total polygons: {{ mapInfo.polygons }}
      </p>
    </div>
    <map #mapWidget></map>
  `
})
export class LaneMap {
  public mapInfo: any;

  constructor(private mapDataService: MapDataService) {
    this.mapInfo = {}
  }

  ngOnInit() {
    this.mapDataService.data$.subscribe(data => {
      if (!data) {
        data = { features: [] };
      };
      this.mapInfo = {
        polygons: data.features.length
      }
    });
  }

}
