export class ActaSpIndPdfDto {
    id?: number;
    act_id?: number;
    act_visita_inicial: string;
    act_visita_seguimiento: string;
    act_fecha_inicial: string;
    act_fecha_final: string;
    act_municipio: string;
    act_prestador: string;
    act_nit: string;
    act_direccion: string
    act_barrio: string
    act_telefono: string
    act_email: string
    act_representante: string
    act_cod_prestador: string
    act_obj_visita: string
    act_id_funcionario: number
    act_nombre_funcionario: string
    act_cargo_funcionario: string
    act_firma_funcionario: string
    act_nombre_prestador: string
    act_cargo_prestador: string
    act_firma_prestador: string

    act_estado: string;

    //CONTROLAR RECIBE O FIRMA
    act_recibe_visita: string;
    noFirmaActa: string

    constructor(
        act_id: number,
        act_visita_inicial: string,
        act_visita_seguimiento: string,
        act_fecha_inicial: string,
        act_fecha_final: string,
        act_municipio: string,
        act_prestador: string,
        act_nit: string,
        act_direccion: string,
        act_barrio: string,
        act_telefono: string,
        act_email: string,
        act_representante: string,
        act_cod_prestador: string,
        act_obj_visita: string,
        act_id_funcionario: number,
        act_nombre_funcionario: string,
        act_cargo_funcionario: string,
        act_firma_funcionario: string,
        act_nombre_prestador: string,
        act_cargo_prestador: string,
        act_firma_prestador: string,
        noFirmaActa: string
    ){
        this.act_id = act_id
        this.act_visita_inicial = act_visita_inicial
        this.act_visita_seguimiento = act_visita_seguimiento
        this.act_fecha_inicial = act_fecha_inicial
        this.act_fecha_final = act_fecha_final
        this.act_municipio = act_municipio
        this.act_prestador = act_prestador
        this.act_nit = act_nit
        this.act_direccion = act_direccion
        this.act_barrio = act_barrio
        this.act_telefono = act_telefono
        this.act_email = act_email
        this.act_representante = act_representante
        this.act_cod_prestador = act_cod_prestador
        this.act_obj_visita = act_obj_visita
        this.act_id_funcionario = act_id_funcionario
        this.act_nombre_funcionario = act_nombre_funcionario
        this.act_cargo_funcionario = act_cargo_funcionario
        this.act_firma_funcionario = act_firma_funcionario
        this.act_nombre_prestador = act_nombre_prestador
        this.act_cargo_prestador = act_cargo_prestador
        this.act_firma_prestador = act_firma_prestador
        this.noFirmaActa = noFirmaActa 
    }
}