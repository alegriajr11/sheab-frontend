export class Actividad {
    act_id?: number;
    act_nombre: string;
    

    constructor(act_id: number, act_nombre: string){
        this.act_id = act_id;
        this.act_nombre = act_nombre;
    }
}