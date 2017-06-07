import { Component, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { GpsComponent } from './gps';
import { ShotOverviewComponent } from './shot-overview';
import { Pagination } from '../components/pagination';
import * as _ from 'lodash';

@Component({
  selector: 'shots',
  styleUrls: [ 'shots.css' ],
  templateUrl: 'shots.html',
})
export class ShotsComponent implements OnInit {
  checkedForBulkAction: string[] = [];
  shots;
  activeShot;
  pages: number[] = [ 1 ];
  activePage: number = 1;

  constructor(public http: Http, private router: Router) {

  }

  ngOnInit() {
    this.getShots().publish().connect();
  }

  requestConfirm(message: string = 'Are you sure?'): boolean {
    return confirm(message);
  }

  deleteBulk() {
    if (!this.requestConfirm('Are you sure you want to delete?')) {
      return;
    }

    this.http.delete('/api/shots', { body: { ids: this.checkedForBulkAction } })
      .catch(err => { alert('Delete failed: ' + err); return Observable.throw(err); })
      .flatMap(ok => {
        this.clearSelection();
        return this.getShots();
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
    this.checkedForBulkAction = this.shots.map(shot => shot._id);
  }

  clearSelection() {
    this.checkedForBulkAction = [];
  }

  setActiveShot(shot) {
    this.activeShot = shot;
  }

  printDate(dateString) {
    return dateString.replace(/T/, ' ').replace(/\..*/, '');
  }

  onPageClicked(pageNumber: number) {
    this.getShots(pageNumber)
      .map(response => {
        this.clearSelection();
        return response;
      })
      .publish()
      .connect();
  }

  getShots(pageNumber?: number) {
    pageNumber = pageNumber ? pageNumber : this.activePage;

    return this.http.get('/api/shots?page=' + pageNumber)
      .catch(err => this.logError(err))
      .map(res => {
        res = res.json();

        this.activePage = pageNumber;
        this.shots = res.objects;
        this.pages = _.range(1, res.pagination.pages + 1);

        this.setActiveShot(
          this.shots.length > 0 ? this.shots[0] : null
        );

        return res;
      });
  }

  logError(err) {
    console.error('There was an error: ' + err);
    return Observable.throw(err);
  }

}
