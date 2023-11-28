import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { CriterioSic } from 'src/app/models/Sic/criterio.dto';
import { CriterioSicEstandarDto } from 'src/app/models/Sic/criterioSicEstandar.dto';
import { CumplimientoSicEstandarDto } from 'src/app/models/Sic/cumplimientoEstandar.dto';
import { Indicador } from 'src/app/models/Sic/indicador.dto';
import { Dominio } from 'src/app/models/Sic/sic.dto';
import { CriterioSicService } from 'src/app/services/Sic/criterio.service';
import { DominioService } from 'src/app/services/Sic/dominio.service';
import { IndicadorService } from 'src/app/services/Sic/indicador.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { SharedServiceService } from 'src/app/services/shared-service.service';
import { CumplimientoEstandarService } from 'src/app/services/Sic/cumplimiento-estandar.service';
import { ToastrService } from 'ngx-toastr';
import { EvaluacionSicService } from 'src/app/services/Sic/evaluacionSic.service';




@Component({
  selector: 'app-evaluacion-sic',
  templateUrl: './evaluacion-sic.component.html',
  styleUrls: ['./evaluacion-sic.component.css']
})
export class EvaluacionSicComponent implements OnInit {

  dominio: Dominio[]
  indicador: Indicador[]
  criterioSic: CriterioSic[];
  criterioEstandar: CriterioSicEstandarDto[];
  cumplimientoEstandar: CumplimientoSicEstandarDto[] = [];



  cumple: CumplimientoSicEstandarDto;


  numeroDeClones: number = 0;

  originalDiv: HTMLElement;
  clondiv: boolean = false


  cumpl_cumple: string;
  cumpl_observaciones: string;
  cumplimiento_asignado: string = '';
  crie_id: number;
  eva_id: number;



  habilitarDiv: boolean = false
  habilitarcri_sic: boolean = false

  captUsuario: string
  captCargoUsuario: string
  captCargoPres: string
  captCodPres: string

  listaVacia: any = undefined;

  // Objeto Deshabilitar Boton
  botonDeshabilitado: { [key: number]: boolean } = {};


  public modalRef: BsModalRef;

  constructor(private el: ElementRef,
    private dominioService: DominioService,
    private indicadorService: IndicadorService,
    private criterioSicService: CriterioSicService,
    private modalService: BsModalService,
    public sharedService: SharedServiceService,
    private cumplimientoEstandarService: CumplimientoEstandarService,
    private evaluacionSicService: EvaluacionSicService,
    private toastrService: ToastrService

  ) { }

  @ViewChild('nombreIndicador', { static: false }) nombreIndicador: ElementRef;

  ngOnInit(): void {

    this.capturarNombres();
    this.cargarDominio();
    this.cargarCriteriosSic();
    this.cargarCriteriosEstandar();
    this.ultimaEvaluacionRegistrada();

    //GUARDAR LOS CRITERIOS CON CUMPLIMIENTO ASIGNADO
    const storedCriteriosSicGuardados = localStorage.getItem('criteriosSicGuardados');

    if (storedCriteriosSicGuardados) {
      this.sharedService.criteriosSicGuardados = JSON.parse(storedCriteriosSicGuardados);
      // Configura botonDeshabilitado según los criterios con cumplimientos asignados
      for (const crie_id of this.sharedService.criteriosSicGuardados) {
        this.botonDeshabilitado[crie_id] = true;
      }
    }
  }

  ngAfterViewInit() {
    this.originalDiv = this.el.nativeElement.querySelector('.original-div');
  }


  ultimaEvaluacionRegistrada() {
    this.evaluacionSicService.ultimaEvaluacionSic().subscribe(
      (data) => {
        this.eva_id = data.eva_id
      }
    )
  }

  //ESTABLECER LOS COLORES POR CUMPLIMIENTO
  getClassForCriterio(criterio: any): string{
    if (this.sharedService.criteriosSicGuardados.includes(criterio.crie_id)) {
      return 'btn-success';
    }
    return 'btn-outline-dark';
  }

