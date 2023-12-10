import { Component } from '@angular/core';
import { EstandarConsultaExternaDto } from 'src/app/models/Resolucion/GrupoConsultaExterna/estandar-consulta-externa.dto';
import { ServicioConsultaExternaDto } from 'src/app/models/Resolucion/GrupoConsultaExterna/servicios-consulta-externa.dto';

@Component({
  selector: 'app-criterios-grupo-consulta-externa',
  templateUrl: './criterios-grupo-consulta-externa.component.html',
  styleUrls: ['./criterios-grupo-consulta-externa.component.css']
})
export class CriteriosGrupoConsultaExternaComponent {

  estandar_consulta_externa: EstandarConsultaExternaDto[]
  servicios_consulta_externa: ServicioConsultaExternaDto[]

  constructor(){}

  cargarCriterios(){

  }


  llenarSpan(){

  }
}
