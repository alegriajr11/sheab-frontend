import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImagenServicesService {

  private baseUrl = 'http://localhost:8080/controlar-imagenes'; // Ruta base del controlador de imágenes

  constructor(private http: HttpClient) {}

  getImage(actaId: string, imageFileName: string): Observable<Blob> {
    const url = `${this.baseUrl}/uploads/sp_ips/${actaId}/${imageFileName}`;
    return this.http.get(url, { responseType: 'blob' });
  }
  
}
