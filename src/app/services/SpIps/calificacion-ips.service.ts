import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CalificacionIpsDto } from 'src/app/models/SpIps/calificacionIps.dto';
import { TokenDto } from 'src/app/models/token.dto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CalificacionIpsService {

  calificacionIpsAjusteURL = environment.calificacionIpsAjuste
  calificacionIpsImplementacion = environment.calificacionIpsImplementacion
  calificacionIpsPlaneacion = environment.calificacionIpsPlaneacion
  calificacionIpsVerificacion = environment.calificacionIpsVerificacion

  constructor(private httpClient: HttpClient) { }


  //LISTAR CALIFICACION POR ID_CRITERIO Y ID_EVALUACIÓN DE LA ETAPA AJUSTE
  getCriterioByEvaluacionAjuste(cri_id: number, eva_id: number, id_acta: number): Observable<CalificacionIpsDto> {
    let url = `${this.calificacionIpsAjusteURL}?cri_id=${cri_id}&eva_id=${eva_id}&id_acta=${id_acta}`;
    return this.httpClient.get<CalificacionIpsDto>(url)
  }

  //LISTAR CALIFICACION POR ID_CRITERIO Y ID_EVALUACIÓN DE LA ETAPA IMPLEMENTACION
  getCriterioByEvaluacionImplementacion(cri_id: number, eva_id: number, id_acta: number): Observable<CalificacionIpsDto> {
    let url = `${this.calificacionIpsImplementacion}?cri_id=${cri_id}&eva_id=${eva_id}&id_acta=${id_acta}`;
    return this.httpClient.get<CalificacionIpsDto>(url)
  }

  //LISTAR CALIFICACION POR ID_CRITERIO Y ID_EVALUACIÓN DE LA ETAPA IMPLEMENTACION
  getCriterioByEvaluacionPlaneacion(cri_id: number, eva_id: number, id_acta: number): Observable<CalificacionIpsDto> {
    let url = `${this.calificacionIpsPlaneacion}?cri_id=${cri_id}&eva_id=${eva_id}&id_acta=${id_acta}`;
    return this.httpClient.get<CalificacionIpsDto>(url)
  }

  //LISTAR CALIFICACION POR ID_CRITERIO Y ID_EVALUACIÓN DE LA ETAPA IMPLEMENTACION
  getCriterioByEvaluacionVerificacion(cri_id: number, eva_id: number, id_acta: number): Observable<CalificacionIpsDto> {
    let url = `${this.calificacionIpsVerificacion}?cri_id=${cri_id}&eva_id=${eva_id}&id_acta=${id_acta}`;
    return this.httpClient.get<CalificacionIpsDto>(url)
  }





  //LISTAR TODAS LAS CALIFICACIONES DE AJUSTE POR ID EVALUACION Y ID DEL ACTA
  getAllCalificacionesAjuste(evips_id: number, id_acta: number): Observable<CalificacionIpsDto[]> {
    let url = `${this.calificacionIpsAjusteURL}calificaciones/evaluacion/acta?evips_id=${evips_id}&id_acta=${id_acta}`;
    return this.httpClient.get<CalificacionIpsDto[]>(url)
  }

  //LISTAR TODAS LAS CALIFICACIONES DE IMPLEMENTACIÓN POR ID EVALUACION Y ID DEL ACTA
  getAllCalificacionesImplementacion(evips_id: number, id_acta: number): Observable<CalificacionIpsDto[]> {
    let url = `${this.calificacionIpsImplementacion}calificaciones/evaluacion/acta?evips_id=${evips_id}&id_acta=${id_acta}`;
    return this.httpClient.get<CalificacionIpsDto[]>(url)
  }

  //LISTAR TODAS LAS CALIFICACIONES DE PLANEACION POR ID EVALUACION Y ID DEL ACTA
  getAllCalificacionesPlaneacion(evips_id: number, id_acta: number): Observable<CalificacionIpsDto[]> {
    let url = `${this.calificacionIpsPlaneacion}calificaciones/evaluacion/acta?evips_id=${evips_id}&id_acta=${id_acta}`;
    return this.httpClient.get<CalificacionIpsDto[]>(url)
  }

  //LISTAR TODAS LAS CALIFICACIONES DE VERIFICACION POR ID EVALUACION Y ID DEL ACTA
  getAllCalificacionesVerificacion(evips_id: number, id_acta: number): Observable<CalificacionIpsDto[]> {
    let url = `${this.calificacionIpsVerificacion}calificaciones/evaluacion/acta?evips_id=${evips_id}&id_acta=${id_acta}`;
    return this.httpClient.get<CalificacionIpsDto[]>(url)
  }


  //SOLICITUDES - CREATE(POST)
  //REGISTRO CALIFICACION AJUSTE
  createCalificacionAjuste(dto_calificacion: CalificacionIpsDto, tokenDto: TokenDto): Observable<any> {
    const payload = {
      dto_calificacion: dto_calificacion,
      tokenDto: tokenDto
    }
    console.log(payload)
    return this.httpClient.post<any>(this.calificacionIpsAjusteURL + 'calificacion', payload);
  }

  //REGISTRO CALIFICACION IMPLEMENTACION
  createCalificacionImplementacion(dto_calificacion: CalificacionIpsDto, tokenDto: TokenDto): Observable<any> {
    const payload = {
      dto_calificacion: dto_calificacion,
      tokenDto: tokenDto
    }
    return this.httpClient.post<any>(this.calificacionIpsImplementacion + 'calificacion', payload);
  }
  //REGISTRO CALIFICACION PLANEACION
  createCalificacionPlaneacion(dto_calificacion: CalificacionIpsDto, tokenDto: TokenDto): Observable<any> {
    const payload = {
      dto_calificacion: dto_calificacion,
      tokenDto: tokenDto
    }
    return this.httpClient.post<any>(this.calificacionIpsPlaneacion + 'calificacion', payload);
  }
  //REGISTRO CALIFICACION VERIFICACION
  createCalificacionVerificacion(dto_calificacion: CalificacionIpsDto, tokenDto: TokenDto): Observable<any> {
    const payload = {
      dto_calificacion: dto_calificacion,
      tokenDto: tokenDto
    }
    return this.httpClient.post<any>(this.calificacionIpsVerificacion + 'calificacion', payload);
  }


  //SOLICITUDES - UPDATES
  //SOLICITUD ACTUALIZAR CALIFICACION AJUSTE
  public updateAjuste(id: number, calificacionIpsDto: CalificacionIpsDto, tokenDto: TokenDto): Observable<any> {
    const payloads = {
      dto_calificacion: calificacionIpsDto,
      tokenDto: tokenDto
    }
    console.log(payloads.dto_calificacion)
    return this.httpClient.put<any>(`${this.calificacionIpsAjusteURL}${id}`, payloads);
  }
  
  //SOLICITUD ACTUALIZAR CALIFICACION IMPLEMENTACION
  public updateImplementacion(id: number, calificacionIpsDto: CalificacionIpsDto, tokenDto: TokenDto): Observable<any> {
    const payloads = {
      dto_calificacion: calificacionIpsDto,
      tokenDto: tokenDto
    }
    return this.httpClient.put<any>(`${this.calificacionIpsImplementacion}${id}`, payloads);
  }

    //SOLICITUD ACTUALIZAR CALIFICACION PLANEACION
  public updatePlaneacion(id: number, calificacionIpsDto: CalificacionIpsDto, tokenDto: TokenDto): Observable<any> {
    const payloads = {
      dto_calificacion: calificacionIpsDto,
      tokenDto: tokenDto
    }
    return this.httpClient.put<any>(`${this.calificacionIpsPlaneacion}${id}`, payloads);
  }

    //SOLICITUD ACTUALIZAR CALIFICACION VERIFICACION
  public updateVerificacion(id: number, calificacionIpsDto: CalificacionIpsDto, tokenDto: TokenDto): Observable<any> {
    const payloads = {
      dto_calificacion: calificacionIpsDto,
      tokenDto: tokenDto
    }
    return this.httpClient.put<any>(`${this.calificacionIpsVerificacion}${id}`, payloads);
  }
}
