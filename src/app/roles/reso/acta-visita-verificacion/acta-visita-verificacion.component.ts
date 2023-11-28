import { Component, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable } from 'rxjs';
import { ActaVerificacionDto } from 'src/app/models/Actas/actaVerificacion.dto';
import { DatosVerificadosDto } from 'src/app/models/Actas/datos_verificados.dto';
import { UsuariosSeleccionadosDto } from 'src/app/models/Actas/usuariosSeleccionados.dto';
import { Municipio } from 'src/app/models/Prestador/municipio';
import { PrestadorDto } from 'src/app/models/prestador.dto';
import { SedesDto } from 'src/app/models/sedes.dto';
import { TokenDto } from 'src/app/models/token.dto';
import { Usuario } from 'src/app/models/usuario';
import { ClasificacionService } from 'src/app/services/NuevoPrestador/clasificacion.service';
import { MunicipioService } from 'src/app/services/NuevoPrestador/municipio.service';
import { ActaVerificacionService } from 'src/app/services/Resolucion/acta-verificacion.service';
import { PrestadorService } from 'src/app/services/prestador.service';
import { SedesPrestadorService } from 'src/app/services/sedes-prestador.service';
import { TokenService } from 'src/app/services/token.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

//Interfaz para los objetos de usuario seleccionados
interface SelectedUser {
  userId: number | null;
  userId$: Observable<number | null>; // Propiedad userId$ que es un observable
}


@Component({
  selector: 'app-acta-visita-verificacion',
  templateUrl: './acta-visita-verificacion.component.html',
  styleUrls: ['./acta-visita-verificacion.component.css']
})
export class ActaVisitaVerificacionComponent {

  //MODAL
  public modalRef: BsModalRef;

  municipio: Municipio[];
  prestador: any[] = null;

  //Datos Verificados DTO
  datosVerificados: DatosVerificadosDto = null

  usuarios: Usuario[];
  usuariosApoyo: Usuario[];
  usuariosContador: Usuario[];

  //ALAMACENAR EL ID PK ACTA
  id_acta: number

  //Sedes
  sede: SedesDto[];

  actaVerificacion: ActaVerificacionDto = null

  listaVacia: any = undefined;

  //ATRIBUTOS DATOS GENERALES DEL PRESTADOR
  act_id: number
  act_visita_previa: string
  act_visita_seguimiento: string
  act_visita_reactivacion: string
  //booleans para checkbox
  act_visita_previa_bool: boolean
  act_visita_seguimiento_bool: boolean
  act_visita_reactivacion_bool: boolean
  //fin
  act_municipio: string
  act_prestador: string
  act_nit: string
  act_sede: string
  act_tipo_prestador: string
  act_direccion: string
  act_cod_habilitacion: string
  act_cod_sede: string
  act_telefono: string
  act_correo: string
  act_representante: string
  act_gerente: string
  act_fecha_inicio: string
  act_fecha_final: string


  act_funcionario_prestador: string
  act_cargo_prestador: string

  act_recibe_visita: string
  act_firma_prestador: string


  //ATRIBUTOS ID DE SELECTS
  act_municipioId: string
  act_prestadorId: string
  act_funcionarioId: string
  act_sede_principalId: string

  //ATRIBUTOS PARA CONTROLAR DATOS ENCONTRADOS DE LA VISITA
  dat_encontrado_telefono: string
  dat_encontrado_direccion: string
  dat_encontrado_correo: string
  //OBSERVACIONES DEL ACTA
  act_observaciones: string

  //ALMACENAR LOS USUARIOS SELECCIONADOS EN EL ARRAY
  selectedUsersVerificadores: SelectedUser[] = [];
  //USUARIO CONTADOR
  selectedUsersContador: SelectedUser[] = [];
  userContador: boolean = false;
  //USUARIOS PROFESIONALES
  selectedUsersProfesionales: SelectedUser[] = [];

  selectedUserIds: number[] = [];

  usuariosSeleccionados: UsuariosSeleccionadosDto = {};

  //Habilitar la Fecha Final
  habilitarfechaFin = false;

  //Habilitar Select Sede Principal
  habilitarSelectSede: boolean = false;

