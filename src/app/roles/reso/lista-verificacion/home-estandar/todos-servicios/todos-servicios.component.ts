import { Component } from '@angular/core';
import { CriterioTodosServiciosDto } from 'src/app/models/Resolucion/Todos_Servicios/criterio-todos-servicios.dto';
import { TodosServiciosDto } from 'src/app/models/Resolucion/Todos_Servicios/estandar-servicios.dto';
import { CriterioTodosServiciosService } from 'src/app/services/Resolucion/Todos-Servicios/criterio-todos-servicios.service';
import { TodosServiciosService } from 'src/app/services/Resolucion/Todos-Servicios/todos-servicios.service';

@Component({
  selector: 'app-todos-servicios',
  templateUrl: './todos-servicios.component.html',
  styleUrls: ['./todos-servicios.component.css']
})
export class TodosServiciosComponent {

  public page: number = 1;
  searchText: any;

  listaVacia: any = undefined;

  estandar_servicios: TodosServiciosDto[];
  criterio_servicios: CriterioTodosServiciosDto[];

  nombre_estadar: string


  selectedStandard: string = '';


  constructor(
    private todosServices: TodosServiciosService,
    private criterioTodosService: CriterioTodosServiciosService
  ) { }

  ngOnInit(): void {
    this.cargarEstandar();
  }


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
    this.page = 1
  }


  // Método que se activa al cambiar la selección del estándar
  onStandardChange() {
    const selectedStandardObj = this.estandar_servicios.find(standard => standard.tod_id.toString() === this.selectedStandard);
    this.nombre_estadar = selectedStandardObj ? selectedStandardObj.tod_nombre_estandar : '';
  }


  guardarCriterio(criterion: any) {
    // Aquí implementa la lógica para guardar el estado y observaciones del criterio.
    console.log("Guardando criterio:", criterion);
    // Puedes hacer una solicitud HTTP al servidor para guardar los datos, o cualquier otra acción necesaria.
    criterion.guardado = true; // Marcamos el criterio como guardado
  }

  selectedStandardState: string = ''; // Propiedad para rastrear el estado del estándar

  // Función que se ejecuta cuando cambia el estado del estándar
  onStandardStateChange() {
    // Aquí puedes realizar acciones adicionales si es necesario
    console.log('Estado del estándar:', this.selectedStandardState);
  }

}
