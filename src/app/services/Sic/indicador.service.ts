import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Indicador } from 'src/app/models/Sic/indicador.dto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IndicadorService {

  indicadorURL = environment.indicadorURL

  constructor(private httpClient: HttpClient) { }

  public lista(): Observable<Indicador[]>{
    return this.httpClient.get<Indicador[]>(this.indicadorURL)
  }

  public listDom(dom: string): Observable<Indicador[]>{
    return this.httpClient.get<Indicador[]>(this.indicadorURL + dom)
  }



  public listIndOne(ind: string): Observable<Indicador[]>{
    return this.httpClient.get<Indicador[]>(this.indicadorURL + 'ind' + ind)
  }

}
