import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ImplementacionDto } from 'src/app/models/SpIps/criterioImplementacion.dto';
import { TokenDto } from 'src/app/models/token.dto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImplementacionService {

  //implementacionURL: 'http://localhost:8080/criterioimple/',

  implementacionURL = environment.implementacionURL;
  implementacionOneURL = environment.implementacionOneURL;


  constructor(private httpClient: HttpClient) { }

  public detail(id: number): Observable<ImplementacionDto> {
    return this.httpClient.get<ImplementacionDto>(`${this.implementacionOneURL}${id}`);
  }

  //LISTAR CRITERIOS POR ID EVALUACION
  public listaImpl(id: number): Observable<ImplementacionDto[]>{
    return this.httpClient.get<ImplementacionDto[]>(`${this.implementacionURL}${id}`)
  }

  public delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.implementacionURL}${id}`);
  }

  public update(id: number, criterio: ImplementacionDto): Observable<any> {
    return this.httpClient.put<any>(`${this.implementacionURL}${id}`, criterio);
  }
}
