export class Indicador {
    ind_id?: string;
    ind_nombre: string;
    ind_dominio: {dom_id:number};
    

    constructor(ind_id: string, ind_nombre: string, ind_dominio: {dom_id:number}){
        this.ind_id = ind_id;
        this.ind_nombre = ind_nombre;
        this.ind_dominio = ind_dominio;
    }
}