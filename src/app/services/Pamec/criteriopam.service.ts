import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { CriterioPam } from 'src/app/models/Pamec/criteriopam.dto';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CriteriopamService {

  //  criteriopamURL: 'http://localhost:8080/criteriopam/',
  //  criteriopam1URL: 'http://localhost:8080/criteriopam/criterio/',

  criteriopamURL = environment.criteriopamURL
  criteriopam1URL = environment.criteriopam1URL

  constructor(
    private httpClient: HttpClient,) { }

  //SOLICITUD LISTAR UN CRITERIO POR ID
  public detail(id: number): Observable<CriterioPam> {
    return this.httpClient.get<CriterioPam>(`${this.criteriopam1URL}${id}`);
  }

  //SOLICITUD LISTAR TODOS LOS CRITERIOS
  public lista(): Observable<CriterioPam[]> {
    return this.httpClient.get<CriterioPam[]>(`${this.criteriopamURL}`);
  }

  //SOLICITUD LISTAR CRITERIOS POR ACTIVIDAD
  public listAct(act: string): Observable<CriterioPam[]>{
    return this.httpClient.get<CriterioPam[]>(this.criteriopamURL + act)
  }

  //SOLICITUD ELIMINAR UN CRITERIO
  public delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.criteriopamURL}${id}`);
  }

  //SOLICITUD GUARDAR CRITERIO PAMEC
  public save(id: string, criterio: CriterioPam): Observable<any> {
    return this.httpClient.post<any>(`${this.criteriopamURL}${id}`, criterio)

  }

  //SOLICITUD ACTUALIZAR CRITERIO PAMEC
  public update(id: number, criterio: CriterioPam): Observable<any> {
    return this.httpClient.put<any>(`${this.criteriopamURL}${id}`, criterio);
  }

}
