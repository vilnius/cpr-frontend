import {Injectable} from 'angular2/core';

declare var google: any;
declare var window: any;

const GOOGLE_MAPS_API = 'https://maps.googleapis.com/maps/api/js?';

let LatLng = function(lat, lng): google.maps.LatLng {
  return new google.maps.LatLng(lat, lng);
};

@Injectable()
export class GoogleMapsAPI {
  private map: google.maps.Map;
  private _scriptLoadingPromise: Promise<void>;

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

  createMap(el: HTMLElement, mapOptions: google.maps.MapOptions): Promise<void> {
    return this.load().then(() => {
      this.map = new google.maps.Map(el, mapOptions);
      this.map.data.setControls(['Polygon']);
      this.map.data.setStyle({
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
      map: this.map,
      style: this.map.data.getStyle(),
      controls: ['Polygon']
    });
    try {
      newData.addGeoJson(data);
      this.map.data.setMap(null);
      this.map.data = newData;
    } catch (error) {
      newData.setMap(null);
    }
  }

  getGeoJson(callback: any) {
    this.map.data.toGeoJson(callback);
  }
}
