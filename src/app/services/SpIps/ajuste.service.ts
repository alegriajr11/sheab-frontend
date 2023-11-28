import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AjusteDto } from 'src/app/models/SpIps/criterioAjuste.dto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AjusteService {


  //ajusteURL: 'http://localhost:8080/criterioajuste/',
  //ajusteDetailURL: 'http://localhost:8080/criterioajuste/ajuste/',

  ajusteURL = environment.ajusteURL;
  ajusteDetailURL = environment.ajusteDetailURL

  constructor(private httpClient: HttpClient) { }


  //LISTAR CRITERIOS POR ID EVALUACION
  public listaAjuste(id: number): Observable<AjusteDto[]>{
    return this.httpClient.get<AjusteDto[]>(this.ajusteURL + id)
  }

  public detail(id: number): Observable<AjusteDto> {
    return this.httpClient.get<AjusteDto>(`${this.ajusteDetailURL}${id}`);
  }

  public delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.ajusteURL}${id}`);
  }

  
  public update(id: number, criterio: AjusteDto): Observable<any> {
    return this.httpClient.put<any>(`${this.ajusteURL}${id}`, criterio);
  }
}
