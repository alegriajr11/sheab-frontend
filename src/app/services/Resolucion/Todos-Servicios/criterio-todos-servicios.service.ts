import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CriterioTodosServiciosDto } from 'src/app/models/Resolucion/Todos_Servicios/criterio-todos-servicios.dto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CriterioTodosServiciosService {

    /*todosserviciosURL: 'http://localhost:8080/criterio-servicios/'*/

    todos_serviciosURL = environment.todos_serviciosURL

  constructor(private httpClient: HttpClient,) { }

  public listForEstandar(est: string): Observable<CriterioTodosServiciosDto[]>{
    console.log(est)
    return this.httpClient.get<CriterioTodosServiciosDto[]>(this.todos_serviciosURL + est)
  }

  public listaAllCriterios(): Observable<CriterioTodosServiciosDto[]>{
    return this.httpClient.get<CriterioTodosServiciosDto[]>(this.todos_serviciosURL)
  }


  
}
