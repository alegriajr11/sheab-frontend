export class CriterioIndDto {
    cri_id?: number;
    cri_nombre: string;
    cri_verificacion: string;

    

    constructor(cri_nombre: string, cri_verificacion: string){
        this.cri_nombre = cri_nombre;
        this.cri_verificacion = cri_verificacion

    }
}