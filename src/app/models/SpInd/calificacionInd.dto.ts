import { CriterioIndDto } from "./criterioind.dto";
import { EvaluacionIndDto } from "./evaluacionInd.dto";

export class CalificacionIndDto {
    cal_id?: number;
    cal_nota: number;
    cal_observaciones: string;
    cal_asignado: string;

    cri_ind_id: number;
    eva_ind_id: number;

    criterio_cal: CriterioIndDto
    cal_evaluacion_independientes: EvaluacionIndDto
    

    constructor(cal_nota: number, cal_observaciones: string, cri_ind_id: number, eva_ind_id: number){
        this.cal_nota = cal_nota;
        this.cal_observaciones = cal_observaciones;
        this.cri_ind_id = cri_ind_id;
        this.eva_ind_id = eva_ind_id;
    }
}