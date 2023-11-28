import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { CalificacionIpsDto } from 'src/app/models/SpIps/calificacionIps.dto';
import { TokenDto } from 'src/app/models/token.dto';
import { CalificacionIpsService } from 'src/app/services/SpIps/calificacion-ips.service';
import { SharedServiceService } from 'src/app/services/shared-service.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-modal-calificacion-ips',
  templateUrl: './modal-calificacion-ips.component.html',
  styleUrls: ['./modal-calificacion-ips.component.css']
})
export class ModalCalificacionIpsComponent {

  @ViewChild('calObservaciones', { static: false }) calObservaciones: ElementRef;



  calificacionIps: CalificacionIpsDto = null
  cal_id: number;
  cal_nota: number;
  cal_observaciones: string;
  cal_asignado: string

  //IDS CRITERIO Y EVALUACIÓN
  cri_ips_id: number;
  eva_ips_id: number;
  id_acta: number;
  //Nombre De Etapa
  nombre_etapa: string

  isEditing: boolean


  @Input('dataFromParent') public modalRef: BsModalRef;

  constructor(
    private sharedService: SharedServiceService,
    private toastrService: ToastrService,
    private calificacionIpsService: CalificacionIpsService,
    private tokenService: TokenService
  ) { }

  ngOnInit() {
    //CAPTURAR LOS ID DEL CRITERIO Y EVALUACION DEL SERVICIO COMPARTIDO
    this.cri_ips_id = this.sharedService.cri_ips_id; //OBTENER ID DE CRITERIO
    this.eva_ips_id = this.sharedService.id_evaluacion_sp_ips //OBTENER ID DE EVALUACION
    this.id_acta = this.sharedService.id_acta_ips //OBTENER ID DE ACTA
    this.nombre_etapa = this.sharedService.nombre_etapa
    this.obtenerCalificacionUpdate();
  }

  //Buscar la calificacion a actualizar
  obtenerCalificacionUpdate() {
    switch (this.nombre_etapa) {
      case 'ajuste':
        this.calificacionIpsService.getCriterioByEvaluacionAjuste(this.cri_ips_id, this.eva_ips_id, this.id_acta).subscribe(
          async data => {
            this.procesarCalificacionData(data);
          },
          err => {
            this.manipularError(err);
          }
        );
        break;

      case 'implementacion':
        this.calificacionIpsService.getCriterioByEvaluacionImplementacion(this.cri_ips_id, this.eva_ips_id, this.id_acta).subscribe(
          async data => {
            this.procesarCalificacionData(data);
          },
          err => {
            this.manipularError(err);
          }
        );
        break;

      case 'planeacion':
        this.calificacionIpsService.getCriterioByEvaluacionPlaneacion(this.cri_ips_id, this.eva_ips_id, this.id_acta).subscribe(
          async data => {
            this.procesarCalificacionData(data);
          },
          err => {
            this.manipularError(err);
          }
        );
        break;

      case 'verificacion':
        this.calificacionIpsService.getCriterioByEvaluacionVerificacion(this.cri_ips_id, this.eva_ips_id, this.id_acta).subscribe(
          async data => {
            this.procesarCalificacionData(data);
          },
          err => {
            this.manipularError(err);
          }
        );
        break;

      default:
        break;
    }
  }

  //PROCESAR EL DTO DE CALIFICACION
  procesarCalificacionData(data: any) {
    this.calificacionIps = data;
    if (data && data.cal_id) {
      this.cal_id = data.cal_id;
      this.cal_nota = data.cal_nota;
      this.cal_observaciones = data.cal_observaciones;
      this.isEditing = true; // Habilitar edición
    } else {
      this.isEditing = false; // Habilitar creación de calificación
    }
  }

  //MANIPULAR EL ERROR AL REALIZAR LA SOLICITUD AL SERVICIO
  manipularError(err: any) {
    this.toastrService.error(err.error.message, 'Fail', {
      timeOut: 3000,
      positionClass: 'toast-top-center',
    });
  }


