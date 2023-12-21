import { CriterioTodosServiciosDto } from "./criterio-todos-servicios.dto";

export class CumplimientoTodosServiciosDto {
    cumps_id?: number;
    cumps_cumple: string;
    cumps_hallazgo: string;
    
    //LLAVES FORANEAS DEL CUMPLIMIENTO
    cris_id: number;
    eva_ver_id: number;

    criterio_servicios: CriterioTodosServiciosDto

    constructor(cumps_cumple: string, cumps_hallazgo: string, cris_id: number, eva_ver_id: number){
        this.cumps_cumple = cumps_cumple;
        this.cumps_hallazgo = cumps_hallazgo;
        this.cris_id = cris_id;
        this.eva_ver_id = eva_ver_id;
    }
}
