import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { VerificacionDto } from 'src/app/models/SpIps/criterioVerificacion.dto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VerificacionService {
  //verificacionURL: 'http://localhost:8080/criterioverif/',
  //verificacionOneURL: 'http://localhost:8080/criterioverif/verificacion/',


  verificacionURL = environment.verificacionURL;
  verificacionOneURL = environment.verificacionOneURL;


  constructor(private httpClient: HttpClient) { }

  public detail(id: number): Observable<VerificacionDto> {
    return this.httpClient.get<VerificacionDto>(`${this.verificacionOneURL}${id}`);
  }

  //LISTAR CRITERIOS POR ID DE EVALUCIÓN
  public listaVerf(id: number): Observable<VerificacionDto[]>{
    return this.httpClient.get<VerificacionDto[]>(this.verificacionURL + id)
  }

  public delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.verificacionURL}${id}`);
  }

  public update(id: number, criterio: VerificacionDto): Observable<any> {
    return this.httpClient.put<any>(`${this.verificacionURL}${id}`, criterio);
  }

}
