export class CriterioPam {
    crip_id?: number;
    crip_nombre: string;
    crip_desarrollo_etapas: string

    constructor(crip_nombre: string, crip_desarrollo_etapas: string){
        this.crip_nombre = crip_nombre;
        this.crip_desarrollo_etapas = crip_desarrollo_etapas;
    }
}