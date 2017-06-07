import { Component, OnInit, Input } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { GpsComponent } from './gps';

@Component({
  selector: 'shot-overview',
  styles: [`
    .shot-actions { padding: 10px 0; }
  `],
  templateUrl: 'shot-overview.html',
})
export class ShotOverviewComponent implements OnInit {
  @Input() shot: any;
  editMode = false;

  constructor(public http: Http, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    if (this.shot) {
      return;
    }
    this.route.params
      .switchMap((params: Params) => this.getShot(params['id']))
      .subscribe(
        data => this.shot = data,
        err => this.logError(err)
      );
  }

  printDate(dateString) {
    return dateString.replace(/T/, ' ').replace(/\..*/, '');
  }
  getShot(id: string) {
    return this.http.get('/api/shots/' + id)
      .map(res => res.json());
  }
  saveShot() {
    this.http.post('/api/shots/' + this.shot._id, this.shot)
      .map(res => res.json())
      .subscribe(
        _ => this.editMode = false,
        err => this.logError(err)
      );
  }
  deleteShot(id: string) {
    this.http.delete('/api/shots/', { body: { ids: [id] } })
      .map(res => res.json())
      .subscribe(
        _ => this.router.navigate(['/shots']),
        err => this.logError(err)
      );
  }
  addToWhitelist(plate: string) {
    this.http.post('/api/whitelist', {
      description: 'Added from shot overview',
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
