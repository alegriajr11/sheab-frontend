export class CumplimientoCondicionesHabilitacionDto {
    cumpl_id?: number;
    cumpl_estado: string;

    constructor(cumpl_estado: string){
        this.cumpl_estado = cumpl_estado
    }
}