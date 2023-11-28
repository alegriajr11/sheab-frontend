import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EtapaDto } from 'src/app/models/SpInd/etapa.dto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EtapaService {

  etapaURL = environment.etapaURL

  constructor(private httpClient: HttpClient) { }

  public lista(): Observable<EtapaDto[]>{
    return this.httpClient.get<EtapaDto[]>(this.etapaURL)
  }

  public listEtaOne(eta: string): Observable<EtapaDto[]>{
    return this.httpClient.get<EtapaDto[]>(this.etapaURL +  eta)
  }

}
