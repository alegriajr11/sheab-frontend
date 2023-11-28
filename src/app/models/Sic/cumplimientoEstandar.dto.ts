export class CumplimientoSicEstandarDto {
    cumpl_id?: number;
    cumpl_cumple: string;
    cumpl_observaciones: string;
    cumpl_asignado: string;
    crie_id: number;
    eva_id: number;
    

    constructor(cumpl_cumple: string, cumpl_observaciones: string, crie_id: number, eva_id: number){
        this.cumpl_cumple = cumpl_cumple;
        this.cumpl_observaciones = cumpl_observaciones;
        this.crie_id = crie_id;
        this.eva_id = eva_id
    }
}