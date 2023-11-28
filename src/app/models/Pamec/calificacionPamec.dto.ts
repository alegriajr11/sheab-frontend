import { CriterioPam } from "./criteriopam.dto";
import { EvaluacionPamecDto } from "./evaluacionPamec.dto";

export class CalificacionPamecDto {
    cal_id?: number;
    cal_nota: number;
    cal_aplica: string;
    cal_observaciones: string;
    cal_asignado: string;

    cri_pam_id: number;
    eva_pam_id: number;

    criteriopam_calificacion: CriterioPam
    cal_evaluacion_pam: EvaluacionPamecDto
    

    constructor(cal_nota: number, cal_observaciones: string, cri_pam_id: number, eva_pam_id: number){
        this.cal_nota = cal_nota;
        this.cal_observaciones = cal_observaciones;
        this.cri_pam_id = cri_pam_id;
        this.eva_pam_id = eva_pam_id;
    }
}