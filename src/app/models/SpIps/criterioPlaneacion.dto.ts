export class PlaneacionDto {
    cri_pla_id?: number;
    cri_pla_nombre: string;
    cri_pla_verificacion: string;
    cri_pla_eva: {evips_id:number};


    constructor(cri_pla_id: number, cri_pla_nombre: string, cri_pla_verificacion: string, cri_pla_eva: {evips_id:number}) {
        this.cri_pla_id = cri_pla_id;
        this.cri_pla_nombre = cri_pla_nombre;
        this.cri_pla_verificacion =  cri_pla_verificacion;
        this.cri_pla_eva = cri_pla_eva
    }
}