export class ServicioConsultaExternaDto {
    serv_id?: number;
    serv_nombre_estandar: string;
    

    constructor(serv_id: number, serv_nombre_estandar: string){
        this.serv_id = serv_id;
        this.serv_nombre_estandar = serv_nombre_estandar;
    }
}