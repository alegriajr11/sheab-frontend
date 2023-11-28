import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Municipio } from 'src/app/models/Prestador/municipio';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MunicipioService {

  municipioURL = environment.municipioURL;

  constructor(private httpClient: HttpClient) { }

  public lista(): Observable<Municipio[]> {
    return this.httpClient.get<Municipio[]>(`${this.municipioURL}`);
  }

  public oneMunicipio(id: string): Observable<Municipio> {
    return this.httpClient.get<Municipio>(`${this.municipioURL}` + id);
  }
}
