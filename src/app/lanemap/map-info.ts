import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'map-info',
  template: `<p>Polygons: {{ polygons }}</p>`
})
export class MapInfoComponent implements OnChanges {
  @Input() data: any;
  public polygons: number;

  ngOnChanges() {
    if (!this.data) {
      this.data = { features: [] };
    }
    this.polygons = this.data.features.length;
  }
}
