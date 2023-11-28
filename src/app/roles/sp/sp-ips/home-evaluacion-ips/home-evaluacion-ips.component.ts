import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { EvaluacionIpsDto } from 'src/app/models/SpIps/evaluacion.dto';
import { ActapdfService } from 'src/app/services/Sic/actapdf.service';
import { EvaluacionipsService } from 'src/app/services/SpIps/evaluacionips.service';
import { SharedServiceService } from 'src/app/services/shared-service.service';

@Component({
  selector: 'app-home-evaluacion-ips',
  templateUrl: './home-evaluacion-ips.component.html',
  styleUrls: ['./home-evaluacion-ips.component.css'],
})
export class HomeEvaluacionIpsComponent implements OnInit {
  captUsuario: string;
  captCargoUsuario: string;
  captCargoPres: string;
  captCodPres: string;

  id_evaluacion: number;
  listaVacia: any = undefined;

  acta_id: number;

  //DTO EVALUACION
  evaluacionDto: EvaluacionIpsDto[] = [];

  nombrePrestador: string;

  constructor(
    private sharedService: SharedServiceService,
    private actaPdfService: ActapdfService,
    private evaluacionesService: EvaluacionipsService
  ) { }

  ngOnInit(): void {
    this.nombrePrestador = localStorage.getItem('nombre-pres-sp-ips');
    this.acta_id = parseInt(localStorage.getItem('acta_id'), 10);
    this.id_evaluacion = this.sharedService.id_evaluacion_sic;
    this.cargarEvaluaciones();
  }

  cargarEvaluaciones(): void {
    this.evaluacionesService.listaEvaActId(this.acta_id).subscribe(
      (data) => {
        this.evaluacionDto = data;
        this.listaVacia = undefined;
      },
      (err) => {
        this.listaVacia = err.error.message;
      }
    );
  }

  limpiarNombrePrestador() {
    // Limpiar el localStorage para DESHABILITAR LA RUTA
    localStorage.removeItem('boton-acta-sp-ips');
    localStorage.removeItem('nombre-pres-sp-ips');
  }

  enviarIdEvaluacion(id_eva: number){
    localStorage.setItem('id_evaluacion_ips', id_eva.toString());
    window.scrollTo(0, 0);
  }
}
