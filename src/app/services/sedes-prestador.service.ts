import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SedesDto } from '../models/sedes.dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SedesPrestadorService {

  sedeURL = environment.sedeURL;

  constructor(private httpClient: HttpClient) { }

  public registroSedePrestador(sedePrestador: SedesDto): Observable<any> {
    return this.httpClient.post<any>(`${this.sedeURL}`, sedePrestador);
  }

  //SOLICITUD LISTAR TODAS LAS SEDES
  public listaSedes(): Observable<SedesDto[]> {
    return this.httpClient.get<SedesDto[]>(`${this.sedeURL}`)
  }

  //SOLICITUD LISTAR TODAS LAS SEDES POR ID PRESTADOR
  listaSedesNombre(pre_cod_habilitacion: string): Observable<SedesDto[]> {
    return this.httpClient.get<SedesDto[]>(this.sedeURL + 'nombre/sede/prestador/' + pre_cod_habilitacion)
  }

  //SOLICITUD LISTAR UNA SEDE SELECCIONADA
  listaOneSede(sede_id: string): Observable<SedesDto> {
    return this.httpClient.get<SedesDto>(this.sedeURL + sede_id)
  }

  listaOneSedeByPrestador(pre_cod_habilitacion: string): Observable<SedesDto> {
    return this.httpClient.get<SedesDto>(this.sedeURL + 'nombre/sede/prestador/principal/' + pre_cod_habilitacion)
  }

  
}
