export class ActaPamecDto {
    id?: number;
    act_id?: number;
    act_tipo_visita: string;
    //ATRIBUTOS CON TIPO VISITA:
    act_ano_formulacion: string;
    act_ciclo_mejoramiento: string;
    act_fecha_visita: string;
    act_municipio: string
    act_prestador: string
    act_nit: string;
    act_direccion: string
    act_barrio: string
    act_telefono: string
    act_email: string
    act_representante: string
    act_cod_prestador: string
    act_sede: string
    act_sede_barrio: string
    act_sede_direccion: string
    act_obj_visita: string
    act_nombre_funcionario1: string
    act_cargo_funcionario1: string
    act_firma_funcionario1: string
    act_id_funcionario1: number
    act_nombre_funcionario2: string
    act_cargo_funcionario2: string
    act_firma_funcionario2: string
    act_id_funcionario2: number
    act_nombre_prestador: string
    act_cargo_prestador: string
    act_firma_prestador: string
    

    act_estado: string;
    noFirmaActa: string;

    constructor(
        act_id: number,
        act_tipo_visita: string,
        act_ano_formulacion: string,
        act_ciclo_mejoramiento: string,
        act_fecha_visita: string,
        act_municipio: string,
        act_prestador: string,
        act_nit: string,
        act_direccion: string,
        act_barrio: string,
        act_telefono: string,
        act_email: string,
        act_representante: string,
        act_cod_prestador: string,
        act_sede: string,
        act_sede_barrio: string,
        act_sede_direccion: string,
        act_obj_visita: string,
        act_nombre_funcionario1: string,
        act_cargo_funcionario1: string,
        act_firma_funcionario1: string,
        act_id_funcionario1: number,
        act_nombre_funcionario2: string,
        act_cargo_funcionario2: string,
        act_firma_funcionario2: string,
        act_id_funcionario2: number,
        act_nombre_prestador: string,
        act_cargo_prestador: string,
        act_firma_prestador: string

    ) {
        this.act_id = act_id
        this.act_tipo_visita = act_tipo_visita
        this.act_ano_formulacion = act_ano_formulacion
        this.act_ciclo_mejoramiento = act_ciclo_mejoramiento
        this.act_fecha_visita = act_fecha_visita
        this.act_municipio = act_municipio
        this.act_prestador = act_prestador
        this.act_nit = act_nit
        this.act_direccion = act_direccion
        this.act_barrio = act_barrio
        this.act_telefono = act_telefono
        this.act_email = act_email
        this.act_representante = act_representante
        this.act_cod_prestador = act_cod_prestador
        this.act_sede = act_sede
        this.act_sede_barrio = act_sede_barrio
        this.act_sede_direccion = act_sede_direccion
        this.act_obj_visita = act_obj_visita
        this.act_nombre_funcionario1 = act_nombre_funcionario1
        this.act_cargo_funcionario1 = act_cargo_funcionario1
        this.act_firma_funcionario1 = act_firma_funcionario1
        this.act_id_funcionario1 = act_id_funcionario1
        this.act_nombre_funcionario2 = act_nombre_funcionario2
        this.act_cargo_funcionario2 = act_cargo_funcionario2
        this.act_firma_funcionario2 = act_firma_funcionario2
        this.act_id_funcionario2 = act_id_funcionario2
        this.act_nombre_prestador = act_nombre_prestador
        this.act_cargo_prestador = act_cargo_prestador
        this.act_firma_prestador = act_firma_prestador
    }
}