  constructor(
    private modalService: BsModalService,
    private prestadorService: PrestadorService,
    private municipioService: MunicipioService,
    private sedesServices: SedesPrestadorService,
    private usuarioService: UsuarioService,
    private actaVerificacionService: ActaVerificacionService,
    private tokenService: TokenService,
    private toastrService: ToastrService,
    private router: Router
  ) {
    this.cargarUsuario();
    this.cargarUsuarioApoyo();
    this.cargarUsuarioContador();
  }

  ngOnInit() {
    this.incializarDatos();
  }

  incializarDatos() {
    this.unsoloCheckbox();
    this.cargarMunicipio();
  }



  obtenerNombres() {

  }



  //PERMITIR SOLO SELECCIONA UN SOLO CHECKBOX
  unsoloCheckbox() {
    let servicio_acta = this.actaVerificacionService
    let acta_verificacion = this.actaVerificacion
    var checkbox1 = (document.getElementById("previa")) as HTMLInputElement;
    var checkbox2 = (document.getElementById("segumiento")) as HTMLInputElement;
    var checkbox3 = (document.getElementById("reactivacion")) as HTMLInputElement;

    var tipo_visita = ''

    checkbox1.onclick = function (this: ActaVisitaVerificacionComponent) {
      if (checkbox1.checked != false) {
        checkbox2.checked = false;
        checkbox3.checked = false;

        this.act_visita_previa_bool = true;
        this.act_visita_seguimiento_bool = false;
        this.act_visita_reactivacion_bool = false;

        tipo_visita = 'previa'
        servicio_acta.listaUltimaActaVerificacion(tipo_visita).subscribe(
          data => {
            acta_verificacion = data
            var acta = (document.getElementById('acta')) as HTMLSelectElement
            acta.value = acta_verificacion.act_id.toString()
          }
        )
      }
    }.bind(this)

    checkbox2.onclick = function (this: ActaVisitaVerificacionComponent) {
      if (checkbox2.checked != false) {
        checkbox1.checked = false;
        checkbox3.checked = false;

        this.act_visita_previa_bool = false;
        this.act_visita_seguimiento_bool = true;
        this.act_visita_reactivacion_bool = false;


        tipo_visita = 'seguimiento'
        servicio_acta.listaUltimaActaVerificacion(tipo_visita).subscribe(
          data => {
            acta_verificacion = data
            var acta = (document.getElementById('acta')) as HTMLSelectElement
            acta.value = acta_verificacion.act_id.toString()
          }
        )
      }
    }.bind(this)

    checkbox3.onclick = function (this: ActaVisitaVerificacionComponent) {
      if (checkbox3.checked != false) {
        checkbox1.checked = false;
        checkbox2.checked = false;

        this.act_visita_previa_bool = false;
        this.act_visita_seguimiento_bool = false;
        this.act_visita_reactivacion_bool = true;


        tipo_visita = 'reactivacion'
        servicio_acta.listaUltimaActaVerificacion(tipo_visita).subscribe(
          data => {
            acta_verificacion = data
            var acta = (document.getElementById('acta')) as HTMLSelectElement
            acta.value = acta_verificacion.act_id.toString()
          }
        )
      }
    }.bind(this)
  }

  openModal(modalTemplate: TemplateRef<any>) {
    this.modalRef = this.modalService.show(modalTemplate,
      {
        class: 'modal-dialogue-centered modal-md',
        backdrop: true,
        keyboard: true
      }

    );

  }


  habilitarFechaFinal() {
    this.habilitarfechaFin = true;
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
    this.act_sede_principalId = ''
  }

  //LISTAR SEDES POR SELECCION DE PRESTADOR
  cargarSedesByPrestador() {
    this.habilitarSelectSede = true
    this.act_sede_principalId = ''
    this.sedesServices.listaSedesNombre(this.act_prestadorId).subscribe(
      async data => {
        this.sede = data
        this.listaVacia = undefined
      },
      err => {
        this.listaVacia = err.error.message;
      }
    );
  }

