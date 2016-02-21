import {Injectable, NgZone} from 'angular2/core';
import {Observer} from 'rxjs/Observer';
import {Observable} from 'rxjs/Observable';

declare var google: any;
declare var window: any;

const GOOGLE_MAPS_API = 'https://maps.googleapis.com/maps/api/js?';

let LatLng = function(lat, lng): google.maps.LatLng {
  return new google.maps.LatLng(lat, lng);
};

@Injectable()
export class GoogleMapsAPI {
  private _map: google.maps.Map;
  private _scriptLoadingPromise: Promise<void>;

  constructor(private _zone: NgZone) {}

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

  subscribeToMapDataEvent<E>(eventName: string): Observable<E> {
    return Observable.create((observer: Observer<E>) => {
        this._map.data.addListener(eventName, (arg: E) => { this._zone.run(() => observer.next(arg)); });
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
    var newData = new google.maps.Data({
      map: this._map,
      style: this._map.data.getStyle(),
      controls: ['Polygon']
    });
    try {
      newData.addGeoJson(data);
      this._map.data.setMap(null);
      this._map.data = newData;
    } catch (error) {
      newData.setMap(null);
    }
  }

  getGeoJson(callback: any) {
    this._map.data.toGeoJson(callback);
  }
}
