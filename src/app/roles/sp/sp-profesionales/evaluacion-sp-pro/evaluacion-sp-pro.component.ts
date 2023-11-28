import { Component, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CriterioIndDto } from 'src/app/models/SpInd/criterioind.dto';
import { EtapaDto } from 'src/app/models/SpInd/etapa.dto';
import { CriterioIndService } from 'src/app/services/SpInd/criterio.service';
import { EvaluacionIndService } from 'src/app/services/SpInd/evaluacion-ind.service';
import { SharedServiceService } from 'src/app/services/shared-service.service';

@Component({
  selector: 'app-evaluacion-sp-pro',
  templateUrl: './evaluacion-sp-pro.component.html',
  styleUrls: ['./evaluacion-sp-pro.component.css']
})
export class EvaluacionSpProComponent {
  criterioIndEtapa1: CriterioIndDto[];
  criterioIndEtapa2: CriterioIndDto[];
  criterioIndEtapa3: CriterioIndDto[];
  criterioIndEtapa4: CriterioIndDto[];

  etapaInd: EtapaDto

  Etapa1: string = 'COMPROMISO DEL PROFESIONAL INDEPENDIENTE CON LA ATENCION  SEGURA DEL PACIENTE'
  Etapa2: string = 'CONOCIMIENTOS BÁSICOS DE LA SEGURIDAD DEL PACIENTE'
  Etapa3: string = 'REGISTRO DE FALLAS EN LA ATENCIÓN EN SALUD y PLAN DE MEJORAMIENTO'
  Etapa4: string = 'DETECCIÓN, PREVENCIÓN Y CONTROL DE INFECCIONES ASOCIADAS AL CUIDADO'

  valorEtapa1: string = '1'
  valorEtapa2: string = '2'
  valorEtapa3: string = '3'
  valorEtapa4: string = '4'

  captUsuario: string
  captCargoUsuario: string
  captCargoPres: string
  captCodPres: string

  criteriosGuardados: any[] = [];

  eva_ind_id: number
  cri_ind_id: number

  //NOMBRE DEL PRESTADOR
  nombre_prestador: string

  // Objeto Deshabilitar Boton
  botonDeshabilitado: { [key: number]: boolean } = {};

  listaVacia: any = undefined;

  public modalRef: BsModalRef;

  constructor(
    private criterioIndService: CriterioIndService,
    private modalService: BsModalService,
    public sharedService: SharedServiceService,
    private evaluacionIndService: EvaluacionIndService,
  ) { }

  ngOnInit(): void {

    this.inicializarMetodos();
    //GUARDAR LOS CRITERIOS CON CUMPLIMIENTO ASIGNADO
    const storedCriteriosIndGuardados = localStorage.getItem('criteriosIndGuardados');

    if (storedCriteriosIndGuardados) {
      this.sharedService.criteriosIndGuardados = JSON.parse(storedCriteriosIndGuardados);
      // Configura botonDeshabilitado según los criterios con cumplimientos asignados
      for (const cri_id of this.sharedService.criteriosIndGuardados) {
        this.botonDeshabilitado[cri_id] = true;
      }
    }
  }

    //PROTEGER LA RUTA AL SALIR DEL EDITAR
    async deshabilitarRutaEditar() {
      localStorage.removeItem('boton-acta-sp-ind');
      localStorage.removeItem('id_acta_ind');
      this.sharedService.criteriosIndGuardados = [];    
      this.cri_ind_id = null
      this.eva_ind_id = null
    }

  inicializarMetodos() {
    this.cargarCriteriosIndEtapa1();
    this.cargarCriteriosIndEtapa2();
    this.cargarCriteriosIndEtapa3();
    this.cargarCriteriosIndEtapa4();
    this.evaluacionRegistrada();
  }


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

  //ESTABLECER LOS COLORES POR CUMPLIMIENTO
  getClassForCriterio(criterio: any): string {
    if (this.sharedService.criteriosIndGuardados.includes(criterio.cri_id)) {
      return 'btn-success';
    }
    return 'btn-outline-dark';
  }


  evaluacionRegistrada() {
    const act_ind_id = localStorage.getItem('id_acta_ind')
    this.eva_ind_id = parseInt(act_ind_id, 10);
    this.evaluacionIndService.evaluacionInd(this.eva_ind_id).subscribe(
      (data) => {
        this.nombre_prestador = data.eval_acta_ind.act_prestador
      }
    )
  }

}
