import { Component, OnInit, TemplateRef } from '@angular/core';
import { PrestadorDto } from 'src/app/models/prestador.dto';
import { Municipio } from 'src/app/models/Prestador/municipio';
import { Usuario } from 'src/app/models/usuario';
import { MunicipioService } from 'src/app/services/NuevoPrestador/municipio.service';
import { PrestadorService } from 'src/app/services/prestador.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { SharedServiceService } from 'src/app/services/shared-service.service';
import { ActapdfService } from 'src/app/services/Sic/actapdf.service';
import { TokenService } from 'src/app/services/token.service';
import { GenerarPdfActaPamecService } from 'src/app/services/Pamec/generar-pdf-acta-pamec.service';
import { TokenDto } from 'src/app/models/token.dto';
import { ActaPamecDto } from 'src/app/models/Actas/actaPamePdf.dto';
import { SedesPrestadorService } from 'src/app/services/sedes-prestador.service';
import { SedesDto } from 'src/app/models/sedes.dto';


@Component({
  selector: 'app-acta-pamec',
  templateUrl: './acta-pamec.component.html',
  styleUrls: ['./acta-pamec.component.css']
})
export class ActaPamecComponent implements OnInit {

  //DIV USUARIO
  agregarUsuario = false


  //DIV PRESTADOR
  agregarPrestador = false
  prestadorAgregado = true

  formulacion = false;
  mejoramiento = false;

  prestador: PrestadorDto[];
  usuario_uno: Usuario[];
  usuario_dos: Usuario[];
  municipio: Municipio[];
  sede: SedesDto[];

  //DTO DEL PDF ACTA
  actaPamecPdf: ActaPamecDto = null;


  //Habilitar la Fecha Final
  habilitarfechaFin = false;

  //Boton habilitar la evaluacion
  boton_acta_sp_ind = false;

  //MODAL
  public modalRef: BsModalRef;

  listaVacia: any = undefined;

  id_acta: number

  //VARIABLES PARA TRANSPORTAR EL DTO
  act_id: number;
  act_tipo_visita: string;
  //ATRIBUTOS POR TIPO DE VISITA:
  act_ano_formulacion: string
  act_ciclo_mejoramiento: string
  act_fecha_visita: string;
  act_municipio: string
  act_prestador: string
  act_nit: string;
  act_direccion: string
  act_barrio: string
  act_telefono: string
  act_email: string
  act_representante: string
  act_cod_prestador: string
  act_sede: string
  act_sede_barrio: string
  act_sede_direccion: string
  act_obj_visita: string
  act_nombre_funcionario1: string
  act_cargo_funcionario1: string
  act_firma_funcionario1: string
  act_id_funcionario1: number

  act_nombre_funcionario2: string
  act_cargo_funcionario2: string
  act_firma_funcionario2: string
  act_id_funcionario2: number

  act_nombre_prestador: string
  act_cargo_prestador: string
  act_firma_prestador: string

  //ATRIBUTOS ID DE SELECTS
  act_municipioId: string
  act_prestadorId: string
  act_funcionarioId: string
  act_funcionarioId2: string
  act_tipo_visitaId: string
  act_sede_principalId: string


  firma: string;

  //Habilitar Select Sede Principal
  habilitarSelectSede: boolean = false;

  //ATRIBUTOS CONTROLAR MENSAJES VALIDACION
  showTipoVisitaMessage: boolean = false;
  showFechaVisitaMessage: boolean = false;
  showMunicipioMessage: boolean = false;
  showPrestadorMessage: boolean = false;
  showBarrioMessage: boolean = false;
  showObjVisitaMessage: boolean = false;
  showVerificadorMessage: boolean = false;
  showPresadorNombreMessage: boolean = false;
  showPrestadorCargoMessage: boolean = false;
  showSedeMessage: boolean = false;



  constructor(
    private modalService: BsModalService,
    private prestadorService: PrestadorService,
    private municipioService: MunicipioService,
    private usuarioService: UsuarioService,
    private toastrService: ToastrService,
    private authService: AuthService,
    private actaPdfService: ActapdfService,
    public sharedService: SharedServiceService,
    private generarPdfActaPamec: GenerarPdfActaPamecService,
    private tokenService: TokenService,
    private sedesServices: SedesPrestadorService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.incializarDatos();
  }

