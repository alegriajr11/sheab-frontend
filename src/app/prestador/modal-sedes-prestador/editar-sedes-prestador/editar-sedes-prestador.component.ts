import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-editar-sedes-prestador',
  templateUrl: './editar-sedes-prestador.component.html',
  styleUrls: ['./editar-sedes-prestador.component.css']
})
export class EditarSedesPrestadorComponent {

  probando: string

  constructor(
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    this.probando = this.activatedRoute.snapshot.params['id'];
    // this.prestadorService.listaOne(id).subscribe(
    //   data => {
    //     this.prestador = data;
        
    //   },
    //   err => {
    //     this.toastr.error(err.error.message, 'Fail', {
    //       timeOut: 3000,  positionClass: 'toast-top-center',
    //     });
    //     this.router.navigate(['/']);
    //   }
    // );
  }

}
