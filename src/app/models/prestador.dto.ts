export class PrestadorDto {
    pre_cod_habilitacion?: string;
    pre_nombre: string;
    pre_nit: string;
    pre_direccion: string;
    pre_telefono: string;
    pre_email: string;
    pre_habilitado: string;
    pre_clasificacion: { cla_id: number };
    pre_representante: string;
    pre_clase: { clas_id: number };
    pre_tipo: { tip_id: number };
    pre_municipio: { mun_id: number };

    constructor(
        pre_cod_habilitacion: string,
        pre_nombre: string,
        pre_nit: string,
        pre_direccion: string,
        pre_telefono: string,
        pre_email: string,
        pre_habilitado: string,
        pre_clasificacion: { cla_id: number },
        pre_representante: string,
        pre_clase: { clas_id: number },
        pre_tipo: { tip_id: number },
        pre_municipio: { mun_id: number }
    ) {
        this.pre_cod_habilitacion = pre_cod_habilitacion;
        this.pre_nombre = pre_nombre;
        this.pre_nit = pre_nit;
        this.pre_direccion = pre_direccion;
        this.pre_telefono = pre_telefono;
        this.pre_email = pre_email;
        this.pre_habilitado = pre_habilitado;
        this.pre_clasificacion = pre_clasificacion;
        this.pre_representante = pre_representante;
        this.pre_clase = pre_clase;
        this.pre_tipo = pre_tipo;
        this.pre_municipio = pre_municipio;
    }
}
