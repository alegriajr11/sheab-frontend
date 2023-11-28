import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { CalificacionIndDto } from 'src/app/models/SpInd/calificacionInd.dto';
import { TokenDto } from 'src/app/models/token.dto';
import { CalificacionIndService } from 'src/app/services/SpInd/calificacion-ind.service';
import { SharedServiceService } from 'src/app/services/shared-service.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-modal-editar-cumplimiento-sp-ind',
  templateUrl: './modal-editar-cumplimiento-sp-ind.component.html',
  styleUrls: ['./modal-editar-cumplimiento-sp-ind.component.css']
})
export class ModalEditarCumplimientoSpIndComponent {

  calificacionInd: CalificacionIndDto = null
  cal_id: number;
  cal_nota: number;
  cal_observaciones: string;
  cal_asignado: string

  //IDS CRITERIO Y EVALUACIÓN
  cri_ind_id: number;
  eva_ind_id: number;

  isEditing: boolean

  @Input('dataFromParent') public modalRef: BsModalRef;

  constructor(
    private sharedService: SharedServiceService,
    private toastrService: ToastrService,
    private calificacionIndService: CalificacionIndService,
    private tokenService: TokenService
  ) { }

  ngOnInit(): void {
    //CAPTURAR LOS ID DEL CRITERIO Y EVALUACION DEL SERVICIO COMPARTIDO
    this.cri_ind_id = this.sharedService.cri_ind_id;
    this.eva_ind_id = this.sharedService.id_evaluacion_sp_ind
    //SOLICITUD PARA OBTENER LA CALIFICACIÓN QUE LE PERTENECE A LA EVALUACIÓN Y AL CRITERIO CON SU ID
    this.calificacionIndService.getCriterioByEvaluacion(this.cri_ind_id, this.eva_ind_id).subscribe(
      async data => {
        this.calificacionInd = data
        if (data && data.cal_id) {
          this.cal_id = data.cal_id
          this.cal_nota = data.cal_nota
          this.cal_observaciones = data.cal_observaciones
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
  }


  onUpdate(): void {
    //SOLICITUD UPDATE DE CALIFICACIÓN SI isEditing ES TRUE
    if (this.isEditing) {
      const calificacionActualizada = new CalificacionIndDto(
        this.cal_nota,
        this.cal_observaciones,
        this.cri_ind_id,
        this.eva_ind_id
      );
      //OBTENER EL TOKEN DEL USUARIO QUE ESTÁ EDITANDO EL CUMPLIMIENTO
      const token = this.tokenService.getToken()
      //ASIGNANDO TOKEN A LA CLASE DTO - TOKENDTO
      const tokenDto: TokenDto = new TokenDto(token);

      this.calificacionIndService.update(this.cal_id, calificacionActualizada, tokenDto).subscribe(
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

    } else {
      //SI NO EXISTE EL CAL_ID SE HACE LA CONSTRUCCIÓN DEL DTO PARA HACER UNA NUEVA CALIFICACIÓN
      this.calificacionInd = new CalificacionIndDto(
        this.cal_nota,
        this.cal_observaciones,
        this.cri_ind_id,
        this.eva_ind_id
      );

      //OBTENER EL TOKEN DEL USUARIO QUE ESTÁ REGISTRANDO EL CUMPLIMIENTO
      const token = this.tokenService.getToken()
      //ASIGNANDO TOKEN A LA CLASE DTO - TOKENDTO
      const tokenDto: TokenDto = new TokenDto(token);

      //SOLICITUD CREAR CALIFICACIÓN
      this.calificacionIndService.createCalificacionInd(this.calificacionInd, tokenDto).subscribe(
        async (data) => {
          this.toastrService.success(data.message, 'Ok', {
            timeOut: 3000,
            positionClass: 'toast-top-center',
          });
          //ENVIAR POR EL SERVICIO COMPARTIDO LOS ID AGREGADOS A LA BASE DE DATOS
          this.sharedService.criteriosIndGuardados.push(this.cri_ind_id)

          //CERRAR EL MODAL
          this.modalRef.hide();
        },
        (err) => {
          //MANEJAR EL ERROR SI NO HAY EXITO AL CREAR CALIFICACIÓN
          this.toastrService.error(err.error.message, 'Error', {
            timeOut: 3000,
            positionClass: 'toast-top-center',
          });
        }
      );
    }
  }

}
