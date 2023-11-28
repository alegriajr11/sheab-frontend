export class CriterioSicEstandarDto {
    crie_id?: number;
    crie_nombre: string;
    
    

    constructor(crie_nombre: string){
        this.crie_nombre = crie_nombre;
    }
}