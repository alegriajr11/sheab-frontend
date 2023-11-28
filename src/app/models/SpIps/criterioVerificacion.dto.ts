export class VerificacionDto {
    cri_ver_id?: number;
    cri_ver_nombre: string;
    cri_ver_verificacion: string;
    cri_ver_eva: {evips_id:number};


    constructor(cri_ver_id: number, cri_ver_nombre: string, cri_ver_verificacion: string, cri_ver_eva: {evips_id:number}) {
        this.cri_ver_id = cri_ver_id;
        this.cri_ver_nombre = cri_ver_nombre;
        this.cri_ver_verificacion =  cri_ver_verificacion;
        this.cri_ver_eva = cri_ver_eva
    }
}