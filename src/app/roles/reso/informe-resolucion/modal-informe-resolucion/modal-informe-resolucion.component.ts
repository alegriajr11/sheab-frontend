import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ActaVerificacionDto } from 'src/app/models/Actas/actaVerificacion.dto';
import { ActaVerificacionService } from 'src/app/services/Resolucion/acta-verificacion.service';
import { SharedServiceService } from 'src/app/services/shared-service.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-modal-informe-resolucion',
  templateUrl: './modal-informe-resolucion.component.html',
  styleUrls: ['./modal-informe-resolucion.component.css']
})
export class ModalInformeResolucionComponent {

  id_evaluacion_verificacion: number
  nombre_prestador: string
  nombre_funcionario: string

  pre_cod_habilitacion: string

  acta_verificacion: ActaVerificacionDto;

  //VARIABLE SI ES ADMIN
  isAdmin: boolean;

  //ESTADO DE ACTA
  estado_acta: string;
  cod_prestador: string

  //PRESTADOR RECIBE VISITA
  recibeVisita: string;



  iconClass = 'fas fa-door-open fa-lg'; // Icono inicial

  @Input('dataFromParent') public modalRef: BsModalRef;

  constructor(
    public sharedService: SharedServiceService,
    private tokenService: TokenService,
    private actaVerificacionService: ActaVerificacionService,
    private router: Router
  ){}

  ngOnInit(): void {
    //Capturar id del acta - evaluacion 
    this.id_evaluacion_verificacion = this.sharedService.id_evaluacion_verificacion
    //Capturar el nombre del prestador
    this.nombre_prestador = this.sharedService.pres_nombre
    //Obtener el rol del usuario logueado
    this.isAdmin = this.tokenService.isAdmin();
    setTimeout(() => {
      this.incializarMetodos();
    });
  }

  incializarMetodos(){
    this.obtenerRecibeVisita();
    this.estadoActa();
  }

  changeIcon() {
    this.iconClass = 'fas fa-door-closed fa-lg'; // Icono al pasar el mouse
  }

  restoreIcon() {
    this.iconClass = 'fas fa-door-open fa-lg'; // Icono al quitar el mouse
  }

  cerrarActa(){

  }

  async habilitarRutaEditar() {
    localStorage.setItem('boton-editar-acta-verificacion', 'true')
  }

  generarPdfActa(){

  }

  async estadoActa() {
    // Obtener el estado actual del acta
    const data = await this.actaVerificacionService.oneActaVerificacion(this.id_evaluacion_verificacion).toPromise();
    this.estado_acta = data.act_estado;
    //Obtener el codigo del prestador
    this.pre_cod_habilitacion = data.act_cod_habilitacion
  }

  async obtenerRecibeVisita(){
    const data = await this.actaVerificacionService.oneActaVerificacion(this.id_evaluacion_verificacion).toPromise();
    this.recibeVisita = data.act_recibe_visita
  }

  //METODO PARA EDITAR EL INFORME
  editarInforme(){
    localStorage.setItem('boton-editar-informe-verificacion', 'true')
    localStorage.setItem('pre_cod_habilitacion', this.pre_cod_habilitacion)
    localStorage.setItem('nombre-pres-verificacion', this.nombre_prestador)
    localStorage.setItem('id_acta_verificacion', this.id_evaluacion_verificacion.toString())
    this.router.navigate(['/reso/lista-verificacion'])
    this.modalRef.hide()
  }

}