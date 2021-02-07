export class DocumentTypeDto {
    codigo: number;
    descripcion: string;

    constructor(codigo?: number, descripcion?: string) {
        this.codigo = codigo;
        this.descripcion = descripcion;
    }
}
