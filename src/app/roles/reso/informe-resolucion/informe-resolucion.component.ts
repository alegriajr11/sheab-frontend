import { Component, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ActaVerificacionDto } from 'src/app/models/Actas/actaVerificacion.dto';
import { ActaVerificacionService } from 'src/app/services/Resolucion/acta-verificacion.service';
import { SharedServiceService } from 'src/app/services/shared-service.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-informe-resolucion',
  templateUrl: './informe-resolucion.component.html',
  styleUrls: ['./informe-resolucion.component.css']
})
export class InformeResolucionComponent {

  actasVerificacion: ActaVerificacionDto[] = [];

  listaVacia: any = undefined;

  searchText: any;

  tipo_visita: string

  public modalRef: BsModalRef;

  public fechaSeleccionada: string;

  public page!: number;

  constructor(
    private modalService: BsModalService,
    public sharedService: SharedServiceService,
    private actaVerificacionService: ActaVerificacionService,
    private tokenService: TokenService,
  ) { }

  ngOnInit(): void {
    this.cargarActas();
    this.obtenerAnios();
    this.refreshOne();
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


  cargarActas(): void {
    const token = this.tokenService.getToken()
    this.actaVerificacionService.listaActasVerificacion(token).subscribe(
      data => {
        this.actasVerificacion = data;
        this.listaVacia = undefined;
      },
      err => {
        this.listaVacia = err.error.message;
      }
    );
    this.page = 1;
    this.tipo_visita = 'Visita Verificación'
  }


  openModal(modalTemplate: TemplateRef<any>, id_verificacion: number, nombre_prestador: string) {
    this.sharedService.setIdEvaluacionVerificacion(id_verificacion)
    this.sharedService.setNombrePrestador(nombre_prestador)
    this.modalRef = this.modalService.show(modalTemplate,
      {
        class: 'modal-dialogue-centered modal-md',
        backdrop: true,
        keyboard: true
      }
    );

  }

  obtenerActasFechas(date: string) {

  }

  obtenerAnios(): void {
    const selectAnio = document.getElementById("select-anio") as HTMLSelectElement;
    const fechaActual = new Date();
    const anioActual = fechaActual.getFullYear();

    // Agregar una opción en blanco (vacía)
    const optionVacia = document.createElement("option");
    optionVacia.text = ""; // Texto vacío
    optionVacia.value = ""; // Valor vacío
    selectAnio.add(optionVacia);

    //Agregar Opciones de Año
    for (let i = anioActual; i >= 1900; i--) {
      const option = document.createElement("option");
      option.text = i.toString();
      option.value = i.toString();
      selectAnio.add(option);
    }
  }


}
