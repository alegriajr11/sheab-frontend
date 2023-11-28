import { Usuario } from "../usuario";

export class ActaVerificacionDto {
	id?: number;
    act_id?: number;
    act_visita_previa: string;
    act_visita_seguimiento: string;
    act_visita_reactivacion: string;
    act_fecha_inicio: string;
    act_fecha_final: string;
    act_municipio: string;
    act_prestador: string;
    act_nit: string;
    act_direccion: string
    act_telefono: string
    act_correo: string
    act_representante: string
    act_gerente: string
    act_cod_habilitacion: string
    act_sede: string
    act_tipo_prestador: string
    act_cod_sede: string
    act_observaciones: string
    act_firma_prestador: string
    act_funcionario_prestador: string
    act_cargo_prestador: string

    act_estado: string;

    verificacion_usuario: Usuario

    constructor(
        act_id: number,
        act_visita_previa: string,
        act_visita_seguimiento: string,
        act_visita_reactivacion: string,
        act_fecha_inicio: string,
        act_fecha_final: string,
        act_municipio: string,
        act_prestador: string,
        act_nit: string,
        act_direccion: string,
        act_telefono: string,
        act_correo: string,
        act_representante: string,
        act_gerente: string,
        act_cod_habilitacion: string,
        act_sede: string,
        act_tipo_prestador: string,
        act_cod_sede: string,
        act_observaciones: string,
        act_firma_prestador: string,
        act_funcionario_prestador: string,
        act_cargo_prestador: string,
    ) {
        this.act_id = act_id
        this.act_visita_previa = act_visita_previa
        this.act_visita_seguimiento = act_visita_seguimiento
        this.act_visita_reactivacion = act_visita_reactivacion
        this.act_fecha_inicio = act_fecha_inicio
        this.act_fecha_final = act_fecha_final
        this.act_municipio = act_municipio
        this.act_prestador = act_prestador
        this.act_nit = act_nit
        this.act_direccion = act_direccion
        this.act_telefono = act_telefono
        this.act_correo = act_correo
        this.act_representante = act_representante
        this.act_gerente = act_gerente
        this.act_cod_habilitacion = act_cod_habilitacion
        this.act_sede = act_sede
        this.act_tipo_prestador = act_tipo_prestador
        this.act_cod_sede = act_cod_sede
        this.act_observaciones = act_observaciones
        this.act_firma_prestador = act_firma_prestador
        this.act_funcionario_prestador = act_funcionario_prestador
        this.act_cargo_prestador = act_cargo_prestador
    }
}

