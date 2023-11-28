import { Component } from '@angular/core';
import { ActaVerificacionDto } from 'src/app/models/Actas/actaVerificacion.dto';
import { Usuario } from 'src/app/models/usuario';
import { ActaVerificacionService } from 'src/app/services/Resolucion/acta-verificacion.service';

@Component({
  selector: 'app-equipo-verificadores',
  templateUrl: './equipo-verificadores.component.html',
  styleUrls: ['./equipo-verificadores.component.css']
})
export class EquipoVerificadoresComponent {

  //ATRIBUTOS PRESTADOR
  nombre_prestador: string
  nombre_municipio: string
  id_acta_verificacion: number

  usuarios_verificadores: Usuario

  numero_acta: number

  listaVacia: any = undefined;

  searchText: any;
  public page!: number;

  constructor(
    private actaVerificacionService: ActaVerificacionService,
  ) { }

  ngOnInit(): void {
    this.capturarActa();
    this.verificadoresAsignados();
  }

  capturarActa() {
    this.nombre_prestador = localStorage.getItem('nombre-pres-verificacion')
    this.id_acta_verificacion = parseInt(localStorage.getItem('id_acta_verificacion'))

    this.actaVerificacionService.oneActaVerificacion(this.id_acta_verificacion).subscribe(
      data => {
        this.nombre_municipio = data.act_municipio
        this.numero_acta = data.act_id
      },
      err => {
        err.error.message
      }
    )
  }

  //LISTAR VERIFICADORES ASIGNADOS AL ACTA
  verificadoresAsignados() {
    this.actaVerificacionService.listarUsuarioAsignados(this.id_acta_verificacion).subscribe(
      data => {
        this.usuarios_verificadores = data
      },
      err => {
        this.listaVacia = err.error.message;
      }

    )
  }
}
