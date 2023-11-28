export class DatosVerificadosDto {

    dat_encontrado_direccion: string
    dat_encontrado_telefono: string
    dat_encontrado_correo: string
    act_observaciones: string

    constructor(
        dat_encontrado_direccion: string,
        dat_encontrado_telefono: string,
        dat_encontrado_correo: string,
        act_observaciones: string
    ) {
        this.dat_encontrado_direccion = dat_encontrado_direccion
        this.dat_encontrado_telefono = dat_encontrado_telefono
        this.dat_encontrado_correo = dat_encontrado_correo
        this.act_observaciones = act_observaciones
    }
}