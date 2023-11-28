import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ActapdfService } from '../services/Sic/actapdf.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class EditarActaPamecGuard implements CanActivate {

  estadoActa: string

  constructor(private actaPdfService: ActapdfService,
    private router: Router) { }

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {
    const id = next.params['id'];
    // Obtener el estado actual del acta
    const data = await this.actaPdfService.oneActaPamec(id).toPromise().then(data => {
      this.estadoActa = data.act_estado;
    })
    .catch(error => {
      if (error.status === 404) {
        this.router.navigate(['/pamec/evaluaciones']);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.message
        });
      }
    });
    


    if (this.estadoActa === '1') {
      localStorage.setItem('boton-editar-acta-pamec', 'true')
      return true;
    } else if(this.estadoActa === '0'){
      localStorage.setItem('boton-editar-acta-pamec', 'false')
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Esa acta está cerrada; no tienes acceso a ella...'
      });
      this.router.navigate(['/pamec/evaluaciones']);
      return false;
    } else {
      return false
    }
  }
  
}
