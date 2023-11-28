import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EvaluacionSicDto } from 'src/app/models/Sic/evaluacionSic.dto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EvaluacionSicService {


  evaluacionSicURL = environment.evaluacionSicUrl

  constructor(private httpClient: HttpClient) { }

  //SOLICITUD LISTAR ULTIMO CUMPLIMIENTO PARA CAPTURAR EL ATRIBUTO cumpl_asignado
  public ultimaEvaluacionSic(): Observable<EvaluacionSicDto> {
    return this.httpClient.get<EvaluacionSicDto>(this.evaluacionSicURL);
  }
}

