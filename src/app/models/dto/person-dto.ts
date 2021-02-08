import { DocumentTypeDto } from "./document-type-dto";
import { EpsPersonDto } from "./eps-dto";

export class PersonDto {
    _id: string;
    correoElectronico: string[];
    eps: EpsPersonDto[];
    codigoInterno: string;
    numeroDocumento: string;
    tipoDocumento: DocumentTypeDto;
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
    _id: number;
    descripcion: string;
    otro: string;
    constructor(id?: number, descripcion?: string) {
        this._id = id;
        this.descripcion = descripcion;
        this.otro = null;
    }
}

export class PersonSearchDto {
    
}

export class PersonIdentity {
    fechaExpedicion: Date;
    lugarExpedicion: string;
}