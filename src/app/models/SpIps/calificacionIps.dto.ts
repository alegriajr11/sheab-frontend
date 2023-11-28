import { AjusteDto } from "./criterioAjuste.dto";
import { ImplementacionDto } from "./criterioImplementacion.dto";
import { PlaneacionDto } from "./criterioPlaneacion.dto";
import { VerificacionDto } from "./criterioVerificacion.dto";

export class CalificacionIpsDto {
    cal_id?: number;
    cal_nota: number;
    cal_observaciones: string;
    cal_asignado: string;

    cri_ips_id: number;
    eva_ips_id: number;
    acta_ips: number;

    calificacionipsAjuste: AjusteDto
    calificacionipsImpl: ImplementacionDto
    calificacionipsPlaneacion: PlaneacionDto
    calificacionipsVerif: VerificacionDto


    constructor(cal_nota: number, cal_observaciones: string, cri_ips_id: number, eva_ips_id: number, acta_ips: number){
        this.cal_nota = cal_nota;
        this.cal_observaciones = cal_observaciones;
        this.cri_ips_id = cri_ips_id;
        this.eva_ips_id = eva_ips_id;
        this.acta_ips = acta_ips
    }
}