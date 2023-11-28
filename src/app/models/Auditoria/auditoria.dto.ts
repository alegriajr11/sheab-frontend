export class Auditoria {
    id?: number;
    usu_nombre: string;
    usu_apellido: string;
    accion: string;
    detalles: string;
    direccionIp: string;
    creadoEn: Date
    

    constructor(id: number, usu_nombre: string, usu_apellido: string, accion: string,
        detalles: string, direccionIp: string, creadoEn: Date){
        this.id = id;
        this.usu_nombre = usu_nombre;
        this.usu_apellido = usu_apellido;
        this.accion = accion;
        this.detalles = detalles;
        this.direccionIp = direccionIp;
        this.creadoEn = creadoEn
    }
}