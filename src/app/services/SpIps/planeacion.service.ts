import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PlaneacionDto } from 'src/app/models/SpIps/criterioPlaneacion.dto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlaneacionService {

  //planeacionURL: 'http://localhost:8080/planeacion/',

  planeacionURL = environment.planeacionURL;
  planeacionOneURL = environment.planeacionOneURL


  constructor(private httpClient: HttpClient) { }

  public detail(id: number): Observable<PlaneacionDto> {
    return this.httpClient.get<PlaneacionDto>(`${this.planeacionOneURL}${id}`);
  }

  public listaPlaneacion(id: number): Observable<PlaneacionDto[]>{
    return this.httpClient.get<PlaneacionDto[]>(this.planeacionURL + id)
  }

  public delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.planeacionURL}${id}`);
  }

  public update(id: number, criterio: PlaneacionDto): Observable<any> {
    return this.httpClient.put<any>(`${this.planeacionURL}${id}`, criterio);
  }
}
