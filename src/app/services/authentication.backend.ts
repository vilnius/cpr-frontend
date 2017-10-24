import { Router } from '@angular/router';
import { Request, XHRBackend, BrowserXhr, XSRFStrategy, ResponseOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

export class AuthenticationConnectionBackend extends XHRBackend {
  constructor(
    _browserXhr: BrowserXhr,
    _baseResponseOptions: ResponseOptions,
    _xsrfStrategy: XSRFStrategy,
    private _router: Router
  ) {
    super(_browserXhr, _baseResponseOptions, _xsrfStrategy);
  }

  public isUnauthorized(status: Number): Boolean {
    return status === 401 || status === 403;
  }
  public createConnection(request: Request) {
    let xhrConnection = super.createConnection(request);
    xhrConnection.response = xhrConnection.response.catch((error: any) => {
      if (this.isUnauthorized(error.status)) {
        // Navigate to login page when 'Unauthorized' is received
        this._router.navigate(['./login']);
      }
      return Observable.throw(error);
    });
    return xhrConnection;
  }
}
