import { Component, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { GpsComponent } from './gps';

@Component({
  selector: 'penalties',
  templateUrl: 'penalties.html',
})
export class PenaltiesComponent implements OnInit {
  checkedForBulkAction: string[] = [];
  penalties: any;

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
    let chekedArr;

    chekedArr = this.checkedForBulkAction;

    if (this.isCheckedForBulkAction(id)) {

      chekedArr.splice(id, 1);

    } else {

      chekedArr.push(id);

    }

  }

  penaltyOverview(id) {
    this.router.navigate(['/penalties', id]);
  }

  printDate(dateString) {
    return dateString.replace(/T/, ' ').replace(/\..*/, '');
  }

  getPenalties() {
    return this.http.get('/api/penalties')
      .catch(err => this.logError(err))
      .map(res => {
        res = res.json();
        this.penalties = res;
        return res;
      });
  }

  logError(err) {
    console.error('There was an error: ' + err);
    return Observable.throw(err);
  }

}
