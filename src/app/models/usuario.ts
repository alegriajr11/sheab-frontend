export class Usuario {

    usu_id?: number;
    usu_cedula: string;
    usu_nombre: string;
    usu_apellido: string;
    usu_cargo: string;
    usu_area_profesional: string
    usu_nombreUsuario: string;
    usu_password: string;
    usu_estado: string;
    usu_creado: Date;
    usu_firma: string
    resetPasswordToken: string
    roles: Rol[];


    constructor(usu_cedula: string,
        usu_nombre: string,
        usu_apellido: string,
        usu_cargo: string,
        usu_area_profesional: string,
        usu_nombreUsuario: string,
        usu_password: string,
        usu_estado: string,
        usu_firma: string,
        usu_creado: Date,
        resetPasswordToken: string,
        roles: Rol[]) {
        this.usu_cedula = usu_cedula;
        this.usu_nombre = usu_nombre;
        this.usu_apellido = usu_apellido;
        this.usu_cargo = usu_cargo;
        this.usu_area_profesional = usu_area_profesional
        this.usu_nombreUsuario = usu_nombreUsuario;
        this.usu_password = usu_password;
        this.usu_estado = usu_estado;
        this.usu_creado = usu_creado;
        this.usu_firma = usu_firma;
        this.resetPasswordToken = resetPasswordToken;
        this.roles = roles;
    }
}

// Definición de la interfaz Rol para representar la estructura de los objetos de rol
interface Rol {
    rol_id: number;
    rol_nombre: string;
}