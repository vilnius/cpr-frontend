import {Component, Input} from '@angular/core';

@Component({
  selector: 'gps',
  template: `
    <a href="http://maps.google.com/maps?q={{ coords.lat }},{{ coords.lon }}" target="_blank">
      ({{ coords.lat }}, {{ coords.lon }})
    </a>
  `
})
export class GPS {
  @Input() coords: any;
  constructor() {}
}
