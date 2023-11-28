import { Component, Input, TemplateRef } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { SharedServiceService } from 'src/app/services/shared-service.service';
import { TokenService } from 'src/app/services/token.service';
import { GenerarPdfActaService } from 'src/app/services/Sic/generar-pdf-acta.service';
import { Router } from '@angular/router';
import { ActapdfService } from 'src/app/services/Sic/actapdf.service';
import { TokenDto } from 'src/app/models/token.dto';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { ActaSicPdfDto } from 'src/app/models/Actas/actaSicpdf.dto';

@Component({
  selector: 'app-modal-evaluaciones',
  templateUrl: './modal-evaluaciones.component.html',
  styleUrls: ['./modal-evaluaciones.component.css']
})
export class ModalEvaluacionesComponent {

  id_evaluacion: number
  nombre_prestador: string
  nombre_funcionario: string

  acta_sic: ActaSicPdfDto;

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
    private generarPdfActaSic: GenerarPdfActaService,
    private tokenService: TokenService,
    private actaSicPdfService: ActapdfService,
    private toastrService: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id_evaluacion = this.sharedService.id_evaluacion_sic
    this.nombre_prestador = this.sharedService.pres_nombre
    this.nombre_funcionario = this.sharedService.funcionario_nombre
    this.cod_prestador = this.sharedService.pre_cod_habilitacion
    this.isAdmin = this.tokenService.isAdmin();
    this.incializarMetodos();
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

  async generarPdfActa(): Promise<void> {
    await this.generarPdfActaSic.ActaPdf(this.id_evaluacion);
    this.modalRef.hide()
  }

  async habilitarRutaEditar() {
    localStorage.setItem('boton-editar-acta-sic', 'true')
  }

  async estadoActa() {
    // Obtener el estado actual del acta
    const data = await this.actaSicPdfService.oneActaSic(this.id_evaluacion).toPromise();
    this.estado_acta = data.act_estado;
  }

  async obtenerRecibeVisita(){
    const data = await this.actaSicPdfService.oneActaSic(this.id_evaluacion).toPromise();
    this.recibeVisita = data.act_recibe_visita
  }

  //SOLICITUD PARA CERRAR EL ACTA
  async cerrarActa() {
    const token = this.tokenService.getToken();
    const tokenDto: TokenDto = new TokenDto(token);

    try {
      const result = await Swal.fire({
        title: '¿Estás seguro de cerrar el acta?',
        text: 'No habrá marcha atrás después de cerrar el acta.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, cerrar acta',
        cancelButtonText: 'Cancelar',
      });

      if (result.isConfirmed) {
        // Obtener el estado actualizado del acta
        const data = await this.actaSicPdfService.oneActaSic(this.id_evaluacion).toPromise();
        if (data.noFirmaActa === 'true') {
          if (!data.act_firma_funcionario) {
            Swal.fire(
              `Lo siento, no es posible cerrar el acta en este momento.`,
              `Para proceder, necesitamos que ${data.act_nombre_funcionario} firme el acta.`,
              'error'
            );
          } else {
            //SOLICITUD FIRMAR EL ACTA SI YA ESTA FIRMADA POR EL FUNCIONARIO Y EL PRESTADOR NO FIRMA
            await this.actaSicPdfService.cerrarActaSic(this.id_evaluacion, tokenDto).toPromise();
            this.estado_acta = data.act_estado;
            // Mostrar notificación Acta cerrada
            this.toastrService.success('El Acta ha sido Cerrada', 'Éxito', {
              timeOut: 3000,
              positionClass: 'toast-top-center',
            });
            this.modalRef.hide();
            localStorage.setItem('boton-acta-sp-ind', 'false'); //RESTRINGIR LA RUTA - EVALUACIÓN_SP_INDEPENDIENTES

          }


        }
        else if (!data.act_firma_prestador || !data.act_firma_funcionario) {
          if (!data.act_firma_prestador && !data.act_firma_funcionario) {
            Swal.fire(
              'No se puede cerrar el acta porque no está firmada por ninguna de las partes',
              `Tanto ${data.act_nombre_funcionario} como ${data.act_nombre_prestador} deben firmar el acta para poder cerrarla.`,
              'error'
            );
            //VALIDAR SI EL PRESTADOR YA FIRMO EL ACTA
          }
          else if (!data.act_firma_prestador) {
            Swal.fire(
              `No se puede cerrar el acta porque no está firmada por el representante.`,
              `Es necesario que  ${data.act_nombre_prestador} firme el acta para poder cerrarla.`,
              'error'
            );
            //VALIDAR SI EL FUNCIONARIO YA FIRMO EL ACTA
          }
          else if (!data.act_firma_funcionario) {
            Swal.fire(
              `No se puede cerrar el acta porque no está firmada por el funcionario ${data.act_nombre_funcionario}`,
              `Es necesario que firmes el acta para poder cerrarla.`,
              'error'
            );
          }
        }
        //CERRAR EL ACTA SI ESTÁ FIRMADA
        else {
          await this.actaSicPdfService.cerrarActaSpInd(this.id_evaluacion, tokenDto).toPromise();
          this.estado_acta = data.act_estado;
          // Mostrar notificación Acta cerrada
          this.toastrService.success('El Acta ha sido Cerrada', 'Éxito', {
            timeOut: 3000,
            positionClass: 'toast-top-center',
          });
          this.modalRef.hide();

          localStorage.setItem('boton-acta-sp-ind', 'false'); //RESTRINGIR LA RUTA - EVALUACIÓN_SP_INDEPENDIENTES
        }
      }
      else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelado',
          'Acta sin Cerrar',
          'error'
        );
      }
    } catch (error) {
      this.toastrService.error('Error al Cerrar el Acta', 'Fail', {
        timeOut: 3000,
        positionClass: 'toast-top-center',
      });
    }
  }


}
