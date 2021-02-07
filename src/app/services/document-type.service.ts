import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DocumentTypeDto } from '../models/dto/document-type-dto';
import { GenericResponse } from '../models/entities/generic-response';

@Injectable({
  providedIn: 'root'
})
export class DocumentTypeService {

  constructor() { }

  GetDocumentTypes() : Observable<GenericResponse<DocumentTypeDto[]>> {
    const documentTypes = new Array<DocumentTypeDto>(
      new DocumentTypeDto(1, 'Cédula'),
      new DocumentTypeDto(2, 'Tarjeta de Identidad'),
      new DocumentTypeDto(3, 'Cédula de extranjería'),
      new DocumentTypeDto(4, 'Otro'),
    );
    const response = new GenericResponse<DocumentTypeDto[]>(documentTypes);
    response.isSuccessful = true;
    return of(response);
  }
}
