import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CalificacionIndDto } from 'src/app/models/SpInd/calificacionInd.dto';
import { TokenDto } from 'src/app/models/token.dto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CalificacionIndService {

  calificacionIndURL = environment.calificacionIndURL

  constructor(private httpClient: HttpClient) { }

  //REGISTRO CALIFICACION
  createCalificacionInd(dto: CalificacionIndDto, tokenDto: TokenDto): Observable<any> {
    const body = {
      dto: dto,
      tokenDto: tokenDto
    }
    console.log(body.dto.cal_nota)
    return this.httpClient.post<any>(this.calificacionIndURL, body);
  }

  //LISTAR CALIFICACION POR ID_CRITERIO Y ID_EVALUACIÓN
  getCriterioByEvaluacion(cri_id: number, eva_id: number): Observable<CalificacionIndDto> {
    let url = `${this.calificacionIndURL}?cri_id=${cri_id}&eva_id=${eva_id}`;

    return this.httpClient.get<CalificacionIndDto>(url)
  }

  //LISTAR TODAS LAS CALIFICACIONES POR ID_EVALUACIÓN
  getAllCalificacioneByEva(eva_id: number): Observable<CalificacionIndDto[]> {
    return this.httpClient.get<CalificacionIndDto[]>(this.calificacionIndURL + 'lista/' + eva_id)
  }


  //SOLICITUD ACTUALIZAR CALIFICACION
  public update(id: number, calificacionIndDto: CalificacionIndDto, tokenDto: TokenDto): Observable<any> {
    const payloads = {
      dto_calificacion: calificacionIndDto,
      tokenDto: tokenDto
    }
    return this.httpClient.put<any>(`${this.calificacionIndURL}${id}`, payloads);
  }
}
