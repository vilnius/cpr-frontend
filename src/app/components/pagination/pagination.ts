import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'pagination',
  styleUrls: [
    './pagination.css'
  ],
  templateUrl: 'pagination.html',
})
export class Pagination implements OnInit {
  @Input() pages: Array<number>;
  @Input() activePage: number;
  @Output() onPageClicked = new EventEmitter();
  visiblePages: Array<number>;

  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges(changes) {
    this.createPaginationInfo();
  }

  // Used for better readability in template
  get canGoToNextPage() {
    return _.last(this.pages) !== this.activePage;
  }

  // Used for better readability in template
  get canGoToPreviousPage() {
    return _.first(this.pages) !== this.activePage;
  }

  private createPaginationInfo() {
    let adjustBy = 0,
        visiblePages: Array<number> = _.range(
          this.activePage - 2,
          this.activePage + 3
        ),
        firstOfVisiblePages = _.first(visiblePages),
        lastOfVisiblePages = _.last(visiblePages),
        lastOfAllPages = _.last(this.pages);

    if (firstOfVisiblePages < 1) {

      adjustBy = Math.abs(firstOfVisiblePages) + 1;

    } else if (lastOfVisiblePages > lastOfAllPages) {

      adjustBy = lastOfAllPages - lastOfVisiblePages;

    }

    visiblePages = visiblePages
      .map(page => page + adjustBy)

    this.visiblePages = visiblePages;
  }

  private isValidPage(page: number): boolean {
    let isPositive,
        isLessThatMax;

    isPositive = 1 <= page;
    isLessThatMax = page <= _.last(this.pages);

    return isPositive && isLessThatMax;
  }

  forwardOnPageClicked(pageNumber: number) {
    if (!this.isValidPage(pageNumber) || pageNumber === this.activePage) {
      return;
    }

    this.onPageClicked.emit(pageNumber);
  }

  promtForGoToPage() {
    let goToPageNumber: any = Number(
      prompt(`Select page from 1 to ${_.last(this.pages)}`),
    ) || 0;

    this.forwardOnPageClicked(goToPageNumber);
  }

}
