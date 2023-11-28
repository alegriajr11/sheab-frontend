import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { ActaSpPdfDto } from 'src/app/models/Actas/actaSpPdf.dto';
import { EvaluacionIpsDto } from 'src/app/models/SpIps/evaluacion.dto';
import { TokenDto } from 'src/app/models/token.dto';
import { ActapdfService } from 'src/app/services/Sic/actapdf.service';
import { EvaluacionipsService } from 'src/app/services/SpIps/evaluacionips.service';
import { GenerarPdfActaIpsService } from 'src/app/services/SpIps/generar-pdf-acta-ips.service';
import { SharedServiceService } from 'src/app/services/shared-service.service';
import { TokenService } from 'src/app/services/token.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-evaluaciones-sp-ips',
  templateUrl: './modal-evaluaciones-sp-ips.component.html',
  styleUrls: ['./modal-evaluaciones-sp-ips.component.css']
})
export class ModalEvaluacionesSpIpsComponent {

  id_acta: number
  nombre_prestador: string
  nombre_funcionario: string

  actaSpIps: ActaSpPdfDto;

  evaluacionesIps: EvaluacionIpsDto[]

  //ALMACENAR ID DE EVALUACIÓN SELECCIONADA
  eva_ips_id: number

  selectedEvaluacion: number

  //VARIABLE SI ES ADMIN
  isAdmin: boolean;

  //ESTADO DE ACTA
  estado_acta: string;
  //CODIGO PRESTADOR
  cod_prestador: string

  listaVacia: any = undefined;

  iconClass = 'fas fa-door-open fa-lg'; // Icono inicial

  @Input('dataFromParent') public modalRef: BsModalRef;

  constructor(
    public sharedService: SharedServiceService,
    private generarPdfActaSpIps: GenerarPdfActaIpsService,
    private tokenService: TokenService,
    private actaPdfService: ActapdfService,
    private toastrService: ToastrService,
    private evaluacionIpsService: EvaluacionipsService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.id_acta = this.sharedService.id_acta_ips //ALMACENA EL ID DEL ACTA
    this.nombre_prestador = this.sharedService.pres_nombre
    this.nombre_funcionario = this.sharedService.funcionario_nombre
    this.cod_prestador = this.sharedService.pre_cod_habilitacion
    this.isAdmin = this.tokenService.isAdmin();


    this.estadoActa();
    this.cargarEvaluacions();
  }


  changeIcon() {
    this.iconClass = 'fas fa-door-closed fa-lg'; // Icono al pasar el mouse
  }

  restoreIcon() {
    this.iconClass = 'fas fa-door-open fa-lg'; // Icono al quitar el mouse
  }

  async generarPdfActa(): Promise<void> {
    await this.generarPdfActaSpIps.ActaPdf(this.id_acta);
    this.modalRef.hide()
  }

  //HABILITAR LA RUTA PARA EDITAR EL ACTA
  async habilitarRutaEditar() {
    localStorage.setItem('boton-editar-acta-sp-ips', 'true')
  }

  //OBTENER EL ESTADO DEL ACTA
  async estadoActa() {
    // Obtener el estado actual del acta
    const data = await this.actaPdfService.oneActaSpIps(this.id_acta).toPromise();
    this.estado_acta = data.act_estado;
  }


  //LISTAR EVALUACIONES QUE LE PERTENECEN AL PRESTADOR A EVALUAR
  cargarEvaluacions() {
    this.evaluacionIpsService.listaEvaActId(this.id_acta).subscribe(
      data => {
        this.evaluacionesIps = data
        this.listaVacia = undefined;
      },
      err => {
        this.listaVacia = err.error.message;
      }
    );
  }

  //ENVIAR ID DE EVALUACIÓN IPS Y ACTA
  enviarIdEvaluacion(id_eva: number) {
    localStorage.setItem('boton-editar-evaluacion-sp-ips', 'true');
    localStorage.setItem('id_evaluacion_ips', id_eva.toString());
    localStorage.setItem('id_acta', this.id_acta.toString())
    window.scrollTo(0, 0);
  }

