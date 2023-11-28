import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Auditoria } from 'src/app/models/Auditoria/auditoria.dto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuditoriaService {

  @Injectable({
    providedIn: 'root',
  })

  auditoriaUrl = environment.auditoriaUrl
  backupUrl = environment.backupUrl

  constructor(private httpClient: HttpClient) { }

  listAdutitoria(fechaInicio: Date, fechaFin: Date, accion: string): Observable<Auditoria[]> {

    if (fechaInicio && fechaFin) {
      const url = `${this.auditoriaUrl}fecha/date?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}&accion=${accion}`;
      return this.httpClient.get<Auditoria[]>(url);
    } else {
      const url = `${this.auditoriaUrl}fecha/date?&accion=${accion}`;
      return this.httpClient.get<Auditoria[]>(url);
    }
  }

  listAuditoriaNombreUsuario(usu_nombre_apellido: string): Observable<Auditoria[]> {
    const url = `${this.auditoriaUrl}funcionario?usu_nombre_apellido=${usu_nombre_apellido}`
    return this.httpClient.get<Auditoria[]>(url);
  }

  listAllAuditorias(): Observable<Auditoria[]> {
    const url = this.auditoriaUrl + 'all/auditorias/list'
    return this.httpClient.get<Auditoria[]>(url)
  }


  createBackup(): Observable<Blob> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/octet-stream',
    });

    return this.httpClient.get(`${this.backupUrl}backup-bd`, {
      responseType: 'arraybuffer',
      headers: headers,
    }).pipe(
      map((data: ArrayBuffer) => {
        return new Blob([data], { type: 'application/octet-stream' });
      })
    );
  }


}
