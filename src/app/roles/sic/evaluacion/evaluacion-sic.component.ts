import { Component, ElementRef, OnInit, Renderer2, TemplateRef, ViewChild } from '@angular/core';
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
import { DivCreadoService } from 'src/app/services/Sic/div-creado.service';
import { DivCreadoDto } from 'src/app/models/Sic/divCreado.dto';
import Swal from 'sweetalert2';




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

  divCreado: DivCreadoDto


  //DOMINO E INDICADOR
  nombre_dominio: string
  nombre_indicador: string
  id_dominio: number
  id_indicador: number
  /**/


  //VARIABLE EVALUACION
  eva_id: number

  cumple: CumplimientoSicEstandarDto;

  numeroDeClones: number = 0;

  originalDiv: HTMLElement;
  clondiv: boolean = false


  cumpl_cumple: string;
  cumpl_observaciones: string;
  cumplimiento_asignado: string = '';
  crie_id: number;




  habilitarDiv: boolean = false
  habilitarcri_sic: boolean = false

  captUsuario: string
  captCargoUsuario: string
  captCargoPres: string
  captCodPres: string

  listaVacia: any = undefined;

  //ARRAY ALMACENAR LOS DIVS CLONADOS
  clonedDivs: any[] = [];

  // Objeto Deshabilitar Boton
  botonDeshabilitado: { [key: number]: boolean } = {};


  public modalRef: BsModalRef;

  constructor(private el: ElementRef,
    private dominioService: DominioService,
    private indicadorService: IndicadorService,
    private criterioSicService: CriterioSicService,
    private modalService: BsModalService,
    public sharedService: SharedServiceService,
    private evaluacionSicService: EvaluacionSicService,
    private divCreadoService: DivCreadoService,
    private toastrService: ToastrService

  ) { }

  @ViewChild('nombreIndicador', { static: false }) nombreIndicador: ElementRef;

  ngOnInit(): void {

    this.capturarNombres();
    this.cargarDominio();
    this.cargarCriteriosSic();
    this.cargarCriteriosEstandar();
    this.ultimaEvaluacionRegistrada();
    this.mantenerDivsCreados();


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
  getClassForCriterio(criterio: any): string {
    if (this.sharedService.criteriosSicGuardados.includes(criterio.crie_id)) {
      return 'btn-success';
    }
    return 'btn-outline-dark';
  }


  async clonarDiv() {
    const idDomino = document.getElementById('dom_id') as HTMLSelectElement;
    const selDominio = idDomino.selectedIndex;
    const valorDominio = idDomino.options[selDominio].textContent.trim();

    const idIndicador = document.getElementById('ind_id') as HTMLSelectElement;
    const selIndicador = idIndicador.selectedIndex;
    const valorIndicador = idIndicador.options[selIndicador].textContent.trim();

    //ALMACENAR LOS NOMBRES DE INDICADOR Y DOMINIO PARA USAR EN OTRO METODO
    this.nombre_indicador = valorIndicador
    this.nombre_dominio = valorDominio

    //ALMACENAR IDS DE DOMINIO E INDICADOR
    this.id_dominio = selDominio
    this.id_indicador = selIndicador

    //CONSTRUIR EL DTO DE DIV-CLONES
    this.divCreado = new DivCreadoDto(
      this.numeroDeClones,
      this.nombre_dominio,
      this.nombre_indicador,
      this.id_dominio,
      this.id_indicador,
      {
        eva_id: this.eva_id
      }
    )

    if (!selDominio) {
      this.toastrService.error('Selecciona un Dominio', 'Error', {
        timeOut: 3000,
        positionClass: 'toast-top-center',
      });
    } else if (!selIndicador) {
      this.toastrService.error('Selecciona un Indicador', 'Error', {
        timeOut: 3000,
        positionClass: 'toast-top-center',
      });
    } else {
      console.log(this.divCreado)
      //REALIZAR SOLICITUD DE REGISTRO DE DIV A LA BASE DE DATOS
      this.divCreadoService.createDivSic(this.divCreado).subscribe(
        data => {
          if (!data.error) {
            if (selDominio !== -1 && selIndicador !== -1) {
              this.numeroDeClones++;
              this.clondiv = true;
              this.habilitarDiv = false;

              setTimeout(() => {
                const divClonado = document.getElementById(`divClonado${this.numeroDeClones}`) as HTMLElement;

                if (divClonado) {
                  const spanDominio = divClonado.querySelector(`#nombre-dominio${this.numeroDeClones}`) as HTMLSpanElement;
                  const spanIndicador = divClonado.querySelector(`#nombre-indicador${this.numeroDeClones}`) as HTMLSpanElement;

                  if (spanDominio && spanIndicador) {
                    spanDominio.textContent = valorDominio;
                    spanIndicador.textContent = valorIndicador;

                    // Guardar información en el LocalStorage del div clonado
                    // const clonInfo = {
                    //   dominio: selDominio,
                    //   indicador: selIndicador,
                    //   numeroDeClones: this.numeroDeClones,
                    // };

                    //localStorage.setItem('clonInfo' + this.numeroDeClones, JSON.stringify(clonInfo));
                  }
                }
              }, 100)
            }
            //MENSAJE DE EXITO AL AGREGAR EL DOMINIO E INDICADOR
            this.toastrService.success(data.message, 'Éxito', {
              timeOut: 3000,
              positionClass: 'toast-top-center',
            });
          }
        },
        err => {
          //MANEJAR EL ERROR DEL SUSCRIBE DATA
          this.toastrService.error(err.error.message, 'Error', {
            timeOut: 4000,
            positionClass: 'toast-top-center',
          });
        }
      )
    }

  }


  mantenerDivsCreados() {
    // Iterar sobre las claves del localStorage
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith('clonInfo')) {
        const storedInfo = localStorage.getItem(key);
        if (storedInfo) {
          const divInfo = JSON.parse(storedInfo);
          this.clonedDivs.push(divInfo);
        }
      }
    });

    // Agregar los divs clonados al DOM
    this.clonedDivs.forEach((divInfo) => {
      const numeroDeClones = divInfo.numeroDeClones;

      // Crear un div clonado y configurar su contenido
      const divClonado = document.createElement('div');
      divClonado.className = `divClonado${numeroDeClones}`;

      // Agregar el div clonado al contenedor en tu HTML
      const contenedorDivs = document.getElementById('contenedorDivs');
      if (contenedorDivs) {
        contenedorDivs.appendChild(divClonado);
      }
    });
  }



  range(num: number): number[] {
    return Array.from({ length: num }, (_, i) => i + 1);
  }

  //ABRIR MODAL PARA ASIGNAR CUMPLIMIENTO
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

  openModal2(modalTemplate: TemplateRef<any>, id: number, eva_id: number, numeroDeClones: number) {
    this.sharedService.setIdEvaluacionSic(eva_id)
    this.sharedService.setIdCriterioSic(id)
    if (numeroDeClones) {
      //ACCEDEMOS A LOS DIVS CLONADOS EN EL LOCAL STORAGE
      const infoClonadaString = localStorage.getItem('clonInfo' + numeroDeClones)

      if (infoClonadaString) {
        const infoClonadaObjeto = JSON.parse(infoClonadaString);
        const dominio = infoClonadaObjeto.dominio;
        const indicador = infoClonadaObjeto.indicador;

        this.sharedService.setIdsDominioIndicador(dominio, indicador)
      }
    }

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
