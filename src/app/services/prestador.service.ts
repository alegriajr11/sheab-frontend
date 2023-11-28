import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PrestadorDto } from '../models/prestador.dto';
import { EditarPrestadorDto } from '../models/editar-prestador-dto';


@Injectable({
  providedIn: 'root'
})
export class PrestadorService {

  //prestadorURL: 'http://localhost:8080/prestador/',
  prestadorURL = environment.prestadorURL;
  prestadorMunicipioURL = environment.prestadorMunicipioURL
  prestadorPamecMunicipioURL = environment.prestadorPamecMunicipioURL
  prestadorIpsMunicipioURL = environment.prestadorIpsMunicipioURL
  prestadorIndMunicipioURL = environment.prestadorIndMunicipioURL


  constructor(private httpClient: HttpClient) { }

  //SOLICITUD LISTAR TODOS LOS PRESTADORES
  public lista(): Observable<PrestadorDto[]> {
    return this.httpClient.get<PrestadorDto[]>(`${this.prestadorURL}`)
  }

  //SOLICITUD LISTAR UN PRESTADOR POR ID
  public listaOne(id: string): Observable<any> {
    return this.httpClient.get<any>(`${this.prestadorURL}` + id)
  }

  //LISTAR PRESTADORES POR MUNICIPIO
  public listMun(mun: string): Observable<PrestadorDto[]> {
    return this.httpClient.get<PrestadorDto[]>(this.prestadorMunicipioURL + mun)
  }

  //LISTAR PRESTADORES POR MUNICIPIO PARA ROL PAMEC
  public listMunPamec(mun: string): Observable<PrestadorDto[]> {
    return this.httpClient.get<PrestadorDto[]>(this.prestadorPamecMunicipioURL + mun)
  }

  //LISTAR PRESTADORES POR MUNICIPIO PARA EL ROL SP-IPS
  public listMunIps(mun: string): Observable<PrestadorDto[]> {
    return this.httpClient.get<PrestadorDto[]>(this.prestadorIpsMunicipioURL + mun)
  }

  //LISTAR PRESTADORES POR MUNICIPIO PARA EL ROL SP-INDEPENDIENTES
  public listMunInd(mun: string): Observable<PrestadorDto[]> {
    return this.httpClient.get<PrestadorDto[]>(this.prestadorIndMunicipioURL + mun)
  }

  //SOLICITUD REGISTRAR UN PRESTADOR
  public registroPrestador(prestador: PrestadorDto): Observable<any> {
    return this.httpClient.post<any>(`${this.prestadorURL}`, prestador);
  }

  //SOLICITUD ACTUALIZAR UN PRESTADOR
  public update(id: string, prestador: PrestadorDto): Observable<any> {
    return this.httpClient.put<any>(`${this.prestadorURL}${id}`, prestador);
  }

}
