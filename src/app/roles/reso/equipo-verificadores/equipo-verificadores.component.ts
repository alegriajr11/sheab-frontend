import { Component, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ActaVerificacionDto } from 'src/app/models/Actas/actaVerificacion.dto';
import { Usuario } from 'src/app/models/usuario';
import { ActaVerificacionService } from 'src/app/services/Resolucion/acta-verificacion.service';
import { SharedServiceService } from 'src/app/services/shared-service.service';

@Component({
  selector: 'app-equipo-verificadores',
  templateUrl: './equipo-verificadores.component.html',
  styleUrls: ['./equipo-verificadores.component.css']
})
export class EquipoVerificadoresComponent {

  //ATRIBUTOS PRESTADOR
  nombre_prestador: string
  nombre_municipio: string
  id_acta_verificacion: number

  usuarios_verificadores: Usuario

  numero_acta: number

  listaVacia: any = undefined;

  searchText: any;
  public page!: number;

  //Variable modal
  public modalRef: BsModalRef;


  constructor(
    private actaVerificacionService: ActaVerificacionService,
    private modalService: BsModalService,
    public sharedService: SharedServiceService,
  ) { }

  ngOnInit(): void {
    this.capturarActa();
    this.verificadoresAsignados();
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


  capturarActa() {
    this.nombre_prestador = localStorage.getItem('nombre-pres-verificacion')
    this.id_acta_verificacion = parseInt(localStorage.getItem('id_acta_verificacion'))

    this.actaVerificacionService.oneActaVerificacion(this.id_acta_verificacion).subscribe(
      data => {
        this.nombre_municipio = data.act_municipio
        this.numero_acta = data.act_id
      },
      err => {
        err.error.message
      }
    )
  }

  //LISTAR VERIFICADORES ASIGNADOS AL ACTA
  verificadoresAsignados() {
    this.actaVerificacionService.listarUsuarioAsignados(this.id_acta_verificacion).subscribe(
      data => {
        this.usuarios_verificadores = data
      },
      err => {
        this.listaVacia = err.error.message;
      }
    )
  }

  openModalEditar(modalTemplate: TemplateRef<any>, id_usuario: number) {
    this.sharedService.setIdUsuario(id_usuario)
    this.sharedService.setIdActaVerificacion(this.id_acta_verificacion)
    this.modalRef = this.modalService.show(modalTemplate,
      {
        class: 'modal-dialogue-centered modal-md',
        backdrop: true,
        keyboard: true
      }
    );
  }
}
