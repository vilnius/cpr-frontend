import { Injectable, NgZone } from '@angular/core';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AuthHttp } from '../auth/http';

const headers = new Headers({ 'Content-Type': 'application/json' });
const httpOptions = new RequestOptions({ headers });

@Injectable()
export class MapDataService {
  public dirty: boolean = false;
  public isNew: boolean = false;
  public data$: Observable<any>;
  private _dataObserver: any;
  private _data: any = {};

  constructor(private http: AuthHttp, private _zone: NgZone) {
    this.data$ = new Observable((observer) => this._dataObserver = observer);
  }

  public update = (data: any) => {
    this._zone.run(() => {
      this.dirty = true;
      this._data = data;
      this._dataObserver.next(data);
    });
  }

  public new = () => {
    const lanemap = { _id: 'vilnius', name: 'vilnius', geoJSON: {} };
    this.http.post('/api/lanemaps', JSON.stringify(lanemap), httpOptions)
      .map((res) => res.json())
      .subscribe(
        () => {
          this.isNew = false;
          this.dirty = true;
        },
        (err) => console.error(err)
    );
  }

  public load = (callback) => {
    this.http.get('/api/lanemaps/vilnius')
      .map((res) => res.json())
      .subscribe(
        (data) => {
          this.update(data.geoJSON);
          this.isNew = false;
          this.dirty = false;
          callback(data.geoJSON);
        },
        (err) => {
          console.error(err);
          if (err.status === 404) {
            this.isNew = true;
          }
        }
      );
  }

  public save = () => {
    const lanemap = { _id: 'vilnius', name: 'vilnius', geoJSON: this._data || {} };
    this.http.post('/api/lanemaps/vilnius', JSON.stringify(lanemap), httpOptions)
      .map((res) => res.json())
      .subscribe(
        () => this.dirty = false,
        (err) => console.error(err)
    );
  }
}
