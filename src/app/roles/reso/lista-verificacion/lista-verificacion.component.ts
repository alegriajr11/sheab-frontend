import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
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
    private router: Router,
    private ngxLoader: NgxUiLoaderService
  ) { }

  ngOnInit(): void {
    this.capturarActa();
    this.refreshOne();
  }

  volver(){
    this.router.navigate(['/reso']);
    localStorage.removeItem('nombre-pres-verificacion')
    localStorage.removeItem('boton-acta-verificacion')
    localStorage.removeItem('id_acta_verificacion')
    localStorage.removeItem('boton-editar-informe-verificacion')
  }


    //FUNCIONALIDAD DEL SLIDER BAR
    refreshOne() {
      const hasRefreshed = localStorage.getItem('hasRefreshed');
  
      if (!hasRefreshed) {
        // Establecer la bandera en el almacenamiento de sesión para evitar más refrescos
        localStorage.setItem('hasRefreshed', 'true');
  
        // Hacer un refresh manual después de un breve tiempo
        setTimeout(() => {
          this.ngxLoader.start(); // Inicia el loader
          window.location.reload();
        }, 10);
      }
    }
  
    ngOnDestroy(): void {
      // Eliminar la variable del almacenamiento al salir del componente
      localStorage.removeItem('hasRefreshed');
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
