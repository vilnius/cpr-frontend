import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as L from 'leaflet';

import { GpsComponent } from './gps';
import { Violation } from '../violations/models';
import { ViolationsService } from '../violations/violations.service';


@Component({
  selector: 'shot-overview',
  styleUrls: [
    './shot-overview.scss'
  ],
  templateUrl: 'shot-overview.html',
})
export class ShotOverviewComponent implements OnInit {
  @Input() shot: any = null;
  @Output() shotDeleted = new EventEmitter();

  defaultCenterLat: number = 54.674705555555555;
  defaultCenterLon: number = 25.249775;
  editMode = false;
  leafletOptions = {
    layers: [
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      { maxZoom: 18, attribution: '...' })
    ],
    zoom: 12,
    center: L.latLng({
      lat: this.defaultCenterLat,
      lng: this.defaultCenterLon
    })
  };

  layers: L.Layer[] = [];

  centerPosition = L.latLng({
    lat: this.defaultCenterLat,
    lng: this.defaultCenterLon
  });

  constructor(
    public http: Http,
    private route: ActivatedRoute,
    private router: Router,
    private violationsService: ViolationsService
  ) {
  }

  ngOnChanges(changeObject) {
    let lat, lon;

    lat = this.shot.gps.lat;
    lon = this.shot.gps.lon;

    this.layers = [
      this.createMapMarker(lat, lon)
    ];

    this.centerPosition = L.latLng({ lat: lat, lng: lon });
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
        iconUrl: 'assets/img/leaflet/marker-icon.png',
        shadowUrl: 'assets/img/leaflet/marker-shadow.png'
      })
    });
  }

  getShot(id: string) {
    return this.http.get('/api/shots/' + id)
      .map(res => res.json());
  }

  saveShot() {
    let newPlate = prompt(
      'Enter new plate',
      this.shot.plate
    );

    this.http.post(
        '/api/shots/' + this.shot._id,
        Object.assign({}, this.shot, { plate: newPlate })
      )
      .map(res => res.json())
      .subscribe(
        responseOk => {
          // Update plate on succ response
          this.shot.plate = newPlate;
        },
        responseErr => {
          this.logError(responseErr)
        }
      );
  }

  deleteShot() {
    this.shotDeleted.emit(this.shot._id);
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

  createViolation() {
    const  newViolation = new Violation();
    newViolation.plate = this.shot.plate;
    newViolation.shotAt = this.shot.createdAt;
    newViolation.images = [this.shot.image];
    newViolation.location.gps = this.shot.gps;

    this.violationsService.saveViolation(newViolation).subscribe(responseOk => {
      this.router.navigate(['./violations']);
    }, err => this.logError(err));
  }

  logError(err) {
    console.error('There was an error: ' + err);
    return [];
  }
}
