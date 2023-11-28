import { ActapdfService } from 'src/app/services/Sic/actapdf.service';
import { AuthService } from 'src/app/services/auth.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { Municipio } from 'src/app/models/Prestador/municipio';
import { MunicipioService } from 'src/app/services/NuevoPrestador/municipio.service';
import { PrestadorDto } from 'src/app/models/prestador.dto';
import { PrestadorService } from 'src/app/services/prestador.service';
import { Router } from '@angular/router';
import { SharedServiceService } from 'src/app/services/shared-service.service';
import { ToastrService } from 'ngx-toastr';
import { TokenService } from 'src/app/services/token.service';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { TokenDto } from 'src/app/models/token.dto';
import Swal from 'sweetalert2';
import { GenerarPdfActaService } from 'src/app/services/Sic/generar-pdf-acta.service';
import { SedesPrestadorService } from 'src/app/services/sedes-prestador.service';
import { SedesDto } from 'src/app/models/sedes.dto';
import { CumplimientoEstandarService } from 'src/app/services/Sic/cumplimiento-estandar.service';
import { ActaSicPdfDto } from 'src/app/models/Actas/actaSicpdf.dto';



@Component({
  selector: 'app-acta-sic',
  templateUrl: './acta-sic.component.html',
  styleUrls: ['./acta-sic.component.css']
})
export class ActaSicComponent implements OnInit {

  prestador: PrestadorDto[];
  usuario: Usuario[];
  municipio: Municipio[];
  sede: SedesDto[];

  //DTO DEL PDF ACTA
  actaPdf: ActaSicPdfDto = null;

  //Habilitar la Fecha Final
  habilitarfechaFin = false;

  //Habilitar Select Sede Principal
  habilitarSelectSede: boolean = false;



  listaVacia: any = undefined;

  //MODAL
  public modalRef: BsModalRef;

  id_acta: number
  //VARIABLES PARA TRANSPORTAR EL DTO
  act_id: number;
  act_visita_inicial: string;
  act_visita_seguimiento: string;
  act_fecha_inicial: string;
  act_fecha_final: string;
  act_municipio: string
  act_prestador: string
  act_nit: string;
  act_direccion: string
  act_barrio: string
  act_telefono: string
  act_email: string
  act_sede_principal: string
  act_sede_localidad: string
  act_sede_direccion: string
  act_representante: string
  act_cod_prestador: string
  act_cod_sede: string
  act_obj_visita: string = ''
  act_id_funcionario: number
  act_nombre_funcionario: string
  act_cargo_funcionario: string
  act_firma_funcionario: string
  act_nombre_prestador: string
  act_cargo_prestador: string
  act_firma_prestador: string


  //ATRIBUTOS ID DE SELECTS
  act_municipioId: string
  act_prestadorId: string
  act_funcionarioId: string
  act_sede_principalId: string

  act_recibe_visita: string = 'false';
  noFirmaActa: string = 'false';

  estado_recibe_visita: string

  //ID DE EVALUACION
  eva_id: number

  firma: string;

  //ATRIBUTOS CONTROLAR MENSAJES VALIDACION
  showTipoVisitaMessage: boolean = false;
  showFechaInicialMessage: boolean = false;
  showFechaFinalMessage: boolean = false;
  showMunicipioMessage: boolean = false;
  showPrestadorMessage: boolean = false;
  showBarrioMessage: boolean = false;
  showSedeMessage: boolean = false;
  showObjVisitaMessage: boolean = false;
  showVerificadorMessage: boolean = false;
  showPresadorNombreMessage: boolean = false;
  showPrestadorCargoMessage: boolean = false;


  constructor(
    private modalService: BsModalService,
    private prestadorService: PrestadorService,
    private municipioService: MunicipioService,
    private usuarioService: UsuarioService,
    private actaPdfService: ActapdfService,
    public sharedService: SharedServiceService,
    private tokenService: TokenService,
    private toastrService: ToastrService,
    private authService: AuthService,
    private generarPdfActaSic: GenerarPdfActaService,
    private sedesServices: SedesPrestadorService,
    private cumplimientoEstandarService: CumplimientoEstandarService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.incializarDatos();
  }

  incializarDatos() {
    this.cargarMunicipio();
    this.cargarUsuario();
    this.unsoloCheckbox();
    this.obtenerNombres();
    this.ultimaActaId();

  }

