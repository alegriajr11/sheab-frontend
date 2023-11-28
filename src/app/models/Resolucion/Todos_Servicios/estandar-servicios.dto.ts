export class TodosServiciosDto {
    tod_id?: number;
    tod_nombre_estandar: string;
    

    constructor(tod_id: number, tod_nombre_estandar: string){
        this.tod_id = tod_id;
        this.tod_nombre_estandar = tod_nombre_estandar;
    }
}