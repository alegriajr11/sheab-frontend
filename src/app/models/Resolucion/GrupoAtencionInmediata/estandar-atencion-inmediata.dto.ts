export class EstandarAtencionInmediataDto {
    atencion_id?: number;
    atencion_nombre_estandar: string;
    

    constructor(atencion_id: number, atencion_nombre_estandar: string){
        this.atencion_id = atencion_id;
        this.atencion_nombre_estandar = atencion_nombre_estandar;
    }
}