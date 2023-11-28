export class SedesDto {
	sede_id?: number;
	sede_numero: string
	sede_nombre: string
	sede_gerente: string
	sede_principal: string
	sede_numero_principal: string
	sede_direccion: string
	sede_barrio: string
	sede_telefono: string
	sede_email: string
    sede_prestador: { pre_cod_habilitacion: string };
    sede_municipio: { sede_mun_id: number };

    constructor(
		sede_numero: string,
		sede_nombre: string,
		sede_gerente: string,
		sede_principal: string,
		sede_numero_principal: string,
		sede_direccion: string,
		sede_barrio: string,
		sede_telefono: string,
		sede_email: string,
        sede_prestador: { pre_cod_habilitacion: string },
        sede_municipio: { sede_mun_id: number },
    ) {
        this.sede_numero = sede_numero;
        this.sede_nombre = sede_nombre;
		this.sede_gerente = sede_gerente;
        this.sede_principal = sede_principal;
        this.sede_numero_principal = sede_numero_principal;
        this.sede_direccion = sede_direccion;
        this.sede_barrio = sede_barrio;
		this.sede_telefono = sede_telefono;
		this.sede_email = sede_email;
        this.sede_prestador = sede_prestador;
		this.sede_municipio = sede_municipio;
    }
}
