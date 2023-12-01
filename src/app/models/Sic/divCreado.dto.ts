export class DivCreadoDto {
    div_id?: number;
    div_numero_clones: number;
    div_dominio: string;
    div_indicador: string;

    div_id_dominio: number
    div_id_indicador: number
    div_creado_eva: {eva_id:number};
    

    constructor(
        div_numero_clones: number, 
        div_dominio: string, 
        div_indicador: string,
        div_id_dominio: number,
        div_id_indicador: number,
        div_creado_eva: {eva_id:number}){
        this.div_numero_clones = div_numero_clones;
        this.div_dominio = div_dominio;
        this.div_indicador = div_indicador;
        this.div_id_dominio = div_id_dominio;
        this.div_id_indicador = div_id_indicador;
        this.div_creado_eva = div_creado_eva;
    }
}