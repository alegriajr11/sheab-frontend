import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tipo } from 'src/app/models/Prestador/tipo';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TipoService {

  tipoURL = environment.tipoURL;

  constructor(private httpClient: HttpClient) { }

  public lista(): Observable<Tipo[]> {
    return this.httpClient.get<Tipo[]>(`${this.tipoURL}`);
  }
}
