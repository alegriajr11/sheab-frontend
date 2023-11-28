import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ActaPamecDto } from 'src/app/models/Actas/actaPamePdf.dto';
import { ActaSicPdfDto } from 'src/app/models/Actas/actaSicpdf.dto';
import { ActaSpIndPdfDto } from 'src/app/models/Actas/actaSpIndPdf.dto';
import { ActaSpPdfDto } from 'src/app/models/Actas/actaSpPdf.dto';
import { TokenDto } from 'src/app/models/token.dto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ActapdfService {

  //  acta_pdf_URL: 'http://localhost:8080/sic-acta/',
  //localhost:8080/sic-acta/ultima/acta/sic
  //actaSpIps_pdf_URL: 'http://localhost:8080/sp-ips/',
  actasic_pdfUrl = environment.actaSic_pdf_URL
  actasp_ips_pdfurl = environment.actaSpIps_pdf_URL
  actaSp_ind_pdf_URL = environment.actaSpInd_pdf_URL
  actaPamec_pdf_url = environment.actaPamec_pdf_url

  constructor(private httpClient: HttpClient) { }

  /*ROL SIC*/
  //SOLICITUD LISTAR ACTAS DEL ROL SIC
  public listaSic(tokenDto: string): Observable<ActaSicPdfDto[]> {
    return this.httpClient.get<ActaSicPdfDto[]>(this.actasic_pdfUrl + 'lista/acta/funcionario/login/sic/acta?tokenDto=' + `${tokenDto}`)
  }

  //SOLICITUD ULTIMA ACTA DEL ROL SIC
  public obtenerUltimaActaSic(): Observable<ActaSicPdfDto> {
    return this.httpClient.get<ActaSicPdfDto>(this.actasic_pdfUrl + 'ultima/acta/sic')
  }
  public ultimaActaSicPk(): Observable<ActaSicPdfDto> {
    return this.httpClient.get<ActaSicPdfDto>(this.actasic_pdfUrl + 'ultima/acta/sic/pk')
  }

  //SOLICITUD MOSTRAR UN ACTA DEL ROL SIC
  public oneActaSic(id: number): Observable<ActaSicPdfDto> {
    return this.httpClient.get<ActaSicPdfDto>(`${this.actasic_pdfUrl}${id}`);
  }

  //FILTRAR ACTA POR FECHA - No ACTA - PRESTADOR - NIT
  public listaActasSicFilter(year: number, act_id: number, act_prestador: string, act_nit: string, tokenDto: string): Observable<ActaSicPdfDto[]> {
    let url = `${this.actasic_pdfUrl}busqueda/fecha/acta/prestador/nit?`;

    if (year) {
      url += `year=${year}&`;
    }
    if (act_id) {
      url += `acta_id=${act_id}&`;
    }
    if (act_prestador) {
      url += `act_prestador=${act_prestador}&`;
    }
    if (act_nit) {
      url += `act_nit=${act_nit}&`;
    }
    if (tokenDto) {
      url += `tokenDto=${tokenDto}&`;
    }

    return this.httpClient.get<ActaSicPdfDto[]>(url);
  }


  //SOLICITUD FILTRAR ACTA SIC POR FECHA - ROL SIC
  public actaSicDate(dateString: string): Observable<ActaSicPdfDto[]> {
    return this.httpClient.get<ActaSicPdfDto[]>(this.actasic_pdfUrl + 'fecha/' + dateString)
  }

  //SOLICITUD ACTUALIZAR ACTA - ROL SIC
  public updateActaSic(id: number, acta_sic: ActaSicPdfDto, tokenDto: TokenDto): Observable<any> {
    return this.httpClient.put<any>(`${this.actasic_pdfUrl}${id}`, {
      dto: acta_sic,
      tokenDto: tokenDto
    });
  }

  /*ROL SP*/
  /*ROL SP - IPS*/
  //SOLICITUD LISTAR ACTAS DEL ROL SP - IPS
  public listaSpIps(tokenDto: string): Observable<ActaSpPdfDto[]> {
    return this.httpClient.get<ActaSpPdfDto[]>(this.actasp_ips_pdfurl + 'lista/acta/funcionario/login/spips/acta?tokenDto=' + `${tokenDto}`)
  }

  //SOLICITUD ULTIMA ACTA DEL ROL SP_IPS
  public listaUltimaSpIps(): Observable<ActaSpPdfDto> {
    return this.httpClient.get<ActaSpPdfDto>(this.actasp_ips_pdfurl + 'ultima/acta/spips')
  }

  //SP
  //SOLICITUD MOSTRAR UN ACTA DEL ROL SP_IPS
  public oneActaSpIps(id: number): Observable<ActaSpPdfDto> {
    return this.httpClient.get<ActaSpPdfDto>(`${this.actasp_ips_pdfurl}${id}`);
  }

  //SOLICITUD ACTUALIZAR ACTA - SP_IPS
  public updateActaSpIps(id: number, acta_sp_ips: ActaSpPdfDto, tokenDto: TokenDto): Observable<any> {
    return this.httpClient.put<any>(`${this.actasp_ips_pdfurl}${id}`, {
      dto: acta_sp_ips,
      tokenDto: tokenDto
    });
  }

  //SOLICITUD ULTIMA ACTA DEL ROL SP_IND
  public listaUltimaSpInd(): Observable<ActaSpIndPdfDto> {
    return this.httpClient.get<ActaSpIndPdfDto>(this.actaSp_ind_pdf_URL + 'ultima/acta/spind')
  }

  //SOLICITUD ACTUALIZAR ACTA - SP_IPS
  public updateActaSpInd(id: number, acta_sp_ind: ActaSpIndPdfDto, tokenDto: TokenDto): Observable<any> {
    return this.httpClient.put<any>(`${this.actaSp_ind_pdf_URL}${id}`, {
      dto: acta_sp_ind,
      tokenDto: tokenDto
    });
  }


  //SOLICITUD ULTIMA ACTA DEL ROL PAMEC
  public listaUltimaPamec(): Observable<ActaPamecDto> {
    return this.httpClient.get<ActaPamecDto>(this.actaPamec_pdf_url + 'ultima/acta/pamec')
  }


  //SOLICITUD MOSTRAR UN ACTA DEL ROL SP_IND
  public oneActaSpInd(id: number): Observable<ActaSpIndPdfDto> {
    return this.httpClient.get<ActaSpIndPdfDto>(`${this.actaSp_ind_pdf_URL}${id}`);
  }

  //SOLICITUD MOSTRAR UN ACTA DEL ROL PAMEC
  public oneActaPamec(id: number): Observable<ActaPamecDto> {
    return this.httpClient.get<ActaPamecDto>(`${this.actaPamec_pdf_url}${id}`);
  }


  //FILTRAR ACTA POR FECHA - No ACTA - PRESTADOR - NIT
  public listaActasSpIndFilter(year: number, act_id: number, act_prestador: string, act_nit: string, tokenDto: string): Observable<ActaSpIndPdfDto[]> {
    let url = `${this.actaSp_ind_pdf_URL}busqueda/fecha/acta/prestador/nit?`;

    if (year) {
      url += `year=${year}&`;
    }
    if (act_id) {
      url += `acta_id=${act_id}&`;
    }
    if (act_prestador) {
      url += `act_prestador=${act_prestador}&`;
    }
    if (act_nit) {
      url += `act_nit=${act_nit}&`;
    }
    if (tokenDto) {
      url += `tokenDto=${tokenDto}&`;
    }

    return this.httpClient.get<ActaSpIndPdfDto[]>(url);
  }


  //FILTRAR ACTA POR FECHA - No ACTA - PRESTADOR - NIT (SEGURIDAD DEL PACIENTE IPS)
  public listaActasSpIpsFilter(year: number, act_id: number, act_prestador: string, act_nit: string, tokenDto: string): Observable<ActaSpPdfDto[]> {
    let url = `${this.actasp_ips_pdfurl}busqueda/fecha/acta/prestador/nit?`;

    if (year) {
      url += `year=${year}&`;
    }
    if (act_id) {
      url += `acta_id=${act_id}&`;
    }
    if (act_prestador) {
      url += `act_prestador=${act_prestador}&`;
    }
    if (act_nit) {
      url += `act_nit=${act_nit}&`;
    }

    if (tokenDto) {
      url += `tokenDto=${tokenDto}&`;
    }

    return this.httpClient.get<ActaSpPdfDto[]>(url);
  }


  //FILTRAR ACTA POR FECHA - No ACTA - PRESTADOR - NIT
  public listaActasPamecFilter(year: number, act_id: number, act_prestador: string, act_nit: string, tokenDto: string): Observable<ActaPamecDto[]> {
    let url = `${this.actasp_ips_pdfurl}busqueda/fecha/acta/prestador/nit?`;

    if (year) {
      url += `year=${year}&`;
    }
    if (act_id) {
      url += `acta_id=${act_id}&`;
    }
    if (act_prestador) {
      url += `act_prestador=${act_prestador}&`;
    }
    if (act_nit) {
      url += `act_nit=${act_nit}&`;
    }

    if (tokenDto) {
      url += `tokenDto=${tokenDto}&`;
    }


    return this.httpClient.get<ActaPamecDto[]>(url);
  }



  //SOLICITUD LISTAR ACTAS DEL ROL SP - INDEPNDIENTES
  public listaSpInd(tokenDto: string): Observable<ActaSpIndPdfDto[]> {
    return this.httpClient.get<ActaSpIndPdfDto[]>(this.actaSp_ind_pdf_URL + '?tokenDto=' + `${tokenDto}`)
  }

  //SOLICITUD LISTAR ACTAS DEL ROL PAMEC
  public listaPamec(): Observable<ActaPamecDto[]> {
    return this.httpClient.get<ActaPamecDto[]>(this.actaPamec_pdf_url)
  }



  //METODOS CERRAR ACTAS
  //CERRAR EL ACTA SIC
  public cerrarActaSic(id: number, tokenDto: TokenDto): Observable<any> {
    const body = {
      tokenDto: tokenDto
    }
    return this.httpClient.put<any>(this.actasic_pdfUrl + 'cerrar/' + id, body)
  }

  //CERRAR EL ACTA SP IND
  public cerrarActaSpInd(id: number, tokenDto: TokenDto): Observable<any> {
    const body = {
      tokenDto: tokenDto
    }
    return this.httpClient.put<any>(this.actaSp_ind_pdf_URL + 'cerrar/' + id, body)
  }

  //CERRAR EL ACTA SP IPS
  public cerrarActaSpIps(id: number, tokenDto: TokenDto): Observable<any> {
    const body = {
      tokenDto: tokenDto
    }
    return this.httpClient.put<any>(this.actasp_ips_pdfurl + 'cerrar/' + id, body)
  }

  //CERRAR EL ACTA PAMEC
  public cerrarActaPamec(id: number, tokenDto: TokenDto): Observable<any> {
    const body = {
      tokenDto: tokenDto
    }
    return this.httpClient.put<any>(this.actaPamec_pdf_url + 'cerrar/' + id, body)
  }
}
