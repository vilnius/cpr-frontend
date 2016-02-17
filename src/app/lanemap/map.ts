import {Component, Input, Injectable, ElementRef} from 'angular2/core';

const GOOGLE_MAPS_API = 'https://maps.googleapis.com/maps/api/js?libraries=drawing';

@Injectable()
export class GoogleMapsAPI {
  private map: any;
  private _scriptLoadingPromise: Promise<void>;

  load(): Promise<void> {
    if (this._scriptLoadingPromise) {
      return this._scriptLoadingPromise;
    }

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.defer = true;
    const callbackName: string = `angular2googlemaps${new Date().getMilliseconds()}`;
    script.src = GOOGLE_MAPS_API + '&callback=' + callbackName;

    this._scriptLoadingPromise = new Promise<void>((resolve: Function, reject: Function) => {
      (<any>window)[callbackName] = () => { resolve(); };

      script.onerror = (error: Event) => { reject(error); };
    });

    document.body.appendChild(script);
    return this._scriptLoadingPromise;
  }

  createMap(el: HTMLElement, mapOptions: any): Promise<void> {
    return this.load().then(() => {
      this.map = new google.maps.Map(el, mapOptions);
    });
  }

  drawPolygon(): void {
    var triangleCoords = [
      {lat: 54.6857694, lng: 25.2714924},
      {lat: 54.6887694, lng: 25.2744924},
      {lat: 54.6887694, lng: 25.2704924},
      {lat: 54.6857694, lng: 25.2714924}
    ];

    var triangle = new google.maps.Polygon({
        paths: triangleCoords,
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35
    });
    triangle.setMap(this.map);
    }
}


@Component({
  selector: 'map',
  providers: [
      GoogleMapsAPI
  ],
  styles: [ require('./lanemap.css') ],
  template: `
    <div class="google-maps-container"></div>
  `
})
export class Map {
    constructor(
        private _elem: ElementRef,
        public api: GoogleMapsAPI
    ) {}

    ngOnInit() {
        const container = this._elem.nativeElement.querySelector('.google-maps-container');
        this.api.createMap(container, {
            center: {lat: 54.6857694, lng: 25.2714924},
            zoom: 14
        }).then(() => {
            this.api.drawPolygon();
        });
    };
}
