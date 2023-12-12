import { Component, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CriteriosConsultaExternaDto } from 'src/app/models/Resolucion/GrupoConsultaExterna/criterios-consulta-externa-servicios.dto';
import { EstandarConsultaExternaDto } from 'src/app/models/Resolucion/GrupoConsultaExterna/estandar-consulta-externa.dto';
import { ServicioConsultaExternaDto } from 'src/app/models/Resolucion/GrupoConsultaExterna/servicios-consulta-externa.dto';
import { SharedServiceService } from 'src/app/services/shared-service.service';

@Component({
  selector: 'app-consulta-externa',
  templateUrl: './consulta-externa.component.html',
  styleUrls: ['./consulta-externa.component.css']
})
export class ConsultaExternaComponent {

  public page: number = 1;
  searchText: any;

  listaVacia: any = undefined;

  servicios_consulta_externa: ServicioConsultaExternaDto[];
  estandar_consulta_externa: EstandarConsultaExternaDto[];
  criterios_consulta_externa: CriteriosConsultaExternaDto[];

  nombre_estadar: string

  nombre_prestador: string

  //ID DE EVALUACION CREADA
  eva_id: number

  selectedStandard: string = '';
  selectedServicio: string = '';

  //ESTADO DEL ESTANDAR
  selectedStandardState: string = '';


  //ID DEL GRUPO
  id_grupo_consulta_externa: number

  public modalRef: BsModalRef;

  constructor(
    public sharedService: SharedServiceService,
    private modalService: BsModalService,
  ) { }

  ngOnInit(): void{
    this.id_grupo_consulta_externa =  this.sharedService.id_grupo_consulta_externa
    this.capturarNombrePrestador()
  }


  cargarServicios() {

  }

  cargarCriterios() {

  }

  capturarNombrePrestador() {
    this.nombre_prestador = localStorage.getItem('nombre-pres-verificacion')
  }

  // Método que se activa al cambiar la selección del estándar
  onStandardChange() {
    const selectedStandardObj = this.estandar_consulta_externa.find(standard => standard.ext_id.toString() === this.selectedStandard);
    this.nombre_estadar = selectedStandardObj ? selectedStandardObj.ext_nombre_estandar : '';
  }

  //ESTABLECER LOS COLORES POR CUMPLIMIENTO
  getClassForCriterio(criterio: any): string {
    if (this.sharedService.criteriosConsultaExternaGuardados.includes(criterio.criext_id)) {
      return 'btn-success';
    }
    return 'btn-outline-dark';
  }

    //ABRIR MODAL PARA ASIGNAR CUMPLIMIENTO
    openModal(modalTemplate: TemplateRef<any>, cris_id: number, eva_id: number) {
      // this.sharedService.setIdEvaluacionVerificacion(eva_id)
      // this.sharedService.setIdCriterioTodosServicios(cris_id)
      this.modalRef = this.modalService.show(modalTemplate,
        {
          class: 'modal-dialogue-centered modal-md',
          backdrop: true,
          keyboard: true
        }
      );
    }

}
