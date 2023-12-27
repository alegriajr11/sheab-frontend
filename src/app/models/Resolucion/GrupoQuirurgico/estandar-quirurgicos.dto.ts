export class EstandarQuirurgicosDto {
    ext_id?: number;
    ext_nombre_estandar: string;
    

    constructor(ext_id: number, ext_nombre_estandar: string){
        this.ext_id = ext_id;
        this.ext_nombre_estandar = ext_nombre_estandar;
    }
}