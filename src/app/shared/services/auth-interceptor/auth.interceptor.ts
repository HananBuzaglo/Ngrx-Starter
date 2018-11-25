import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { ErrorHandlerService } from '../../services/error-handler/error-handler.service';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private errorHandler: ErrorHandlerService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    /// Full URI Backend and Route.
    // const isLocalData = req.url.includes('tenants');
    // Get the auth token from the SessionStorage.
    const authToken = sessionStorage.getItem('token');
    const isLocalData = req.url.includes('i18n');
    let uri = `${environment.endPoint}${req.url}`;

    if (isLocalData) {
      uri = req.url;
    }

    /// Clone the request to add the new header.
    let authReq = req.clone({
      url: uri,
      setHeaders: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });

    // Clone the request and replace the original headers with
    // cloned headers, updated with the authorization.
    if (authToken) {
      authReq = req.clone({
        url: uri,
        setHeaders: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Authorization': `Bearer ${authToken}`
        }
      });
    }

    // if (!isLocalData) {
    //   authReq = req.clone({
    //     url: uri,
    //     setHeaders: {
    //       'Accept': 'application/json',
    //       'Content-Type': 'application/json',
    //       'Access-Control-Allow-Origin': '*',
    //       'Authorization': `Bearer ${authToken}`,
    //       'tenant': `${this.settingsSrv.accountSettings.name}`
    //     }
    //   });
    // }


      // send cloned request with header to the next handler.
      return next.handle(authReq)
        .pipe(
          tap(
            (event: HttpResponse<any>) => this.errorHandler.handle(event.status),
            error => this.errorHandler.handle(error)
          )
        );
      // Todo: Send to logService
  }
}

