import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Municipio } from 'src/app/models/Prestador/municipio';
import { SedesDto } from 'src/app/models/sedes.dto';
import { MunicipioService } from 'src/app/services/NuevoPrestador/municipio.service';
import { PrestadorService } from 'src/app/services/prestador.service';
import { SedesPrestadorService } from 'src/app/services/sedes-prestador.service';

@Component({
  selector: 'app-agregar-sedes-prestador',
  templateUrl: './agregar-sedes-prestador.component.html',
  styleUrls: ['./agregar-sedes-prestador.component.css']
})
export class AgregarSedesPrestadorComponent {

  sedePrestador: SedesDto
  municipio: Municipio[];
  prestadores: any[] = [];

  //ID MUNICIPIO
  municipio_id: number

  //ID DEL PRESTADOR
  prestador_id: string

  sede_numero: string
  sede_nombre: string
  sede_gerente: string;
  sede_principal: string = 'NO'
  sede_numero_principal: string
  sede_direccion: string
  sede_barrio: string
  sede_telefono: string;
  sede_email: string;

  listaVacia: any = undefined;

  constructor(
    private sedesPrestadorService: SedesPrestadorService,
    private toastrService: ToastrService,
    private municipioService: MunicipioService,
    private prestadorService: PrestadorService,
    private router: Router
  ) { }

  ngOnInit() {
    this.cargarMunicipio()
  }

  //LISTAR MUNICIPIOS
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

  //LISTAR PRESTADORES POR MUNICIPIO
  cargarPrestadoresByMun(): void {
    const municipioIdString = this.municipio_id.toString(); // Convierte el número en una cadena
    this.prestadorService.listMun(municipioIdString).subscribe(
      data => {
        this.prestador_id = '';
        this.prestadores = data;
        this.listaVacia = undefined
      },
      err => {
        this.listaVacia = err.error.message;
      }
    );
  }

  sedeSeleccionada() {
    this.sedesPrestadorService.listaOneSedeByPrestador(this.prestador_id).subscribe(
      data => {
        const numero_sede_principal = data.sede_numero_principal
        var codigo_sede = (document.getElementById('sede_numero_principal')) as HTMLSelectElement
        codigo_sede.value = numero_sede_principal
        this.sede_numero_principal = numero_sede_principal
      }
    )
  }

  onRegister(): void {
    this.sedePrestador = new SedesDto(
      this.sede_numero,
      this.sede_nombre,
      this.sede_gerente,
      this.sede_principal,
      this.sede_numero_principal,
      this.sede_direccion,
      this.sede_barrio,
      this.sede_telefono,
      this.sede_email,
      {
        pre_cod_habilitacion: this.prestador_id
      },
      {
        sede_mun_id: this.municipio_id
      },
    );
    console.log(this.sedePrestador)
    this.sedesPrestadorService.registroSedePrestador(this.sedePrestador).subscribe(
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