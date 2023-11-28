import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EditarPrestadorDto } from 'src/app/models/editar-prestador-dto';
import { PrestadorDto } from 'src/app/models/prestador.dto';
import { PrestadorService } from 'src/app/services/prestador.service';

@Component({
  selector: 'app-editar-prestador',
  templateUrl: './editar-prestador.component.html',
  styleUrls: ['./editar-prestador.component.css']
})
export class EditarPrestadorComponent {

  prestador: PrestadorDto = null;

  constructor(
    private prestadorService: PrestadorService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.queryParams['id'];
    this.prestadorService.listaOne(id).subscribe(
      data => {
        this.prestador = data;
        
      },
      err => {
        this.toastr.error(err.error.message, 'Fail', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
        this.router.navigate(['/']);
      }
    );
  }


  onUpdate(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    this.prestadorService.update(id, this.prestador).subscribe(
      data => {
        this.toastr.success(data.message, 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.router.navigate(['/prestadores']);
      },
      err => {
        this.toastr.error(err.error.message, 'Fail', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
      }
    );
  }

  volver(): void {
    this.router.navigate(['/prestadores']);
  }

}
