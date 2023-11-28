import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TodosServiciosDto } from 'src/app/models/Resolucion/Todos_Servicios/estandar-servicios.dto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TodosServiciosService {

  /*todosserviciosURL: 'http://localhost:8080/criterio-servicios/'*/

  todos_serviciosURL = environment.todos_serviciosURL

  constructor(private httpClient: HttpClient) { }

  //PETICIÓN AL BACKEND PARA LISTAR LOS ESTANDARES DE TODOS LOS SERVICIOS 
  public lista(): Observable<TodosServiciosDto[]>{
    return this.httpClient.get<TodosServiciosDto[]>(this.todos_serviciosURL + 'estandar')
  }

}
