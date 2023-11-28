import { Component } from '@angular/core';
import { CriterioSicEstandarDto } from 'src/app/models/Sic/criterioSicEstandar.dto';
import { CriterioSicService } from 'src/app/services/Sic/criterio.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-criterioestandar',
  templateUrl: './criterioestandar.component.html',
  styleUrls: ['./criterioestandar.component.css']
})
export class CriterioestandarComponent {

  criterioSicEstandar: CriterioSicEstandarDto[];

  listaVacia: any = undefined;


  constructor(
    private criterioSicService: CriterioSicService
  ){}

  ngOnInit(): void {
    this.cargarCriterios()
  }

  cargarCriterios(): void{
    this.criterioSicService.listaCriEstandar().subscribe(
      data => {
        this.criterioSicEstandar = data;
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
        this.criterioSicService.deleteEstandar(id).subscribe(res => this.cargarCriterios());
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
