import { Component } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Municipio } from 'src/app/models/Prestador/municipio';
import { PrestadorDto } from 'src/app/models/prestador.dto';
import { SedesDto } from 'src/app/models/sedes.dto';
import { Usuario } from 'src/app/models/usuario';
import { MunicipioService } from 'src/app/services/NuevoPrestador/municipio.service';
import { PrestadorService } from 'src/app/services/prestador.service';
import { SedesPrestadorService } from 'src/app/services/sedes-prestador.service';

interface SelectedUser {
  userId: number | null;
  userId$: Observable<number | null>; // Propiedad userId$ que es un observable
}

@Component({
  selector: 'app-acta-visita-ivc',
  templateUrl: './acta-visita-ivc.component.html',
  styleUrls: ['./acta-visita-ivc.component.css']
})
export class ActaVisitaIvcComponent {

  prestador: PrestadorDto[];
  municipio: Municipio[];
  sede: SedesDto[];
  usuarios: Usuario[];
  usuariosContador: Usuario[];
  listaVacia: any = undefined;

  habilitarfechaCierre: boolean


  habilitar_motivo_visita: boolean

  //ATRIBUTOS PARA EL DTO DEL ACTA IVC
  act_id: number
  act_fecha_apertura: string
  act_hora_apertura24: string //Variable almacenar hora 24H
  act_hora_apertura: string //Variable alamcenar hora en formato 12 horas
  act_fecha_cierre: string
  act_hora_cierre24: string //Variable almacenar hora 24H
  act_hora_cierre: string //Variable alamcenar hora en formato 12 horas
  act_responsable_visita: string
  act_dependencia_visita: string
  act_telefono_dependencia_visita: string
  act_email_dependencia_visita: string
  act_motivo_visita: string
  act_motivo_visita_otro: string

  //DATOS PRESTADOR
  act_municipio: string
  act_prestador: string
  act_sede_prestador: string
  act_tipo_prestador: string
  act_nit: string
  act_cod_habilitacion: string
  act_cod_sede: string
  act_telefono: string
  act_direccion_sede: string
  act_representante_legal: string
  act_gerente: string
  act_correo_prestador: string
  act_notificacion_electronica: string
  act_tecnico_administrativa: string
  act_patrimonial_financiera: string
  act_funcionario_prestador: string

  //OFICIO
  act_numero_oficio: string
  act_fecha_oficio: string

  //ATRIBUTOS ID DE SELECTS
  act_municipioId: string
  act_prestadorId: string
  act_sede_prestadorId: string

  //Habilitar Select Sede
  habilitarSelectSede: boolean = false;

  //ALMACENAR LOS USUARIOS SELECCIONADOS EN EL ARRAY
  selectedUsersVerificadores: SelectedUser[] = [];

  //USUARIO CONTADOR
  selectedUsersContador: SelectedUser[] = [];
  userContador: boolean = false;

  selectedUserIds: number[] = [];

  usuariosSeleccionados: { [key: string]: number } = {};


  constructor(
    private prestadorService: PrestadorService,
    private municipioService: MunicipioService,
    private sedesServices: SedesPrestadorService,
  ) { }

  ngOnInit(): void {
    this.inicializarDatos();
  }


  inicializarDatos() {
    this.cargarMunicipio();
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
    this.act_municipioId = ''
  }

  //LISTAR PRESTADORES POR MUNICIPIO
  cargarPrestadoresByMun(): void {
    this.prestadorService.listMun(this.act_municipioId).subscribe(
      data => {
        this.prestador = data;
        this.listaVacia = undefined
      },
      err => {
        this.listaVacia = err.error.message;
      }
    );
    this.act_prestadorId = ''
  }

  habilitarSede() {
    this.habilitarSelectSede = true;
  }


  habilitarFechaCierre() {

  }

  //HABILITAR INPUT MOTIVO VISITA SI LA SELECCIÓN ES OTRO
  habilitarMotivoVisita() {
    var id = (document.getElementById('motivoVisita')) as HTMLSelectElement
    var sel = id.selectedIndex;
    var opt = id.options[sel]
    var ValorVisita = (<HTMLSelectElement><unknown>opt).value;

    if (ValorVisita === '6') {
      this.habilitar_motivo_visita = true
    } else {
      this.habilitar_motivo_visita = false
    }
  }

