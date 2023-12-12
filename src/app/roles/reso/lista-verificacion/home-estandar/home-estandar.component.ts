import { Component } from '@angular/core';
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
    private sharedService: SharedServiceService
  ) { }

  ngOnInit(): void {
    this.capturarActa();
  }

  enviarIdGrupoConsultaExterna(id_grupo: number){
    this.sharedService.setIdGrupoConsultaExterna(id_grupo)
  }

  enviarIdGrupoApoyoDiagnostico(id_grupo: number){

  }
  enviarIdGrupoAtencionInmediata(id_grupo: number){

  }

  enviarIdGrupoInternacion(id_grupo: number){

  }

  enviarIdGrupoQuirurgico(id_grupo: number){

  }

  capturarActa() {
    this.nombre_prestador = localStorage.getItem('nombre-pres-verificacion')
    this.id_acta_verificacion = parseInt(localStorage.getItem('id_acta_verificacion'))
  }
}
