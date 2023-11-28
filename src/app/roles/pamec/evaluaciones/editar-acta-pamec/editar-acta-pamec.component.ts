import { Component, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { ActaPamecDto } from 'src/app/models/Actas/actaPamePdf.dto';
import { Usuario } from 'src/app/models/usuario';
import { ActapdfService } from 'src/app/services/Sic/actapdf.service';
import { SharedServiceService } from 'src/app/services/shared-service.service';
import { TokenService } from 'src/app/services/token.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-acta-pamec',
  templateUrl: './editar-acta-pamec.component.html',
  styleUrls: ['./editar-acta-pamec.component.css']
})
export class EditarActaPamecComponent {

  actaPamec: ActaPamecDto = null
  //ALMACENAR LA FIRMA DEL PRESTADOR DEL SERVICIO COMPARTIDO
  firma: string;

  usuario: Usuario[] = null;
  act_cargo_funcionario: string
  act_nombre_prestador: string

  formulacion = false;
  mejoramiento = false;

  act_tipo_visita: string

  //ESTADO DE ACTA
  estado_acta: string;
  //HABILITAR FIRMA
  acta_firmada: boolean = true;
  //NO FIRMA ACTA
  noFirmaActa: string = 'false';

  id_evaluacion: number

  //MODAL
  public modalRef: BsModalRef;

  constructor(
    private actaPdfService: ActapdfService,
    private activatedRoute: ActivatedRoute,
    private usuarioService: UsuarioService,
    private modalService: BsModalService,
    private tokenService: TokenService,
    public sharedService: SharedServiceService,
    private toastrService: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    this.id_evaluacion = this.activatedRoute.snapshot.params['id'];
    this.actaPdfService.oneActaPamec(id).subscribe(
      data => {
        this.actaPamec = data;
        this.act_nombre_prestador = data.act_nombre_prestador
        this.act_tipo_visita = data.act_tipo_visita

        //this.noFirmaActa = data.noFirmaActa
      },
      err => {
        this.toastrService.error(err.error.message, 'Fail', {
          timeOut: 3000, positionClass: 'toast-top-center',
        });
        this.router.navigate(['/']);
      }
    );
    this.tipoVisita();
  }

  //Metodo Abrir Modal
  openModal(modalTemplate: TemplateRef<any>) {
    this.modalRef = this.modalService.show(modalTemplate,
      {
        class: 'modal-dialogue-centered modal-md',
        backdrop: true,
        keyboard: true
      }

    );
  }

  //OBTENER LA FIRMA DEL FUNCIONARIO1 Y ASIGNAR AL ATRIBTUO FIRMA FUNCIONARIO DEL ActaPamec DTO
  async obtenerFirmaFuncionario1(): Promise<void> {
    if (this.actaPamec.act_id_funcionario1) {
      const result = await Swal.fire({
        title: `${this.actaPamec.act_nombre_funcionario1}`,
        text: 'Al firmar la presente acta usted acepta haber realizado y diligenciado todo lo correspondiente a su competencia',
        showCancelButton: true,
        confirmButtonText: 'FIRMAR',
        cancelButtonText: 'CANCELAR'
      });

      if (result.value) {
        const idFuncionarioSeleccionado = this.actaPamec.act_id_funcionario1;
        try {
          const func = await this.usuarioService.oneUser(idFuncionarioSeleccionado).toPromise();
          this.actaPamec.act_firma_funcionario1 = func.usu_firma;
          this.toastrService.success('Acta Firmada exitosamente por verificador', 'Éxito', {
            timeOut: 3000,
            positionClass: 'toast-top-center',
          });
        } catch (error) {
          // Manejar errores si es necesario
          console.error('Error al obtener la firma del funcionario:', error);
          this.toastrService.error('Error al obtener la firma del funcionario', 'Error', {
            timeOut: 3000,
            positionClass: 'toast-top-center',
          });
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Acta sin firma del verificador',
          '',
          'error'
        );
      }
    }
  }

  //OBTENER LA FIRMA DEL FUNCIONARIO2 Y ASIGNAR AL ATRIBTUO FIRMA FUNCIONARIO DEL ActaPamec DTO
  async obtenerFirmaFuncionario2(): Promise<void> {
    if (this.actaPamec.act_id_funcionario2) {
      const result = await Swal.fire({
        title: `${this.actaPamec.act_nombre_funcionario2}`,
        text: 'Al firmar la presente acta usted acepta haber realizado y diligenciado todo lo correspondiente a su competencia',
        showCancelButton: true,
        confirmButtonText: 'FIRMAR',
        cancelButtonText: 'CANCELAR'
      });

      if (result.value) {
        const idFuncionarioSeleccionado = this.actaPamec.act_id_funcionario2;
        try {
          const func = await this.usuarioService.oneUser(idFuncionarioSeleccionado).toPromise();
          this.actaPamec.act_firma_funcionario2 = func.usu_firma;
          this.toastrService.success('Acta Firmada exitosamente por verificador', 'Éxito', {
            timeOut: 3000,
            positionClass: 'toast-top-center',
          });
        } catch (error) {
          // Manejar errores si es necesario
          console.error('Error al obtener la firma del funcionario:', error);
          this.toastrService.error('Error al obtener la firma del funcionario', 'Error', {
            timeOut: 3000,
            positionClass: 'toast-top-center',
          });
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Acta sin firma del verificador',
          '',
          'error'
        );
      }
    }
  }

  //METODO CONTROLAR SI EL PRESTADOR NO FIRMA EL ACTA
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
        //this.actaPamec.noFirmaActa = this.noFirmaActa
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

  tipoVisita(): void {
    var id = (document.getElementById('tipoVisita')) as HTMLSelectElement
    var sel = id.selectedIndex;
    var opt = id.options[sel]
    var ValorVisita = (<HTMLSelectElement><unknown>opt).value;

    if (ValorVisita === 'PRIMERA VEZ') {
      this.mejoramiento = false
      this.formulacion = false
    }

    if (ValorVisita === 'SEGUIMIENTO A IPS CRITICA') {
      this.mejoramiento = false
      this.formulacion = false
    }

    if (ValorVisita === 'SEGUIMIENTO A IPS VISITADA EN LOS ÚLTIMOS 4 AÑOS') {
      this.mejoramiento = false
      this.formulacion = false
    }

    if (ValorVisita === 'AÑO DE FORMULACION DEL PAMEC') {
      this.mejoramiento = false
      this.formulacion = true
    }

    if (ValorVisita === 'CICLO DE MEJORAMIENTO') {
      this.formulacion = false
      this.mejoramiento = true
    }
  }

  onUpdate(): void {

  }

  //Toastr mensaje éxito de Acta actualizada desde la Api
  private handleSuccess(message: string): void {
    this.toastrService.success(message, 'OK', {
      timeOut: 3000, positionClass: 'toast-top-center'
    });
    this.router.navigate(['/sp/evaluaciones-pro']);
  }

  //Manejo de errores en toastr al actualizar un Acta Pamec
  private handleError(errorMessage: string): void {
    this.toastrService.error(errorMessage, 'Fail', {
      timeOut: 3000, positionClass: 'toast-top-center',
    });
  }

  volver() {
    this.router.navigate(['/pamec/evaluaciones'])
    // Remover el item
    localStorage.removeItem('boton-editar-acta-pamec');
  }
}