  async sedeSeleccionada() {
    if (this.act_sede_principalId) {
      this.sedesServices.listaOneSede(this.act_sede_principalId).subscribe(
        async data => {

          const cod_habilitacion = this.act_prestadorId

          var codigo_sede = (document.getElementById('codhabsede')) as HTMLSelectElement
          codigo_sede.value = ' ' + cod_habilitacion
          this.act_cod_sede = cod_habilitacion


          var gerente = (document.getElementById('gerente')) as HTMLSelectElement;
          gerente.value = data.sede_gerente
          //Asignar el nombre del gerente
          this.act_gerente = data.sede_gerente

          //Asignar el nombre de la sede
          this.act_sede = data.sede_nombre
        }
      )
    } else {
      var codigo_sede = (document.getElementById('codhabsede')) as HTMLSelectElement
      codigo_sede.value = ''
      this.act_cod_sede = ''
    }
  }

  //LISTAR USUARIOS
  cargarUsuario(): void {
    const rol_res = 'res'
    this.usuarioService.listaUserRol(rol_res).subscribe(
      data => {
        this.usuarios = data;
        this.listaVacia = undefined;
      },
      err => {
        this.listaVacia = err.error.message;
      }
    )
  }

  //LISTAR USUARIOS PROFESIONALES APOYO
  cargarUsuarioApoyo(): void {
    this.usuarioService.lista().subscribe(
      data => {
        this.usuariosApoyo = data;
        this.listaVacia = undefined;
      },
      err => {
        this.listaVacia = err.error.message;
      }
    )
  }

  //LISTAR USUARIOS CONTADOR
  cargarUsuarioContador(): void {
    this.usuarioService.listaUserContador().subscribe(
      data => {
        this.usuariosContador = data;
        this.listaVacia = undefined;
      },
      err => {
        this.listaVacia = err.error.message;
      }
    )
  }

  async llenarCampos() {
    var id = (document.getElementById('prestador')) as HTMLSelectElement
    var sel = id.selectedIndex;
    var opt = id.options[sel]
    var Codigo = (<HTMLSelectElement><unknown>opt).value;

    this.prestadorService.listaOne(Codigo).subscribe(
      async (data) => {
        for (let pres of this.prestador) {
          if (pres.pre_cod_habilitacion === Codigo) {
            /*DATOS GENERALRES REPORTADOS EN EL REPS*/
            //TIPO PRESTADOR
            var tipo_prestador = (document.getElementById('clasificacionPrestador')) as HTMLSelectElement;
            tipo_prestador.value = data.pre_clasificacion.cla_nombre;
            this.act_tipo_prestador = data.pre_clasificacion.cla_nombre

            //ASIGNACION CODIGO HABILITACION PRESTADOR
            var cod_habilitacion = (document.getElementById('codhabilitacion')) as HTMLSelectElement;
            cod_habilitacion.value = pres.pre_cod_habilitacion;
            //ASIGNAR A LA VARIABLE DTO
            this.act_cod_habilitacion = cod_habilitacion.value

            //ASIGNACION NIT PRESTADOR
            var nit = (document.getElementById('nit')) as HTMLSelectElement;
            nit.value = pres.pre_nit;
            //ASIGNAR A LA VARIABLE DTO
            this.act_nit = nit.value

            //ASIGNACION DIRECCIÓN PRESTADOR
            var direccion = (document.getElementById('direccion')) as HTMLSelectElement;
            direccion.value = pres.pre_direccion;
            //ASIGNAR A LA VARIABLE DTO
            this.act_direccion = direccion.value

            //ASIGNACION TELEFONO PRESTADOR
            var telefono = (document.getElementById('telefono')) as HTMLSelectElement;
            telefono.value = pres.pre_telefono;
            //ASIGNAR A LA VARIABLE DTO
            this.act_telefono = telefono.value

            //ASIGNACION EMAIL PRESTADOR
            var email = (document.getElementById('email')) as HTMLSelectElement;
            email.value = pres.pre_email;
            //ASIGNAR A LA VARIABLE DTO
            this.act_correo = email.value

            //ASIGNACION REPRESENTANTE LEGAL PRESTADOR
            var rep_legal = (document.getElementById('repleg')) as HTMLSelectElement;
            rep_legal.value = pres.pre_representante;
            //ASIGNAR A LA VARIABLE DTO
            this.act_representante = rep_legal.value
            var gerente = (document.getElementById('gerente')) as HTMLSelectElement;
            gerente.value = this.act_representante
            this.act_gerente = this.act_representante

            /**LLENAR CAMPOS DATOS ENCONTRADOS CON INFORMACIÓN DEL REPS PERO EDITABLES*/
            //ASIGNACION TELEFONO PRESTADOR
            var telefonoEncontrada = (document.getElementById('encontrado_telefono')) as HTMLSelectElement;
            telefonoEncontrada.value = pres.pre_telefono;
            this.dat_encontrado_telefono = telefonoEncontrada.value

            //ASIGNACION DIRECCIÓN PRESTADOR
            var direccionEncontrada = (document.getElementById('encontrado_direccion')) as HTMLSelectElement;
            direccionEncontrada.value = pres.pre_direccion;
            this.dat_encontrado_direccion = direccionEncontrada.value

            //ASIGNACION EMAIL PRESTADOR
            var emailEncontrada = (document.getElementById('encontrado_correo')) as HTMLSelectElement;
            emailEncontrada.value = pres.pre_email;
            this.dat_encontrado_correo = emailEncontrada.value
          }
        }
      },
      err => {
        this.listaVacia = err.error.message;
      }
    );
  }


