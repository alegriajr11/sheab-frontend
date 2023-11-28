import { Component, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { ActaSpPdfDto } from 'src/app/models/Actas/actaSpPdf.dto';
import { TokenDto } from 'src/app/models/token.dto';
import { Usuario } from 'src/app/models/usuario';
import { ActapdfService } from 'src/app/services/Sic/actapdf.service';
import { SharedServiceService } from 'src/app/services/shared-service.service';
import { TokenService } from 'src/app/services/token.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-acta-sp-ips',
  templateUrl: './editar-acta-sp-ips.component.html',
  styleUrls: ['./editar-acta-sp-ips.component.css']
})
export class EditarActaSpIpsComponent {

  actaSp: ActaSpPdfDto = null

  usuario: Usuario[] = null;
  act_cargo_funcionario: string

  //ALMACENAR LA FIRMA DEL PRESTADOR DEL SERVICIO COMPARTIDO
  firma_prestador: string;
  firma_acompanante: string;

  //Habilitar la Fecha Final
  habilitarfechaFin = false;
  act_nombre_prestador: string

  //HABILITAR FIRMA
  acta_firmada: boolean = true;
  //NO FIRMA ACTA
  noFirmaActa: string = 'false';

  //MODAL
  public modalRef: BsModalRef;

  //ESTADO DE ACTA
  estado_acta: string;

  id_evaluacion: number

  //VARIABLES COMPROMISOS
  act_compromiso_actividad: string
  act_compromiso_fecha: string
  act_compromiso_responsable: string

  constructor(
    private actaPdfService: ActapdfService,
    private activatedRoute: ActivatedRoute,
    private usuarioService: UsuarioService,
    private modalService: BsModalService,
    public sharedService: SharedServiceService,
    private tokenService: TokenService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    this.id_evaluacion = this.activatedRoute.snapshot.params['id'];
    this.actaPdfService.oneActaSpIps(id).subscribe(
      data => {
        this.actaSp = data;
        this.act_nombre_prestador = data.act_nombre_prestador
        this.noFirmaActa = data.noFirmaActa
      },
      err => {
        this.toastr.error(err.error.message, 'Fail', {
          timeOut: 3000, positionClass: 'toast-top-center',
        });
        this.router.navigate(['/']);
      }
    );

    this.unsoloCheckbox();
    this.estadoActa();
  }

  //DESTRUIR LAS VARIABLES AL SALIR DEL COMPONENTE EDITAR ACTA
  ngOnDestroy() {
    localStorage.removeItem('boton-editar-acta-sp-ips')
  }

  //Metodo Abrir Modal
  openModalFirmPrestador(modalTemplate: TemplateRef<any>) {
    this.modalRef = this.modalService.show(modalTemplate,
      {
        class: 'modal-dialogue-centered modal-md',
        backdrop: true,
        keyboard: true
      }

    );
  }

  //Metodo Abrir Modal
  openModalAcompanante(modalTemplate: TemplateRef<any>) {
    this.modalRef = this.modalService.show(modalTemplate,
      {
        class: 'modal-dialogue-centered modal-md',
        backdrop: true,
        keyboard: true
      }

    );
  }

