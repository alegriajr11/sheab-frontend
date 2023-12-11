import { Component, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Usuario } from 'src/app/models/usuario';
import { ActaVerificacionService } from 'src/app/services/Resolucion/acta-verificacion.service';
import { SharedServiceService } from 'src/app/services/shared-service.service';

@Component({
  selector: 'app-editar-equipo-verificadores',
  templateUrl: './editar-equipo-verificadores.component.html',
  styleUrls: ['./editar-equipo-verificadores.component.css']
})
export class EditarEquipoVerificadoresComponent {

  id_usuario: number
  numero_acta: number

  usuarios_verificadores: Usuario

  listaVacia: any = undefined;

  searchText: any;
  public page!: number;

  @Input('dataFromParent') public modalRef: BsModalRef;

  constructor(
    public sharedService: SharedServiceService,
    private actaVerificacionService: ActaVerificacionService,
  ){}

  ngOnInit(): void {
    this.id_usuario = this.sharedService.id_usuario
    this.numero_acta = this.sharedService.id_acta_verificacion
  }

  // verificadoresAsignado() {
  //   this.actaVerificacionService.listarUsuarioAsignados(this.id_acta_verificacion).subscribe(
  //     data => {
  //       this.usuarios_verificadores = data
  //     },
  //     err => {
  //       this.listaVacia = err.error.message;
  //     }
  //   )
  // }
}
