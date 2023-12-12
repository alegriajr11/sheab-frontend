export class ServicioAtencionInmediataDto {
    serv_id?: number;
    serv_nombre_servicio: string;
    

    constructor(serv_id: number, serv_nombre_servicio: string){
        this.serv_id = serv_id;
        this.serv_nombre_servicio = serv_nombre_servicio;
    }
}