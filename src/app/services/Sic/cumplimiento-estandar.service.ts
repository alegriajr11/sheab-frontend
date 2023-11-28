import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CumplimientoSicEstandarDto } from 'src/app/models/Sic/cumplimientoEstandar.dto';
import { EvaluacionSicDto } from 'src/app/models/Sic/evaluacionSic.dto';
import { TokenDto } from 'src/app/models/token.dto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CumplimientoEstandarService {


  cumplimientoEstandarURL = environment.cumplimientoEstandarURL

  evaluacionURL = environment.evaluacionSicUrl

  constructor(private httpClient: HttpClient) { }

  //REGISTRO CUMPLIMIENTO ESTANDAR
  createCumplimientoEstandar(dto: CumplimientoSicEstandarDto, tokenDto: TokenDto): Observable<any> {
    const body = {
      dto: dto,
      tokenDto: tokenDto
    }
    return this.httpClient.post<any>(this.cumplimientoEstandarURL, body);
  }


  public oneCumple(id: number): Observable<CumplimientoSicEstandarDto> {
    return this.httpClient.get<CumplimientoSicEstandarDto>(this.cumplimientoEstandarURL + 'cumple/' + id);
  }

  //SOLICITUD LISTAR LA EVALUACION CON LA ACTA REGISTRADA
  public oneEvluacionSic(id_acta: number): Observable<EvaluacionSicDto> {
    return this.httpClient.get<EvaluacionSicDto>(this.evaluacionURL + id_acta)
  }

  //SOLICITUD LISTAR ULTIMO CUMPLIMIENTO PARA CAPTURAR EL ATRIBUTO cumpl_asignado
  public ultimoCumplimiento(): Observable<CumplimientoSicEstandarDto> {
    return this.httpClient.get<CumplimientoSicEstandarDto>(this.cumplimientoEstandarURL + 'ultimo-cumplimiendo-estandar');
  }

  //SOLICITUD LISTAR TODOS LOS CUMPLIMIENTOS POR ID CRITERIO Y ID EVALUACION
  public verificarCumplimientoIdCE(crie_id: number, eva_id: number): Observable<CumplimientoSicEstandarDto[]> {
    let url = `${this.cumplimientoEstandarURL}?crie_id=${crie_id}&eva_id=${eva_id}`;
    return this.httpClient.get<CumplimientoSicEstandarDto[]>(url);
  }
}
