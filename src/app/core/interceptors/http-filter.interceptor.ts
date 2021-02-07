import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';

import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { SweetAlertUtil } from '../utilities/sweet-alert.util';
import { GenericResponse } from 'src/app/models/entities/generic-response';

@Injectable()
export class HttpFilterInterceptor implements HttpInterceptor {

  constructor(private sweet: SweetAlertUtil) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    request.clone({
      setHeaders: {
        'content-type': 'application/json'
      }
    });

    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status !== 200) {
          this.sweet.ShowError('Error', err.message);
        }

        return throwError(err);
      })
    );
  }
}
