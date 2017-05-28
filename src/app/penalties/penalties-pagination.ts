import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { GpsComponent } from './gps';
import * as _ from 'lodash';

@Component({
  selector: 'penalties-pagination',
  styleUrls: [
    './penalties-pagination.css'
  ],
  templateUrl: 'penalties-pagination.html',
})
export class PenaltiesPagination implements OnInit {
  @Input() pages: Array<number>;
  @Input() activePage: number;
  @Input() visiblePages: Array<number>;
  @Input() canGoToPreviousPage: boolean;
  @Input() canGoToNextPage: boolean;
  @Output() onPageClicked = new EventEmitter();

  constructor(public http: Http, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
  }

  forwardOnPageClicked(pageNumber: number) {
    this.onPageClicked.emit(pageNumber);
  }

  promtForGoToPage() {
    let goToPageNumber: any = Number(
      prompt(`Select page from 1 to ${_.last(this.pages)}`),
    ) || 0;

    this.forwardOnPageClicked(goToPageNumber);
  }

}
