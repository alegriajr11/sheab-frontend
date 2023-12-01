import { Component, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { SharedServiceService } from 'src/app/services/shared-service.service';

@Component({
  selector: 'app-modalsic2',
  templateUrl: './modalsic2.component.html',
  styleUrls: ['./modalsic2.component.css']
})
export class Modalsic2Component {

  cri_id: number 
  pre_cod_habilitacion: string;
  cumpl_cumple: string;
  cumpl_observaciones: string;

  nombre_dominio: string;
  nombre_indicador: string;
  id_dominio: number
  id_indicador: number

  @Input('dataFromParent') public modalRef: BsModalRef;

  constructor(private sharedService: SharedServiceService,){}

  ngOnInit(){
    this.cri_id = this.sharedService.id_evaluacion_sic;
    this.pre_cod_habilitacion = sessionStorage.getItem("cod-pres-sic")

    //IDS DOMINIO E INDICADOR
    this.id_dominio =  this.sharedService.id_dominio
    this.id_indicador = this.sharedService.id_indicador
  }

  onRegister(){

  }
}
