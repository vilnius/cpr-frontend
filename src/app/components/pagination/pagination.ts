import { Component, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'pagination',
  styleUrls: [
    './pagination.css'
  ],
  templateUrl: 'pagination.html',
})
export class PaginationComponent implements OnChanges {
  @Input() public pages: number[];
  @Input() public activePage: number;
  @Output() public onPageClicked = new EventEmitter();
  public visiblePages: number[];

  public ngOnChanges(changes) {
    this.createPaginationInfo();
  }

  // Used for better readability in template
  public get canGoToNextPage() {
    return _.last(this.pages) !== this.activePage;
  }

  // Used for better readability in template
  public get canGoToPreviousPage() {
    return _.first(this.pages) !== this.activePage;
  }

  public forwardOnPageClicked(pageNumber: number) {
    if (!this.isValidPage(pageNumber) || pageNumber === this.activePage) {
      return;
    }

    this.onPageClicked.emit(pageNumber);
  }

  public promtForGoToPage() {
    let goToPageNumber: any = Number(
      prompt(`Select page from 1 to ${_.last(this.pages)}`),
    ) || 0;

    this.forwardOnPageClicked(goToPageNumber);
  }

  private createPaginationInfo() {
    let adjustBy = 0;
    const lastOfAllPages = _.last(this.pages);

    let visiblePages = lastOfAllPages > 5
      ? _.range(
          this.activePage - 2,
          this.activePage + 3
        )
      : _.range(1, lastOfAllPages + 1);

    const firstOfVisiblePages = _.first(visiblePages);
    const lastOfVisiblePages = _.last(visiblePages);

    if (firstOfVisiblePages < 1) {
      adjustBy = Math.abs(firstOfVisiblePages) + 1;
    } else if (lastOfVisiblePages > lastOfAllPages) {
      adjustBy = lastOfAllPages - lastOfVisiblePages;
    }

    this.visiblePages = visiblePages.map((page) => page + adjustBy);
  }

  private isValidPage(page: number): boolean {
    const isPositive = 1 <= page;
    const isLessThatMax = page <= _.last(this.pages);

    return isPositive && isLessThatMax;
  }
}