  //LISTAR SEDES POR SELECCION DE PRESTADOR
  cargarSedesByPrestador() {
    this.sedesServices.listaSedesNombre(this.act_prestadorId).subscribe(
      async data => {
        this.sede = data
        for (const pres of this.prestador) {
          if (pres.pre_cod_habilitacion === this.act_prestadorId) {
            for (const pres_barrio of data) {
              //ENCONTRAR EL PRESTADOR SELECCIONADO Y ASIGNAR EL BARRIO QUE SE ENCUENTRA EN LA ENTIDAD SEDE DE LA BD
              const idPrestadorSeleccionado = this.act_prestadorId;
              const pres = await this.prestadorService.listaOne(idPrestadorSeleccionado).toPromise();
              this.act_prestador = pres.pre_nombre
              if (this.act_prestador === pres_barrio.sede_nombre) {
                var barrio_prestador_asignado = pres_barrio.sede_barrio
                //this.act_barrio = barrio_prestador_asignado
              }

            }
          }
        }
        this.listaVacia = undefined
      },
      err => {
        this.listaVacia = err.error.message;
        this.act_sede_prestadorId = '';
        // Eliminar todas las opciones del select
        this.sede = [];
      }
    );
    //ASIGANAR LOS INPUT BARRIO, DIRECCION Y CODIGO_SEDE EN VACIO - SI SE SELECCIONA OTRO PRESTADOR
    //BARRIO DE LA SEDE
    // var sede_barrio = (document.getElementById('barrioSede')) as HTMLSelectElement
    // sede_barrio.value = ''
    // //DIRECCIÓN DE LA SEDE
    // var sede_direccion = (document.getElementById('direccionSede')) as HTMLSelectElement
    // sede_direccion.value = ''

  }

  //OBTENER LOCALIDAD Y DIRECCION DE LA SEDE SELECCIONADA
  sedeSeleccionada() {
    // this.sedesServices.listaOneSede(this.act_sede_principalId).subscribe(
    //   data => {
    //     //ASIGANACION DEL NOMBRE DE LA SEDE AL DTO
    //     this.act_sede = data.sede_nombre

    //     const barrio = data.sede_barrio
    //     const direccion = data.sede_direccion
    //     //ASIGANCION DE LOS BARRIOS DE LA SEDE AL DTO
    //     this.act_sede_direccion = direccion
    //     this.act_sede_barrio = barrio

    //     var sede_barrio = (document.getElementById('barrioSede')) as HTMLSelectElement
    //     sede_barrio.value = barrio

    //     var sede_direccion = (document.getElementById('direccionSede')) as HTMLSelectElement
    //     sede_direccion.value = direccion

    //   }
    // )
  }

  vaciarPorMunicipioSelect() {
    //DESHABILITAR SELECT DE SEDES
    this.habilitarSelectSede = false
    //VACIAR SELECT SEDES SI SELECCIONA OTRO MUNICIPIO
    this.act_sede_prestadorId = '';
    // Eliminar todas las opciones del select
    this.sede = [];
  }

  llenarCampos() {

  }

  //METODOS PARA CONTROLAR EL CONTADOR
  // AGREGAR USUARIO VERIFICADOR
  addSelectContador() {
    const newUser: SelectedUser = { userId: null, userId$: new BehaviorSubject<number | null>(null) };
    this.selectedUsersContador.push(newUser);
    this.userContador = true;
  }

  // AGREGAR USUARIO VERIFICADOR
  addSelectVerificador() {
    const newUser: SelectedUser = { userId: null, userId$: new BehaviorSubject<number | null>(null) };
    this.selectedUsersVerificadores.push(newUser);
  }

  // Actualizar ID del usuario seleccionado
  updateSelectedUserId(selectedUser: SelectedUser, selectedUserId: number) {
    selectedUser.userId = selectedUserId;
    // Actualiza el ID del usuario en el objeto usuariosSeleccionados
    this.usuariosSeleccionados[selectedUserId] = selectedUserId;
    console.log(this.usuariosSeleccionados)
  }

  // REMOVER VERIFICADOR
  removeSelectContador(userId: number) {
    const index = this.selectedUsersContador.findIndex(user => user.userId === userId);
    if (index !== -1) {
      // Encuentra el índice del usuario en el array
      this.selectedUsersContador.splice(index, 1); // Elimina el select de la lista de selectores
      delete this.usuariosSeleccionados[userId]; // Elimina el ID del usuario del objeto usuariosSeleccionados
      console.log(this.usuariosSeleccionados)
    }
    this.userContador = false;
  }

  // REMOVER VERIFICADOR
  removeSelectVerificador(userId: number) {
    const index = this.selectedUsersVerificadores.findIndex(user => user.userId === userId);
    if (index !== -1) {
      // Encuentra el índice del usuario en el array
      this.selectedUsersVerificadores.splice(index, 1); // Elimina el select de la lista de selectores
      delete this.usuariosSeleccionados[userId]; // Elimina el ID del usuario del objeto usuariosSeleccionados
      console.log(this.usuariosSeleccionados)
    }
  }

  onRegister() {

  }

}
