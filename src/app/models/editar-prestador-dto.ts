export class EditarPrestadorDto {
    pre_cod_habilitacion?: string;
    pre_nombre: string;
    pre_nit: string;
    pre_direccion: string;
    pre_telefono: string;
    pre_email: string;
    pre_habilitado: string;
    pre_representante: string;

    constructor(
        pre_cod_habilitacion: string,
        pre_nombre: string,
        pre_nit: string,
        pre_direccion: string,
        pre_telefono: string,
        pre_email: string,
        pre_habilitado: string,
        pre_representante: string,

    ) {
        this.pre_cod_habilitacion = pre_cod_habilitacion;
        this.pre_nombre = pre_nombre;
        this.pre_nit = pre_nit;
        this.pre_direccion = pre_direccion;
        this.pre_telefono = pre_telefono;
        this.pre_email = pre_email;
        this.pre_habilitado = pre_habilitado;
        this.pre_representante = pre_representante;

    }
}
