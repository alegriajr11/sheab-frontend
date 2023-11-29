import { Component, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { CalificacionPamecDto } from 'src/app/models/Pamec/calificacionPamec.dto';
import { TokenDto } from 'src/app/models/token.dto';
import { CalificacionPamecService } from 'src/app/services/Pamec/calificacion-pamec.service';
import { SharedServiceService } from 'src/app/services/shared-service.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-modal-calificacion-pamec',
  templateUrl: './modal-calificacion-pamec.component.html',
  styleUrls: ['./modal-calificacion-pamec.component.css']
})
export class ModalCalificacionPamecComponent {

  calificacionPamec: CalificacionPamecDto = null
  cal_nota: number;
  cal_aplica: string;
  cal_observaciones: string;
  cal_asignado: string

  cri_pam_id: number;
  eva_pam_id: number;

  @Input('dataFromParent') public modalRef: BsModalRef;

  constructor(
    private toastrService: ToastrService,
    private sharedService: SharedServiceService,
    private calificacionPamecService: CalificacionPamecService,
    private tokenService: TokenService,
  ) { }

  ngOnInit() {
    this.cri_pam_id = this.sharedService.cri_pamec_id
    this.eva_pam_id = this.sharedService.id_evaluacion_pamec
  }


  calificacionNoAplica(): void {
    this.toastrService.info('La calificación no aplicable; guarda para aceptar cambios', '', {
      timeOut: 5000,
      positionClass: 'toast-top-center',
    });
    //IDENTIFICAR EL SELECT DE CALIFICACIONES
    const select_calificacion = document.getElementById('select-calificacion-pamec') as HTMLSelectElement

    select_calificacion.disabled = true;
    this.cal_nota = null

    this.cal_aplica = 'No Aplica'
  }

  async onRegister(): Promise<void> {
    this.calificacionPamec = new CalificacionPamecDto(
      this.cal_nota,
      this.cal_observaciones,
      this.cal_aplica,
      this.cri_pam_id,
      this.eva_pam_id
    );

    //OBTENER EL TOKEN DEL USUARIO QUE ESTÁ REGISTRANDO EL CUMPLIMIENTO
    const token = this.tokenService.getToken()
    //ASIGNANDO TOKEN A LA CLASE DTO - TOKENDTO
    const tokenDto: TokenDto = new TokenDto(token);

    if (!this.cal_aplica && !this.cal_nota) {
      this.toastrService.error('Debes asignar una calificación', '', {
        timeOut: 3000,
        positionClass: 'toast-top-center',
      });

    } else if (this.cal_aplica === 'No Aplica') {
       //SOLICITAR CREAR CALIFICACION CUANDO LA NOTA NO APLICA
      await this.calificacionPamecService.createCalificacionPamec(this.calificacionPamec, tokenDto).subscribe(
        async (data) => {
          this.toastrService.success(data.message, 'Ok', {
            timeOut: 3000,
            positionClass: 'toast-top-center',
          });
          this.sharedService.criteriosPamecGuardados.push(this.cri_pam_id)
          // Almacena la información en localStorage
          localStorage.setItem('criteriosPamecGuardados', JSON.stringify(this.sharedService.criteriosPamecGuardados));

          this.modalRef.hide();
        },
        (err) => {
          this.toastrService.error(err.error.message, 'Error', {
            timeOut: 3000,
            positionClass: 'toast-top-center',
          });
        }
      );
    } else {
      //SOLICITAR CREAR CALIFICACION CUANDO LA NOTA FUE ASIGNADA
      await this.calificacionPamecService.createCalificacionPamec(this.calificacionPamec, tokenDto).subscribe(
        async (data) => {
          this.toastrService.success(data.message, 'Ok', {
            timeOut: 3000,
            positionClass: 'toast-top-center',
          });
          this.sharedService.criteriosPamecGuardados.push(this.cri_pam_id)
          // Almacena la información en localStorage
          localStorage.setItem('criteriosPamecGuardados', JSON.stringify(this.sharedService.criteriosPamecGuardados));

          this.modalRef.hide();
        },
        (err) => {
          this.toastrService.error(err.error.message, 'Error', {
            timeOut: 3000,
            positionClass: 'toast-top-center',
          });
        }
      );
    }
  }
}
