import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiciosVerificadosDto } from 'src/app/models/Resolucion/ServiciosVerificados/servicios-verificados.dto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiciosVerificadosService {

  servicios_verificadosUrl = environment.servicios_verificados

  constructor(private httpClient: HttpClient) { }

    //LISTAR LOS SERIVICIOS VERIFICADOS QUE TIENE EL PRESTADOR
    public listarServiciosVerificados(pre_cod_habilitacion: string): Observable<ServiciosVerificadosDto[]> {
      return this.httpClient.get<ServiciosVerificadosDto[]>(`${this.servicios_verificadosUrl}${pre_cod_habilitacion}`)
    }
}
