import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { Headers, RequestOptions } from '@angular/http';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as L from 'leaflet';

import { AuthHttp } from '../auth/http';
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
export class ShotOverviewComponent implements OnInit, OnChanges {
  @Input() public shot: any = null;
  @Output() public shotDeleted = new EventEmitter();

  public defaultCenterLat: number = 54.674705555555555;
  public defaultCenterLon: number = 25.249775;
  public editMode = false;
  public leafletOptions = {
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

  public layers: L.Layer[] = [];

  public centerPosition = L.latLng({
    lat: this.defaultCenterLat,
    lng: this.defaultCenterLon
  });

  constructor(
    public http: AuthHttp,
    private route: ActivatedRoute,
    private router: Router,
    private violationsService: ViolationsService
  ) {
  }

  public ngOnChanges(changeObject) {
    const lat = this.shot.gps.lat;
    const lon = this.shot.gps.lon;

    this.layers = [
      this.createMapMarker(lat, lon)
    ];

    this.centerPosition = L.latLng({ lat, lng: lon });
  }

  public ngOnInit() {
    if (this.shot) {
      return;
    }

    this.route.params
      .switchMap((params: Params) => this.getShot(params['id']))
      .subscribe(
        (data) => {
          this.shot = data;
        },
        (err) => this.logError(err)
      );

  }

  public createMapMarker(lat: number, lon: number) {
    return L.marker([ lat, lon ], {
      icon: L.icon({
        iconSize: [ 25, 41 ],
        iconAnchor: [ 13, 41 ],
        iconUrl: 'assets/img/leaflet/marker-icon.png',
        shadowUrl: 'assets/img/leaflet/marker-shadow.png'
      })
    });
  }

  public getShot(id: string) {
    return this.http.get('/api/shots/' + id)
      .map((res) => res.json());
  }

  public saveShot() {
    let newPlate = prompt(
      'Enter new plate',
      this.shot.plate
    );

    this.http.post(
        '/api/shots/' + this.shot._id,
        Object.assign({}, this.shot, { plate: newPlate })
      )
      .map((res) => res.json())
      .subscribe(
        () => {
          // Update plate on succ response
          this.shot.plate = newPlate;
        },
        (responseErr) => this.logError(responseErr)
      );
  }

  public deleteShot() {
    this.shotDeleted.emit({ ids: [this.shot._id] });
  }

  public addToWhitelist(plate: string) {
    this.http.post('/api/whitelist', {
      description: 'Added from shot overview',
      plate
    }).subscribe(
      () => {
        this.shotDeleted.emit({ plate });
        alert('Plate added to whitelist');
      },
      (responseErr) => this.logError(responseErr)
    );
  }

  public createViolation() {
    const  newViolation = new Violation();
    newViolation.plate = this.shot.plate;
    newViolation.shotAt = this.shot.createdAt;
    newViolation.images = [this.shot.image];
    newViolation.location.gps = this.shot.gps;

    this.violationsService.saveViolation(newViolation).subscribe(
      (responseOk) => this.router.navigate(['./violations']),
      (responseErr) => this.logError(responseErr)
    );
  }

  public logError(err) {
    console.error('There was an error: ' + err);
    return [];
  }
}
