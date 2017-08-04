import { Component, OnInit, Input } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { GpsComponent } from './gps';
import * as L from 'leaflet';

@Component({
  selector: 'shot-overview',
  styleUrls: [
    './shot-overview.scss'
  ],
  templateUrl: 'shot-overview.html',
})
export class ShotOverviewComponent implements OnInit {
  @Input() shot: any = null;
  defaultCenterLat: number = 54.674705555555555;
  defaultCenterLon: number = 25.249775;
  editMode = false;
  leafletOptions = {
    layers: [
      L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      { maxZoom: 18, attribution: '...' })
    ],
    zoom: 12,
    center: L.latLng({
      lat: this.defaultCenterLat,
      lng: this.defaultCenterLon
    })
  };

  layers: L.Layer[] = [];

  constructor(public http: Http, private route: ActivatedRoute, private router: Router) {
  }

  ngOnChanges(changeObject) {
    let lat, lon;

    lat = this.shot.gps.lat;
    lon = this.shot.gps.lon;

    this.layers = [
      this.createMapMarker(lat, lon)
    ];

    // Add map centering logic too here

  }

  ngOnInit() {

    if (this.shot) {
      return;
    }

    this.route.params
      .switchMap((params: Params) => this.getShot(params['id']))
      .subscribe(
        data => {
          this.shot = data;
        },
        err => this.logError(err)
      );

  }

  createMapMarker(lat: number, lon: number) {
    return L.marker([ lat, lon ], {
      icon: L.icon({
        iconSize: [ 25, 41 ],
        iconAnchor: [ 13, 41 ],
        iconUrl: '2273e3d8ad9264b7daa5bdbf8e6b47f8.png',
        shadowUrl: '44a526eed258222515aa21eaffd14a96.png'
      })
    });
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
      responseOk => {
        alert('Plate added to whitelist');
      },
      err => this.logError(err)
    );
  }

  logError(err) {
    console.error('There was an error: ' + err);
    return [];
  }
}
