import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CalificacionPamecDto } from 'src/app/models/Pamec/calificacionPamec.dto';
import { TokenDto } from 'src/app/models/token.dto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CalificacionPamecService {

  constructor(private httpClient: HttpClient) { }

  calificacionPamecURL = environment.calificacionPamecURL

  //REGISTRO CALIFICACION
  createCalificacionPamec(dto: CalificacionPamecDto, tokenDto: TokenDto): Observable<any> {
    const body = {
      dto: dto,
      tokenDto: tokenDto
    }
    console.log(body.dto.cal_nota)
    return this.httpClient.post<any>(this.calificacionPamecURL, body);
  }
}