  habilitarFechaFinal() {
    this.habilitarfechaFin = true;
  }

  habilitarSede() {
    this.habilitarSelectSede = true;
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

  //INPUTS VACIO SI SE SELECCIONA OTRO MUNICIPIO
  vaciarPorMunicipioSelect() {
    //NIT DEL PRESTADOR
    var nit = (document.getElementById('nit')) as HTMLSelectElement
    nit.value = ''
    //DIRECCIÓN DEL PRESTADOR
    var direccion = (document.getElementById('direccion')) as HTMLSelectElement
    direccion.value = ''
    //BARRIO DEL PRESTADOR
    var barrio_prestador = (document.getElementById('barrio')) as HTMLSelectElement
    barrio_prestador.value = ''
    //TELEFONO DEL PRESTADOR
    var telefono = (document.getElementById('telefono')) as HTMLSelectElement
    telefono.value = ''
    //EMAIL DEL PRESTADOR
    var email = (document.getElementById('email')) as HTMLSelectElement
    email.value = ''
    //REPRESENTANTE LEGAL
    var rep_legal = (document.getElementById('repleg')) as HTMLSelectElement
    rep_legal.value = ''

    //NOMBRE PRESTADOR
    var nombrePrestador = (document.getElementById('nombrePrestador')) as HTMLSelectElement
    nombrePrestador.value = ''

    //SEDE
    //CODIGO DE PRESTADOR
    var cod_pres = (document.getElementById('codpres')) as HTMLSelectElement
    cod_pres.value = ''
    //CODIGO DE SEDE
    var codigo_sede = (document.getElementById('codsede')) as HTMLSelectElement
    codigo_sede.value = ''

    //BARRIO DE LA SEDE
    var sede_barrio = (document.getElementById('barrioSede')) as HTMLSelectElement
    sede_barrio.value = ''
    //DIRECCIÓN DE LA SEDE
    var sede_direccion = (document.getElementById('direccionSede')) as HTMLSelectElement
    sede_direccion.value = ''

    //VACIAR SELECT SEDES SI SELECCIONA OTRO MUNICIPIO
    this.act_sede_principalId = '';
    // Eliminar todas las opciones del select
    this.sede = [];
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
                var barrio_prestador = (document.getElementById('barrio')) as HTMLSelectElement
                barrio_prestador.value = barrio_prestador_asignado
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
    //CODIGO DE SEDE
    var codigo_sede = (document.getElementById('codsede')) as HTMLSelectElement
    codigo_sede.value = ''

  }

  //OBTENER LOCALIDAD Y DIRECCION DE LA SEDE SELECCIONADA
  sedeSeleccionada() {
    this.sedesServices.listaOneSede(this.act_sede_principalId).subscribe(
      data => {
        const barrio = data.sede_barrio
        const direccion = data.sede_direccion
        const numero_sede = data.sede_numero

        var sede_barrio = (document.getElementById('barrioSede')) as HTMLSelectElement
        sede_barrio.value = barrio

        var sede_direccion = (document.getElementById('direccionSede')) as HTMLSelectElement
        sede_direccion.value = direccion

        var codigo_sede = (document.getElementById('codsede')) as HTMLSelectElement
        codigo_sede.value = this.act_prestadorId + '-0' + numero_sede
      }
    )
  }

  recibeVisita(): void {
    Swal.fire({
      title: '¿Estás seguro que el prestador no recibe la visita?',
      text: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        this.act_recibe_visita = 'false'
        Swal.fire(
          'Prestador No Recibe Visita',
          '',
          'success'
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelado',
          '',
          'error'
        );
      }
    });
  }

  //LISTAR ÚLTIMA ACTA REGISTRADA
  ultimaActaId(): void {
    this.actaPdfService.obtenerUltimaActaSic().subscribe(
      data => {
        this.actaPdf = data
        var acta = (document.getElementById('acta')) as HTMLSelectElement
        acta.value = this.actaPdf.act_id.toString()
      }
    )
  }

