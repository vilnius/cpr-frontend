import {Component} from 'angular2/core';
import {Polygon} from './polygon';
import {Map} from './map';

@Component({
  selector: 'lane-map',
  directives: [
    Polygon,
    Map,
  ],
  styles: [ require('./lanemap.css') ],
  template: require('./lanemap.html')
})
export class LaneMap {}
