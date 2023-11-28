export class EvaluacionIpsDto {
    evips_id?: number;
    evips_nombre: string;


    constructor(evips_id: number, evips_nombre: string) {
        this.evips_id = evips_id;
        this.evips_nombre = evips_nombre
    }
}