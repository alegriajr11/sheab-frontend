export class EstandarApoyoDiagnosticoDto {
    apoyo_id?: number;
    apoyo_nombre_estandar: string;
    

    constructor(apoyo_id: number, apoyo_nombre_estandar: string){
        this.apoyo_id = apoyo_id;
        this.apoyo_nombre_estandar = apoyo_nombre_estandar;
    }
}