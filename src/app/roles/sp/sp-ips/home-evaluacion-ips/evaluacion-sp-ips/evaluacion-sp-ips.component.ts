import { ChangeDetectorRef, Component, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AjusteDto } from 'src/app/models/SpIps/criterioAjuste.dto';
import { ImplementacionDto } from 'src/app/models/SpIps/criterioImplementacion.dto';
import { PlaneacionDto } from 'src/app/models/SpIps/criterioPlaneacion.dto';
import { VerificacionDto } from 'src/app/models/SpIps/criterioVerificacion.dto';
import { AjusteService } from 'src/app/services/SpIps/ajuste.service';
import { CalificacionIpsService } from 'src/app/services/SpIps/calificacion-ips.service';
import { EvaluacionipsService } from 'src/app/services/SpIps/evaluacionips.service';
import { ImplementacionService } from 'src/app/services/SpIps/implementacion.service';
import { PlaneacionService } from 'src/app/services/SpIps/planeacion.service';
import { VerificacionService } from 'src/app/services/SpIps/verificacion.service';
import { SharedServiceService } from 'src/app/services/shared-service.service';


@Component({
  selector: 'app-evaluacion-sp-ips',
  templateUrl: './evaluacion-sp-ips.component.html',
  styleUrls: ['./evaluacion-sp-ips.component.css']
})
export class EvaluacionSpIpsComponent {

  captCargoPres: string
  captCodPres: string

  numero_evaluacion: number
  nombre_evaluacion: string

  nombrePrestador: string = '';

  id_evaluacion_ips: number

  id_acta: number

  listaVacia: any = undefined;

  //ARREGLOS PARA ALMACENAR LOS CRITERIOS POR ID DE EVALUACIÓN
  criteriosAjuste: AjusteDto[]
  criteriosImplementacion: ImplementacionDto[]
  criteriosPlaneacion: PlaneacionDto[]
  criteriosVerificacion: VerificacionDto[]

  //MODAL
  public modalRef: BsModalRef;

  constructor(
    private sharedService: SharedServiceService,
    private evaluacionIpsService: EvaluacionipsService,
    private criteriosAjusteService: AjusteService,
    private criteriosImplementacionService: ImplementacionService,
    private criteriosPlaneacionService: PlaneacionService,
    private criteriosVerificacionService: VerificacionService,
    private calificacionIpsService: CalificacionIpsService,
    private modalService: BsModalService,
    private router: Router
  ) { }


  ngOnInit(): void {
    this.nombrePrestador = localStorage.getItem('nombre-pres-sp-ips')
    const idEvaluacionStr = localStorage.getItem('id_evaluacion_ips'); // Obtener el valor de localStorage como una cadena
    this.id_evaluacion_ips = parseInt(idEvaluacionStr, 10);

    //CAPTURAR EL ID DEL ACTA ENVIADA POR EL LOCALSTORAGE
    const idActaStr = localStorage.getItem('acta_id'); //Obtener el valor de localStorage como una cadena del id_acta
    this.id_acta = parseInt(idActaStr, 10)

    this.inicializarMetodos();
  }

  // //DESTRUIR LAS VARIABLES AL SALIR DEL COMPONENTE
  // ngOnDestroy() {
  //   this.sharedService.criteriosIpsAjusteGuardados = []
  //   this.sharedService.criteriosIpsImplementacionGuardados = []
  //   this.sharedService.criteriosIpsPlaneacionGuardados = []
  //   this.sharedService.criteriosIpsVerificacionGuardados = []
  // }



  volver() {
    this.router.navigate(['/sp/home-evaluacion-ips']);
  }

  //INICIALIZAR METODOS PARA ngOnInit
  inicializarMetodos() {
    this.cargarCriteriosAjuste();
    this.cargarCriteriosImplementacion();
    this.cargarCriteriosPlaneacion();
    this.cargarCriteriosVerificacion();
    this.nombreEvaluacion();
    this.solicitarCalificacionesEvaluacion();
  }

  //OBTENER EL NOMBRE DE LA EVALUACION
  async nombreEvaluacion() {
    const evaluacion = await this.evaluacionIpsService.listOne(this.id_evaluacion_ips).toPromise()
    this.nombre_evaluacion = evaluacion.evips_nombre
    this.numero_evaluacion = evaluacion.evips_id
  }

  //LISTAR CRITERIOS AJUSTE
  cargarCriteriosAjuste() {
    this.criteriosAjusteService.listaAjuste(this.id_evaluacion_ips).subscribe(
      data => {
        this.criteriosAjuste = data;
        this.listaVacia = undefined;
      },
      err => {
        this.listaVacia = err.error.message;
      }
    )
  }

  //LISTAR CRITERIOS IMPLEMENTACION
  cargarCriteriosImplementacion() {
    this.criteriosImplementacionService.listaImpl(this.id_evaluacion_ips).subscribe(
      data => {
        this.criteriosImplementacion = data;
        this.listaVacia = undefined;
      },
      err => {
        this.listaVacia = err.error.message;
      }
    )
  }

  //LISTAR CRITERIOS PLANEACION
  cargarCriteriosPlaneacion() {
    this.criteriosPlaneacionService.listaPlaneacion(this.id_evaluacion_ips).subscribe(
      data => {
        this.criteriosPlaneacion = data;
        this.listaVacia = undefined;
      },
      err => {
        this.listaVacia = err.error.message;
      }
    )
  }