  incializarDatos() {
    this.cargarMunicipio();
    this.cargarUsuariosUno();
    this.obtenerNombres();
    this.ultimaActaId();
    this.act_funcionarioId = ''
    this.act_funcionarioId2 = ''
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

  //MOSTRAR NUEVA ACTA A REGISTRAR
  mostrarActaId(): void {
    this.actaPdfService.listaUltimaPamec().subscribe(
      data => {
        this.actaPamecPdf = data
        var acta = (document.getElementById('acta')) as HTMLSelectElement
        acta.value = this.actaPamecPdf.act_id.toString()
      }
    )
  }

  //LISTAR PRESTADORES POR MUNICIPIO
  cargarPrestadoresByMun(): void {
    this.prestadorService.listMunPamec(this.act_municipioId).subscribe(
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
                this.act_barrio = barrio_prestador_asignado
              }

            }
          }
        }
        this.listaVacia = undefined
      },
      err => {
        this.listaVacia = err.error.message;
        this.act_sede_principalId = '';
        // Eliminar todas las opciones del select
        this.sede = [];
      }
    );
    //ASIGANAR LOS INPUT BARRIO, DIRECCION Y CODIGO_SEDE EN VACIO - SI SE SELECCIONA OTRO PRESTADOR
    //BARRIO DE LA SEDE
    var sede_barrio = (document.getElementById('barrioSede')) as HTMLSelectElement
    sede_barrio.value = ''
    //DIRECCIÓN DE LA SEDE
    var sede_direccion = (document.getElementById('direccionSede')) as HTMLSelectElement
    sede_direccion.value = ''

  }


  //OBTENER LOCALIDAD Y DIRECCION DE LA SEDE SELECCIONADA
  sedeSeleccionada() {
    this.sedesServices.listaOneSede(this.act_sede_principalId).subscribe(
      data => {
        //ASIGANACION DEL NOMBRE DE LA SEDE AL DTO
        this.act_sede = data.sede_nombre

        const barrio = data.sede_barrio
        const direccion = data.sede_direccion
        //ASIGANCION DE LOS BARRIOS DE LA SEDE AL DTO
        this.act_sede_direccion = direccion
        this.act_sede_barrio = barrio

        var sede_barrio = (document.getElementById('barrioSede')) as HTMLSelectElement
        sede_barrio.value = barrio

        var sede_direccion = (document.getElementById('direccionSede')) as HTMLSelectElement
        sede_direccion.value = direccion

      }
    )
  }

  convertirFecha(fecha: string) {
    // Convierte la cadena de fecha en un objeto Date, ajustando la zona horaria a UTC
    const fechaObj = new Date(fecha + "T00:00:00Z");
    // Obtiene el día, mes y año de la fecha
    const dia = fechaObj.getUTCDate();
    const mes = fechaObj.getUTCMonth() + 1; // Los meses son 0-indexados, por lo que sumamos 1
    const año = fechaObj.getUTCFullYear();
    // Formatea la fecha en DD/MM/AAAA
    const fechaEnFormatoDeseado = `${dia.toString().padStart(2, "0")}/${mes.toString().padStart(2, "0")}/${año}`;
    return fechaEnFormatoDeseado;
  }

  llenarCampos() {
    var id = (document.getElementById('prestador')) as HTMLSelectElement
    var sel = id.selectedIndex;
    var opt = id.options[sel]
    var Codigo = (<HTMLSelectElement><unknown>opt).value;


    this.prestadorService.listaOne(Codigo).subscribe(
      data => {
        for (const pres of this.prestador) {
          if (pres.pre_cod_habilitacion === Codigo) {
            var nit = (document.getElementById('nit')) as HTMLSelectElement
            nit.value = pres.pre_nit;
            var direccion = (document.getElementById('direccion')) as HTMLSelectElement
            direccion.value = pres.pre_direccion;
            var telefono = (document.getElementById('telefono')) as HTMLSelectElement
            telefono.value = pres.pre_telefono;
            var email = (document.getElementById('email')) as HTMLSelectElement
            email.value = pres.pre_email;
            var rep_legal = (document.getElementById('repleg')) as HTMLSelectElement
            rep_legal.value = pres.pre_representante;
            var cod_pres = (document.getElementById('codpres')) as HTMLSelectElement
            cod_pres.value = pres.pre_cod_habilitacion;

            var nombre_prestador = (document.getElementById('nombrePrestador')) as HTMLSelectElement
            nombre_prestador.value = pres.pre_representante

          }
        }
      },
      err => {
        this.listaVacia = err.error.message;
      }
    );
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

    if (this.act_funcionarioId) {
      //SELECT FUNCIONARIO VERIFICADOR
      const idFuncionarioSeleccionado = this.act_funcionarioId;
      const idFuncionarioComoNumero = parseInt(idFuncionarioSeleccionado, 10);
      const func = await this.usuarioService.oneUser(idFuncionarioComoNumero).toPromise();
      this.act_nombre_funcionario1 = func.usu_nombre + ' ' + func.usu_apellido
      this.act_id_funcionario1 = parseInt(this.act_funcionarioId, 10)
    }

    if (this.act_funcionarioId2) {
      //SELECT FUNCIONARIO VERIFICADOR
      const idFuncionarioSeleccionado = this.act_funcionarioId2;
      const idFuncionarioComoNumero = parseInt(idFuncionarioSeleccionado, 10);
      const func = await this.usuarioService.oneUser(idFuncionarioComoNumero).toPromise();
      this.act_nombre_funcionario2 = func.usu_nombre + ' ' + func.usu_apellido
      this.act_id_funcionario2 = parseInt(this.act_funcionarioId2, 10)
    }

    if (this.act_tipo_visitaId) {
      //SELECT TIPO DE VISITA
      var id = (document.getElementById('tipoVisita')) as HTMLSelectElement
      var sel = id.selectedIndex;
      var opt = id.options[sel]
      var valorVisita = (<HTMLSelectElement><unknown>opt).textContent;
      this.act_tipo_visita = valorVisita
    }
  }

  // //OBTENER LA FIRMA DEL FUNCIONARIO Y ASIGNAR AL ATRIBTUO act_firma_funcionario
  // async obtenerFirmaFuncionario1(): Promise<void> {
  //   if (this.act_funcionarioId) {
  //     const idFuncionarioSeleccionado = this.act_funcionarioId
  //     const idFuncionarioComoNumero = parseInt(idFuncionarioSeleccionado, 10);
  //     const func = await this.usuarioService.oneUser(idFuncionarioComoNumero).toPromise();
  //     this.act_firma_funcionario1 = func.usu_firma
  //   }
  // }

  // //OBTENER LA FIRMA DEL FUNCIONARIO Y ASIGNAR AL ATRIBTUO act_firma_funcionario
  // async obtenerFirmaFuncionario2(): Promise<void> {
  //   if (this.act_funcionarioId2) {
  //     const idFuncionarioSeleccionado = this.act_funcionarioId2
  //     const idFuncionarioComoNumero = parseInt(idFuncionarioSeleccionado, 10);
  //     const func = await this.usuarioService.oneUser(idFuncionarioComoNumero).toPromise();
  //     this.act_firma_funcionario2 = func.usu_firma
  //   }
  // }

  //MENSAJES DE VALIDACION DIVS
  ocultarMensajes() {
    if (this.act_tipo_visita) {
      this.showTipoVisitaMessage = false
    }

    if (this.act_fecha_visita) {
      this.showFechaVisitaMessage = false
    }

    if (this.act_municipioId) {
      this.showMunicipioMessage = false
    }

    if (this.act_prestadorId) {
      this.showPrestadorMessage = false
    }

    if (this.act_barrio) {
      this.showBarrioMessage = false
    }

    if (this.act_obj_visita) {
      this.showObjVisitaMessage = false
    }

    if (this.act_funcionarioId) {
      this.showVerificadorMessage = false
    }

    if (this.act_nombre_prestador) {
      this.showPresadorNombreMessage = false
    }

    if (this.act_cargo_prestador) {
      this.showPrestadorCargoMessage = false
    }
  }

  nuevoUsuario(): void {
    this.agregarUsuario = true
    const rol_pamec = 'pamec'
    //LISTAR USUARIOS
    this.usuarioService.listaUserRol(rol_pamec).subscribe(
      data => {
        this.usuario_dos = data;
        this.listaVacia = undefined;
      },
      err => {
        this.listaVacia = err.error.message;
      }
    )
  }

  eliminarUsuario(): void {
    this.agregarUsuario = false
    this.act_funcionarioId2 = ''
    this.act_cargo_funcionario2 = ''
  }

  nuevoPrestador(): void {
    this.agregarPrestador = true
    this.prestadorAgregado = false
  }

  eliminarPrestador(): void {
    this.agregarPrestador = false
    this.prestadorAgregado = true
  }


  tipoVisita(): void {
    var id = (document.getElementById('tipoVisita')) as HTMLSelectElement
    var sel = id.selectedIndex;
    var opt = id.options[sel]
    var ValorVisita = (<HTMLSelectElement><unknown>opt).value;

    if (ValorVisita === '1') {
      this.mejoramiento = false
      this.formulacion = false
    }

    if (ValorVisita === '2') {
      this.mejoramiento = false
      this.formulacion = false
    }

    if (ValorVisita === '3') {
      this.mejoramiento = false
      this.formulacion = false
    }

    if (ValorVisita === '4') {
      this.mejoramiento = false
      this.formulacion = true
    }

    if (ValorVisita === '5') {
      this.formulacion = false
      this.mejoramiento = true
    }
  }

  //LISTAR USUARIOS
  cargarUsuariosUno(): void {
    const rol_pamec = 'pamec'
    this.usuarioService.listaUserRol(rol_pamec).subscribe(
      data => {
        this.usuario_uno = data;
        this.listaVacia = undefined;
      },
      err => {
        this.listaVacia = err.error.message;
      }
    )
    this.act_funcionarioId = ''
  }

  //COMPLETAR INPUT_CARGO POR USUARIO SELECCIONADO
  cargoUsuario() {
    if (this.act_funcionarioId) {
      var id = (document.getElementById('usu_secretaria1')) as HTMLSelectElement
      var sel = id.selectedIndex;
      var opt = id.options[sel]
      var Codigo = (<HTMLSelectElement><unknown>opt).value;
      const idUsuario1ComoNumero = parseInt(Codigo, 10);
      this.usuarioService.oneUser(idUsuario1ComoNumero).subscribe(
        data => {
          for (const usu of this.usuario_uno) {
            if (usu.usu_id === idUsuario1ComoNumero) {
              var cargo_usuario = (document.getElementById('cargoSecre1')) as HTMLSelectElement
              cargo_usuario.value = usu.usu_cargo
              this.act_cargo_funcionario1 = cargo_usuario.value
            }
          }
        }
      )
    }

    if (this.agregarUsuario) {
      var id2 = (document.getElementById('usu_secretaria2')) as HTMLSelectElement
      var sel2 = id2.selectedIndex;
      var opt2 = id2.options[sel2]
      var Codigo2 = (<HTMLSelectElement><unknown>opt2).value;
      const idUsuario2ComoNumero = parseInt(Codigo2, 10);
      this.usuarioService.oneUser(idUsuario2ComoNumero).subscribe(
        data => {
          for (const usu of this.usuario_dos) {
            if (usu.usu_id === idUsuario2ComoNumero) {
              var cargo_usuario = (document.getElementById('cargoSecre2')) as HTMLSelectElement
              cargo_usuario.value = usu.usu_cargo
              this.act_cargo_funcionario2 = cargo_usuario.value
            }
          }
        }
      )
    }
  }

  //LISTAR ÚLTIMA ACTA REGISTRADA
  ultimaActaId(): void {
    this.actaPdfService.listaUltimaPamec().subscribe(
      data => {
        this.actaPamecPdf = data
        var acta = (document.getElementById('acta')) as HTMLSelectElement
        acta.value = this.actaPamecPdf.act_id.toString()
      }
    )
  }


  obtenerNombres(): void {
    //OBTENER NOMBRE DEL PRESTADOR
    const idp = document.getElementById('prestador') as HTMLSelectElement;
    const selp = idp.selectedIndex;
    const optp = idp.options[selp] as HTMLOptionElement;
    const valorPrestador = optp ? optp.textContent : '';
    sessionStorage.setItem("nombre-pres-sp-ind", valorPrestador);

    //CODIGO PRESTADOR
    var codigoPres = (document.getElementById('codpres')) as HTMLInputElement
    var valorCodigoPres = codigoPres.value
    sessionStorage.setItem("cod-pres-sp-ind", valorCodigoPres);
  }

  async onRegister(): Promise<void> {
    //FORMULARIO
    //TIPO DE VISITA
    // var id = (document.getElementById('tip_visita')) as HTMLSelectElement
    // var sel = id.selectedIndex;
    // var opt = id.options[sel]
    // var valorVisita = (<HTMLSelectElement><unknown>opt).textContent;


    if (this.formulacion) {
      var valorFormulacion = ""
      //AÑO FORMULACIÓN
      var formulacion = (document.getElementById('ano_formulacion')) as HTMLInputElement
      valorFormulacion = formulacion.value
      this.act_ano_formulacion = valorFormulacion
    }


    if (this.mejoramiento) {
      var valorMejoramiento = ""
      //CICLO DE MEJORAMIENTO
      var idmejo = (document.getElementById('id_mejoramiento')) as HTMLSelectElement
      var selmejo = idmejo.selectedIndex;
      var optmejo = idmejo.options[selmejo]
      valorMejoramiento = (<HTMLSelectElement><unknown>optmejo).textContent;
      this.act_ciclo_mejoramiento = valorMejoramiento
    }

    //INPUTS BLOQUEADOS Y SE ASIGNA A LAS VARIABLES DEL DTO
    //No ACTA
    var acta = (document.getElementById('acta')) as HTMLInputElement
    var valorActa = acta.value


    //INFORMACION PRESTADOR
    //NIT
    var nit = (document.getElementById('nit')) as HTMLInputElement
    var valorNit = nit.value

    //DIRECCIÓN
    var direccion = (document.getElementById('direccion')) as HTMLInputElement
    var valorDireccion = direccion.value

    //TELEFONO
    var telefono = (document.getElementById('telefono')) as HTMLInputElement
    var valorTelefono = telefono.value

    //EMAIL
    var email = (document.getElementById('email')) as HTMLInputElement
    var valorEmail = email.value

    //REPRESENTANTE
    var representante = (document.getElementById('repleg')) as HTMLInputElement
    var valorRepresentante = representante.value

    //CODIGO PRESTADOR
    var codigoPres = (document.getElementById('codpres')) as HTMLInputElement
    var valorCodigoPres = codigoPres.value

    //NOMBRE DEL PRESTADOR - FIRMA PRESTADOR
    var presNombre = (document.getElementById('nombrePrestador')) as HTMLInputElement
    var valorPresNombre = presNombre.value

    //SE OBTIENE LA FIRMA DEL MODAL DEL SERVICIO SHARED Y SE ASIGNA EN LA VARIABLE firma
    this.firma = this.sharedService.getFirmaActaPamec();

    //OBTENER NOMBRES DE LOS SELECTS
    await this.obtenerNombreSelects();

    // //OBTENER FIRMA FUNCIONARIOS
    // await this.obtenerFirmaFuncionario1();
    // await this.obtenerFirmaFuncionario2();


    //ASIGNANDO LOS VALORES DEL ACTA PARA ASIGNARLAS EN EL DTO
    this.act_id = Number(valorActa);
    this.act_nit = valorNit
    // this.act_tipo_visita = valorVisita
    this.act_direccion = valorDireccion
    this.act_telefono = valorTelefono
    this.act_email = valorEmail
    this.act_representante = valorRepresentante
    this.act_cod_prestador = valorCodigoPres
    this.act_nombre_prestador = valorPresNombre
    this.act_firma_prestador = this.firma

    //ORGANIZAR LA FECHA DE VISITA
    const fecha_visita = this.convertirFecha(this.act_fecha_visita)
    this.act_fecha_visita = fecha_visita

    //REGISTRO DE LA INFORMACIÓN RECOPILADA A LA CLASE DTO - ACTAPAMECDTO
    this.actaPamecPdf = new ActaPamecDto(
      this.act_id,
      this.act_tipo_visita,
      this.act_ano_formulacion,
      this.act_ciclo_mejoramiento,
      this.act_fecha_visita,
      this.act_municipio,
      this.act_prestador,
      this.act_nit,
      this.act_direccion,
      this.act_barrio,
      this.act_telefono,
      this.act_email,
      this.act_representante,
      this.act_cod_prestador,
      this.act_sede,
      this.act_sede_barrio,
      this.act_sede_direccion,
      this.act_obj_visita,
      this.act_nombre_funcionario1,
      this.act_cargo_funcionario1,
      this.act_firma_funcionario1,
      this.act_id_funcionario1,

      this.act_nombre_funcionario2,
      this.act_cargo_funcionario2,
      this.act_firma_funcionario2,
      this.act_id_funcionario2,

      this.act_nombre_prestador,
      this.act_cargo_prestador,
      this.act_firma_prestador
    );


    //OBTENER EL TOKEN DEL USUARIO QUE ESTÁ CREANDO EL ACTA
    const token = this.tokenService.getToken()
    //ASIGNANDO TOKEN A LA CLASE DTO - TOKENDTO
    const tokenDto: TokenDto = new TokenDto(token);

    //VALIDAR QUE LOS CAMPOR NO ESTÉN VACIOS
    if (
      !this.act_fecha_visita ||
      !this.act_tipo_visita ||
      !this.act_municipio ||
      !this.act_prestador ||
      !this.act_barrio ||
      !this.act_nombre_funcionario1 ||
      !this.act_nombre_prestador ||
      !this.act_cargo_prestador ||
      !this.act_obj_visita
    ) {
      //ASIGNANDO LOS RESPECTIVOS MENSAJES EN CASO DE ENTRAR AL IF DE VALIDACIÓN
      let mensajeError = 'Por favor, complete los siguientes campos:';

      if (!this.act_fecha_visita) {
        mensajeError += ' Fecha de Visita,';
        this.showTipoVisitaMessage = true
      }

      if (!this.act_tipo_visita) {
        mensajeError += ' Tipo de Visita,';
        this.showTipoVisitaMessage = true
      }

      if (!this.act_municipio) {
        mensajeError += ' Municipio,';
        this.showTipoVisitaMessage = true
      }

      if (!this.act_prestador) {
        mensajeError += ' Prestador,';
        this.showTipoVisitaMessage = true
      }

      if (!this.act_barrio) {
        mensajeError += ' Barrio,';
        this.showTipoVisitaMessage = true
      }

      if (!this.act_nombre_funcionario1) {
        mensajeError += ' Verificador SOGCS,';
        this.showTipoVisitaMessage = true
      }

      if (!this.act_nombre_prestador) {
        mensajeError += ' Nombre del Prestador,';
        this.showPresadorNombreMessage = true
      }

      if (!this.act_cargo_prestador) {
        mensajeError += ' Cargo Prestador,';
        this.showPrestadorCargoMessage = true
      }

      if (!this.act_obj_visita) {
        mensajeError += ' Objeto de la Visita,';
        this.showPrestadorCargoMessage = true
      }

      mensajeError = mensajeError.slice(0, -1); // VARIABLE PARA ELIMINAR LA ÚLTIMA COMA

      //MOSTRAR MENSAJE POR MEDIO DE TOASTR_SERVICE
      this.toastrService.error(mensajeError, 'Error', {
        timeOut: 3000,
        positionClass: 'toast-top-center',
      });

    }
    else {
      //SOLICITUD DE REGISTRO DE ACTA ENVIANDO COMO PARAMETRO LA ACTA_DTO Y EL TOKEN_DTO
      this.authService.registroActaPamecPdf(this.actaPamecPdf, tokenDto).subscribe(
        data => {
          if (!data.error) {
            localStorage.setItem('boton-acta-pamec', 'true')
            if (this.act_sede) {
              localStorage.setItem('nombre-pres-pamec', this.act_sede)
            } else {
              localStorage.setItem('nombre-pres-pamec', this.act_prestador)
            }

            //DESPUÉS DE REGISTRAR EL ACTA, SE SOLICITA LA ÚLTIMA ACTA
            this.actaPdfService.listaUltimaPamec().subscribe(
              ultimaActa => {
                //VERIFICA QUE EXISTA EL ACTA REGISTRADA
                if (ultimaActa && ultimaActa.id) {
                  this.id_acta = ultimaActa.id;
                  //ENVIAR EL ID DEL ACTA AL LOCAL STORAGE PARA LA EVALUACIÓN
                  localStorage.setItem('id_acta_pamec', this.id_acta.toString());
                  Swal.fire({
                    title: '¿Desea descargar el acta?',
                    showCancelButton: true,
                    confirmButtonText: 'Si',
                    cancelButtonText: 'No'
                  }).then((result) => {
                    //SOLICITUD AL SERVICIO QUE GENERA EL ACTA_PDF PASANDO COMO PARAMETRO LA ULTIMA ACTA REGISTRADA
                    if (result.value) {
                      this.generarPdfActaPamec.ActaPdf(this.id_acta);
                      this.router.navigate(['/pamec/evaluacion']);
                      window.scrollTo(0, 0);
                    } else {
                      this.router.navigate(['/pamec/evaluacion']);
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
          }
          else {
            //TOASTR PARA ENVIAR MENSAJE DE ERROR
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: data.message
            });
          }
        },
        err => {
          //MANEJAR EL ERROR DEL SUSCRIBE DATA - registroActaPamecPdf
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: err.error.message
          });
        }
      );
    }
  }

}
