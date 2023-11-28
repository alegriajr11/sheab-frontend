import { Component, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { CalificacionPamecDto } from 'src/app/models/Pamec/calificacionPamec.dto';
import { TokenDto } from 'src/app/models/token.dto';
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
  cal_no_aplica: string;
  cal_observaciones: string;
  cal_asignado: string

  cri_pam_id: number;
  eva_pam_id: number;

  @Input('dataFromParent') public modalRef: BsModalRef;

  constructor(
    private toastrService: ToastrService,
    private sharedService: SharedServiceService,
    private tokenService: TokenService,
  ) { }


  async onRegister(): Promise<void> {
    this.calificacionPamec = new CalificacionPamecDto(
      this.cal_nota,
      this.cal_observaciones,
      this.cri_pam_id,
      this.eva_pam_id
    );

    //OBTENER EL TOKEN DEL USUARIO QUE ESTÁ REGISTRANDO EL CUMPLIMIENTO
    const token = this.tokenService.getToken()
    //ASIGNANDO TOKEN A LA CLASE DTO - TOKENDTO
    const tokenDto: TokenDto = new TokenDto(token);

    // await this.calificacionIndService.createCalificacionInd(this.calificacionInd, tokenDto).subscribe(
    //   async (data) => {
    //     this.toastrService.success(data.message, 'Ok', {
    //       timeOut: 3000,
    //       positionClass: 'toast-top-center',
    //     });
    //     this.sharedService.criteriosIndGuardados.push(this.cri_ind_id)
    //     // Almacena la información en localStorage
    //     localStorage.setItem('criteriosIndGuardados', JSON.stringify(this.sharedService.criteriosIndGuardados));

    //     this.modalRef.hide();
    //   },
    //   (err) => {
    //     this.toastrService.error(err.error.message, 'Error', {
    //       timeOut: 3000,
    //       positionClass: 'toast-top-center',
    //     });
    //   }
    // );
  }
}
