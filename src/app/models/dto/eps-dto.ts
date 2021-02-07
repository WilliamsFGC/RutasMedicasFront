export class EpsDto {
    _id: string;
    codigo: string;
    entidad: string;
    nit: string;
    regimenCodigo: string;
    regimenDescripcion: string;
}

export class EpsPersonDto {
    idEntidad: string;
    entidad: string;
    fechaIngreso: Date;
    estadoAfiliacion: boolean;

    constructor(idEntidad?: string, entidad?: string, fechaIngreso?: Date, estadoAfiliacion?: boolean) {
        this.idEntidad = idEntidad;
        this.entidad = entidad;
        this.fechaIngreso = fechaIngreso;
        this.estadoAfiliacion = estadoAfiliacion;
    }
}