import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EvaluacionIndDto } from 'src/app/models/SpInd/evaluacionInd.dto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EvaluacionIndService {

  evaluacionIndURL = environment.evaluacionIndUrl
  evaluacionSpInd = environment.actaSpInd_pdf_URL

  constructor(private httpClient: HttpClient) { }


  //OBTENER EVALUACION POR ID ACTA
  public evaluacionInd(act_ind_id: number): Observable<EvaluacionIndDto> {
    return this.httpClient.get<EvaluacionIndDto>(this.evaluacionIndURL + act_ind_id);
  }


  //SOLICITUD OBTENER LA EVALUACIÓN PDF POR SU ID
  public descargarEvaluacionPdfInd(eva_id: number, cod_prestador: string) {
    let url = this.evaluacionSpInd + 'sp/ind/evaluacion/' + eva_id;
    
    this.httpClient.get(url, { responseType: 'blob' }).subscribe(res => {
      const blob = new Blob([res], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);

      // Crear un enlace (link) para descargar el archivo
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = `${cod_prestador}EvaluacionInd.pdf`; // Nombre del archivo a descargar
      document.body.appendChild(a);

      a.click(); // Simular un clic en el enlace

      // Liberar recursos después de la descarga
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    });
  }
  


//   //GENERAR LISTADO DE USUARIOS POR PDF
//   public pdf(){
//     return this.httpClient.get(`${this.generarPdfURL}` , {responseType: 'blob'}).subscribe(res => {
//       const file = new Blob([res], { type: 'application/pdf' });
//       const fileURL = URL.createObjectURL(file);
//       window.open(fileURL);
//     })
//   }
// }

}
