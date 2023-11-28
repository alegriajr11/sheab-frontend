import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CondicionesHabilitacionDto } from 'src/app/models/Resolucion/CondicionesHabilitacion/condicion-habilitacion.dto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CondicionesHabilitacionService {

  condicion_habilitacionUrl = environment.condiciones_habilitacion

  constructor(private httpClient: HttpClient) { }

  //LISTAR TODAS LAS CONDICIONES DE HABILITACIÓN
  public listaCondiciones(): Observable<CondicionesHabilitacionDto[]> {
    return this.httpClient.get<CondicionesHabilitacionDto[]>(`${this.condicion_habilitacionUrl}`)
  }

}
