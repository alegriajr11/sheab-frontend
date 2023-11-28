import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EvaluacionIpsDto } from 'src/app/models/SpIps/evaluacion.dto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EvaluacionipsService {

  evaluacionipsURL = environment.evaluacionipsURL;
  generarEvaluacionUrl = environment.generarEvaluacionUrl
  planeacionURL = environment.planeacionURL;


  constructor(private httpClient: HttpClient) { }

  public listOne(eva_id: number): Observable<EvaluacionIpsDto>{
    return this.httpClient.get<EvaluacionIpsDto>(this.evaluacionipsURL + eva_id)
  }

  public lista(): Observable<EvaluacionIpsDto[]>{
    return this.httpClient.get<EvaluacionIpsDto[]>(this.evaluacionipsURL)
  }

  //LISTAR EVALUACIONES POR ID_ACTA LLAVE FORANEA
  public listaEvaActId(id_acta: number): Observable<EvaluacionIpsDto[]>{
    return this.httpClient.get<EvaluacionIpsDto[]>(this.evaluacionipsURL + 'acta/evaluaciones/' + id_acta)
  }



    //SOLICITUD OBTENER LA EVALUACIÓN PDF POR SU ID
    public descargarEvaluacionPdfIps(evaips_id: number, acta_id: number, cod_prestador: string) {
      let url = this.generarEvaluacionUrl + `sp/ips/evaluacion?evaips_id=${evaips_id}&acta_id=${acta_id}`;
      
      this.httpClient.get(url, { responseType: 'blob' }).subscribe(res => {
        const blob = new Blob([res], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
  
        // Crear un enlace (link) para descargar el archivo
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = `${cod_prestador}EvaluacionIps.pdf`; // Nombre del archivo a descargar
        document.body.appendChild(a);
  
        a.click(); // Simular un clic en el enlace
  
        // Liberar recursos después de la descarga
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      });
    }
}
