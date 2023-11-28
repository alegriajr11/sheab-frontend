import { Component, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CriterioIndDto } from 'src/app/models/SpInd/criterioind.dto';
import { CalificacionIndService } from 'src/app/services/SpInd/calificacion-ind.service';
import { CriterioIndService } from 'src/app/services/SpInd/criterio.service';
import { EvaluacionIndService } from 'src/app/services/SpInd/evaluacion-ind.service';
import { SharedServiceService } from 'src/app/services/shared-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-evaluacion-sp-pro',
  templateUrl: './editar-evaluacion-sp-pro.component.html',
  styleUrls: ['./editar-evaluacion-sp-pro.component.css']
})
export class EditarEvaluacionSpProComponent {

  criterioIndEtapa1: CriterioIndDto[];
  criterioIndEtapa2: CriterioIndDto[];
  criterioIndEtapa3: CriterioIndDto[];
  criterioIndEtapa4: CriterioIndDto[];

  Etapa1: string = 'COMPROMISO DEL PROFESIONAL INDEPENDIENTE CON LA ATENCION  SEGURA DEL PACIENTE'
  Etapa2: string = 'CONOCIMIENTOS BÁSICOS DE LA SEGURIDAD DEL PACIENTE'
  Etapa3: string = 'REGISTRO DE FALLAS EN LA ATENCIÓN EN SALUD y PLAN DE MEJORAMIENTO'
  Etapa4: string = 'DETECCIÓN, PREVENCIÓN Y CONTROL DE INFECCIONES ASOCIADAS AL CUIDADO'

  valorEtapa1: string = '1'
  valorEtapa2: string = '2'
  valorEtapa3: string = '3'
  valorEtapa4: string = '4'

  listaVacia: any = undefined;

  //FORANEAS CRITERIO Y EVALUACION
  eva_ind_id: number
  cri_ind_id: number
  act_id: number

  nombre_prestador: string
  codigo_prestador: string


  //MODAL
  public modalRef: BsModalRef;

  constructor(
    private criterioIndService: CriterioIndService,
    private modalService: BsModalService,
    private activatedRoute: ActivatedRoute,
    public sharedService: SharedServiceService,
    private evaluacionIndService: EvaluacionIndService,
    private calificacionIndService: CalificacionIndService,
    private router: Router
  ) { }


  ngOnInit(): void {
    //OBTENER EL ID DEL ACTA PARA HACER LA SOLICITUD DE LA EVALUACIÓN
    const act_ind_id = this.activatedRoute.snapshot.params['id'];
    //ALMACENAR EL ID DEL ACTA
    this.act_id = act_ind_id
    //SOLICITUD AL SERVICIO PARA OBTENER LAS CALIFICACION QUE LE PERTENECEN A LA EVALUACIÓN
    this.calificacionIndService.getAllCalificacioneByEva(act_ind_id).subscribe(
      data => {
        if(data.length === 0){
          this.nombre_prestador
        }else {
          for (const criterio_id of data) {
            const cri_id = criterio_id.criterio_cal.cri_id
            this.sharedService.criteriosIndGuardados.push(cri_id)
            this.nombre_prestador = criterio_id.cal_evaluacion_independientes.eval_acta_ind.act_prestador
          }
        }
      }
    )

    //INICIALIZAR LOS METODOS CORRESPONDIENTES
    this.inicializarMetodos();
  }

  ngOnDestroy(){
    localStorage.removeItem('boton-editar-acta-sp-ind');
  }


  //PROTEGER LA RUTA AL SALIR DEL EDITAR
  async deshabilitarRutaEditar() {
    localStorage.removeItem('boton-editar-evaluacion-sp-ind');
    this.sharedService.criteriosIndGuardados = [];    
    this.cri_ind_id = null
    this.eva_ind_id = null
  }

  //METODO ABRIR MODAL PARA ASIGNAR UNA CALIFICACIÓN
  openModal(modalTemplate: TemplateRef<any>, id: number, eva_ind_id: number) {
    this.sharedService.setIdSpIndEvaluacion(eva_ind_id)
    this.eva_ind_id = eva_ind_id
    this.sharedService.setIdCriterioInd(id)
    this.cri_ind_id = id
    this.modalRef = this.modalService.show(modalTemplate,
      {
        class: 'modal-dialogue-centered modal-md',
        backdrop: true,
        keyboard: true
      }
    );
  }

  //INICIALIZAR METODOS PARA EL ngOnInit
  inicializarMetodos() {
    this.cargarCriteriosIndEtapa1();
    this.cargarCriteriosIndEtapa2();
    this.cargarCriteriosIndEtapa3();
    this.cargarCriteriosIndEtapa4();
    this.evaluacionRegistrada();
  }

  //LISTAR LOS CRITERIOS DE LA ETAPA UNO
  cargarCriteriosIndEtapa1(): void {
    this.criterioIndService.listaAct(this.valorEtapa1).subscribe(
      data => {
        this.criterioIndEtapa1 = data;
        this.listaVacia = undefined
      },
      err => {
        this.listaVacia = err.error.message;
      }
    )
  }

  //LISTAR LOS CRITERIOS DE LA ETAPA DOS
  cargarCriteriosIndEtapa2(): void {
    this.criterioIndService.listaAct(this.valorEtapa2).subscribe(
      data => {
        this.criterioIndEtapa2 = data;
        this.listaVacia = undefined
      },
      err => {
        this.listaVacia = err.error.message;
      }
    )
  }

    //LISTAR LOS CRITERIOS DE LA ETAPA TRES
  cargarCriteriosIndEtapa3(): void {
    this.criterioIndService.listaAct(this.valorEtapa3).subscribe(
      data => {
        this.criterioIndEtapa3 = data;
        this.listaVacia = undefined
      },
      err => {
        this.listaVacia = err.error.message;
      }
    )
  }

    //LISTAR LOS CRITERIOS DE LA ETAPA CUATRO
  cargarCriteriosIndEtapa4(): void {
    this.criterioIndService.listaAct(this.valorEtapa4).subscribe(
      data => {
        this.criterioIndEtapa4 = data;
        this.listaVacia = undefined
      },
      err => {
        this.listaVacia = err.error.message;
      }
    )
  }

  //ESTABLECER LOS COLORES POR CALIFICACIÓN
  getClassForCriterio(criterio: any): string {
    if (this.sharedService.criteriosIndGuardados.includes(criterio.cri_id)) {
      return 'btn-success';
    }
    return 'btn-outline-dark';
  }

  //OBTENER LA EVALUACIÓN REGISTRATA PARA TENER ACCESO AL ACTA
  evaluacionRegistrada() {
    this.evaluacionIndService.evaluacionInd(this.act_id).subscribe(
      (data) => {
        this.eva_ind_id = data.eva_id
        this.nombre_prestador = data.eval_acta_ind.act_prestador
        this.codigo_prestador = data.eval_acta_ind.act_cod_prestador
      }
    )
  }

  descargarEvaluacionInd(){
    Swal.fire({
      title: '¿Desea descargar la evaluación?',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        this.evaluacionIndService.descargarEvaluacionPdfInd(this.eva_ind_id, this.codigo_prestador)
        this.router.navigate(['/sp/evaluaciones-pro']);
        localStorage.removeItem('boton-editar-evaluacion-sp-ind');
        this.sharedService.criteriosIndGuardados = [];   
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.router.navigate(['/sp/evaluaciones-pro']);
        window.scrollTo(0, 0);
        localStorage.removeItem('boton-editar-evaluacion-sp-ind');
        this.sharedService.criteriosIndGuardados = [];
      }
    })

  }

}
