import { Component, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Actividad } from 'src/app/models/Pamec/actividad.dto';
import { CriterioPam } from 'src/app/models/Pamec/criteriopam.dto';
import { ActividadService } from 'src/app/services/Pamec/actividad.service';
import { CriteriopamService } from 'src/app/services/Pamec/criteriopam.service';
import { SharedServiceService } from 'src/app/services/shared-service.service';

@Component({
  selector: 'app-editar-evaluacion-pamec',
  templateUrl: './editar-evaluacion-pamec.component.html',
  styleUrls: ['./editar-evaluacion-pamec.component.css']
})
export class EditarEvaluacionPamecComponent {


  actividad: Actividad[];
  criteriopam: CriterioPam[];

  listaVacia: any = undefined;

  captUsuario: string
  captCargoUsuario: string
  captCargoPres: string

  eva_pam_id: number
  cri_pam_id: number

  //NOMBRE DEL PRESTADOR
  nombre_prestador: string = ''

  controlCriterio = false;

  selectedOption: string;
  optionsAplica = [
    { value: 'si', label: 'Si' },
    { value: 'no', label: 'No' },
  ];

  optionsCalificacion = [
    { value: 5, nota: 5 },
    { value: 3, nota: 3 },
    { value: 1, nota: 1 },
  ];


  public modalRef: BsModalRef;

  constructor(
    private criteriopamService: CriteriopamService,
    public sharedService: SharedServiceService,
    private modalService: BsModalService,
    private actividadService: ActividadService
  ) { }

  ngOnInit(): void {
    this.capturarNombrePrestador()
    this.cargarActividad()
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

  cargarCriterios(): void {
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
  }

  
  //PROTEGER LA RUTA AL SALIR DEL EDITAR
  async deshabilitarRutaEditar() {
    localStorage.removeItem('boton-acta-pamec');
    localStorage.removeItem('nombre-pres-pamec');
    localStorage.removeItem('boton-editar-evaluacion-pamec');
    //localStorage.removeItem('id_acta_pamec');
    this.sharedService.criteriosPamecGuardados = [];
    this.cri_pam_id = null
    this.eva_pam_id = null
  }

  //ESTABLECER LOS COLORES POR CUMPLIMIENTO
  getClassForCriterio(criterio: any): string {
    if (this.sharedService.criteriosIndGuardados.includes(criterio.cri_id)) {
      return 'btn-success';
    }
    return 'btn-outline-dark';
  }

  capturarNombrePrestador(): void {
    //CAPURAR NOMBRE DEL PRESTADOR
    var captPrestador = localStorage.getItem("nombre-pres-pamec");
    this.nombre_prestador = captPrestador
    console.log(captPrestador)

  }

  
  openModal(modalTemplate: TemplateRef<any>, id: number, eva_pamec_id: number) {
    this.sharedService.setIdPamecEvaluacion(eva_pamec_id)
    this.eva_pam_id = eva_pamec_id
    this.sharedService.setIdCriterioPamec(id)
    this.cri_pam_id = id
    console.log(this.cri_pam_id)
    this.modalRef = this.modalService.show(modalTemplate,
      {
        class: 'modal-dialogue-centered modal-md',
        backdrop: true,
        keyboard: true
      }
    );
  }

  onRegister(): void {

  }
}
