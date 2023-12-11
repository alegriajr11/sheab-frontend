import { Component, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { CumplimientoTodosServiciosDto } from 'src/app/models/Resolucion/Todos_Servicios/cumplimiento-servicios.dto';
import { TokenDto } from 'src/app/models/token.dto';
import { SharedServiceService } from 'src/app/services/shared-service.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-modal-cumplimiento-todos-servicios',
  templateUrl: './modal-cumplimiento-todos-servicios.component.html',
  styleUrls: ['./modal-cumplimiento-todos-servicios.component.css']
})
export class ModalCumplimientoTodosServiciosComponent {

  cumplimientoCriterioServicios: CumplimientoTodosServiciosDto = null
  cumps_cumple: string;
  cumps_hallazgo: string;

  cris_id: number;
  eva_id: number

  @Input('dataFromParent') public modalRef: BsModalRef;

  constructor(
    public sharedService: SharedServiceService,
    private tokenService: TokenService,
  ) { }

  ngOnInit(): void {
    this.obtenerIdCriterioEvaluacion()
  }

  //
  obtenerIdCriterioEvaluacion() {
    this.cris_id = this.sharedService.cris_id
    this.eva_id = this.sharedService.id_evaluacion_verificacion
  }

  async onRegister(): Promise<void> {
    this.cumplimientoCriterioServicios = new CumplimientoTodosServiciosDto(
      this.cumps_cumple,
      this.cumps_hallazgo,
      this.cris_id,
      this.eva_id
    );

    //OBTENER EL TOKEN DEL USUARIO QUE ESTÁ REGISTRANDO EL CUMPLIMIENTO
    const token = this.tokenService.getToken()
    //ASIGNANDO TOKEN A LA CLASE DTO - TOKENDTO
    const tokenDto: TokenDto = new TokenDto(token);

    console.log(this.cumplimientoCriterioServicios)
  }
}
