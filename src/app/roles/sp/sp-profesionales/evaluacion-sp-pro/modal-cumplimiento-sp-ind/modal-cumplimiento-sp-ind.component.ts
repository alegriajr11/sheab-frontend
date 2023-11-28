import { Component, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { CalificacionIndDto } from 'src/app/models/SpInd/calificacionInd.dto';
import { TokenDto } from 'src/app/models/token.dto';
import { CalificacionIndService } from 'src/app/services/SpInd/calificacion-ind.service';
import { SharedServiceService } from 'src/app/services/shared-service.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-modal-cumplimiento-sp-ind',
  templateUrl: './modal-cumplimiento-sp-ind.component.html',
  styleUrls: ['./modal-cumplimiento-sp-ind.component.css']
})
export class ModalCumplimientoSpIndComponent {

  calificacionInd: CalificacionIndDto = null
  cal_nota: number;
  cal_observaciones: string;
  cal_asignado: string
  cri_ind_id: number;
  eva_ind_id: number;

  @Input('dataFromParent') public modalRef: BsModalRef;

  constructor(
    private toastrService: ToastrService,
    private sharedService: SharedServiceService,
    private calificacionIndService: CalificacionIndService,
    private tokenService: TokenService,
  ) { }

  ngOnInit(): void {
    this.cri_ind_id = this.sharedService.cri_ind_id;
    this.eva_ind_id = this.sharedService.id_evaluacion_sp_ind
    console.log(this.cri_ind_id)
    console.log(this.eva_ind_id)
  }



  async onRegister(): Promise<void> {
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

    await this.calificacionIndService.createCalificacionInd(this.calificacionInd, tokenDto).subscribe(
      async (data) => {
        this.toastrService.success(data.message, 'Ok', {
          timeOut: 3000,
          positionClass: 'toast-top-center',
        });
        this.sharedService.criteriosIndGuardados.push(this.cri_ind_id)
        // Almacena la información en localStorage
        localStorage.setItem('criteriosIndGuardados', JSON.stringify(this.sharedService.criteriosIndGuardados));

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
