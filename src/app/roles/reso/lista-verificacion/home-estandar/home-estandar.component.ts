import { Component } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SharedServiceService } from 'src/app/services/shared-service.service';

@Component({
  selector: 'app-home-estandar',
  templateUrl: './home-estandar.component.html',
  styleUrls: ['./home-estandar.component.css']
})
export class HomeEstandarComponent {

  //ATRIBUTOS PRESTADOR
  nombre_prestador: string
  nombre_municipio: string
  id_acta_verificacion: number

  constructor(
    private sharedService: SharedServiceService,
    private ngxLoader: NgxUiLoaderService
  ) { }

  ngOnInit(): void {
    this.capturarActa();
    this.refreshOne();
  }

  //FUNCIONALIDAD DEL SLIDER BAR
  refreshOne() {
    const hasRefreshed = localStorage.getItem('hasRefreshed');

    if (!hasRefreshed) {
      // Establecer la bandera en el almacenamiento de sesión para evitar más refrescos
      localStorage.setItem('hasRefreshed', 'true');

      // Hacer un refresh manual después de un breve tiempo
      setTimeout(() => {
        this.ngxLoader.start(); // Inicia el loader
        window.location.reload();
      }, 10);
    }
  }

  ngOnDestroy(): void {
    // Eliminar la variable del almacenamiento al salir del componente
    localStorage.removeItem('hasRefreshed');
  }


  enviarIdGrupoConsultaExterna(id_grupo: number) {
    this.sharedService.setIdGrupoConsultaExterna(id_grupo)
  }

  enviarIdGrupoApoyoDiagnostico(id_grupo: number) {

  }
  enviarIdGrupoAtencionInmediata(id_grupo: number) {

  }

  enviarIdGrupoInternacion(id_grupo: number) {

  }

  enviarIdGrupoQuirurgico(id_grupo: number) {

  }

  capturarActa() {
    this.nombre_prestador = localStorage.getItem('nombre-pres-verificacion')
    this.id_acta_verificacion = parseInt(localStorage.getItem('id_acta_verificacion'))
  }
}
