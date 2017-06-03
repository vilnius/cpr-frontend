import { Component, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { GpsComponent } from './gps';
import { PenaltyOverviewComponent } from './penalty-overview';
import { Pagination } from '../components/pagination';
import * as _ from 'lodash';

@Component({
  selector: 'penalties',
  styleUrls: [ 'penalties.css' ],
  templateUrl: 'penalties.html',
})
export class PenaltiesComponent implements OnInit {
  checkedForBulkAction: string[] = [];
  penalties;
  activePenalty;
  pages: Array<number> = [ 1 ];
  activePage: number = 1;

  constructor(public http: Http, private router: Router) {

  }

  ngOnInit() {
    this.getPenalties().publish().connect();
  }

  requestConfirm(message: string = 'Are you sure?'): boolean {
    return confirm(message);
  }

  deleteBulk() {
    if (!this.requestConfirm('Are you sure you want to delete?')) {
      return;
    }

    this.http.delete('/api/penalties', { body: { ids: this.checkedForBulkAction } })
      .catch(err => { alert('Delete failed: ' + err); return Observable.throw(err); })
      .flatMap(ok => {
        this.clearSelection();
        this.activePenalty = null;
        return this.getPenalties();
      })
      .subscribe(
        data => {
          //
        },
        err => this.logError(err)
      );
  }

  isCheckedForBulkAction(id: string): boolean {
    return this.checkedForBulkAction.indexOf(id) !== -1;
  }

  // Adds id for bulk actions or removes if already in array
  pushForBulkAction(id: string): void {
    const index = this.checkedForBulkAction.indexOf(id);

    if (index !== -1) {
      this.checkedForBulkAction.splice(index, 1);
    } else {
      this.checkedForBulkAction.push(id);
    }

  }

  selectAll() {
    this.checkedForBulkAction = this.penalties.map(penalty => penalty._id);
  }

  clearSelection() {
    this.checkedForBulkAction = [];
  }

  setActivePenalty(penalty) {
    this.activePenalty = penalty;
  }

  printDate(dateString) {
    return dateString.replace(/T/, ' ').replace(/\..*/, '');
  }

  onPageClicked(pageNumber: number) {
    this.getPenalties(pageNumber)
      .map(response => {
        this.clearSelection();
        return response;
      })
      .publish()
      .connect();
  }

  getPenalties(pageNumber?: number) {
    return this.http.get('/api/penalties?page=' + (pageNumber || 1))
      .catch(err => this.logError(err))
      .map(res => {
        res = res.json();

        this.penalties = res.objects;

        // If we delete last pentalty we need set active
        // penalty to falsy value to reflect that in UI
        this.setActivePenalty(
          _.get(this, 'penalties[0]', null)
        );

        if (pageNumber) {
          this.activePage = pageNumber;
        }

        this.pages = _.range(1, res.pagination.pages + 1);

        return res;
      });
  }

  logError(err) {
    console.error('There was an error: ' + err);
    return Observable.throw(err);
  }

}
