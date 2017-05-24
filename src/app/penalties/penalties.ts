import { Component, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { GpsComponent } from './gps';
import { PenaltyOverviewComponent } from './penalty-overview';

@Component({
  selector: 'penalties',
  styles: [`
    tr {
      cursor: pointer;
    }
    .active-penalty {
      background: #f5f5f5;
    }
    .penalties-action-bar {
      position: absolute;
      top: 64px;
      bottom: 0;
      left: 0;
      width: 40%;
      overflow: hidden;
      padding: 10px 15px;
      border-right: 1px solid #dddddd;
    }
    .penalty-list {
      position: absolute;
      top: 118px;
      bottom: 0;
      left: 0;
      width: 40%;
      overflow: auto;
      border-right: 1px solid #dddddd;
    }
    .penalty-overview {
      position: absolute;
      top: 64px;
      bottom: 0;
      right: 0;
      width: 60%;
      overflow: auto;
      padding: 0 15px;
    }
    .pagination-bar {
      padding: 0 15px;
    }
  `],
  templateUrl: 'penalties.html',
})
export class PenaltiesComponent implements OnInit {
  checkedForBulkAction: string[] = [];
  penalties;
  activePenalty;
  pages = [1];
  activePage = 1;

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
        this.checkedForBulkAction = [];
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

  onPageClicked(pageNumber) {
    if (pageNumber < 1) {
      pageNumber = 1;
    } else if (pageNumber > this.pages.length) {
      pageNumber = this.pages.length;
    }
    if (pageNumber !== this.activePage) {
      this.activePage = pageNumber;
      this.getPenalties().publish().connect();
    }
  }

  getPenalties() {
    return this.http.get('/api/penalties?page=' + this.activePage)
      .catch(err => this.logError(err))
      .map(res => {
        res = res.json();
        this.pages = Array(res.pagination.pages).fill(0).map((x, i) => i + 1);
        this.penalties = res.objects;
        if (this.penalties.length > 0) {
          this.setActivePenalty(this.penalties[0]);
        }
        return res;
      });
  }

  logError(err) {
    console.error('There was an error: ' + err);
    return Observable.throw(err);
  }

}
