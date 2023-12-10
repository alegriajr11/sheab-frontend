import { Component } from '@angular/core';
import { EstandarApoyoDiagnosticoDto } from 'src/app/models/Resolucion/GrupoApoyoDiagnostico/estandar-apoyo-diagnostico.dto';
import { ServicioApoyoDiagnosticoDto } from 'src/app/models/Resolucion/GrupoApoyoDiagnostico/servicio-apoyo-diagnostico.dto';

@Component({
  selector: 'app-criterios-grupo-apoyo-diagnostico',
  templateUrl: './criterios-grupo-apoyo-diagnostico.component.html',
  styleUrls: ['./criterios-grupo-apoyo-diagnostico.component.css']
})
export class CriteriosGrupoApoyoDiagnosticoComponent {

  estandar_apoyo_diagnostico: EstandarApoyoDiagnosticoDto[]
  servicios_apoyo_diagnostico: ServicioApoyoDiagnosticoDto[]

  constructor(){}

  cargarCriterios(){

  }


  llenarSpan(){

  }
}
