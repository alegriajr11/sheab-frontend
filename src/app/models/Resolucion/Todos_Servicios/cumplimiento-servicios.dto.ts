export class CumplimientoTodosServiciosDto {
    cumps_id?: number;
    cumps_cumple: string;
    cumps_hallazgo: string;
    
    //LLAVES FORANEAS DEL CUMPLIMIENTO
    cris_id: number;
    eva_ver_id: number;

    constructor(cumps_cumple: string, cumps_hallazgo: string, cris_id: number, eva_ver_id: number){
        this.cumps_cumple = cumps_cumple;
        this.cumps_hallazgo = cumps_hallazgo;
        this.cris_id = cris_id;
        this.eva_ver_id = eva_ver_id;
    }
}
