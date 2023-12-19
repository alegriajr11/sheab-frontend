import { Component, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CondicionesHabilitacionDto } from 'src/app/models/Resolucion/CondicionesHabilitacion/condicion-habilitacion.dto';
import { CondicionesHabilitacionService } from 'src/app/services/Resolucion/CondicionesHabilitacion/condiciones-habilitacion.service';
import { SharedServiceService } from 'src/app/services/shared-service.service';

@Component({
  selector: 'app-cumplimiento-requisitos',
  templateUrl: './cumplimiento-requisitos.component.html',
  styleUrls: ['./cumplimiento-requisitos.component.css']
})
export class CumplimientoRequisitosComponent {

  condiciones_habilitacion: CondicionesHabilitacionDto[]

  listaVacia: any = undefined;

  searchText: any;

  public page!: number;

  public modalRef: BsModalRef;

  //ATRIBUTOS PRESTADOR
  nombre_prestador: string
  nombre_municipio: string
  id_acta_verificacion: number

  constructor(
    private readonly condicionesHabilitacionService: CondicionesHabilitacionService,
    private modalService: BsModalService,
    public sharedService: SharedServiceService,
  ) { }

  ngOnInit(): void {
    this.incializarMetodos();
    this.capturarActa();
  }

  incializarMetodos() {
    this.cargarCondicionesHabilitacion();
    this.refreshOne();
  }



  //SLIDER FUNCIONAL EN EL COMPONENTE ACTUAL
  refreshOne(){
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


  cargarCondicionesHabilitacion() {
    this.condicionesHabilitacionService.listaCondiciones().subscribe(
      data => {
        this.condiciones_habilitacion = data
        this.listaVacia = undefined
      },
      err => {
        this.listaVacia = err.error.message;
      }
    )
  }

  //ESTABLECER LOS COLORES POR CUMPLIMIENTO
  getClassForCodicion(condicion: any): string {
    if (this.sharedService.condicionesHabilitacionGuardados.includes(condicion.conc_id)) {
      return 'btn-success';
    }
    return 'btn-outline-dark';
  }

  openModal(modalTemplate: TemplateRef<any>, id: number, nombre_condicion: string) {
    this.sharedService.setIdCodicionHabilitacion(id)
    this.sharedService.setNombreCondicionHabilitacion(nombre_condicion)
    this.modalRef = this.modalService.show(modalTemplate,
      {
        class: 'modal-dialogue-centered modal-md',
        backdrop: true,
        keyboard: true
      }
    );
  }

  capturarActa() {
    this.nombre_prestador = localStorage.getItem('nombre-pres-verificacion')
    this.id_acta_verificacion = parseInt(localStorage.getItem('id_acta_verificacion'))
  }
}
