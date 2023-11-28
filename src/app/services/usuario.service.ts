import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuario';
import { TokenDto } from '../models/token.dto';



@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  
  usuarioURL = environment.usuarioURL;

  generarPdfURL = environment.generarPdfURL;

  constructor(private httpClient: HttpClient) { }

  //SOLICITUD LISTAR TODOS LOS USUARIOS
  public lista(): Observable<Usuario[]> {
    return this.httpClient.get<Usuario[]>(`${this.usuarioURL}`);
  }

  //SOLICITUD LISTAR USUARIOS ACTIVOS Y POR ROL
  public listaUserRol(rol_nombre: string): Observable<Usuario[]> {
    return this.httpClient.get<Usuario[]>(`${this.usuarioURL}` + 'lista/rol?rol_nombre=' + `${rol_nombre}`);
  }

  //SOLICITUD LISTAR USUARIOS CONTADOR ACTIVOS
  public listaUserContador(): Observable<Usuario[]> {
    return this.httpClient.get<Usuario[]>(`${this.usuarioURL}` + 'estado/limitado/contador');
  }

  public oneUser(id: number): Observable<Usuario> {
    return this.httpClient.get<Usuario>(`${this.usuarioURL}${id}`);
  }

  public save(usuario: Usuario): Observable<any> {
    return this.httpClient.post<any>(`${this.usuarioURL}`, usuario);
  }

  public update(id: number, usuario: Usuario, tokenDto: TokenDto): Observable<any> {
    return this.httpClient.put<any>(`${this.usuarioURL}${id}`, {
      dto: usuario,
      tokenDto: tokenDto
    });    
  }
  



  public delete(id: number, tokenDto: TokenDto): Observable<any> {
    return this.httpClient.delete<any>(`${this.usuarioURL}${id}`, { body: tokenDto});
  }

  //GENERAR LISTADO DE USUARIOS POR PDF
  public pdf(){
    return this.httpClient.get(`${this.generarPdfURL}` , {responseType: 'blob'}).subscribe(res => {
      const file = new Blob([res], { type: 'application/pdf' });
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL);
    })
  }
}
