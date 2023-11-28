export class CumplimientoSicDto {
    cumpl_id?: number;
    cumpl_cumple: string;
    cri_id: number;
    cumpl_observaciones: string;
    ind_id: string;
    

    constructor(cumpl_cumple: string, cri_id: number, cumpl_observaciones: string, ind_id: string){
        this.cumpl_cumple = cumpl_cumple;
        this.cumpl_observaciones = cumpl_observaciones;
        this.cri_id = cri_id;
        this.ind_id = ind_id;
    }
}