export class EtapaDto {
    eta_id?: number;
    eta_nombre: string;
    

    constructor(eta_id: number, eta_nombre: string){
        this.eta_id = eta_id;
        this.eta_nombre = eta_nombre;
    }
}