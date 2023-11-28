import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ActapdfService } from '../services/Sic/actapdf.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class EditarActaSicGuard implements CanActivate {
  
  estadoActa: string

  constructor(private actaPdfService: ActapdfService,
    private router: Router) { }

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {
    const id = next.params['id'];
    // Obtener el estado actual del acta
    const data = await this.actaPdfService.oneActaSic(id).toPromise().then(data => {
      this.estadoActa = data.act_estado;
    })
    .catch(error => {
      if (error.status === 404) {
        this.router.navigate(['/sic/evaluaciones']);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.message
        });
      }
    });
    


    if (this.estadoActa === '1') {
      localStorage.setItem('boton-editar-acta-sic', 'true')
      return true;
    } else if(this.estadoActa === '0'){
      localStorage.setItem('boton-editar-acta-sic', 'false')
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Esa acta está cerrada; no tienes acceso a ella...'
      });
      this.router.navigate(['/sic/evaluaciones']);
      return false;
    } else {
      return false
    }
  }
  
}
