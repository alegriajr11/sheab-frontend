import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CriterioSic } from 'src/app/models/Sic/criterio.dto';
import { CriterioSicEstandarDto } from 'src/app/models/Sic/criterioSicEstandar.dto';
import { CumplimientoSicEstandarDto } from 'src/app/models/Sic/cumplimientoEstandar.dto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CriterioSicService {

  //  criterioSicURL: 'http://localhost:8080/criteriosic/',

  criterioSicURL = environment.criterioSicURL



  constructor(private httpClient: HttpClient) { }

  public lista(): Observable<CriterioSic[]>{
    return this.httpClient.get<CriterioSic[]>(this.criterioSicURL)
  }

  public crearCriSic(criterio: CriterioSic): Observable<any>{
    return this.httpClient.post<any>(`${this.criterioSicURL}`, criterio);
  }

  public delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.criterioSicURL}${id}`);
  }

  public update(id: number, criteriosic: CriterioSic): Observable<any> {
    return this.httpClient.put<any>(`${this.criterioSicURL}${id}`, criteriosic);
  }

  public detail(id: number): Observable<CriterioSic> {
    return this.httpClient.get<CriterioSic>(`${this.criterioSicURL}${id}`);
  }




/*PETICIONES A CRITERIOS ESTANDAR*/

  public crearEstandar(criterioEs: CriterioSicEstandarDto): Observable<any>{
    return this.httpClient.post<any>(`${this.criterioSicURL}` + 'estandar', criterioEs);
  }

  public listaCriEstandar(): Observable<CriterioSicEstandarDto[]>{
    return this.httpClient.get<CriterioSicEstandarDto[]>(this.criterioSicURL + 'estandar/criterios')
  }

  public deleteEstandar(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.criterioSicURL + 'estandar/'+ id);
  }

  public detailEstandar(id: number): Observable<CriterioSicEstandarDto> {
    return this.httpClient.get<CriterioSicEstandarDto>(this.criterioSicURL + 'estandar/' + id);
  }




}
