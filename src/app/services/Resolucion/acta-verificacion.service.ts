import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ActaVerificacionDto } from 'src/app/models/Actas/actaVerificacion.dto';
import { DatosVerificadosDto } from 'src/app/models/Actas/datos_verificados.dto';
import { UsuariosSeleccionadosDto } from 'src/app/models/Actas/usuariosSeleccionados.dto';
import { TokenDto } from 'src/app/models/token.dto';
import { Usuario } from 'src/app/models/usuario';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ActaVerificacionService {

  actaVerifcacion = environment.actaVerificacion

  constructor(private httpClient: HttpClient) { }

  //SOLICITUD LISTAR TODAS LAS ACTAS DE VERIFICACION POR ROL DE USUARIO QUE TENGA ASIGNADAS
  public listaActasVerificacion(tokenDto: string): Observable<ActaVerificacionDto[]> {
    return this.httpClient.get<ActaVerificacionDto[]>(this.actaVerifcacion + '?tokenDto=' + `${tokenDto}`)
  }

  //SOLICITUD LISTAR ACTA POR ID
  public oneActaVerificacion(id: number): Observable<ActaVerificacionDto> {
    return this.httpClient.get<ActaVerificacionDto>(`${this.actaVerifcacion}lista/acta/${id}`);
  }

  //SOLICITUD ULTIMA ACTA VERIFICACION
  public listaUltimaActaVerificacion(tipo_visita: string): Observable<ActaVerificacionDto> {
    let url = `${this.actaVerifcacion}ultima?`
    if (tipo_visita) {
      url += `tipo_visita=${tipo_visita}`;
    }
    return this.httpClient.get<ActaVerificacionDto>(url)
  }


  //SOLICITUD LISTAR LOS USUARIOS ASIGNADOS AL ACTA POR ID DE ACTA
  public listarUsuarioAsignados(id_acta: number): Observable<Usuario> {
    return this.httpClient.get<Usuario>(this.actaVerifcacion + 'listar/acta/usuario/' + id_acta)
  }

  //SOLICITUD LISTAR LA ULTIMA ACTA QUE SE ACABA DE REGISTRAR SIN IMPORTAR EL TIPO
  public ultimoRegistroActa(): Observable<ActaVerificacionDto> {
    return this.httpClient.get<ActaVerificacionDto>(this.actaVerifcacion + 'actas/ultima')
  }

  //REGISTRO ACTA PDF SP_IND
  registroActaVerificacion(dto_acta: ActaVerificacionDto, dto_verificados: DatosVerificadosDto,
    dto_usuarios_seleccionados: UsuariosSeleccionadosDto, tokenDto: TokenDto): Observable<any> {
    const body = {
      dto_acta: dto_acta,
      dto_verificados: dto_verificados,
      dto_usuarios_seleccionados: dto_usuarios_seleccionados,
      tokenDto: tokenDto
    }
    return this.httpClient.post<any>(this.actaVerifcacion, body);
  }

}