  //METODO CONTROLAR SI EL PRESTADOR NO FIRMA EL ACTA POR ENDE EL ACOMPAÑANTE TAMPOCO
  noFirmaPrestador() {
    Swal.fire({
      title: `No firma el acta.`,
      text: `¿Estás seguro de que ${this.act_nombre_prestador} no desea firmar el Acta?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        this.noFirmaActa = 'true'
        //SOLICITUD NO FIRMA ACTA EN TRUE A LA ENTIDAD ACTA
        this.actaSp.noFirmaActa = this.noFirmaActa
      }
      else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelado',
          '',
          'error'
        );
      }
    })
  }


  habilitarFechaFinal() {
    this.habilitarfechaFin = true;
    var fecha_final = (document.getElementById('fecha-final')) as HTMLSelectElement
    fecha_final.value = ''
  }


  cargoUsuario() {
    var id = (document.getElementById('usu_secretaria')) as HTMLSelectElement
    var sel = id.selectedIndex;
    var opt = id.options[sel]
    var Codigo = (<HTMLSelectElement><unknown>opt).value;

    const idUsuarioComoNumero = parseInt(Codigo, 10);
    this.usuarioService.oneUser(idUsuarioComoNumero).subscribe(
      data => {
        for (const usu of this.usuario) {
          if (usu.usu_id === idUsuarioComoNumero) {
            var cargo_usuario = (document.getElementById('cargoSecre')) as HTMLSelectElement
            cargo_usuario.value = usu.usu_cargo
            this.act_cargo_funcionario = cargo_usuario.value
          }
        }
      }
    )
  }

  //PERMITIR SOLO SELECCIONA UN SOLO CHECKBOX
  unsoloCheckbox(): void {
    var checkbox1 = (document.getElementById("inicial")) as HTMLInputElement;
    var checkbox2 = (document.getElementById("segumiento")) as HTMLInputElement;
    checkbox1.onclick = function () {
      if (checkbox1.checked != false) {
        checkbox2.checked = null;
      }
    }
    checkbox2.onclick = function () {
      if (checkbox2.checked != false) {
        checkbox1.checked = null;
      }
    }
  }

  async estadoActa() {
    // Obtener el estado actual del acta
    const data = await this.actaPdfService.oneActaSpIps(this.id_evaluacion).toPromise();
    this.estado_acta = data.act_estado;
    if (this.estado_acta === '0') {
      localStorage.setItem('boton-editar-acta-sp-ips', 'false')
    } else if (this.estado_acta === '1') {
      localStorage.setItem('boton-editar-acta-sp-ips', 'true')
    }
  }



  //OBTENER LA FIRMA DEL FUNCIONARIO Y ASIGNAR AL ATRIBTUO FIRMA FUNCIONARIO DEL ACTASIC DTO
  async obtenerFirmaFuncionario(): Promise<void> {
    if (this.actaSp.act_id_funcionario) {
      const result = await Swal.fire({
        title: `${this.actaSp.act_nombre_funcionario}`,
        text: 'Al firmar la presente acta usted acepta haber realizado y diligenciado todo lo correspondiente a su competencia',
        showCancelButton: true,
        confirmButtonText: 'FIRMAR',
        cancelButtonText: 'CANCELAR'
      });

      if (result.value) {
        const idFuncionarioSeleccionado = this.actaSp.act_id_funcionario;
        try {
          const func = await this.usuarioService.oneUser(idFuncionarioSeleccionado).toPromise();
          this.actaSp.act_firma_funcionario = func.usu_firma;
          this.toastr.success('Acta Firmada exitosamente por verificador', 'Éxito', {
            timeOut: 3000,
            positionClass: 'toast-top-center',
          });
        } catch (error) {
          // Manejar errores si es necesario
          console.error('Error al obtener la firma del funcionario:', error);
          this.toastr.error('Error al obtener la firma del funcionario', 'Error', {
            timeOut: 3000,
            positionClass: 'toast-top-center',
          });
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          `Acta sin firma del verificador:`,
          `${this.actaSp.act_nombre_funcionario}`,
          'error'
        );
      }
    }
  }




  onUpdate(): void {
    //Por medio de ActivateRoute se atrapa el id del Usuario
    const id = this.activatedRoute.snapshot.params['id'];
    //Construcción del DTO Token
    const token = this.tokenService.getToken();
    const tokenDto: TokenDto = new TokenDto(token);

    //VISITA INICIAL
    var visitaInicial = (document.getElementById('inicial')) as HTMLInputElement
    var valorVisitaInicial = visitaInicial.checked
    var inicial = '';
    if (valorVisitaInicial) {
      inicial = 'X';
    }

    //ASIGNACION VISITA INICIAL
    this.actaSp.act_visita_inicial = inicial;

    //VISITA SEGUIMIENTO
    var visitaSeguim = (document.getElementById('segumiento')) as HTMLInputElement
    var valorVisitaSeguim = visitaSeguim.checked
    var seguimiento = '';
    if (valorVisitaSeguim) {
      seguimiento = 'X';
    }
    //ASIGNACIÓN VISITA SEGUIMIENTO
    this.actaSp.act_visita_seguimiento = seguimiento;

    //ASIGNACION DE LA FIRMA DEL PRESTADOR SOLO SI FUE INGRESADA EN EL SERVICIO COMPARTIDO
    this.firma_prestador = this.sharedService.getFirmaActaSpIpsPrestador();
    //ASIGNAR FIRMA PRESTADOR
    if (this.firma_prestador) {
      this.actaSp.act_firma_prestador = this.firma_prestador
    }
    this.firma_acompanante = this.sharedService.getFirmaActaSpIpsAcompanante();

    //ASIGNAR FIRMA ACOMPAÑANTE
    if (this.firma_acompanante) {
      this.actaSp.act_firma_prestador_acompanante = this.firma_acompanante
    }

    if (
      (!this.actaSp.act_visita_inicial && !this.actaSp.act_visita_seguimiento) ||
      !this.actaSp.act_fecha_inicial ||
      !this.actaSp.act_fecha_final ||
      !this.actaSp.act_barrio ||
      !this.actaSp.act_nombre_prestador ||
      !this.actaSp.act_cargo_prestador
    ) {
      //ASIGNANDO LOS RESPECTIVOS MENSAJES EN CASO DE ENTRAR AL IF DE VALIDACIÓN
      let mensajeError = 'Por favor, complete los siguientes campos:';
      if (!this.actaSp.act_visita_inicial && !this.actaSp.act_visita_seguimiento) {
        mensajeError += ' Tipo de Visita,';
      }

      if (!this.actaSp.act_fecha_inicial) {
        mensajeError += ' Fecha Inicial,';
      }

      if (this.actaSp.act_fecha_inicial && !this.actaSp.act_fecha_final) {
        mensajeError += ' Fecha Final,';
      }

      if (!this.actaSp.act_barrio) {
        mensajeError += ' Barrio,';
      }

      if (!this.actaSp.act_nombre_prestador) {
        mensajeError += ' Nombre del Prestador,';
      }

      if (!this.actaSp.act_cargo_prestador) {
        mensajeError += ' Cargo Prestador,';
      }

      mensajeError = mensajeError.slice(0, -1); // VARIABLE PARA ELIMINAR LA ÚLTIMA COMA

      //MOSTRAR MENSAJE POR MEDIO DE TOASTR_SERVICE
      this.toastr.error(mensajeError, 'Error', {
        timeOut: 3000,
        positionClass: 'toast-top-center',
      });
    } else {
      this.actaPdfService.updateActaSpIps(id, this.actaSp, tokenDto).subscribe(
        data => {
          this.handleSuccess(data.message);
        },
        err => {
          this.handleError(err.error.message);
        }
      )
    }
  }

  //Toastr mensaje éxito de Acta actualizada desde la Api
  private handleSuccess(message: string): void {
    this.toastr.success(message, 'OK', {
      timeOut: 3000, positionClass: 'toast-top-center'
    });
    this.router.navigate(['/sp/evaluaciones-ips']);
  }

  //Manejo de errores en toastr al actualizar un Acta Sic
  private handleError(errorMessage: string): void {
    this.toastr.error(errorMessage, 'Fail', {
      timeOut: 3000, positionClass: 'toast-top-center',
    });
  }

  volver() {
    this.router.navigate(['/sp/evaluaciones-ips'])
    // Remover el item
    localStorage.removeItem('boton-editar-acta-sp-ips');
  }
}
