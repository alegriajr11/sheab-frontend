export class NuevoUsuarioDto {
    usu_cedula: string;

    usu_nombre: string;

    usu_apellido: string;

    usu_cargo: string;

    usu_area_profesional: string

    usu_email: string;

    usu_nombreUsuario: string;

    usu_password: string;

    usu_firma: string;

    usu_estado: string;


    constructor(usu_cedula: string,
        usu_nombre:string, 
        usu_apellido:string,
        usu_cargo: string,
        usu_area_profesional: string,
        usu_email: string, 
        usu_nombreUsuario: string, 
        usu_password: string,
        usu_firma: string, 
        usu_estado: string){
        this.usu_cedula = usu_cedula;
        this.usu_nombre = usu_nombre;
        this.usu_apellido = usu_apellido;
        this.usu_cargo = usu_cargo;
        this.usu_area_profesional = usu_area_profesional;
        this.usu_email = usu_email;
        this.usu_nombreUsuario = usu_nombreUsuario;
        this.usu_password = usu_password;
        this.usu_firma =  usu_firma;
        this.usu_estado =  usu_estado;
    }
}
