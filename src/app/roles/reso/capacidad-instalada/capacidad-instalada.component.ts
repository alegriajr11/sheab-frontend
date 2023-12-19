import { Component } from '@angular/core';
import { ServiciosVerificadosDto } from 'src/app/models/Resolucion/ServiciosVerificados/servicios-verificados.dto';
import { ServiciosVerificadosService } from 'src/app/services/Resolucion/ServiciosVerificados/servicios-verificados.service';
import { ActaVerificacionService } from 'src/app/services/Resolucion/acta-verificacion.service';

@Component({
  selector: 'app-capacidad-instalada',
  templateUrl: './capacidad-instalada.component.html',
  styleUrls: ['./capacidad-instalada.component.css']
})
export class CapacidadInstaladaComponent {

  servicios_verificados: ServiciosVerificadosDto[]

  nombre_prestador: string
  nombre_municipio: string
  id_acta_verificacion: number
  pre_cod_habilitacion: string

  listaVacia: any = undefined;

  constructor(
    private actaVerificacionService: ActaVerificacionService,
    private serviciosVerificadosService: ServiciosVerificadosService
  ) { }

  ngOnInit() {
    this.capturarActa();
    this.listarServicios();
    this.refreshOne();
  }

  onRegister(): void {

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
    this.pre_cod_habilitacion = localStorage.getItem('pre_cod_habilitacion')
    this.nombre_prestador = localStorage.getItem('nombre-pres-verificacion')
    this.id_acta_verificacion = parseInt(localStorage.getItem('id_acta_verificacion'))

    this.actaVerificacionService.oneActaVerificacion(this.id_acta_verificacion).subscribe(
      data => {
        this.nombre_municipio = data.act_municipio
      },
      err => {
        err.error.message
      }
    )
  }

  //LISTAR LOS SERVICIOS DEL PRESTADOR
  listarServicios() {
    this.serviciosVerificadosService.listarServiciosVerificados(this.pre_cod_habilitacion).subscribe(
      data => {
        this.servicios_verificados = data;
      },
      err => {
        this.listaVacia = err.error.message;

      }
    )
  }

  public separarConComas(texto: string): string {
    if (texto) {
      return texto.endsWith(', ') ? texto : texto + ', '; // Agrega una coma si no está presente
    }
    return ''
  }



}
