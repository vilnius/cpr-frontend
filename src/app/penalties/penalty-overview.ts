import { Component, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { GpsComponent } from './gps';

@Component({
  selector: 'penalty',
  styles: [`
    .penalty-overview { width: 40%; display: inline-block; vertical-align: top}
    .penalty-image { width: 50%; display: inline-block; }
    .penalty-actions { margin-top: 20px; padding-top: 10px; border-top: 1px solid #DDD }
  `],
  template: `
  <div *ngIf="penalty === undefined">Loading...</div>
  <div *ngIf="penalty">
    <h4>{{penalty.plate}} <small>{{printDate(penalty.shotAt)}}</small></h4>
    <div class="penalty-overview">
      <div>ID: {{penalty._id}}</div>
      <div>Plate number: <b>{{penalty.plate}}</b></div>
      <div>Coordinates <gps [coords]="penalty.gps"></gps></div>
      <div>Shot at: {{printDate(penalty.shotAt)}}</div>
      <div class="penalty-actions">
        <button class="btn btn-primary">E-mail ePolicija.lt</button>
        <button class="btn btn-warning" (click)='deletePenalty(penalty._id)'>Delete</button>
        <button class="btn btn-default">Add to Whitelist</button>
      </div>
    </div>
    <div class="penalty-image">
      <a href="/api/images/{{penalty.image}}" target="_blank" download><img src="/api/images/{{penalty.image}}"/></a>
    </div>
  </div>
  `
})
export class PenaltyOverviewComponent implements OnInit {
  penalty: any;

  constructor(public http: Http, private route: ActivatedRoute, private router: Router) {}
  ngOnInit() {
    this.route.params
    // (+) converts string 'id' to a number
    .switchMap((params: Params) => this.getPenalty(params['id']))
    .subscribe(
      data => this.penalty = data,
      err => this.logError(err)
    );
  }
  printDate(dateString) {
    return dateString.replace(/T/, ' ').replace(/\..*/, '');
  }
  getPenalty(id: string) {
    return this.http.get('/api/penalties/' + id)
      .map(res => res.json())
  }
  deletePenalty(id: string) {
    return this.http.delete('/api/penalties/', { body: { ids: [id] } })
      .map(res => res.json())
      .subscribe(
        _ => this.router.navigate(['/penalties']),
        err => this.logError(err)
      );
  }
  logError(err) {
    console.error('There was an error: ' + err);
  }
}
