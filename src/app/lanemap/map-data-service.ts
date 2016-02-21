import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';

@Injectable()
export class MapDataService {
  public data$: Observable<any>;
  private _dataObserver: any;
  private _data: any;

  constructor(private http: Http) {
    this._data = {};
    this.data$ = new Observable(observer => {
      this._dataObserver = observer;
    }).share();
  }

  updateMapData = (data?: any) => {
    this._data = data;
    this._dataObserver.next(this._data);
  };

  loadMapData = () => {
    console.log('Loading map data');
    // this.http.get('data.json').map(response => response.json()).subscribe(data => {
    //   // Update data store
    //   this._data = data;
    //   // Push this new data into the Observable stream
    //   this._dataObserver.next(this._data);
    // }, error => console.error('Could not load data!', error));
    this.updateMapData(JSON.parse(localStorage.getItem('lane-data')))
  };

  saveMapData = (data: any) => {
    console.log('Saving map data');
    localStorage.setItem('lane-data', JSON.stringify(data));
    this.updateMapData(data);
  };
}
