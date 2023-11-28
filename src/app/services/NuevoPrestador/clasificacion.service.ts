import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Clasificacion } from 'src/app/models/Prestador/clasificacion';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClasificacionService {
  
  clasificacionURL = environment.clasificacionURL;

  constructor(private httpClient: HttpClient) { }

  public lista(): Observable<Clasificacion[]> {
    return this.httpClient.get<Clasificacion[]>(`${this.clasificacionURL}`);
  }

}
