import * as _ from 'lodash';

import { Component, OnInit } from '@angular/core';
import { AuthHttp } from '../auth/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { GpsComponent } from './gps';
import { ShotOverviewComponent } from './shot-overview';
import { Violation } from '../violations/models';
import { ViolationsService } from '../violations/violations.service';

@Component({
  selector: 'shots',
  styleUrls: [ 'shots.css' ],
  templateUrl: 'shots.html',
})
export class ShotsComponent implements OnInit {
  public checkedForBulkAction: string[] = [];
  public shots;
  public activeShot;
  public pages: number[] = [ 1 ];
  public activePage: number = 1;

  constructor(
    private http: AuthHttp,
    private router: Router,
    private violationsService: ViolationsService,
  ) {
  }

  public ngOnInit() {
    this.getShots().publish().connect();
  }

  public requestConfirm(message: string = 'Are you sure?'): boolean {
    return confirm(message);
  }

  public handleDelete(query: any) {
    this.http.delete('/api/shots/', { body: query })
      .map((res) => res.json())
      .flatMap(() => this.getShots())
      .subscribe(
        () => {
          //
        },
        (err) => this.logError(err)
      );
  }

  public deleteBulk({ showConfirmation = true, deleteImages = true }) {
    if (showConfirmation && !this.requestConfirm('Are you sure you want to delete?')) {
      return;
    }

    this.http.delete('/api/shots', { body: { ids: this.checkedForBulkAction, deleteImages } })
      .catch((err) => {
        alert('Delete failed: ' + err);
        return Observable.throw(err);
      }).flatMap((ok) => {
        this.clearSelection();
        return this.getShots();
      })
      .subscribe(
        (data) => {
          //
        },
        (err) => this.logError(err)
      );
  }

  public createViolationBulk() {
    if (!this.requestConfirm('Are you sure you want create violation?')) {
      return;
    }
    const shots = this.shots.filter((shot) => _.includes(this.checkedForBulkAction, shot._id));
    const shot = shots[0];

    const newViolation = new Violation();
    newViolation.plate = shot.plate;
    newViolation.shotAt = shot.createdAt;
    newViolation.images = _.map(shots, (shot: any) => shot.image);
    newViolation.location.gps = shot.gps;

    this.violationsService.saveViolation(newViolation).subscribe(
      (responseOk) => this.deleteBulk({ showConfirmation: false, deleteImages: false }),
      (responseErr) => this.logError(responseErr)
    );
  }

  public isCheckedForBulkAction(id: string): boolean {
    return this.checkedForBulkAction.indexOf(id) !== -1;
  }

  // Adds id for bulk actions or removes if already in array
  public pushForBulkAction(id: string): void {
    const index = this.checkedForBulkAction.indexOf(id);

    if (index !== -1) {
      this.checkedForBulkAction.splice(index, 1);
    } else {
      this.checkedForBulkAction.push(id);
    }
  }

  public selectAll() {
    this.checkedForBulkAction = this.shots.map((shot) => shot._id);
  }

  public clearSelection() {
    this.checkedForBulkAction = [];
  }

  public setActiveShot(shot) {
    this.activeShot = shot;
  }

  public onPageClicked(pageNumber: number) {
    this.getShots(pageNumber)
      .map((response) => {
        this.clearSelection();
        return response;
      })
      .publish()
      .connect();
  }

  public getShots(pageNumber?: number) {
    pageNumber = pageNumber ? pageNumber : this.activePage;

    return this.http.get('/api/shots?page=' + pageNumber)
      .catch((err) => this.logError(err))
      .map((res) => {
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

  public logError(err) {
    console.error('There was an error: ' + err);
    return Observable.throw(err);
  }
}
