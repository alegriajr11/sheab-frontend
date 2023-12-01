import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DivCreadoDto } from 'src/app/models/Sic/divCreado.dto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DivCreadoService {

  divCreadoURL = environment.divCreadoURL

  constructor(private httpClient: HttpClient) { }

  //REGISTRAR DIV SIC
  createDivSic(dto: DivCreadoDto): Observable<any> {
    const body = {
      dto: dto
    }
    return this.httpClient.post<any>(this.divCreadoURL, body);
  }
}
