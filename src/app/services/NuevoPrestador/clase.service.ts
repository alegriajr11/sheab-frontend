import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Clase } from 'src/app/models/Prestador/clase';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClaseService {

  claseURL = environment.claseURL;

  constructor(private httpClient: HttpClient) { }

  public lista(): Observable<Clase[]> {
    return this.httpClient.get<Clase[]>(`${this.claseURL}`);
  }

}
