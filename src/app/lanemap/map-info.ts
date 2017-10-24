import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'map-info',
  template: `<p>Polygons: {{ polygons }}</p>`
})
export class MapInfoComponent implements OnChanges {
  @Input() public data: any;
  public polygons: number;

  public ngOnChanges() {
    if (!this.data) {
      this.data = { features: [] };
    }
    this.polygons = this.data.features.length;
  }
}
