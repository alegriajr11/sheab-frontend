import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CumplimientoTodosServiciosDto } from 'src/app/models/Resolucion/Todos_Servicios/cumplimiento-servicios.dto';
import { TodosServiciosDto } from 'src/app/models/Resolucion/Todos_Servicios/estandar-servicios.dto';
import { TokenDto } from 'src/app/models/token.dto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TodosServiciosService {

  /*todosserviciosURL: 'http://localhost:8080/criterio-servicios/'*/

  todos_serviciosURL = environment.todos_serviciosURL
  cumplimiento_todos_serviciosURL = environment.cumplimiento_todos_serviciosUrl

  constructor(private httpClient: HttpClient) { }

  //PETICIÓN AL BACKEND PARA LISTAR LOS ESTANDARES DE TODOS LOS SERVICIOS 
  public lista(): Observable<TodosServiciosDto[]> {
    return this.httpClient.get<TodosServiciosDto[]>(this.todos_serviciosURL + 'estandar')
  }

  //LISTAR TODAS LOS CUMPLIMIENTOS DE TODOS LOS SERVICIOS POR ID EVALUACION
  getAllCumplimientosTodosServicios(eva_id: number): Observable<CumplimientoTodosServiciosDto[]> {
    return this.httpClient.get<CumplimientoTodosServiciosDto[]>(this.cumplimiento_todos_serviciosURL + 'cumplimientos/evaluacion/' + eva_id)
  }

  //REGISTRO CUMPLIMIENTO
  public createCumplimientoServicios(dto: CumplimientoTodosServiciosDto, tokenDto: TokenDto): Observable<any> {
    const body = {
      dto: dto,
      tokenDto: tokenDto
    }
    return this.httpClient.post<any>(this.cumplimiento_todos_serviciosURL, body);
  }

  //SOLICITUD ACTUALIZAR CUMPLIMIENTO
  public update(id: number, cumplimientoDto: CumplimientoTodosServiciosDto, tokenDto: TokenDto): Observable<any> {
    const payloads = {
      dto: cumplimientoDto,
      tokenDto: tokenDto
    }
    return this.httpClient.put<any>(`${this.cumplimiento_todos_serviciosURL}${id}`, payloads);
  }

  //LISTAR CUMPLIMIENTO POR ID_CRITERIO Y ID_EVALUACIÓN
  getCriterioByEvaluacion(cris_id: number, eva_id: number): Observable<CumplimientoTodosServiciosDto> {
    let url = `${this.cumplimiento_todos_serviciosURL}?cris_id=${cris_id}&eva_id=${eva_id}`;

    return this.httpClient.get<CumplimientoTodosServiciosDto>(url)
  }
}
