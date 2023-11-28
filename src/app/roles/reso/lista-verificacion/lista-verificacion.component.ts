import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PrestadorDto } from 'src/app/models/prestador.dto';
import { Municipio } from 'src/app/models/Prestador/municipio';
import { Usuario } from 'src/app/models/usuario';
import { MunicipioService } from 'src/app/services/NuevoPrestador/municipio.service';
import { PrestadorService } from 'src/app/services/prestador.service';
import { ActaVerificacionService } from 'src/app/services/Resolucion/acta-verificacion.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-lista-verificacion',
  templateUrl: './lista-verificacion.component.html',
  styleUrls: ['./lista-verificacion.component.css']
})
export class ListaVerificacionComponent implements OnInit {

  prestador: PrestadorDto[];
  usuario: Usuario[];
  municipio: Municipio[];

  listaVacia: any = undefined;

  //ATRIBUTOS PRESTADOR
  nombre_prestador: string
  nombre_municipio: string
  id_acta_verificacion: number

  constructor(
    private prestadorService: PrestadorService,
    private municipioService: MunicipioService,
    private actaVerificacionService: ActaVerificacionService,
    private usuarioService: UsuarioService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.capturarActa();
  }

  volver(){
    this.router.navigate(['/reso']);
    localStorage.removeItem('nombre-pres-verificacion')
    localStorage.removeItem('boton-acta-verificacion')
    localStorage.removeItem('id_acta_verificacion')
  }

  capturarActa() {
    this.nombre_prestador = localStorage.getItem('nombre-pres-verificacion')
    this.id_acta_verificacion = parseInt(localStorage.getItem('id_acta_verificacion'))

    this.actaVerificacionService.oneActaVerificacion(this.id_acta_verificacion).subscribe(
      data => {
        this.nombre_municipio =  data.act_municipio
      },
      err =>{
        err.error.message
      }
    )
  }


}
