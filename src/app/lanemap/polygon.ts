import {Component, Input} from 'angular2/core';

@Component({
  selector: 'polygon',
  styles: [ require('./lanemap.css') ],
  template: `
    <li class="polygon">
      <a href="#" class="">
         {{ title }}
      </a>
      <button type="button" class="btn btn-danger btn-xs" style="margin-left: 10px">
        <span class="glyphicon glyphicon-trash" aria-hidden="true"></span>
      </button>
    </li>
  `
})
export class Polygon {
  @Input() title: string;
}
