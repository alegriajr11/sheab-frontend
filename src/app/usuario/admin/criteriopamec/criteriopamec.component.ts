import { Component, OnInit } from '@angular/core';
import { Actividad } from 'src/app/models/Pamec/actividad.dto';
import { CriterioPam } from 'src/app/models/Pamec/criteriopam.dto';
import { ActividadService } from 'src/app/services/Pamec/actividad.service';
import { CriteriopamService } from 'src/app/services/Pamec/criteriopam.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-criteriopamec',
  templateUrl: './criteriopamec.component.html',
  styleUrls: ['./criteriopamec.component.css']
})
export class CriteriopamecComponent implements OnInit {

  searchText: any;

  actividad: Actividad[];
  criteriopam: CriterioPam[];

  titleActividad = false

  controlCriterio = false;

  listaVacia: any = undefined;

  public page: number = 1;

  constructor(
    private actividadService: ActividadService,
    private criteriopamService: CriteriopamService
  ) { }

  ngOnInit(): void {
    this.cargarActividad();
    this.cargarCriteriosPam();
  }

  cargarActividad(): void {
    this.actividadService.lista().subscribe(
      data => {
        this.actividad = data;
        this.listaVacia = undefined;
      },
      err => {
        this.listaVacia = err.error.message;
      }
    )
  }

  // Método para calcular el ID global
  calcularIDGlobal(index: number, currentPage: number, itemsPerPage: number): number {
    return index + 1 + (currentPage - 1) * itemsPerPage;
  }

  cargarCriteriosPam() {
    this.criteriopamService.lista().subscribe(
      data => {
        this.criteriopam = data;
        this.listaVacia = undefined
      },
      err => {
        this.listaVacia = err.error.message;
      }
    );
  }

  //CARGAR CRITERIOS POR ID ACTIVIDAD
  cargarCriteriosIdActividad(): void {
    var id = (document.getElementById('act_id')) as HTMLSelectElement
    var sel = id.selectedIndex;
    var opt = id.options[sel]
    var Valor = (<HTMLSelectElement><unknown>opt).value;

    this.criteriopamService.listAct(Valor).subscribe(
      data => {
        this.criteriopam = data;
        this.listaVacia = undefined
      },
      err => {
        this.listaVacia = err.error.message;
      }
    )
    this.controlCriterio = true;
    this.titleActividad = true;
  }

  llenarSpan(): void {
    var id = (document.getElementById('act_id')) as HTMLSelectElement
    var sel = id.selectedIndex;
    var opt = id.options[sel]
    var ValorAct = (<HTMLSelectElement><unknown>opt).value;


    this.actividadService.listByAct(ValorAct).subscribe(
      data => {
        for (const acts of this.actividad) {
          if (acts.act_id.toString() === ValorAct) {
            var act_nombre = (document.getElementById('act_nombre')) as HTMLSpanElement
            act_nombre.textContent = acts.act_nombre
          }
        }
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
        this.criteriopamService.delete(id).subscribe(res => this.cargarCriteriosIdActividad());
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

  obtenerNombreActividad(): void {
    var original = document.getElementById("act_nombre");
    sessionStorage.setItem("elementId", original.textContent);
  }
}