  // AGREGAR USUARIO VERIFICADOR
  addSelectVerificador() {
    const newUser: SelectedUser = { userId: null, userId$: new BehaviorSubject<number | null>(null) };
    this.selectedUsersVerificadores.push(newUser);
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

  // Actualizar ID del usuario seleccionado
  updateSelectedUserId(selectedUser: SelectedUser, selectedUserId: number) {
    selectedUser.userId = selectedUserId;
    // Actualiza el ID del usuario en el objeto usuariosSeleccionados
    this.usuariosSeleccionados[selectedUserId] = selectedUserId;
  }


  addSelectProfesional() {
    const newUser: SelectedUser = { userId: null, userId$: new BehaviorSubject<number | null>(null) };
    this.selectedUsersProfesionales.push(newUser);
  }

  removeSelectProfesional(userId: number) {
    const index = this.selectedUsersProfesionales.findIndex(user => user.userId === userId);
    if (index !== -1) {
      // Encuentra el índice del usuario en el array
      this.selectedUsersProfesionales.splice(index, 1); // Elimina el select de la lista de selectores
      delete this.usuariosSeleccionados[userId]; // Elimina el ID del usuario del objeto usuariosSeleccionados
    }
  }


  //METODOS PARA CONTROLAR EL CONTADOR
  // AGREGAR USUARIO VERIFICADOR
  addSelectContador() {
    const newUser: SelectedUser = { userId: null, userId$: new BehaviorSubject<number | null>(null) };
    this.selectedUsersContador.push(newUser);
    this.userContador = true;
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

  async obtenerNombreSelects(): Promise<void> {
    //SELECT MUNICIPIO
    if (this.act_municipioId) {
      const idMunicipioSeleccionado = this.act_municipioId;
      const mun = await this.municipioService.oneMunicipio(idMunicipioSeleccionado).toPromise();
      this.act_municipio = mun.mun_nombre
    }

    if (this.act_prestadorId) {
      //SELECT PRESTADOR
      const idPrestadorSeleccionado = this.act_prestadorId;
      const pres = await this.prestadorService.listaOne(idPrestadorSeleccionado).toPromise();
      this.act_prestador = pres.pre_nombre
    }
  }

  async onRegister(): Promise<void> {

    //ASIGNAR EL VALOR DEL ACTA A LA VARIABLE DTO
    var acta = (document.getElementById('acta')) as HTMLSelectElement
    this.act_id = parseInt(acta.value, 10)

    //OBTENER NOMBRES DE LOS SELECTS
    await this.obtenerNombreSelects();

    //REGISTRAR LOS TIPOS DE VISITA COMO UNA X
    if (this.act_visita_previa_bool === true) {
      this.act_visita_previa = 'X'
      this.act_visita_seguimiento = ''
      this.act_visita_reactivacion = ''
    }
    if (this.act_visita_seguimiento_bool === true) {
      this.act_visita_seguimiento = 'X'
      this.act_visita_reactivacion = ''
      this.act_visita_previa = ''
    }
    if (this.act_visita_reactivacion_bool === true) {
      this.act_visita_reactivacion = 'X'
      this.act_visita_seguimiento = ''
      this.act_visita_previa = ''
    }

    //REGISTRO DE LA INFORMACIÓN RECOPILADA A LA CLASE DTO - ACTA_VERIFICACIÓNDTO
    this.actaVerificacion = new ActaVerificacionDto(
      this.act_id,
      this.act_visita_previa,
      this.act_visita_seguimiento,
      this.act_visita_reactivacion,
      this.act_fecha_inicio,
      this.act_fecha_final,
      this.act_municipio,
      this.act_prestador,
      this.act_nit,
      this.act_direccion,
      this.act_telefono,
      this.act_correo,
      this.act_representante,
      this.act_gerente,
      this.act_cod_habilitacion,
      this.act_sede,
      this.act_tipo_prestador,
      this.act_cod_sede,
      this.act_observaciones,
      this.act_firma_prestador,
      this.act_funcionario_prestador,
      this.act_cargo_prestador
    )


    this.datosVerificados = new DatosVerificadosDto(
      this.dat_encontrado_direccion,
      this.dat_encontrado_telefono,
      this.dat_encontrado_correo,
      //OBSERVACIONES DEL ACTA
      this.act_observaciones
    )

    // Obtener IDs de los usuarios seleccionados
    const idsUsuariosSeleccionados = this.selectedUsersVerificadores
      .map(selectedUser => selectedUser.userId)
      .filter(userId => userId !== null) as number[];

    // Construir el DTO
    const usuarios: UsuariosSeleccionadosDto = idsUsuariosSeleccionados.reduce((acc, userId) => {
      acc[userId.toString()] = userId;
      return acc;
    }, {} as UsuariosSeleccionadosDto);


    //OBTENER EL TOKEN DEL USUARIO QUE ESTÁ CREANDO EL ACTA
    const token = this.tokenService.getToken()
    //ASIGNANDO TOKEN A LA CLASE DTO - TOKENDTO
    const tokenDto: TokenDto = new TokenDto(token);

    if (
      !this.act_id ||
      (
        !this.act_visita_previa &&
        !this.act_visita_seguimiento &&
        !this.act_visita_reactivacion) ||
      !this.act_fecha_inicio ||
      !this.act_fecha_final ||
      !this.act_municipio ||
      !this.act_prestador ||
      !this.act_funcionario_prestador
    ) {
      //ASIGNANDO LOS RESPECTIVOS MENSAJES EN CASO DE ENTRAR AL IF DE VALIDACIÓN
      let mensajeError = 'Por favor, complete los siguientes campos:';
      if (!this.act_visita_previa &&
        !this.act_visita_seguimiento &&
        !this.act_visita_reactivacion) {
        mensajeError += ' Tipo de Visita,'
      }

      if (!this.act_fecha_inicio) {
        mensajeError += ' Fecha Inicial,';
      }

      if (this.act_fecha_inicio && !this.act_fecha_final) {
        mensajeError += ' Fecha Final,';
      }

      if (!this.act_municipioId) {
        mensajeError += ' Municipio,';
      }

      if (!this.act_prestador && this.act_municipioId) {
        mensajeError += ' Prestador,';
      }

      if (!this.act_funcionario_prestador) {
        mensajeError += ' Nombre del Prestador Recibe,';
      }

      mensajeError = mensajeError.slice(0, -1); // VARIABLE PARA ELIMINAR LA ÚLTIMA COMA

      //MOSTRAR MENSAJE POR MEDIO DE TOASTR_SERVICE
      this.toastrService.error(mensajeError, 'Error', {
        timeOut: 3000,
        positionClass: 'toast-top-center',
      });
    } else if (
      !this.dat_encontrado_direccion ||
      !this.dat_encontrado_telefono ||
      !this.dat_encontrado_correo
    ) {
      let mensajeError = 'Por favor, complete los siguientes campos:';

      if (!this.dat_encontrado_direccion) {
        mensajeError += ' Dirección Encontrada,';
      }
      if (!this.dat_encontrado_telefono) {
        mensajeError += ' Numero dE Telefono Encontrada,';
      }
      if (!this.dat_encontrado_correo) {
        mensajeError += ' Correo Electrónico Encontrada,';
      }

      mensajeError = mensajeError.slice(0, -1); // VARIABLE PARA ELIMINAR LA ÚLTIMA COMA

      //MOSTRAR MENSAJE POR MEDIO DE TOASTR_SERVICE
      this.toastrService.error(mensajeError, 'Error', {
        timeOut: 3000,
        positionClass: 'toast-top-center',
      });
    } else if (Object.keys(usuarios).length === 0) {
      let mensajeError = 'Por favor, Debes seleccionar al menos un verificador';
      //MOSTRAR MENSAJE POR MEDIO DE TOASTR_SERVICE
      this.toastrService.error(mensajeError, 'Error', {
        timeOut: 3000,
        positionClass: 'toast-top-center',
      });

    } else {
      //ENVIAR EL NOMBRE DEL PRESTADOR A EVALUAR POR LOCAL STORAGE
      if(this.act_sede){
        localStorage.setItem('nombre-pres-verificacion', this.act_sede);
      } else {
        localStorage.setItem('nombre-pres-verificacion', this.act_prestador);
      }

      //SOLICITUD DE REGISTRO DE ACTA
      this.actaVerificacionService.registroActaVerificacion(this.actaVerificacion, this.datosVerificados, usuarios, tokenDto).subscribe(
        async data => {
          if (!data.error) {
            localStorage.setItem('boton-acta-verificacion', 'true'); //HABILITAR LA RUTA RESTRINGIDA - EVALUACIÓN_IND

            //ENVIAR EL CODIGO DE HABILITACIÓN DEL PRESTADOR AL LOCAL STORAGE
            localStorage.setItem('pre_cod_habilitacion', this.act_cod_habilitacion)
            //DESPUÉS DE REGISTRAR EL ACTA, SE SOLICITA LA ÚLTIMA ACTA
            await this.actaVerificacionService.ultimoRegistroActa().subscribe(
              ultimaActa => {
                console.log(ultimaActa)
                //VERIFICA QUE EXISTA EL ACTA REGISTRADA
                if (ultimaActa && ultimaActa.id) {
                  this.id_acta = ultimaActa.id;
                  //ENVIAR EL ID DEL ACTA AL LOCAL STORAGE PARA LA EVALUACIÓN
                  localStorage.setItem('id_acta_verificacion', this.id_acta.toString());
                  Swal.fire({
                    title: '¿Desea descargar el acta?',
                    showCancelButton: true,
                    confirmButtonText: 'Si',
                    cancelButtonText: 'No'
                  }).then((result) => {
                    //SOLICITUD AL SERVICIO QUE GENERA EL ACTA_PDF PASANDO COMO PARAMETRO LA ULTIMA ACTA REGISTRADA
                    if (result.value) {
                      //this.generarPdfActaSpInd.ActaPdf(this.id_acta);
                      this.router.navigate(['/reso/lista-verificacion']);
                      window.scrollTo(0, 0);
                    } else if (result.dismiss === Swal.DismissReason.cancel) {
                      this.router.navigate(['/reso/lista-verificacion']);
                      window.scrollTo(0, 0);
                    }
                  });
                }
                else {
                  Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'No se pudo obtener el ID del acta.'
                  });
                }
              }
            )
            //TOASTR PARA ENVIAR MENSAJE DE ÉXITO
            this.toastrService.success(data.message, 'Éxito', {
              timeOut: 3000,
              positionClass: 'toast-top-center',
            });
          } else {
            //TOASTR PARA ENVIAR MENSAJE DE ERROR
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: data.message
            });
          }
        },
        err => {
          //MANEJAR EL ERROR DEL SUSCRIBE DATA - registroActaSicPdf
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: err.error.message
          });
        }
      )
    }
  }
}

