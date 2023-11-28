export class AjusteDto {
    cri_aju_id?: number;
    cri_aju_nombre: string;
    cri_aju_verificacion: string;
    cri_aju_eva: {evips_id:number};


    constructor(cri_aju_id: number, cri_aju_nombre: string, cri_aju_verificacion: string, cri_aju_eva: {evips_id:number}) {
        this.cri_aju_id = cri_aju_id;
        this.cri_aju_nombre = cri_aju_nombre;
        this.cri_aju_verificacion =  cri_aju_verificacion;
        this.cri_aju_eva = cri_aju_eva
    }
}