  //LISTAR CRITERIOS VERIFICACION
  cargarCriteriosVerificacion() {
    this.criteriosVerificacionService.listaVerf(this.id_evaluacion_ips).subscribe(
      data => {
        this.criteriosVerificacion = data;
        this.listaVacia = undefined;
      },
      err => {
        this.listaVacia = err.error.message;
      }
    )
  }

  solicitarCalificacionesEvaluacion() {
    this.solicitudCalificacionesAjuste();
    this.solicitudCalificacionesImplementacion();
    this.solicitudCalificacionesPlaneacion();
    this.solicitudCalificacionesVerificacion();
  }

  
  //SOLICITAR LAS CALIFICACIONES DE AJUSTE
  solicitudCalificacionesAjuste() {
    //SOLICITUD AL SERVICIO PARA OBTENER LAS CALIFICACIONES DE AJUSTE QUE LE PERTENECEN A EL ACTA
    this.calificacionIpsService.getAllCalificacionesAjuste(this.id_evaluacion_ips, this.id_acta).subscribe(
      data => {
        for (const criterio of data) {
          const cri_aju_id = criterio.calificacionipsAjuste.cri_aju_id
          this.sharedService.criteriosIpsAjusteGuardados.push(cri_aju_id)
        }
      }
    )
  }

  //SOLICITAR LAS CALIFICACIONES DE IMPLEMENTACION
  solicitudCalificacionesImplementacion() {
    //SOLICITUD AL SERVICIO PARA OBTENER LAS CALIFICACIONES DE IMPLEMENTACION QUE LE PERTENECEN A EL ACTA
    this.calificacionIpsService.getAllCalificacionesImplementacion(this.id_evaluacion_ips, this.id_acta).subscribe(
      data => {
        for (const criterio of data) {
          const cri_imp_id = criterio.calificacionipsImpl.cri_imp_id
          this.sharedService.criteriosIpsImplementacionGuardados.push(cri_imp_id)
        }
      }
    )
  }

  //SOLICITAR LAS CALIFICACIONES DE PLANEACION
  solicitudCalificacionesPlaneacion() {
    //SOLICITUD AL SERVICIO PARA OBTENER LAS CALIFICACIONES DE IMPLEMENTACION QUE LE PERTENECEN A EL ACTA
    this.calificacionIpsService.getAllCalificacionesPlaneacion(this.id_evaluacion_ips, this.id_acta).subscribe(
      data => {
        for (const criterio of data) {
          const cri_pla_id = criterio.calificacionipsPlaneacion.cri_pla_id
          this.sharedService.criteriosIpsPlaneacionGuardados.push(cri_pla_id)
        }
      }
    )
  }

  //SOLICITAR LAS CALIFICACIONES DE VERIFICACION
  solicitudCalificacionesVerificacion() {
    //SOLICITUD AL SERVICIO PARA OBTENER LAS CALIFICACIONES DE IMPLEMENTACION QUE LE PERTENECEN A EL ACTA
    this.calificacionIpsService.getAllCalificacionesVerificacion(this.id_evaluacion_ips, this.id_acta).subscribe(
      data => {
        for (const criterio of data) {
          const cri_ver_id = criterio.calificacionipsVerif.cri_ver_id
          this.sharedService.criteriosIpsVerificacionGuardados.push(cri_ver_id)
        }
      }
    )
  }

  //ESTABLECER LOS COLORES POR CALIFICACIÓN
  getClassForCriterio(criterio: any, nombre_etapa: string): string {
    switch (nombre_etapa) {
      case 'ajuste':
        return this.sharedService.criteriosIpsAjusteGuardados.includes(criterio.cri_aju_id) ? 'btn-success' : 'btn-outline-dark';
      case 'implementacion':
        return this.sharedService.criteriosIpsImplementacionGuardados.includes(criterio.cri_imp_id) ? 'btn-success' : 'btn-outline-dark';
      case 'planeacion':
        return this.sharedService.criteriosIpsPlaneacionGuardados.includes(criterio.cri_pla_id) ? 'btn-success' : 'btn-outline-dark';
      case 'verificacion':
        return this.sharedService.criteriosIpsVerificacionGuardados.includes(criterio.cri_ver_id) ? 'btn-success' : 'btn-outline-dark';
      default:
        return 'btn-outline-dark';
    }
  }

  //METODO ABRIR MODAL PARA ASIGNAR UNA CALIFICACIÓN
  openModal(modalTemplate: TemplateRef<any>, cri_id: number, eva_ips_id: number, etapa: string, id_acta: number) {
    this.sharedService.setIdEvaluacionSpIps(eva_ips_id)
    this.sharedService.setIdCriterioSpIps(cri_id)
    //Obtener el nombre de la etapa a calificar
    this.sharedService.setNameEtapaSpIps(etapa)
    //Enviar ID de Acta
    this.sharedService.setIdActaIps(id_acta)
    this.modalRef = this.modalService.show(modalTemplate,
      {
        class: 'modal-dialogue-centered modal-md',
        backdrop: true,
        keyboard: true
      }
    );
  }


}
