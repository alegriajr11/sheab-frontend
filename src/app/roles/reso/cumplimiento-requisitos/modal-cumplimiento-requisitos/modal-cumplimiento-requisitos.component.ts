import { Component, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { CumplimientoCondicionesHabilitacionDto } from 'src/app/models/Resolucion/CondicionesHabilitacion/cumplimiento-condiciones.dto';
import { SharedServiceService } from 'src/app/services/shared-service.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-modal-cumplimiento-requisitos',
  templateUrl: './modal-cumplimiento-requisitos.component.html',
  styleUrls: ['./modal-cumplimiento-requisitos.component.css']
})
export class ModalCumplimientoRequisitosComponent {

  cumplimientoCondiciones: CumplimientoCondicionesHabilitacionDto

  cumpl_estado: string

  //VARIABLES PARA ALMACENAR LAS CODICIONES DE HABILITACION DEL SERVICIO COMPARTIDO
  nombre_condicion_habilitacion: string
  id_condicion_habilitacion: number


  @Input('dataFromParent') public modalRef: BsModalRef;


  constructor(
    private toastrService: ToastrService,
    private sharedService: SharedServiceService,
    private tokenService: TokenService,
  ){}

  ngOnInit(): void {
    this.nombre_condicion_habilitacion = this.sharedService.nombre_condicion_habilitacion;
    this.id_condicion_habilitacion = this.sharedService.id_condicion_hablitacion
  }

  onRegister(){

  }
}
