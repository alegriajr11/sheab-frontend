import { Component, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { CumplimientoTodosServiciosDto } from 'src/app/models/Resolucion/Todos_Servicios/cumplimiento-servicios.dto';
import { TokenDto } from 'src/app/models/token.dto';
import { TodosServiciosService } from 'src/app/services/Resolucion/Todos-Servicios/todos-servicios.service';
import { SharedServiceService } from 'src/app/services/shared-service.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-modal-cumplimiento-todos-servicios',
  templateUrl: './modal-cumplimiento-todos-servicios.component.html',
  styleUrls: ['./modal-cumplimiento-todos-servicios.component.css']
})
export class ModalCumplimientoTodosServiciosComponent {

  cumplimientoCriterioServicios: CumplimientoTodosServiciosDto = null
  cumps_id: number;
  cumps_cumple: string;
  cumps_hallazgo: string;

  cris_id: number;
  eva_id: number

  isEditing: boolean

  @Input('dataFromParent') public modalRef: BsModalRef;

  constructor(
    public sharedService: SharedServiceService,
    private tokenService: TokenService,
    private toastrService: ToastrService,
    private todosServicios: TodosServiciosService
  ) { }

  ngOnInit(): void {
    this.obtenerIdCriterioEvaluacion();
    this.obtenerCumplimientoByEvaluacion();
  }

  //
  obtenerIdCriterioEvaluacion() {
    this.cris_id = this.sharedService.cris_id
    this.eva_id = this.sharedService.id_evaluacion_verificacion
  }

  //OBTENER EL CUMPLIMIENTO DE ESA EVALUACIÓN SI ES QUE EXISTE
  obtenerCumplimientoByEvaluacion() {
    //SOLICITUD PARA OBTENER EL CUMPLIMIENTO QUE LE PERTENECE A LA EVALUACIÓN Y AL CRITERIO CON SU ID
    setTimeout(() => {
      //SOLICITUD PARA OBTENER LA CALIFICACIÓN QUE LE PERTENECE A LA EVALUACIÓN Y AL CRITERIO CON SU ID
      this.todosServicios.getCriterioByEvaluacion(this.cris_id, this.eva_id).subscribe(
        async data => {
          this.cumplimientoCriterioServicios = data
          if (data && data.cumps_id) {
            this.cumps_id = data.cumps_id
            this.cumps_cumple = data.cumps_cumple
            this.cumps_hallazgo = data.cumps_hallazgo
            //HABILITAR EDICIÓN
            this.isEditing = true
          } else {
            //HABILITAR CREACIÓN DE CALIFICACIÓN
            this.isEditing = false
          }
        },
        err => {
          //MANEJO DE ERROR SI NO EXISTE CALIFICACIÓN
          this.toastrService.error(err.error.message, 'Fail', {
            timeOut: 3000, positionClass: 'toast-top-center',
          });
        }
      )
    });
  }

  async onRegister(): Promise<void> {

    //SOLICITUD UPDATE DE CALIFICACIÓN SI isEditing ES TRUE
    if (this.isEditing) {
      const calificacionActualizada = new CumplimientoTodosServiciosDto(
        this.cumps_cumple,
        this.cumps_hallazgo,
        this.cris_id,
        this.eva_id
      );
      //OBTENER EL TOKEN DEL USUARIO QUE ESTÁ EDITANDO EL CUMPLIMIENTO
      const token = this.tokenService.getToken()
      //ASIGNANDO TOKEN A LA CLASE DTO - TOKENDTO
      const tokenDto: TokenDto = new TokenDto(token);

      this.todosServicios.update(this.cumps_id, calificacionActualizada, tokenDto).subscribe(
        data => {
          this.toastrService.success(data.message, 'OK', {
            timeOut: 3000, positionClass: 'toast-top-center'
          });
          this.modalRef.hide();
        },
        err => {
          this.toastrService.error(err.error.message, 'Fail', {
            timeOut: 3000, positionClass: 'toast-top-center',
          });
        }
      )
    }
    //SOLICITUD CREAR CUMPLIMIENTO SI NO EXISTE
    else {
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

      this.todosServicios.createCumplimientoServicios(this.cumplimientoCriterioServicios, tokenDto).subscribe(
        async (data) => {
          this.toastrService.success(data.message, 'Ok', {
            timeOut: 3000,
            positionClass: 'toast-top-center',
          });
          //ENVIAR POR EL SERVICIO COMPARTIDO LOS ID AGREGADOS A LA BASE DE DATOS
          this.sharedService.criteriosTodosServiciosGuardados.push(this.cris_id)

          //CERRAR EL MODAL
          this.modalRef.hide();
        },

        (err) => {
          //MANEJAR EL ERROR SI NO HAY EXITO AL CREAR CUMPLIMIENTO
          this.toastrService.error(err.error.message, 'Error', {
            timeOut: 3000,
            positionClass: 'toast-top-center',
          });
        }
      );
    }
  }
}
