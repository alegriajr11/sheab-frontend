export class RestablecerPasswordDto {

    resetPasswordToken: string;

    password: string

    constructor(resetPasswordToken: string, password: string){
        this.resetPasswordToken = resetPasswordToken
        this.password = password
    }
}