import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { CriterioSicEstandarDto } from 'src/app/models/Sic/criterioSicEstandar.dto';
import { CumplimientoSicEstandarDto } from 'src/app/models/Sic/cumplimientoEstandar.dto';
import { TokenDto } from 'src/app/models/token.dto';
import { CriterioSicService } from 'src/app/services/Sic/criterio.service';
import { CumplimientoEstandarService } from 'src/app/services/Sic/cumplimiento-estandar.service';
import { SharedServiceService } from 'src/app/services/shared-service.service';
import { TokenService } from 'src/app/services/token.service';


@Component({
  selector: 'app-modalsic',
  templateUrl: './modalsic.component.html',
  styleUrls: ['./modalsic.component.css']
})

export class ModalsicComponent {



  cumplimientoEstandar: CumplimientoSicEstandarDto = null
  cumpl_cumple: string;
  cumpl_observaciones: string;
  cumpl_asignado: string
  crie_id: number;
  eva_id: number
  @Input('dataFromParent') public modalRef: BsModalRef;

  constructor(
    private toastr: ToastrService,
    private sharedService: SharedServiceService,
    private cumplimientoEstandarService: CumplimientoEstandarService,
    private tokenService: TokenService,
  ) { }

  ngOnInit(): void {
    this.crie_id = this.sharedService.crie_id;
    this.eva_id = this.sharedService.id_evaluacion_sic
    console.log(this.eva_id)
    console.log(this.crie_id)
  }



  async onRegister(): Promise<void> {
    this.cumplimientoEstandar = new CumplimientoSicEstandarDto(
      this.cumpl_cumple,
      this.cumpl_observaciones,
      this.crie_id,
      this.eva_id
    );

    //OBTENER EL TOKEN DEL USUARIO QUE ESTÁ REGISTRANDO EL CUMPLIMIENTO
    const token = this.tokenService.getToken()
    //ASIGNANDO TOKEN A LA CLASE DTO - TOKENDTO
    const tokenDto: TokenDto = new TokenDto(token);

    await this.cumplimientoEstandarService.createCumplimientoEstandar(this.cumplimientoEstandar, tokenDto).subscribe(
      async (data) => {
        this.toastr.success(data.message, 'Ok', {
          timeOut: 3000,
          positionClass: 'toast-top-center',
        });
        this.sharedService.criteriosSicGuardados.push(this.crie_id, this.cumpl_cumple)
        // Almacena la información en localStorage
        localStorage.setItem('criteriosGuardados', JSON.stringify(this.sharedService.criteriosSicGuardados));

        this.modalRef.hide();
      },
      (err) => {
        this.toastr.error(err.error.message, 'Error', {
          timeOut: 3000,
          positionClass: 'toast-top-center',
        });
      }
    );
  }


}
