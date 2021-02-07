import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PersonDto, PersonSearchDto, SexDto } from '../models/dto/person-dto';
import { GenericResponse } from '../models/entities/generic-response';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  controller = `${environment.urlApiRutasMedicas}Person/`;
  constructor(private http: HttpClient) { }

  DeletePerson(idPerson: string): Observable<GenericResponse<boolean>> {
    const url = `${this.controller}DeletePerson/${idPerson}`;
    return this.http.delete<GenericResponse<boolean>>(url);
  }

  GetPerson(person: PersonSearchDto): Observable<GenericResponse<PersonDto[]>> {
    const url = `${this.controller}GetPerson`;
    return this.http.post<GenericResponse<PersonDto[]>>(url, person);
  }

  SavePerson(person: PersonDto) : Observable<GenericResponse<string>> {
    const url = `${this.controller}SavePerson`;
    return this.http.post<GenericResponse<string>>(url, person);
  }

  UpdatePerson(person: PersonDto) {
    const url = `${this.controller}UpdatePerson`;
    return this.http.put<GenericResponse<boolean>>(url, person);
  }

  GetSexList(): Observable<GenericResponse<SexDto[]>> {
    const sexList = new Array<SexDto>(
      new SexDto(1, 'Femenino'),
      new SexDto(2, 'Masculino'),
      new SexDto(3, 'Otro')
    );
    const response = new GenericResponse<SexDto[]>(sexList);
    response.isSuccessful = true;
    return of(response);
  }
}
