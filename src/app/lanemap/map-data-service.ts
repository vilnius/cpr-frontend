import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';

@Injectable()
export class MapDataService {
  private _dataObserver: any;
  private _data: any;
  public data$: Observable<any>;

  constructor(public http: Http) {
    this._data = {};
    this.data$ = new Observable(observer => {
      this._dataObserver = observer
    }).share();
  }

  loadMapData = () => {
    console.log("Loading map data");
    // this.http.get('data.json').map(response => response.json()).subscribe(data => {
    //   // Update data store
    //   this._data = data;
    //   // Push this new data into the Observable stream
    //   this._dataObserver.next(this._data);
    // }, error => console.error('Could not load data!', error));
    this._data = JSON.parse(localStorage.getItem('lane-data'));
    this._dataObserver.next(this._data);
  }

  saveMapData = (data: any = null) => {
    console.log("Saving map data");
    localStorage.setItem('lane-data', JSON.stringify(data));
    this._data = data;
    this._dataObserver.next(this._data);
  }
}