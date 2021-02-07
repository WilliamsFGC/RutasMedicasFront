import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericResponse } from '../models/entities/generic-response';
import { EpsDto } from '../models/dto/eps-dto';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EpsService {

  controller = `${environment.urlApiRutasMedicas}Eps/`;
  constructor(private http: HttpClient) { }

  GetEps(): Observable<GenericResponse<EpsDto[]>> {
      const url = `${this.controller}GetEps`;
      return this.http.get<GenericResponse<EpsDto[]>>(url);
  }

}
