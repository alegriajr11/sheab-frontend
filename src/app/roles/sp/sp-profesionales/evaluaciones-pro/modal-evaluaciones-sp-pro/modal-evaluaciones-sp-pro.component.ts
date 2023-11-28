import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { ActaSpPdfDto } from 'src/app/models/Actas/actaSpPdf.dto';
import { TokenDto } from 'src/app/models/token.dto';
import { ActapdfService } from 'src/app/services/Sic/actapdf.service';
import { EvaluacionIndService } from 'src/app/services/SpInd/evaluacion-ind.service';
import { GenerarPdfActaIndService } from 'src/app/services/SpInd/generar-pdf-acta-ind.service';
import { SharedServiceService } from 'src/app/services/shared-service.service';
import { TokenService } from 'src/app/services/token.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-evaluaciones-sp-pro',
  templateUrl: './modal-evaluaciones-sp-pro.component.html',
  styleUrls: ['./modal-evaluaciones-sp-pro.component.css']
})
export class ModalEvaluacionesSpProComponent {


  id_evaluacion: number
  //NOMBRE PRESTADOR MODAL
  nombre_prestador: string
  nombre_funcionario: string
  cod_prestador: string

  actaSpIps: ActaSpPdfDto;

  //VARIABLE SI ES ADMIN
  isAdmin: boolean;

  //ESTADO DE ACTA
  estado_acta: string;


  iconClass = 'fas fa-door-open fa-lg'; // Icono inicial

  @Input('dataFromParent') public modalRef: BsModalRef;

  constructor(
    public sharedService: SharedServiceService,
    private generarPdfActaSpInd: GenerarPdfActaIndService,
    private tokenService: TokenService,
    private actaPdfService: ActapdfService,
    private evaluacionIndService: EvaluacionIndService,
    private toastrService: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id_evaluacion = this.sharedService.id_evaluacion_sp_ind
    this.nombre_prestador = this.sharedService.pres_nombre
    this.nombre_funcionario = this.sharedService.funcionario_nombre
    this.cod_prestador = this.sharedService.pre_cod_habilitacion
    this.isAdmin = this.tokenService.isAdmin();
    this.estadoActa();
  }


  changeIcon() {
    this.iconClass = 'fas fa-door-closed fa-lg'; // Icono al pasar el mouse
  }

  restoreIcon() {
    this.iconClass = 'fas fa-door-open fa-lg'; // Icono al quitar el mouse
  }

  async generarPdfActa(): Promise<void> {
    await this.generarPdfActaSpInd.ActaPdf(this.id_evaluacion);
    this.modalRef.hide()
  }

  async habilitarRutaEditar() {
    localStorage.setItem('boton-editar-acta-sp-ind', 'true')
  }

  //METODO PARA CAPTURAR EL ESTADO DEL ACTA
  async estadoActa() {
    // Obtener el estado actual del acta
    const data = await this.actaPdfService.oneActaSpInd(this.id_evaluacion).toPromise();
    this.estado_acta = data.act_estado;
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
        const data = await this.actaPdfService.oneActaSpInd(this.id_evaluacion).toPromise();
        if (data.noFirmaActa === 'true') {
          if (!data.act_firma_funcionario) {
            Swal.fire(
              `Lo siento, no es posible cerrar el acta en este momento.`,
              `Para proceder, necesitamos que ${data.act_nombre_funcionario} firme el acta.`,
              'error'
            );
          } else {

            //SOLICITUD FIRMAR EL ACTA SI YA ESTA FIRMADA POR EL FUNCIONARIO Y EL PRESTADOR NO FIRMA
            await this.actaPdfService.cerrarActaSpInd(this.id_evaluacion, tokenDto).toPromise();
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
          await this.actaPdfService.cerrarActaSpInd(this.id_evaluacion, tokenDto).toPromise();
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


  descargarEvaluacionInd() {
    this.evaluacionIndService.descargarEvaluacionPdfInd(this.id_evaluacion, this.cod_prestador)
    this.router.navigate(['/sp/evaluaciones-pro']);
    this.sharedService.criteriosIndGuardados = [];
    this.modalRef.hide()
  }

}
