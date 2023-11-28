import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PrestadorDto } from '../models/prestador.dto';
import { AuthService } from '../services/auth.service';
import { ClaseService } from '../services/NuevoPrestador/clase.service';
import { ClasificacionService } from '../services/NuevoPrestador/clasificacion.service';
import { MunicipioService } from '../services/NuevoPrestador/municipio.service';
import { TipoService } from '../services/NuevoPrestador/tipo.service';
import { PrestadorService } from '../services/prestador.service';


@Component({
  selector: 'app-nuevo-prestador',
  templateUrl: './nuevo-prestador.component.html',
  styleUrls: ['./nuevo-prestador.component.css']
})
export class NuevoPrestadorComponent implements OnInit {

  prestador: PrestadorDto;
  clase: any[] = [];
  clasificacion: any[] = [];
  tipo: any[] = [];
  municipio: any[] = [];


  listaVacia: any = undefined;
  id:number = 0;

  pre_cod_habilitacion: string;
  pre_nombre: string;
  pre_nit: string;
  pre_direccion: string;
  pre_barrio: string;
  pre_telefono: string;
  pre_email: string;
  pre_habilitado: string;
  pre_representante: string;
  pre_clasificacion_id: number;
  pre_clase_id: number;
  pre_tipo_id: number;
  pre_municipio_id: number;

  constructor(
    private prestadorService: PrestadorService,
    private claseService: ClaseService,
    private clasificacionService: ClasificacionService,
    private tipoService: TipoService,
    private municipioService: MunicipioService,
    private toastrService: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cargarClase();
    this.cargarClasificacion();
    this.cargarMunicipio();
    this.cargarTipo();
  }
  


changeSelect(select:number){
    this.id = select;
}

  cargarMunicipio(): void {
    this.municipioService.lista().subscribe(
      data => {
        this.municipio = data;
        this.listaVacia = undefined;
      },
      err => {
        this.listaVacia = err.error.message;
      }
    )
  }

  
  cargarClase(): void {
    this.claseService.lista().subscribe(
      data => {
        this.clase = data;
        this.listaVacia = undefined;
      },
      err => {
        this.listaVacia = err.error.message;
      }
    );
  }

  cargarClasificacion(): void {
    this.clasificacionService.lista().subscribe(
      data => {
        this.clasificacion = data;
        this.listaVacia = undefined;
      },
      err => {
        this.listaVacia = err.error.message;
      }
    );
  }

  cargarTipo(): void {
    this.tipoService.lista().subscribe(
      data => {
        this.tipo = data;
        this.listaVacia = undefined;
      },
      err => {
        this.listaVacia = err.error.message;
      }
    );
  }



  onRegister(): void {
    this.prestador = new PrestadorDto(
      this.pre_cod_habilitacion,
      this.pre_nombre,
      this.pre_nit,
      this.pre_direccion,
      this.pre_telefono,
      this.pre_email,
      this.pre_habilitado,
      {
        cla_id: this.pre_clasificacion_id
      },
      this.pre_representante,
      {
        clas_id: this.pre_clase_id
      },
      {
        tip_id: this.pre_tipo_id
      },
      {
        mun_id: this.pre_municipio_id
      }
    );
    console.log(this.prestador)
    this.prestadorService.registroPrestador(this.prestador).subscribe(
      (data) => {
        this.toastrService.success(data.message, 'Ok', {
          timeOut: 3000,
          positionClass: 'toast-top-center',
        });
        this.router.navigate(['/prestadores']);
      },
      (err) => {
        this.toastrService.error(err.error.message, 'Error', {
          timeOut: 3000,
          positionClass: 'toast-top-center',
        });
      }
    );

  }

}