  clonarDiv() {
    const idDomino = document.getElementById('dom_id') as HTMLSelectElement;
    const selDominio = idDomino.selectedIndex;
    const optDominio = idDomino.options[selDominio];
    const valorDominio = optDominio.textContent;

    const idIndicador = document.getElementById('ind_id') as HTMLSelectElement;
    const selIndicador = idIndicador.selectedIndex;
    const optIndicador = idIndicador.options[selIndicador];
    const valorIndicador = optIndicador.textContent;

    console.log(valorDominio)
    console.log(valorIndicador)

    if (selDominio && selIndicador) {
      this.numeroDeClones++;
      this.clondiv = true;
      this.habilitarDiv = false;

      const nuevoDiv = document.createElement('div');
      nuevoDiv.id = 'divClonado' + this.numeroDeClones;

      const divTitulos = document.createElement('div');
      divTitulos.id = 'div-titulos';

      const nombreDominio = document.createElement('h5');
      nombreDominio.innerHTML = '<b>Dominio:</b>';

      const spanDominio = document.createElement('span');
      spanDominio.id = 'nombre-dominio' + this.numeroDeClones;
      spanDominio.textContent = valorDominio;

      const nombreIndicador = document.createElement('h5');
      nombreIndicador.innerHTML = '<b>Indicador:</b>';

      const spanIndicador = document.createElement('span');
      spanIndicador.id = 'nombre-indicador' + this.numeroDeClones;
      spanIndicador.textContent = valorIndicador;

      const colSm6 = document.createElement('div');
      colSm6.className = 'col-sm-6';
      colSm6.appendChild(nombreDominio);
      colSm6.appendChild(spanDominio);

      const colSm6_2 = document.createElement('div');
      colSm6_2.className = 'col-sm-6';
      colSm6_2.appendChild(nombreIndicador);
      colSm6_2.appendChild(spanIndicador);

      const colSm7 = document.createElement('div');
      colSm7.className = 'col-sm-7';

      const row = document.createElement('div');
      row.className = 'row';
      row.appendChild(colSm6);
      row.appendChild(colSm6_2);
      row.appendChild(colSm7);

      const tableTitle = document.createElement('div');
      tableTitle.className = 'table-title';
      tableTitle.appendChild(row);

      divTitulos.appendChild(tableTitle);
      nuevoDiv.appendChild(divTitulos);

      // Guardar información en el LocalStorage
      const clonInfo = {
        dominio: selDominio,
        indicador: selIndicador,
        numeroDeClones: this.numeroDeClones,
      };

      localStorage.setItem('clonInfo' + this.numeroDeClones, JSON.stringify(clonInfo));

    } else if (!selDominio) {
      this.toastrService.error('Selecciona un Dominio', 'Error', {
        timeOut: 3000,
        positionClass: 'toast-top-center',
      });
    } else if (!selIndicador) {
      this.toastrService.error('Selecciona un Indicador', 'Error', {
        timeOut: 3000,
        positionClass: 'toast-top-center',
      });
    }
  }



  range(num: number): number[] {
    return Array.from({ length: num }, (_, i) => i + 1);
  }

  openModal(modalTemplate: TemplateRef<any>, id: number, eva_id: number) {
    this.sharedService.setIdEvaluacionSic(eva_id)
    this.eva_id = eva_id
    this.sharedService.setIdCriterioSic(id)
    this.crie_id = id
    this.modalRef = this.modalService.show(modalTemplate,
      {
        class: 'modal-dialogue-centered modal-md',
        backdrop: true,
        keyboard: true
      }

    );
  }

  cargarDominio(): void {
    this.dominioService.lista().subscribe(
      data => {
        this.dominio = data;
        this.listaVacia = undefined;
      },
      err => {
        this.listaVacia = err.error.message;
      }
    )
  }




  onRegister(): void {

  }


  cargarCriteriosSic(): void {
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

  cargarCriteriosEstandar(): void {
    this.criterioSicService.listaCriEstandar().subscribe(
      data => {
        this.criterioEstandar = data;
        this.listaVacia = undefined
      },
      err => {
        this.listaVacia = err.error.message;
      }
    )
  }


  cargarIndicadoresByDom(): void {

    var id = (document.getElementById('dom_id')) as HTMLSelectElement
    var sel = id.selectedIndex;
    var opt = id.options[sel]
    var Valor = (<HTMLSelectElement><unknown>opt).value;


    this.indicadorService.listDom(Valor).subscribe(
      data => {
        this.indicador = data;
        this.listaVacia = undefined
      },
      err => {
        this.listaVacia = err.error.message;
      }
    );
  }

  capturarNombres(): void {
    //CAPURAR NOMBRE DEL PRESTADOR
    var copy = document.getElementById("nombre-prestador");
    var captPrestador = sessionStorage.getItem("nombre-pres-sic");
    copy.textContent = " " + captPrestador + "."
    //CAPTURAR ID DEL PRESTADOR
    this.captCodPres = sessionStorage.getItem("cod-pres-sic");

    //CAPTURAR NOMBRE DE USUARIO
    this.captUsuario = sessionStorage.getItem("nombre-usuario-sic");
    //CAPTURAR CARGO DEL USUARIO
    this.captCargoUsuario = sessionStorage.getItem("cargo-usuario-sic");
    //CAPTURAR CARGO DEL PRESTADOR
    this.captCargoPres = sessionStorage.getItem("cargo-prestador-sic")

  }


  habilitarAgregarIndicador(): void {
    this.habilitarDiv = true
  }

  deshabilitarAgregarIndicador(): void {
    this.habilitarDiv = false
  }

  habilitarCriterioSic(): void {
    this.habilitarcri_sic = true
    this.habilitarDiv = false
  }

}
