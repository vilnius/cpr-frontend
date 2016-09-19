import { Injectable, NgZone } from '@angular/core';
import { Observer } from 'rxjs/Observer';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';

declare var google: any;
declare var window: any;

const GOOGLE_MAPS_API = 'https://maps.googleapis.com/maps/api/js?';

@Injectable()
export class GoogleMapsAPI {
  public updatedData$: Observable<any>;
  private _map: any;  // google.maps.Map;
  private _scriptLoadingPromise: Promise<void>;
  private _updatedDataObserver: any;

  constructor(private _zone: NgZone) {
      this.updatedData$ = Observable.create(observer => this._updatedDataObserver = observer).share();
  }

  load(): Promise<void> {
    if (this._scriptLoadingPromise) {
      return this._scriptLoadingPromise;
    }

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.defer = true;
    const callbackName: string = `callback${new Date().getMilliseconds()}`;
    script.src = GOOGLE_MAPS_API + '&callback=' + callbackName;

    this._scriptLoadingPromise = new Promise<void>((resolve: Function, reject: Function) => {
      (<any>window)[callbackName] = () => { resolve(); };
      script.onerror = (error: Event) => { reject(error); };
    });

    document.body.appendChild(script);
    return this._scriptLoadingPromise;
  }

  sendUpdatedData = () => {
    this._zone.run(() => {
      this.getGeoJson(data => this._updatedDataObserver.next(data));
    });
  };

  setupEventListeners() {
    this._map.data.addListener('addfeature', (data) => {
      data.feature.setProperty('createdAt', (new Date()).toString());
      this.sendUpdatedData();
    });
    this._map.data.addListener('removefeature', this.sendUpdatedData);
    this._map.data.addListener('mouseup', this.sendUpdatedData);
    this._map.data.addListener('rightclick', (event) => {
      this._map.data.remove(event.feature);
      this.sendUpdatedData();
    });
  }

  createMap(options: {el: HTMLElement, mapOptions: any}): Promise<void> {
    return this.load().then(() => {
      this._map = new google.maps.Map(options.el, options.mapOptions);
      this._map.data.setControls(['Polygon']);
      this._map.data.setStyle({
        strokeColor: '#FF0000',
        fillColor: '#FF0000',
        strokeWeight: 2,
        editable: true,
        draggable: true
      });
    });
  }

  setGeoJson(data: any) {
    let newData = new google.maps.Data({
      map: this._map,
      style: this._map.data.getStyle(),
      controls: ['Polygon']
    });
    try {
      newData.addGeoJson(data);
      this._map.data.setMap(null);
      this._map.data = newData;
      this.setupEventListeners();
    } catch (error) {
      newData.setMap(null);
    }
  }

  getGeoJson(callback: any) {
    this._map.data.toGeoJson(callback);
  }

}