  //AGREGAR ITEM EN TEXT-AREA
  agregarItemOnEnter(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      // Evitar el comportamiento predeterminado de "Enter" (salto de línea)
      event.preventDefault();

      // Verificar si el texto no contiene una viñeta
      if (!this.cal_observaciones.includes('•')) {
        this.cal_observaciones += '';
      } else if (this.cal_observaciones.endsWith('•')) {
        this.cal_observaciones += '\n•';
      } else if (this.cal_observaciones.includes('•')) {
        this.cal_observaciones += '\n•';
      }
      // Enfocar el elemento del textarea
      this.calObservaciones.nativeElement.focus();
    }
  }

  agregarItem() {
    // Agregar la nueva observación al texto existente con un salto de línea
    this.cal_observaciones = this.cal_observaciones + '\n•';
    // Enfocar el elemento del textarea
    this.calObservaciones.nativeElement.focus();
  }


  /**METODOS SOLICITUD CREAR CALIFICACION */

  //SOLICITUD CREAR CALIFCACION AJUSTE
  solicitudCrearCalificacionAjuste() {
    //SI NO EXISTE EL CAL_ID SE HACE LA CONSTRUCCIÓN DEL DTO PARA HACER UNA NUEVA CALIFICACIÓN
    this.calificacionIps = new CalificacionIpsDto(
      this.cal_nota,
      this.cal_observaciones,
      this.cri_ips_id,
      this.eva_ips_id,
      this.id_acta
    );

    console.log(this.calificacionIps)
    //OBTENER EL TOKEN DEL USUARIO QUE ESTÁ REGISTRANDO EL CUMPLIMIENTO
    const token = this.tokenService.getToken()
    //ASIGNANDO TOKEN A LA CLASE DTO - TOKENDTO
    const tokenDto: TokenDto = new TokenDto(token);

    //SOLICITUD CREAR CALIFICACIÓN
    this.calificacionIpsService.createCalificacionAjuste(this.calificacionIps, tokenDto).subscribe(
      async (data) => {
        this.toastrService.success(data.message, 'Ok', {
          timeOut: 3000,
          positionClass: 'toast-top-center',
        });
        //ENVIAR POR EL SERVICIO COMPARTIDO LOS ID AGREGADOS A LA BASE DE DATOS
        this.sharedService.criteriosIpsAjusteGuardados.push(this.cri_ips_id)

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

  //SOLICITUD CREAR CALIFCACION IMPLEMENTACIÓN
  solicitudCrearCalificacionImplementacion() {
    //SI NO EXISTE EL CAL_ID SE HACE LA CONSTRUCCIÓN DEL DTO PARA HACER UNA NUEVA CALIFICACIÓN
    this.calificacionIps = new CalificacionIpsDto(
      this.cal_nota,
      this.cal_observaciones,
      this.cri_ips_id,
      this.eva_ips_id,
      this.id_acta
    );

    //OBTENER EL TOKEN DEL USUARIO QUE ESTÁ REGISTRANDO EL CUMPLIMIENTO
    const token = this.tokenService.getToken()
    //ASIGNANDO TOKEN A LA CLASE DTO - TOKENDTO
    const tokenDto: TokenDto = new TokenDto(token);

    //SOLICITUD CREAR CALIFICACIÓN
    this.calificacionIpsService.createCalificacionImplementacion(this.calificacionIps, tokenDto).subscribe(
      async (data) => {
        this.toastrService.success(data.message, 'Ok', {
          timeOut: 3000,
          positionClass: 'toast-top-center',
        });
        //ENVIAR POR EL SERVICIO COMPARTIDO LOS ID AGREGADOS A LA BASE DE DATOS
        this.sharedService.criteriosIpsImplementacionGuardados.push(this.cri_ips_id)
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
  //SOLICITUD CREAR CALIFCACION PLANEACION
  solicitudCrearCalificacionPlaneacion() {
    //SI NO EXISTE EL CAL_ID SE HACE LA CONSTRUCCIÓN DEL DTO PARA HACER UNA NUEVA CALIFICACIÓN
    this.calificacionIps = new CalificacionIpsDto(
      this.cal_nota,
      this.cal_observaciones,
      this.cri_ips_id,
      this.eva_ips_id,
      this.id_acta
    );

    //OBTENER EL TOKEN DEL USUARIO QUE ESTÁ REGISTRANDO EL CUMPLIMIENTO
    const token = this.tokenService.getToken()
    //ASIGNANDO TOKEN A LA CLASE DTO - TOKENDTO
    const tokenDto: TokenDto = new TokenDto(token);

    //SOLICITUD CREAR CALIFICACIÓN
    this.calificacionIpsService.createCalificacionPlaneacion(this.calificacionIps, tokenDto).subscribe(
      async (data) => {
        this.toastrService.success(data.message, 'Ok', {
          timeOut: 3000,
          positionClass: 'toast-top-center',
        });
        //ENVIAR POR EL SERVICIO COMPARTIDO LOS ID AGREGADOS A LA BASE DE DATOS
        this.sharedService.criteriosIpsPlaneacionGuardados.push(this.cri_ips_id)
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
  //SOLICITUD CREAR CALIFCACION VERIFICACION
  solicitudCrearCalificacionVerificacion() {
    //SI NO EXISTE EL CAL_ID SE HACE LA CONSTRUCCIÓN DEL DTO PARA HACER UNA NUEVA CALIFICACIÓN
    this.calificacionIps = new CalificacionIpsDto(
      this.cal_nota,
      this.cal_observaciones,
      this.cri_ips_id,
      this.eva_ips_id,
      this.id_acta
    );

    //OBTENER EL TOKEN DEL USUARIO QUE ESTÁ REGISTRANDO EL CUMPLIMIENTO
    const token = this.tokenService.getToken()
    //ASIGNANDO TOKEN A LA CLASE DTO - TOKENDTO
    const tokenDto: TokenDto = new TokenDto(token);

    //SOLICITUD CREAR CALIFICACIÓN
    this.calificacionIpsService.createCalificacionVerificacion(this.calificacionIps, tokenDto).subscribe(
      async (data) => {
        this.toastrService.success(data.message, 'Ok', {
          timeOut: 3000,
          positionClass: 'toast-top-center',
        });
        //ENVIAR POR EL SERVICIO COMPARTIDO LOS ID AGREGADOS A LA BASE DE DATOS
        this.sharedService.criteriosIpsVerificacionGuardados.push(this.cri_ips_id)
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
  /**FIN METODOS SOLICITUD CREAR CALIFICACION */



  /**METODOS SOLICITUD ACTUALIZAR */

  //SOLICITUD ACTUALIZAR CALIFICACION AJUSTE
  solicitudActualizarCalificacionAjuste() {
    const calificacionActualizada = new CalificacionIpsDto(
      this.cal_nota,
      this.cal_observaciones,
      this.cri_ips_id,
      this.eva_ips_id,
      this.id_acta
    );
    //OBTENER EL TOKEN DEL USUARIO QUE ESTÁ EDITANDO EL CUMPLIMIENTO
    const token = this.tokenService.getToken()
    //ASIGNANDO TOKEN A LA CLASE DTO - TOKENDTO
    const tokenDto: TokenDto = new TokenDto(token);

    console.log(calificacionActualizada)

    this.calificacionIpsService.updateAjuste(this.cal_id, calificacionActualizada, tokenDto).subscribe(
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

  //SOLICITUD ACTUALIZAR CALIFICACION IMPLEMENTACION
  solicitudActualizarCalificacionImplementacion() {
    const calificacionActualizada = new CalificacionIpsDto(
      this.cal_nota,
      this.cal_observaciones,
      this.cri_ips_id,
      this.eva_ips_id,
      this.id_acta
    );
    //OBTENER EL TOKEN DEL USUARIO QUE ESTÁ EDITANDO EL CUMPLIMIENTO
    const token = this.tokenService.getToken()
    //ASIGNANDO TOKEN A LA CLASE DTO - TOKENDTO
    const tokenDto: TokenDto = new TokenDto(token);

    this.calificacionIpsService.updateImplementacion(this.cal_id, calificacionActualizada, tokenDto).subscribe(
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
  //SOLICITUD ACTUALIZAR CALIFICACION PLANEACION
  solicitudActualizarCalificacionPlaneacion() {
    const calificacionActualizada = new CalificacionIpsDto(
      this.cal_nota,
      this.cal_observaciones,
      this.cri_ips_id,
      this.eva_ips_id,
      this.id_acta
    );
    //OBTENER EL TOKEN DEL USUARIO QUE ESTÁ EDITANDO EL CUMPLIMIENTO
    const token = this.tokenService.getToken()
    //ASIGNANDO TOKEN A LA CLASE DTO - TOKENDTO
    const tokenDto: TokenDto = new TokenDto(token);

    this.calificacionIpsService.updatePlaneacion(this.cal_id, calificacionActualizada, tokenDto).subscribe(
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
  //SOLICITUD ACTUALIZAR CALIFICACION VERIFICACION
  solicitudActualizarCalificacionVerificacion() {
    const calificacionActualizada = new CalificacionIpsDto(
      this.cal_nota,
      this.cal_observaciones,
      this.cri_ips_id,
      this.eva_ips_id,
      this.id_acta
    );
    //OBTENER EL TOKEN DEL USUARIO QUE ESTÁ EDITANDO EL CUMPLIMIENTO
    const token = this.tokenService.getToken()
    //ASIGNANDO TOKEN A LA CLASE DTO - TOKENDTO
    const tokenDto: TokenDto = new TokenDto(token);

    this.calificacionIpsService.updateVerificacion(this.cal_id, calificacionActualizada, tokenDto).subscribe(
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
  /**FIN DE METODOS SOLICITUD ACTUALIZAR */


  
  //METODO ACTUALIZAR
  onUpdate() {
    switch (this.nombre_etapa) {
      case 'ajuste':
        if (this.isEditing) {
          this.solicitudActualizarCalificacionAjuste();
        } else {
          this.solicitudCrearCalificacionAjuste();
        }
        break;

      case 'implementacion':
        if (this.isEditing) {
          this.solicitudActualizarCalificacionImplementacion();
        } else {
          this.solicitudCrearCalificacionImplementacion();
        }
        break;
      case 'planeacion':
        if (this.isEditing) {
          this.solicitudActualizarCalificacionPlaneacion();
        } else {
          this.solicitudCrearCalificacionPlaneacion();
        }
        break;
      case 'verificacion':
        if (this.isEditing) {
          this.solicitudActualizarCalificacionVerificacion();
        } else {
          this.solicitudCrearCalificacionVerificacion();
        }
        break;

      default:
        break;
    }
  }
}
