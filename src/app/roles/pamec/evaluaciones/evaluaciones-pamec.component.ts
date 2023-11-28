import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ActapdfService } from 'src/app/services/Sic/actapdf.service';
import { SharedServiceService } from 'src/app/services/shared-service.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-evaluaciones-pamec',
  templateUrl: './evaluaciones-pamec.component.html',
  styleUrls: ['./evaluaciones-pamec.component.css']
})
export class EvaluacionesPamecComponent implements OnInit {

  evaluaciones: any[] = [];

  listaVacia: any = undefined;

  searchText: any;

  //Atributos de busqueda
  year: number
  act_id: number
  //PRESTADOR O NIT
  act_prestador: string = ''
  act_nit: string = ''

  public modalRef: BsModalRef;

  public fechaSeleccionada: string;

  public page!: number;

  constructor(
    private modalService: BsModalService,
    public sharedService: SharedServiceService,
    private actapdfService: ActapdfService,
    private tokenService: TokenService,
  ) { }

  ngOnInit(): void {
    this.incializarMetodos();
  }

  incializarMetodos() {
    this.cargarActas();
    this.obtenerAnios();
  }

  cargarActas(): void {
    this.actapdfService.listaPamec().subscribe(
      data => {
        this.evaluaciones = data;
        this.listaVacia = undefined;
      },
      err => {
        this.listaVacia = err.error.message;
      }
    );
    this.page = 1;
  }

  obtenerAnios(): void {
    const selectAnio = document.getElementById("select-year") as HTMLSelectElement;
    const fechaActual = new Date();
    const anioActual = fechaActual.getFullYear();

    // Agregar una opción en blanco (vacía)
    const optionVacia = document.createElement("option");
    optionVacia.text = ""; // Texto vacío
    optionVacia.value = ""; // Valor vacío
    selectAnio.add(optionVacia);

    //Agregar Opciones de Año
    for (let i = anioActual; i >= 1990; i--) {
      const option = document.createElement("option");
      option.text = i.toString();
      option.value = i.toString();
      selectAnio.add(option);
    }
  }

  //CARGAR ACTAS POR ID_ACTA O AÑO O NOMBRE DE PRESTADOR O NIT
  cargarActasFilter() {
    //OBTENER EL TOKEN DEL USUARIO 
    const token = this.tokenService.getToken()
    this.actapdfService.listaActasPamecFilter(this.year, this.act_id, this.act_prestador, this.act_nit, token).subscribe(
      data => {
        this.evaluaciones = data
        this.listaVacia = undefined
      },
      err => {
        this.listaVacia = err.error.message;
        this.evaluaciones = []
      }
    )
    if (!this.year && !this.act_id && !this.act_prestador && !this.act_nit) {
      this.cargarActas();
    }
  }


  openModal(modalTemplate: TemplateRef<any>, id: number, name: string, name_funcionario: string, codigo_prestador: string) {
    this.sharedService.setIdPamecEvaluacion(id)
    this.sharedService.setNombrePrestador(name)
    this.sharedService.setNombreFuncionario(name_funcionario)
    this.sharedService.setIdPrestador(codigo_prestador)
    this.modalRef = this.modalService.show(modalTemplate,
      {
        class: 'modal-dialogue-centered modal-md',
        backdrop: true,
        keyboard: true
      }
    );
  }

}
