import { Component, OnInit, Input } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { GpsComponent } from './gps';

@Component({
  selector: 'penalty-overview',
  styles: [`
    .penalty-actions { padding: 10px 0; }
  `],
  templateUrl: 'penalty-overview.html',
})
export class PenaltyOverviewComponent implements OnInit {
  @Input() penalty: any;
  editMode = false;

  constructor(public http: Http, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    if (this.penalty) {
      return;
    }
    this.route.params
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
  savePenalty() {
    this.http.post('/api/penalties/' + this.penalty._id, this.penalty)
      .map(res => res.json())
      .subscribe(
        _ => this.editMode = false,
        err => this.logError(err)
      );
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
