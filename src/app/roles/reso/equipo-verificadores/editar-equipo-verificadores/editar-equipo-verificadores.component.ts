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

  usu_nombre: string
  usu_apellido: string

  id_usuario: number
  id_acta_verificacion: number

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
    this.id_acta_verificacion = this.sharedService.id_acta_verificacion

    setTimeout(() => {
      this.inicializarMetodos();
    });
  }

  inicializarMetodos(){
    this.verificadoresAsignado();
  }

  eliminarUsuarioAsignado(){
    
  }

  verificadoresAsignado() {
    this.actaVerificacionService.listaUsuarioAsignado(this.id_acta_verificacion, this.id_usuario).subscribe(
      data => {
        this.usuarios_verificadores = data
        this.usu_nombre = this.usuarios_verificadores.usu_nombre
        this.usu_apellido = this.usuarios_verificadores.usu_apellido
      },
      err => {
        this.listaVacia = err.error.message;
      }
    )
  }
}
