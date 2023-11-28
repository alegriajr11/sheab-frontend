export class ImplementacionDto {
    cri_imp_id?: number;
    cri_imp_nombre: string;
    cri_imp_verificacion: string;
    cri_imp_eva: {evips_id:number};


    constructor(cri_imp_id: number, cri_imp_nombre: string, cri_imp_verificacion: string, cri_imp_eva: {evips_id:number}) {
        this.cri_imp_id = cri_imp_id;
        this.cri_imp_nombre = cri_imp_nombre;
        this.cri_imp_verificacion =  cri_imp_verificacion;
        this.cri_imp_eva = cri_imp_eva
    }
}