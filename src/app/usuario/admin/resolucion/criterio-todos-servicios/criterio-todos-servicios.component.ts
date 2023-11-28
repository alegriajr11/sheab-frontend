import { Component } from '@angular/core';
import { CriterioTodosServiciosDto } from 'src/app/models/Resolucion/Todos_Servicios/criterio-todos-servicios.dto';
import { TodosServiciosDto } from 'src/app/models/Resolucion/Todos_Servicios/estandar-servicios.dto';
import { CriterioTodosServiciosService } from 'src/app/services/Resolucion/Todos-Servicios/criterio-todos-servicios.service';
import { TodosServiciosService } from 'src/app/services/Resolucion/Todos-Servicios/todos-servicios.service';

@Component({
  selector: 'app-criterio-todos-servicios',
  templateUrl: './criterio-todos-servicios.component.html',
  styleUrls: ['./criterio-todos-servicios.component.css']
})
export class CriterioTodosServiciosComponent {

  estandar_servicios: TodosServiciosDto[];
  criterio_servicios: CriterioTodosServiciosDto[];

  controlCriterio = false;

  listaVacia: any = undefined;


  public page: number = 1;
  searchText: any;

  constructor(
    private todosServices: TodosServiciosService,
    private criterioTodosService: CriterioTodosServiciosService
  ) { }

  ngOnInit(): void {
    this.cargarEstandar();
    this.cargarTodosCriterios();
  }

  //
  cargarEstandar(): void {
    this.todosServices.lista().subscribe(
      data => {
        this.estandar_servicios = data;
        this.listaVacia = undefined;
      },
      err => {
        this.listaVacia = err.error.message;
      }
    )
  }

  //CARGAR CRITERIOS POR ESTANDAR
  cargarCriterios(): void {
    var id = (document.getElementById('tod_id')) as HTMLSelectElement
    var sel = id.selectedIndex;
    var opt = id.options[sel]
    var Valor = (<HTMLSelectElement><unknown>opt).value;

    this.criterioTodosService.listForEstandar(Valor).subscribe(
      data => {
        this.criterio_servicios = data;
        this.listaVacia = undefined
      },
      err => {
        this.listaVacia = err.error.message;
      }
    )
    this.controlCriterio = true;
    this.page = 1
  }


  cargarTodosCriterios() {
    this.criterioTodosService.listaAllCriterios().subscribe(
      data => {
        this.criterio_servicios = data;
        this.listaVacia = undefined

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

  llenarSpan(): void {
    var id = (document.getElementById('tod_id')) as HTMLSelectElement
    var sel = id.selectedIndex;
    var opt = id.options[sel]
    var ValorEstandar = (<HTMLSelectElement><unknown>opt).textContent;


    var cris_nombre_criterio = (document.getElementById('tod_nombre_estandar')) as HTMLSpanElement
    cris_nombre_criterio.textContent = ValorEstandar

  }


}