  //OBTENER ID SELECCIONADO DE LA EVALUACIÓN
  capturarIdEvaluacion() {
    const idEva = document.getElementById('evips_id') as HTMLSelectElement;
    const selectedValueEva = idEva.value;
    this.selectedEvaluacion = parseInt(selectedValueEva, 10)
    localStorage.setItem('nombre-pres-sp-ips', `${this.nombre_prestador}`)
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
        const data = await this.actaPdfService.oneActaSpIps(this.id_acta).toPromise();
        if (data.noFirmaActa === 'true') {
          if (!data.act_firma_funcionario) {
            Swal.fire(
              `Lo siento, no es posible cerrar el acta en este momento.`,
              `Para proceder, necesitamos que ${data.act_nombre_funcionario} firme el acta.`,
              'error'
            );
          } else {
            //SOLICITUD FIRMAR EL ACTA SI YA ESTA FIRMADA POR EL FUNCIONARIO Y EL PRESTADOR NO FIRMA
            await this.actaPdfService.cerrarActaSpIps(this.id_acta, tokenDto).toPromise();
            this.estado_acta = data.act_estado;
            // Mostrar notificación Acta cerrada
            this.toastrService.success('El Acta ha sido Cerrada', 'Éxito', {
              timeOut: 3000,
              positionClass: 'toast-top-center',
            });
            this.modalRef.hide();
            localStorage.setItem('boton-acta-sp-ips', 'false'); //RESTRINGIR LA RUTA - EVALUACIÓN_SP_INDEPENDIENTES

          }

        }
        else if (!data.act_firma_prestador || !data.act_firma_funcionario || !data.act_firma_prestador_acompanante) {
          if (!data.act_firma_prestador && !data.act_firma_funcionario && !data.act_firma_prestador_acompanante) {
            Swal.fire(
              'No se puede cerrar el acta porque no está firmada por ninguna de las partes',
              `Tanto ${data.act_nombre_funcionario} como ${data.act_nombre_prestador} y el acompañante 
              ${data.act_nombre_prestador_acompanante} deben firmar el acta para poder cerrarla.`,
              'error'
            );
            //VALIDAR SI EL PRESTADOR YA FIRMO EL ACTA
          }
          else if (!data.act_firma_prestador && !data.act_firma_funcionario) {
            Swal.fire(
              'No se puede cerrar el acta porque no está firmada por ninguna de las partes',
              `Tanto ${data.act_nombre_funcionario} como ${data.act_nombre_prestador} deben firmar el acta para poder cerrarla.`,
              'error'
            );
            //VALIDAR SI EL FUNCIONARIO YA FIRMO EL ACTA
          }
          else if (!data.act_firma_prestador_acompanante && !data.act_firma_funcionario) {
            Swal.fire(
              'No se puede cerrar el acta porque no está firmada por ninguna de las partes',
              `Tanto ${data.act_nombre_funcionario} como el acompañante ${data.act_nombre_prestador_acompanante} deben firmar el acta para poder cerrarla.`,
              'error'
            );
            //VALIDAR SI EL FUNCIONARIO YA FIRMO EL ACTA
          }
          else if (!data.act_firma_prestador && !data.act_firma_prestador_acompanante) {
            Swal.fire(
              `No se puede cerrar el acta porque no está firmada por el representante y el acompañante.`,
              `Es necesario que ${data.act_nombre_prestador} y ${data.act_nombre_prestador_acompanante} 
              firmen el acta para poder cerrarla.`,
              'error'
            );
            //VALIDAR SI EL FUNCIONARIO YA FIRMO EL ACTA
          }
          else if (!data.act_firma_prestador) {
            Swal.fire(
              `No se puede cerrar el acta porque no está firmada por el representante.`,
              `Es necesario que ${data.act_nombre_prestador} firme el acta para poder cerrarla.`,
              'error'
            );
            //VALIDAR SI EL FUNCIONARIO YA FIRMO EL ACTA
          }
          else if (!data.act_firma_prestador_acompanante) {
            Swal.fire(
              `No se puede cerrar el acta porque no está firmada por el acompañante.`,
              `Es necesario que ${data.act_nombre_prestador_acompanante} firme el acta para poder cerrarla.`,
              'error'
            );
            //VALIDAR SI EL FUNCIONARIO YA FIRMO EL ACTA
          }

          else if (!data.act_firma_funcionario) {
            Swal.fire(
              `No se puede cerrar el acta porque no está firmada por el funcionario.`,
              `${data.act_nombre_funcionario} es necesario que firmes el acta para poder cerrarla.`,
              'error'
            );
          }
        }
        //CERRAR EL ACTA SI ESTÁ FIRMADA
        else {
          await this.actaPdfService.cerrarActaSpIps(this.id_acta, tokenDto).toPromise();
          this.estado_acta = data.act_estado;
          // Mostrar notificación Acta cerrada
          this.toastrService.success('El Acta ha sido Cerrada', 'Éxito', {
            timeOut: 3000,
            positionClass: 'toast-top-center',
          });
          this.modalRef.hide();

          localStorage.setItem('boton-acta-sp-ips', 'false'); //RESTRINGIR LA RUTA - EVALUACIÓN_SP_INDEPENDIENTES
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


  //DESCARGAR EVALUACION POR ID EVALUACION Y ID ACTA
  descargarEvaluacionIps() {
    this.evaluacionIpsService.descargarEvaluacionPdfIps(this.selectedEvaluacion, this.id_acta, this.cod_prestador)
    this.router.navigate(['/sp/evaluaciones-ips']);
    this.modalRef.hide()
  }

}
