import { Component, OnInit } from '@angular/core';
import { CriterioSic } from 'src/app/models/Sic/criterio.dto';
import { Indicador } from 'src/app/models/Sic/indicador.dto';
import { Dominio } from 'src/app/models/Sic/sic.dto';
import { CriterioSicService } from 'src/app/services/Sic/criterio.service';
import { DominioService } from 'src/app/services/Sic/dominio.service';
import { IndicadorService } from 'src/app/services/Sic/indicador.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-criteriosic',
  templateUrl: './criteriosic.component.html',
  styleUrls: ['./criteriosic.component.css']
})
export class CriteriosicComponent implements OnInit {

  dominio: Dominio[];
  indicador: Indicador[];

  criterioSic: CriterioSic[];

  indId: string

  controlCriterio = false;

  listaVacia: any = undefined;


  constructor(
    private dominioService: DominioService,
    private indicadorService: IndicadorService,
    private criterioSicService: CriterioSicService
  ) { }

  ngOnInit(): void {


    this.cargarCriterios()
  }

  cargarCriterios(): void{
    this.criterioSicService.lista().subscribe(
      data => {
        this.criterioSic = data;
        this.listaVacia = undefined
      },
      err => {
        this.listaVacia = err.error.message;
      }
    )
  }


  borrar(id: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No hay vuelta atrás',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        this.criterioSicService.delete(id).subscribe(res => this.cargarCriterios());
        Swal.fire(
          'OK',
          'Criterio Eliminado',
          'success'
        );
        // For more information about handling dismissals please visit
        // https://sweetalert2.github.io/#handling-dismissals
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelado',
          'Criterio a salvo',
          'error'
        );
      }
    });
  }
  


    
}


