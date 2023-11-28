import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { LoginUsuarioDto } from '../models/login-usuario.dto';
import { Observable } from 'rxjs';
import { NuevoUsuarioDto } from '../models/nuevo-usuario.dto';
import { TokenDto } from '../models/token.dto';
import { CambiarPasswordDto } from '../models/cambiar-password.dto';
import { RestablecerPasswordDto } from '../models/reset-password.dto';
import { NuevoUsuarioAdminDto } from '../models/nuevo-usuario-admin.dto';
import { ActaSicPdfDto } from '../models/Actas/actaSicpdf.dto';
import { ActaSpPdfDto } from '../models/Actas/actaSpPdf.dto';
import { ActaSpIndPdfDto } from '../models/Actas/actaSpIndPdf.dto';
import { ActaPamecDto } from '../models/Actas/actaPamePdf.dto';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //authURL: 'http://localhost:8080/auth/',
  //actaSpIps_pdf_URL: 'http://localhost:8080/sp-ips/',

  authURL = environment.authURL;
  restablecerContraseña = environment.restablecerContraseña;
  usuario = environment.usuarioURL;
  acta_sic_pdfUrl = environment.actaSic_pdf_URL;
  acta_Pamec_pdfUrl = environment.actaPamec_pdf_url;
  acta_SpIps_pdfUrl = environment.actaSpIps_pdf_URL;
  acta_SpInd_pdfUrl = environment.actaSpInd_pdf_URL;

  constructor(private httpClient: HttpClient) { }

  login(dto: LoginUsuarioDto): Observable<any> {
    return this.httpClient.post<any>(this.authURL + 'login', dto);
  }

  registroAdmin(dto: NuevoUsuarioAdminDto, tokenDto: TokenDto): Observable<any> {
    const body = {
      dto: dto,
      tokenDto: tokenDto
    }
    return this.httpClient.post<any>(this.usuario, body);
  }

  registroUsuarioRol(dto: NuevoUsuarioDto, rolesIds: number[], tokenDto: TokenDto): Observable<any> {
    const body = {
      dto: dto,
      rolesIds: rolesIds,
      tokenDto: tokenDto
    }
    return this.httpClient.post<any>(this.usuario + 'rol', body);
  }


  refresh(dto: TokenDto): Observable<any> {
    return this.httpClient.post<any>(this.authURL + 'refresh', dto);
  }

  cambiarPassword(dto: CambiarPasswordDto) {
    return this.httpClient.patch<any>(this.authURL + 'change-password', dto);
  }

  requestPassword(id: number): Observable<any> {
    return this.httpClient.patch<any>(`${this.restablecerContraseña}${id}`, null);
  }

  restablecerPassword(dto: RestablecerPasswordDto) {
    return this.httpClient.patch<any>(this.authURL + 'reset-password', dto);
  }

  resetPassword(dto: RestablecerPasswordDto) {
    return this.httpClient.patch<any>(this.authURL + 'reset-password', dto)
  }

  //REGISTRO ACTA PDF SIC
  registroActaSicPdf(dto: ActaSicPdfDto, tokenDto: TokenDto): Observable<any> {
    const body = {
      dto: dto,
      tokenDto: tokenDto
    }
    return this.httpClient.post<any>(this.acta_sic_pdfUrl, body);
  }

  // REGISTRO ACTA PDF SP_IPS
  registroActaSpIpsPdf(dto: ActaSpPdfDto, evaluacionesIds: number[], tokenDto: TokenDto): Observable<any> {
    const body = {
      dto: dto,
      evaluacionesIds: evaluacionesIds,
      tokenDto: tokenDto
    }
    return this.httpClient.post<any>(this.acta_SpIps_pdfUrl + 'crear', body);
  }

  //SOLICITUD REGISTRAR IMAGEN EN EL SERVIDOR
  registroImagen(imagen: File, actaId: string): Observable<any> {
    const formData = new FormData();
    formData.append('file', imagen, imagen.name);
    formData.append('actaId', actaId);
  
    return this.httpClient.post<any>(this.acta_SpIps_pdfUrl + 'cargar-imagen', formData);
  }
  
  
  
  

  //REGISTRO ACTA PDF SP_IND
  registroActaSpIndPdf(dto: ActaSpIndPdfDto, tokenDto: TokenDto): Observable<any> {
    const body = {
      dto: dto,
      tokenDto: tokenDto
    }
    return this.httpClient.post<any>(this.acta_SpInd_pdfUrl, body);
  }


  //REGISTRO ACTA PDF SIC
  registroActaPamecPdf(dto: ActaPamecDto, tokenDto: TokenDto): Observable<any> {
    const body = {
      dto: dto,
      tokenDto: tokenDto
    }
    return this.httpClient.post<any>(this.acta_Pamec_pdfUrl, body);
  }
}
