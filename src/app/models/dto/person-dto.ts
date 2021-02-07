import { DocumentTypeDto } from "./document-type-dto";
import { EpsPersonDto } from "./eps-dto";

export class PersonDto {
    _id: string;
    correoElectronico: string[];
    eps: EpsPersonDto[];
    codigoInterno: string;
    primerNombre: string;
    segundoNombre: string;
    primerApellido: string;
    segundoApellido: string;
    estadoCivil: string;
    sexo: SexDto;
    fechaNacimiento: Date;
    identidad: PersonIdentity;
}

export class SexDto {
    id: number;
    descripcion: string;
    otro: string;
    constructor(id?: number, descripcion?: string) {
        this.id = id;
        this.descripcion = descripcion;
    }
}

export class PersonSearchDto {
    
}

export class PersonIdentity {
    numeroDocumento: string;
    fechaExpedicion: Date;
    lugarExpedicion: string;
    tipoDocumento: DocumentTypeDto;
}