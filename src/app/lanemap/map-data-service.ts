import {Injectable, NgZone} from 'angular2/core';
import {Http} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';

@Injectable()
export class MapDataService {
  public dirty: boolean = false;
  public data$: Observable<any>;
  private _dataObserver: any;
  private _data: any = {};

  constructor(private http: Http, private _zone: NgZone) {
    this.data$ = Observable.create(observer => this._dataObserver = observer).share();
  }

  update = (data: any) => {
    this.dirty = true;
    this._data = data;
    this._zone.run(() => {
        this._dataObserver.next(data);
    });
  };

  load = () => {
    // this.http.get('data.json').map(response => response.json()).subscribe(data => {
    //   // Update data store
    //   this._data = data;
    //   // Push this new data into the Observable stream
    //   this._dataObserver.next(this._data);
    // }, error => console.error('Could not load data!', error));
    let laneData = JSON.parse(localStorage.getItem('lane-data'));
    this.update(laneData);
    this.dirty = false;
    return laneData;
  };

  save = () => {
    localStorage.setItem('lane-data', JSON.stringify(this._data));
    this.dirty = false;
  };
}
