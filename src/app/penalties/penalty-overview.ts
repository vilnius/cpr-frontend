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
  templateUrl: 'penalty-overview.html',
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
      .map(res => res.json());
  }
  deletePenalty(id: string) {
    this.http.delete('/api/penalties/', { body: { ids: [id] } })
      .map(res => res.json())
      .subscribe(
        _ => this.router.navigate(['/penalties']),
        err => this.logError(err)
      );
  }
  addToWhitelist(plate: string) {
    this.http.post('/api/whitelist', {
      description: 'Added from penalty overview',
      plate
    }).subscribe(
      _ => console.log('Plate added success'),
      err => this.logError(err)
    );
  }
  logError(err) {
    console.error('There was an error: ' + err);
    return [];
  }
}
