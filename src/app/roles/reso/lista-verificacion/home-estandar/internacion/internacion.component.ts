import { Component, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CriteriosInternacionDto } from 'src/app/models/Resolucion/GrupoInternacion/criterios-internacion-servicios.dto';
import { EstandarInternacionDto } from 'src/app/models/Resolucion/GrupoInternacion/estandar-internacion.dto';
import { ServicioInternacionDto } from 'src/app/models/Resolucion/GrupoInternacion/servicios-internacion.dto';
import { SharedServiceService } from 'src/app/services/shared-service.service';

@Component({
  selector: 'app-internacion',
  templateUrl: './internacion.component.html',
  styleUrls: ['./internacion.component.css']
})
export class InternacionComponent {


  public page: number = 1;
  searchText: any;

  listaVacia: any = undefined;

  servicios_internacion: ServicioInternacionDto[];
  estandar_internacion: EstandarInternacionDto[];
  criterios_internacion: CriteriosInternacionDto[];

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

  ngOnInit(): void {
    this.id_grupo_consulta_externa = this.sharedService.id_grupo_consulta_externa
    this.capturarNombrePrestador()
    this.refreshOne()
  }



  //SLIDER FUNCIONAL EN EL COMPONENTE ACTUAL
  refreshOne() {
    const hasRefreshed = localStorage.getItem('hasRefreshed');

    if (!hasRefreshed) {
      // Realizar la lógica que necesitas hacer una vez aquí
      // Por ejemplo:
      console.log('El componente se ha refrescado una vez');

      // Establecer la bandera en el almacenamiento de sesión para evitar más refrescos
      localStorage.setItem('hasRefreshed', 'true');

      // Hacer un refresh manual después de un breve tiempo (por ejemplo, 1 segundo)
      setTimeout(() => {
        window.location.reload();
      }, 10);
    }
  }

  ngOnDestroy(): void {
    // Eliminar la variable del almacenamiento al salir del componente
    localStorage.removeItem('hasRefreshed');
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
    const selectedStandardObj = this.estandar_internacion.find(standard => standard.ext_id.toString() === this.selectedStandard);
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
