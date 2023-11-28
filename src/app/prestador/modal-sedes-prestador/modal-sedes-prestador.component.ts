import { Component, Input, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { PrestadorDto } from 'src/app/models/prestador.dto';
import { PrestadorService } from 'src/app/services/prestador.service';
import { SedesPrestadorService } from 'src/app/services/sedes-prestador.service';
import { SharedServiceService } from 'src/app/services/shared-service.service';

@Component({
  selector: 'app-modal-sedes-prestador',
  templateUrl: './modal-sedes-prestador.component.html',
  styleUrls: ['./modal-sedes-prestador.component.css']
})
export class ModalSedesPrestadorComponent {

  @Input('dataFromParent') public modalRef: BsModalRef;


  prestador: PrestadorDto = null;
  sedesPrestador: any[] = [];

  nombre_prestador: string
  pre_cod_habilitacion: string

  constructor(
    private prestadorService: PrestadorService,
    public sharedService: SharedServiceService,
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService,
    private sedePrestadorService: SedesPrestadorService,
    private router: Router
  ) { }


  ngOnInit(): void {
    this.nombre_prestador = this.sharedService.pres_nombre
    this.pre_cod_habilitacion = this.sharedService.pre_cod_habilitacion
    
    this.sedePrestadorService.listaSedesNombre(this.pre_cod_habilitacion).subscribe(
      data => {
        this.sedesPrestador = data;
        console.log(data)
      },
      err => {
        this.toastrService.error(err.error.message, 'Fail', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
        this.modalRef.hide()
      }
    )
  }


  rutaAgregarSede(){
    this.router.navigate(['/prestadores/sede/nueva'])
    this.modalRef.hide()
  }

}
