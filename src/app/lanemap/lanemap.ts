import { Component, OnInit } from '@angular/core';
import { MapComponent } from './map';
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
      <button class="btn btn-primary" (click)="mapDataService.new()"
        [class.hidden]="!mapDataService.isNew">New</button>
      <button class="btn btn-default" (click)="map.clear()">Clear Map</button>
      <button class="btn btn-default" (click)="map.reload()"
        [class.hidden]="!mapDataService.dirty" >Reload</button>
      <button class="btn btn-success" (click)="map.save()"
        [class.hidden]="!mapDataService.dirty">Save</button>
      <hr/>
      <map-info [data]="mapData"></map-info>
    </div>
    <map #map></map>
  `
})
export class LaneMapComponent implements OnInit {
  public mapData: any;

  constructor(public mapDataService: MapDataService) {}

  public ngOnInit() {
    this.mapDataService.data$.subscribe((data) => this.updateMapData(data));
  }

  public updateMapData(data) {
    this.mapData = data;
  }

}
