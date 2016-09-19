import { Component } from '@angular/core';
import { Map } from './map';
import { MapDataService } from './map-data-service';

@Component({
  selector: 'lane-map',
  providers: [
    MapDataService,
  ],
  styleUrls: [
    './lanemap.css'
  ],
  template: `
    <div id="map-controls">
      <h2>Lane Map</h2>
      <p>Draw using menu in the top left corner of the map. Right click to delete a polygon</p>
      <button (click)="mapDataService.new()" class="btn btn-primary" [class.hidden]="!mapDataService.isNew">New</button>
      <button (click)="map.clear()" class="btn btn-default">Clear Map</button>
      <button (click)="map.reload()" [class.hidden]="!mapDataService.dirty" class="btn btn-default">Reload</button>
      <button (click)="map.save()" [class.hidden]="!mapDataService.dirty" class="btn btn-success">Save</button>
      <hr/>
      <map-info [data]="mapData"></map-info>
    </div>
    <map #map></map>
  `
})
export class LaneMap {
  public mapData: any;

  constructor(public mapDataService: MapDataService) {}

  ngOnInit() {
    this.mapDataService.data$.subscribe((data) => this.updateMapData(data));
  }

  updateMapData(data) {
    this.mapData = data;
  }

}
