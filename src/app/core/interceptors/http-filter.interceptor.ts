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
import { HttpStatusCode } from 'src/app/enums/http-status-code.enum';
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
        let message = "";
        if (err.status !== 200) {
          switch(err.status) {
            case HttpStatusCode.BadRequest:
              message = "La solicitud no se envío correctamente";
              break;
            case HttpStatusCode.InternalServerError:
              message = "Ocurrió un erro interno, por favor intente más tarde";
              break;
            case HttpStatusCode.NotFound:
              message = "El servicio solicitado no se encuentra disponible";
              break;
            case HttpStatusCode.Conflict:
              const response = err.error as GenericResponse<object>;
              message = response.message;
              break;
            default:
              message = "Ha ocurrido un error, puede que el servicio no este disponible";
              break;
          }
        }

        if (message !== "") {
          this.sweet.ShowError('Error', message);
        }

        return throwError(err);
      })
    );
  }
}
