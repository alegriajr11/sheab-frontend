import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ActaVerificacionDto } from 'src/app/models/Actas/actaVerificacion.dto';
import { DatosVerificadosDto } from 'src/app/models/Actas/datos_verificados.dto';
import { ActaVerificacionService } from 'src/app/services/Resolucion/acta-verificacion.service';

@Component({
  selector: 'app-editar-acta-verificacion',
  templateUrl: './editar-acta-verificacion.component.html',
  styleUrls: ['./editar-acta-verificacion.component.css']
})
export class EditarActaVerificacionComponent {

  actaVerificacion: ActaVerificacionDto = null
  //Datos Verificados DTO
  datosVerificados: DatosVerificadosDto = null

  //ALMACENAR LA FIRMA DEL PRESTADOR DEL SERVICIO COMPARTIDO
  firma: string;

  //HABILITAR FIRMA
  acta_firmada: boolean = true;
  //NO FIRMA ACTA
  noFirmaActa: string = 'false';
  //RECIBE VISITA
  act_recibe_visita: string

  //booleans para checkbox
  act_visita_previa_bool: boolean
  act_visita_seguimiento_bool: boolean
  act_visita_reactivacion_bool: boolean

  constructor(
    private activatedRoute: ActivatedRoute,
    private actaVerificacionService: ActaVerificacionService,
    private toastrService: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    this.actaVerificacionService.oneActaVerificacion(id).subscribe(
      data => {
        this.actaVerificacion = data;
        // this.act_nombre_prestador = data.act_funcionario_prestador
        this.firma = data.act_firma_prestador
        this.noFirmaActa = data.noFirmaActa
        this.act_recibe_visita = data.act_recibe_visita
      },
      err => {
        this.toastrService.error(err.error.message, 'Fail', {
          timeOut: 3000, positionClass: 'toast-top-center',
        });
        this.router.navigate(['/']);
      }
    );
  }

  //PERMITIR SOLO SELECCIONA UN SOLO CHECKBOX
  unsoloCheckbox() {
    let servicio_acta = this.actaVerificacionService
    let acta_verificacion = this.actaVerificacion
    var checkbox1 = (document.getElementById("previa")) as HTMLInputElement;
    var checkbox2 = (document.getElementById("segumiento")) as HTMLInputElement;
    var checkbox3 = (document.getElementById("reactivacion")) as HTMLInputElement;

    var tipo_visita = ''

    checkbox1.onclick = function (this: EditarActaVerificacionComponent) {
      if (checkbox1.checked != false) {
        checkbox2.checked = false;
        checkbox3.checked = false;

        this.act_visita_previa_bool = true;
        this.act_visita_seguimiento_bool = false;
        this.act_visita_reactivacion_bool = false;

        tipo_visita = 'previa'
        servicio_acta.listaUltimaActaVerificacion(tipo_visita).subscribe(
          data => {
            acta_verificacion = data
            var acta = (document.getElementById('acta')) as HTMLSelectElement
            acta.value = acta_verificacion.act_id.toString()
          }
        )
      }
    }.bind(this)

    checkbox2.onclick = function (this: EditarActaVerificacionComponent) {
      if (checkbox2.checked != false) {
        checkbox1.checked = false;
        checkbox3.checked = false;

        this.act_visita_previa_bool = false;
        this.act_visita_seguimiento_bool = true;
        this.act_visita_reactivacion_bool = false;


        tipo_visita = 'seguimiento'
        servicio_acta.listaUltimaActaVerificacion(tipo_visita).subscribe(
          data => {
            acta_verificacion = data
            var acta = (document.getElementById('acta')) as HTMLSelectElement
            acta.value = acta_verificacion.act_id.toString()
          }
        )
      }
    }.bind(this)

    checkbox3.onclick = function (this: EditarActaVerificacionComponent) {
      if (checkbox3.checked != false) {
        checkbox1.checked = false;
        checkbox2.checked = false;

        this.act_visita_previa_bool = false;
        this.act_visita_seguimiento_bool = false;
        this.act_visita_reactivacion_bool = true;


        tipo_visita = 'reactivacion'
        servicio_acta.listaUltimaActaVerificacion(tipo_visita).subscribe(
          data => {
            acta_verificacion = data
            var acta = (document.getElementById('acta')) as HTMLSelectElement
            acta.value = acta_verificacion.act_id.toString()
          }
        )
      }
    }.bind(this)
  }

  onUpdate() {

  }
}
