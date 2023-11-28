import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class ButtonGuard implements CanActivate {


    constructor(private router: Router) { }

    canActivate(): boolean {
        const nombrePrestadorInd = localStorage.getItem('nombre-pres-sp-ind')
        const nombrePrestadorSic = localStorage.getItem('nombre-pres-sic')
        const nombrePrestadorIps = localStorage.getItem('nombre-pres-sp-ips')
        const nombrePrestadorPamec = localStorage.getItem('nombre-pres-pamec')
        const nombrePrestadorVerificacion = localStorage.getItem('nombre-pres-verificacion')
        if (localStorage.getItem('boton-acta-sic') === 'true' && nombrePrestadorSic) {
            return true;
        }if (localStorage.getItem('boton-acta-sp-ips') === 'true' && nombrePrestadorIps) {
            return true;
        }if (localStorage.getItem('boton-acta-sp-ind') === 'true' && nombrePrestadorInd) {
            return true;
        }
        if (localStorage.getItem('boton-acta-pamec') === 'true' && nombrePrestadorPamec) {
            return true;
        }
        if (localStorage.getItem('boton-acta-verificacion') === 'true' && nombrePrestadorVerificacion) {
            return true;
        }
        if(localStorage.getItem('boton-editar-acta-sic') === 'true'){
            return true
        }
        if(localStorage.getItem('boton-editar-acta-sp-ips') === 'true'){
            return true
        }
        if(localStorage.getItem('boton-editar-acta-sp-ind') === 'true'){
            return true
        }
        if(localStorage.getItem('boton-editar-acta-pamec') === 'true'){
            return true
        }
        if(localStorage.getItem('boton-editar-evaluacion-sp-ips') === 'true'){
            return true
        }
        if(localStorage.getItem('boton-editar-evaluacion-sp-ind') === 'true'){
            return true
        }
        if(localStorage.getItem('boton-editar-evaluacion-pamec') === 'true'){
            return true
        }

        else {
            this.router.navigate(['/']);
            return false;
        }
    }
}