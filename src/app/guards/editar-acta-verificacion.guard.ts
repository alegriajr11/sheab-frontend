import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ActaVerificacionService } from '../services/Resolucion/acta-verificacion.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class EditarActaVerificacionGuard implements CanActivate {

  estadoActa: string

  constructor(
    private actaVerificacionService: ActaVerificacionService,
    private router: Router) { }

    async canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Promise<boolean> {
      const id = next.params['id'];
      // Obtener el estado actual del acta
      const data = await this.actaVerificacionService.oneActaVerificacion(id).toPromise().then(data => {
        this.estadoActa = data.act_estado;
      })
      .catch(error => {
        if (error.status === 404) {
          this.router.navigate(['/reso/informe']);
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.message
          });
        }
      });
      
  
  
      if (this.estadoActa === '1') {
        localStorage.setItem('boton-editar-acta-verificacion', 'true')
        return true;
      } else if(this.estadoActa === '0'){
        localStorage.setItem('boton-editar-acta-verificacion', 'false')
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Esa acta está cerrada; no tienes acceso a ella...'
        });
        this.router.navigate(['/reso/informe']);
        return false;
      } else {
        return false
      }
    }
    
  
}