  //LISTAR USUARIOS
  cargarUsuario(): void {
    const rol_sic = 'sic'
    this.usuarioService.listaUserRol(rol_sic).subscribe(
      data => {
        this.usuario = data;
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

  //LLENAR LOS INPUTS UNA VES SE HAYA SELECCIONADO EL PRESTADOR
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
            var nombrePrestador = (document.getElementById('nombrePrestador')) as HTMLSelectElement
            nombrePrestador.value = pres.pre_representante
          }
        }
      },
      err => {
        this.listaVacia = err.error.message;
      }
    );
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
      this.act_nombre_funcionario = func.usu_nombre + ' ' + func.usu_apellido
    }

    if (this.act_sede_principalId) {
      //SELECT SEDE
      const idSedeSeleccionado = this.act_sede_principalId;
      const sede = await this.sedesServices.listaOneSede(idSedeSeleccionado).toPromise();
      this.act_sede_principal = sede.sede_nombre

    }
  }



  //MENSAJES DE VALIDACION DIVS
  ocultarMensajes() {
    if (this.act_visita_inicial || this.act_visita_seguimiento) {
      this.showTipoVisitaMessage = false
    }

    if (this.act_fecha_inicial) {
      this.showFechaInicialMessage = false
    }

    if (this.act_fecha_final) {
      this.showFechaFinalMessage = false
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

    if (this.act_sede_principal) {
      this.showSedeMessage = false
    }
    if (this.act_obj_visita) {
      this.showObjVisitaMessage = false
    }

    if (this.act_funcionarioId) {
      this.showVerificadorMessage = false
    }

    if (this.act_prestadorId && this.act_nombre_prestador) {
      this.showPresadorNombreMessage = false
    }

    if (this.act_cargo_prestador) {
      this.showPrestadorCargoMessage = false
    }
  }


  //OBTENER LOS NOMBRES DEL PRESTADOR Y FUNCIONARIO - GUARDA TEMPORALMENTE EN STORAGE
  obtenerNombres(): void {
    //OBTENER NOMBRE DEL PRESTADOR
    const idp = document.getElementById('prestador') as HTMLSelectElement;
    const selp = idp.selectedIndex;
    const optp = idp.options[selp] as HTMLOptionElement;
    const valorPrestador = optp ? optp.textContent : '';
    sessionStorage.setItem("nombre-pres-sic", valorPrestador);

    //CODIGO PRESTADOR
    var codigoPres = (document.getElementById('codpres')) as HTMLInputElement
    var valorCodigoPres = codigoPres.value
    sessionStorage.setItem("cod-pres-sic", valorCodigoPres);

    // USUARIO SECRETARIA
    const idUsuSecre = document.getElementById('usu_secretaria') as HTMLSelectElement;
    const selUsuSecre = idUsuSecre.selectedIndex;
    const optUsuSecre = idUsuSecre.options[selUsuSecre] as HTMLOptionElement;
    const valorUsuSecre = optUsuSecre ? optUsuSecre.textContent : '';
    sessionStorage.setItem("nombre-usuario-sic", valorUsuSecre);

    //CARGO USUARIO SECRETARIA
    var cargoSecre = (document.getElementById('cargoSecre')) as HTMLInputElement
    var valorCargoSecre = cargoSecre.value
    sessionStorage.setItem("cargo-usuario-sic", valorCargoSecre);

    //CARGO PRESTADOR
    var cargoPres = (document.getElementById('cargoPres')) as HTMLInputElement
    var valorCargoPres = cargoPres.value
    sessionStorage.setItem("cargo-prestador-sic", valorCargoPres);
  }


  //REGISTRAR Y GENERAR ACTA PDF
  async onRegister(): Promise<void> {
    //VISITA INICIAL
    var visitaInicial = (document.getElementById('inicial')) as HTMLInputElement
    var valorVisitaInicial = visitaInicial.checked
    var inicial = '';
    if (valorVisitaInicial) {
      inicial = 'X';
    }


    //VISITA SEGUIMIENTO
    var visitaSeguim = (document.getElementById('segumiento')) as HTMLInputElement
    var valorVisitaSeguim = visitaSeguim.checked
    var seguimiento = '';
    if (valorVisitaSeguim) {
      seguimiento = 'X';
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

    //BARRIO
    var barrioPres = (document.getElementById('barrio')) as HTMLInputElement
    var valorBarrioPres = barrioPres.value

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

    //CODIGO SEDE VISITADA
    var codigoSedeVisitada = (document.getElementById('codsede')) as HTMLInputElement
    var valorcodigoSedeVisitada = codigoSedeVisitada.value

    //CODIGO SEDE LOCALIDAD O BARRIO
    var barrioSede = (document.getElementById('barrioSede')) as HTMLInputElement
    var valorBarrioSede = barrioSede.value

    //CODIGO SEDE DIRECCION
    var direccionSede = (document.getElementById('direccionSede')) as HTMLInputElement
    var valorDireccionSede = direccionSede.value

    //NOMBRE DEL PRESTADOR - FIRMA PRESTADOR
    var presNombre = (document.getElementById('nombrePrestador')) as HTMLInputElement
    var valorPresNombre = presNombre.value

    //SE OBTIENE LA FIRMA DEL MODAL DEL SERVICIO SHARED Y SE ASIGNA EN LA VARIABLE firma ES LA FIRMA DEL PRESTADOR
    // this.firma = this.sharedService.getFirmaActaSic();

    //OBTENER NOMBRES DE LOS SELECTS
    await this.obtenerNombreSelects();

    //OBTENER FIRMA FUNCIONARIO
    // await this.obtenerFirmaFuncionario();


    //ASIGNANDO LOS VALORES DEL ACTA PARA ASIGNARLAS EN EL DTO
    this.act_id = Number(valorActa);
    this.act_nit = valorNit
    this.act_visita_inicial = inicial
    this.act_visita_seguimiento = seguimiento
    this.act_direccion = valorDireccion
    this.act_barrio = valorBarrioPres
    this.act_telefono = valorTelefono
    this.act_email = valorEmail
    this.act_representante = valorRepresentante
    this.act_cod_prestador = valorCodigoPres
    this.act_cod_sede = valorcodigoSedeVisitada
    this.act_sede_localidad = valorBarrioSede
    this.act_sede_direccion = valorDireccionSede
    this.act_nombre_prestador = valorPresNombre
    this.act_firma_prestador = this.firma
    //ID DEL FUNCIONARIO PARA CONTROLAR LA FIRMA
    this.act_id_funcionario = parseInt(this.act_funcionarioId, 10);


    //REGISTRO DE LA INFORMACIÓN RECOPILADA A LA CLASE DTO - ACTASICDTO
    this.actaPdf = new ActaSicPdfDto(
      this.act_id,
      this.act_visita_inicial,
      this.act_visita_seguimiento,
      this.act_fecha_inicial,
      this.act_fecha_final,
      this.act_municipio,
      this.act_prestador,
      this.act_nit,
      this.act_direccion,
      this.act_barrio,
      this.act_telefono,
      this.act_email,
      this.act_sede_principal,
      this.act_sede_localidad,
      this.act_sede_direccion,
      this.act_representante,
      this.act_cod_prestador,
      this.act_cod_sede,
      this.act_obj_visita,
      this.act_id_funcionario,
      this.act_nombre_funcionario,
      this.act_cargo_funcionario,
      this.act_firma_funcionario,
      this.act_nombre_prestador,
      this.act_firma_prestador,
      this.act_cargo_prestador,
      this.act_recibe_visita,
      this.noFirmaActa
    );

    //OBTENER EL TOKEN DEL USUARIO QUE ESTÁ CREANDO EL ACTA
    const token = this.tokenService.getToken()
    //ASIGNANDO TOKEN A LA CLASE DTO - TOKENDTO
    const tokenDto: TokenDto = new TokenDto(token);


    //VALIDAR QUE LOS CAMPOS NO ESTÉN VACIOS
    if (
      !this.act_id ||
      (!this.act_visita_inicial && !this.act_visita_seguimiento) ||
      !this.act_fecha_inicial ||
      !this.act_fecha_final ||
      !this.act_municipioId ||
      !this.act_prestador ||
      !this.act_nit ||
      !this.act_direccion ||
      !this.act_barrio ||
      !this.act_telefono ||
      !this.act_email ||
      !this.act_cod_prestador ||
      !this.act_obj_visita ||
      !this.act_nombre_funcionario ||
      !this.act_cargo_funcionario ||
      !this.act_nombre_prestador ||
      !this.act_cargo_prestador
    ) {
      //ASIGNANDO LOS RESPECTIVOS MENSAJES EN CASO DE ENTRAR AL IF DE VALIDACIÓN
      let mensajeError = 'Por favor, complete los siguientes campos:';

      if (!this.act_visita_inicial && !this.act_visita_seguimiento) {
        mensajeError += ' Tipo de Visita,';
        this.showTipoVisitaMessage = true
      }

      if (!this.act_fecha_inicial) {
        mensajeError += ' Fecha Inicial,';
        this.showFechaInicialMessage = true
      }

      if (this.act_fecha_inicial && !this.act_fecha_final) {
        mensajeError += ' Fecha Final,';
        this.showFechaFinalMessage = true
      }

      if (!this.act_municipioId) {
        mensajeError += ' Municipio,';
        this.showMunicipioMessage = true
      }

      if (!this.act_prestador && this.act_municipioId) {
        mensajeError += ' Prestador,';
        this.showPrestadorMessage = true
      }

      if (!this.act_barrio) {
        mensajeError += ' Barrio,';
        this.showBarrioMessage = true
      }

      if (!this.act_obj_visita) {
        mensajeError += ' Objeto de visita,';
        this.showObjVisitaMessage = true
      }

      if (!this.act_nombre_funcionario) {
        mensajeError += ' Verificador SOGCS,';
        this.showVerificadorMessage = true
      }

      if (!this.act_nombre_prestador) {
        mensajeError += ' Nombre del Prestador Firma,';
        this.showPresadorNombreMessage = true
      }

      if (!this.act_cargo_prestador) {
        mensajeError += ' Cargo Prestador Firma,';
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
      this.authService.registroActaSicPdf(this.actaPdf, tokenDto).subscribe(
        data => {
          if (!data.error) {
            //DESPUÉS DE REGISTRAR EL ACTA, SE SOLICITA LA ÚLTIMA ACTA
            this.actaPdfService.ultimaActaSicPk().subscribe(
              ultimaActa => {
                //VERIFICA QUE EXISTA EL ACTA REGISTRADA
                if (ultimaActa && ultimaActa.id) {
                  this.id_acta = ultimaActa.id;
                  this.estado_recibe_visita = ultimaActa.act_recibe_visita
                  //POR MEDIO DE ID EVALUACION SE ENCUENTRA EL EVA ID
                  this.cumplimientoEstandarService.oneEvluacionSic(this.id_acta).subscribe(
                    data => {
                      this.eva_id = data.eva_id
                      this.sharedService.setIdEvaluacionSic(this.eva_id)
                      console.log(this.eva_id)
                    }
                  )

                  Swal.fire({
                    title: '¿Desea descargar el acta?',
                    showCancelButton: true,
                    confirmButtonText: 'Si',
                    cancelButtonText: 'No'
                  }).then((result) => {
                    //SOLICITUD AL SERVICIO QUE GENERA EL ACTA_PDF PASANDO COMO PARAMETRO LA ULTIMA ACTA REGISTRADA
                    if (result.value) {
                      this.generarPdfActaSic.ActaPdf(this.id_acta);
                      //ASIGNAR NULL EL ATRIBUTO FIRMA PARA UNA NUEVA ACTA
                      this.act_firma_prestador = null
                      this.sharedService.setFirmaActaSic(this.act_firma_prestador) //ENVIAMOS LA FIRMA NULL PARA UNA NUEVA ACTA
                      //SI EL ESTADO DE RECIBE VISITA ES TRUE PUEDE ACCEDER A EVALUAR AL PRESTADOR
                      if (this.estado_recibe_visita === 'true') {
                        localStorage.setItem('boton-acta-sic', 'true'); //HABILITAR LA RUTA RESTRINGIDA - EVALUACIÓN_SIC
                        this.router.navigate(['/sic/evaluacion']);
                        window.scrollTo(0, 0);
                      } else {
                        this.router.navigate(['/sic/evaluaciones']);
                        window.scrollTo(0, 0);
                      }

                    } else if (result.dismiss === Swal.DismissReason.cancel) {
                      //SI EL ESTADO DE RECIBE VISITA ES FALSE PUEDE RESTRINGIR EL ACCESO A LA EVALUACIÓN
                      if (this.estado_recibe_visita === 'true') {
                        localStorage.setItem('boton-acta-sic', 'true'); //HABILITAR LA RUTA RESTRINGIDA - EVALUACIÓN_SIC
                        this.router.navigate(['/sic/evaluacion']);
                        window.scrollTo(0, 0);
                      } else {
                        this.router.navigate(['/sic/evaluaciones']);
                        window.scrollTo(0, 0);
                      }
                    }
                  });
                } else {
                  Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'No se pudo obtener el ID del acta.'
                  });
                }

              },
            );
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
      );
    }
  }


}
