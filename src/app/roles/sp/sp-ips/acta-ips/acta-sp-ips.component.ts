import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PrestadorDto } from 'src/app/models/prestador.dto';
import { Municipio } from 'src/app/models/Prestador/municipio';
import { Usuario } from 'src/app/models/usuario';
import { MunicipioService } from 'src/app/services/NuevoPrestador/municipio.service';
import { PrestadorService } from 'src/app/services/prestador.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { AuthService } from 'src/app/services/auth.service';
import { ActapdfService } from 'src/app/services/Sic/actapdf.service';
import { TokenService } from 'src/app/services/token.service';
import { TokenDto } from 'src/app/models/token.dto';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { SharedServiceService } from 'src/app/services/shared-service.service';
import { GenerarPdfActaIpsService } from 'src/app/services/SpIps/generar-pdf-acta-ips.service';
import { ActaSpPdfDto } from 'src/app/models/Actas/actaSpPdf.dto';

@Component({
  selector: 'app-acta-sp',
  templateUrl: './acta-sp-ips.component.html',
  styleUrls: ['./acta-sp-ips.component.css']
})
export class ActaSpIpsComponent implements OnInit {


  @ViewChild('richTextEditor', { static: true }) richTextEditor: ElementRef;

  private imagenSeleccionada: File | null = null;

  verificarImagenSeleccionada: boolean = false

  prestador: PrestadorDto[];
  usuario: Usuario[];
  municipio: Municipio[];

  //DTO DEL PDF ACTA
  actaPdf: ActaSpPdfDto = null;


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
  act_representante: string
  act_cod_prestador: string
  act_obj_visita: string = ''
  act_id_funcionario: number
  act_nombre_funcionario: string
  act_cargo_funcionario: string
  act_firma_funcionario: string
  act_nombre_prestador: string
  act_cargo_prestador: string
  act_firma_prestador: string

  act_nombre_prestador_acompanante: string
  act_cargo_prestador_acompanante: string
  act_firma_prestador_acompanante: string

  //ATRIBUTOS ID DE SELECTS
  act_municipioId: string
  act_prestadorId: string
  act_funcionarioId: string

  //VARIABLES PARA ORDEN DEL DÍA
  act_fecha_orden: string
  act_hora_orden24: string //Variable almacenar hora 24H
  act_hora_orden: string //Variable alamcenar hora en formato 12 horas
  act_num_oficio: string = 'OFICIO-SOGC-SSD-N°'
  act_fecha_oficio: string
  act_fecha_envio_oficio: string

  //VARIABLE PARA CAPTURA DE REPS
  imagenCargada = false;
  act_captura_imagen: string
  firma: string;

  //VARIABLES COMPROMISOS
  act_compromiso_actividad: string
  act_compromiso_fecha: string
  act_compromiso_responsable: string


  act_recibe_visita: string = 'false';
  noFirmaActa: string = 'false';


  //ATRIBUTOS CONTROLAR MENSAJES VALIDACION
  showTipoVisitaMessage: boolean = false;
  showFechaInicialMessage: boolean = false;
  showFechaFinalMessage: boolean = false;
  showMunicipioMessage: boolean = false;
  showPrestadorMessage: boolean = false;
  showBarrioMessage: boolean = false;
  showObjVisitaMessage: boolean = false;
  showVerificadorMessage: boolean = false;
  showPresadorNombreMessage: boolean = false;
  showPrestadorCargoMessage: boolean = false;
  showEvaluacionMessage: boolean = false;


  constructor(
    private modalService: BsModalService,
    private prestadorService: PrestadorService,
    private municipioService: MunicipioService,
    private usuarioService: UsuarioService,
    private toastrService: ToastrService,
    private authService: AuthService,
    private actaPdfService: ActapdfService,
    public sharedService: SharedServiceService,
    private generarPdfActaSpIps: GenerarPdfActaIpsService,
    private tokenService: TokenService,
    private router: Router

  ) { }

  ngOnInit(): void {
    this.inicializarDatos();
  }



  inicializarDatos() {
    this.cargarMunicipio();
    this.cargarUsuario();
    this.unsoloCheckbox();
    this.obtenerNombres();
    this.mostrarActaId();
  }

  habilitarFechaFinal() {
    this.habilitarfechaFin = true;
    this.act_fecha_orden = this.act_fecha_inicial
  }



  evaluacionesSeleccionadas: { [key: string]: number } = {}; // Usamos un objeto para almacenar los IDs de las evaluaciones

  toggleEvaluacion(evaKey: string, evaId: number): void {
    if (this.evaluacionesSeleccionadas[evaKey]) {
      console.log(evaId)
      // Si el checkbox se desmarca, eliminamos el ID del rol
      delete this.evaluacionesSeleccionadas[evaKey];
    } else {
      // Si el checkbox se marca, almacenamos el ID del rol
      this.evaluacionesSeleccionadas[evaKey] = evaId;
    }
  }

  //METODO PARA CAPTURAR SERVICIOS DEL REPS
  cargarImagen(event: any) {
    const imagen = event.target.files[0];
    if (imagen) {
      // Verificar el tamaño de la imagen (2MB = 2 * 1024 * 1024 bytes)
      if (imagen.size <= 2 * 1024 * 1024) {
        const labelElement = document.querySelector('.custom-file-label');
        if (labelElement) {
          labelElement.textContent = imagen.name;
        }

        // Almacenar la imagen seleccionada
        this.imagenSeleccionada = imagen;
        // Validar verificarImagenSeleccionada a true
        this.verificarImagenSeleccionada = true
      } else {
        // Mostrar mensaje de notificación
        this.imagenCargada = false;
        this.toastrService.error('La imagen es demasiado grande. Debe ser menor o igual a 2MB.', 'Error', {
          timeOut: 3000,
          positionClass: 'toast-top-center',
        });
        event.target.value = '';
      }
    }
  }



  mostrarToastrImg() {
    this.toastrService.success('Captura cargada exitosamente', 'Éxito', {
      timeOut: 3000,
      positionClass: 'toast-top-center',
    });
    this.modalRef?.hide();
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

  //LISTAR ÚLTIMA ACTA REGISTRADA
  mostrarActaId(): void {
    this.actaPdfService.listaUltimaSpIps().subscribe(
      data => {
        this.actaPdf = data
        var acta = (document.getElementById('acta')) as HTMLSelectElement
        acta.value = this.actaPdf.act_id.toString()
      }
    )
  }

  //LISTAR USUARIOS
  cargarUsuario(): void {
    const rol_sp = 'sp'
    this.usuarioService.listaUserRol(rol_sp).subscribe(
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


  //LISTAR PRESTADORES POR MUNICIPIO
  cargarPrestadoresByMun(): void {
    this.prestadorService.listMunIps(this.act_municipioId).subscribe(
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



  //VERIFICAR QUE SOLO SE SELECCIONE UN CHECKBOX
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

  //COMPLETAR CAMPOS AL SELECCIONAR EL PRESTADOR
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

    if (Object.keys(this.evaluacionesSeleccionadas).length > 0) {
      this.showEvaluacionMessage = false
    }
  }

  obtenerNombres(): void {
    //OBTENER NOMBRE DEL PRESTADOR
    const idp = document.getElementById('prestador') as HTMLSelectElement;
    const selp = idp.selectedIndex;
    const optp = idp.options[selp] as HTMLOptionElement;
    const valorPrestador = optp ? optp.textContent : '';
    localStorage.setItem("nombre-pres-sp-ips", valorPrestador);
    this.sharedService.setNombrePrestador(valorPrestador);


    //CODIGO PRESTADOR
    var codigoPres = (document.getElementById('codpres')) as HTMLInputElement
    var valorCodigoPres = codigoPres.value
    sessionStorage.setItem("cod-pres-sp-ips", valorCodigoPres);

    // USUARIO SECRETARIA
    const idUsuSecre = document.getElementById('usu_secretaria') as HTMLSelectElement;
    const selUsuSecre = idUsuSecre.selectedIndex;
    const optUsuSecre = idUsuSecre.options[selUsuSecre] as HTMLOptionElement;
    const valorUsuSecre = optUsuSecre ? optUsuSecre.textContent : '';
    sessionStorage.setItem("nombre-usuario-sp", valorUsuSecre);

    //CARGO USUARIO SECRETARIA
    var cargoSecre = (document.getElementById('cargoSecre')) as HTMLInputElement
    var valorCargoSecre = cargoSecre.value
    sessionStorage.setItem("cargo-usuario-sp-ips", valorCargoSecre);

    //CARGO PRESTADOR
    var cargoPres = (document.getElementById('cargoPres')) as HTMLInputElement
    var valorCargoPres = cargoPres.value
    sessionStorage.setItem("cargo-prestador-sp-ips", valorCargoPres);
  }

  convertirHora12(act_hora_orden24: string): void {
    if (this.act_hora_orden24) {
      const [hora, minutos] = this.act_hora_orden24.split(":");
      let ampm = "AM";

      let horaNum = parseInt(hora, 10);

      if (horaNum >= 12) {
        ampm = "PM";
        if (horaNum > 12) {
          horaNum -= 12;
        }
      }

      this.act_hora_orden = `${horaNum}:${minutos} ${ampm}`;
    }//FIN FORMATO DE LA HORA A 12H
  }


  //REGISTRAR Y GENERAR ACTA PDF
  async onRegister(): Promise<void> {
    //FORMULARIO
    //NÚMERO DE ACTA
    var acta = (document.getElementById('acta')) as HTMLInputElement
    var valorActa = acta.value

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


    //OBTENER NOMBRES DE LOS SELECTS
    await this.obtenerNombreSelects();




    //CONVERTIR EL FORMATO DE LA HORA A 12H
    this.convertirHora12(this.act_hora_orden24)


    //ASIGNANDO LOS VALORES DEL ACTA PARA ASIGNARLAS EN EL DTO
    this.act_id = Number(valorActa);
    this.act_nit = valorNit
    this.act_visita_inicial = inicial
    this.act_visita_seguimiento = seguimiento
    this.act_direccion = valorDireccion
    this.act_telefono = valorTelefono
    this.act_email = valorEmail
    this.act_representante = valorRepresentante
    this.act_cod_prestador = valorCodigoPres
    this.act_nombre_prestador = valorPresNombre
    this.act_firma_prestador = this.firma
    //ID DEL FUNCIONARIO PARA CONTROLAR LA FIRMA
    this.act_id_funcionario = parseInt(this.act_funcionarioId, 10);
    //ASIIGNAR LAS FECHAS
    this.act_fecha_inicial
    this.act_fecha_final
    this.act_fecha_orden
    this.act_fecha_oficio
    this.act_fecha_envio_oficio
    //REGISTRO DEL FORMULARIO A TABLA TEMPORAL BD
    this.actaPdf = new ActaSpPdfDto(
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
      this.act_representante,
      this.act_cod_prestador,
      this.act_obj_visita,
      this.act_id_funcionario,
      this.act_nombre_funcionario,
      this.act_cargo_funcionario,
      this.act_firma_funcionario,
      this.act_nombre_prestador,
      this.act_cargo_prestador,
      this.act_firma_prestador,
      this.act_nombre_prestador_acompanante,
      this.act_cargo_prestador_acompanante,
      this.act_firma_prestador_acompanante,
      //ORDEN DEL DÍA
      this.act_fecha_orden,
      this.act_hora_orden,
      this.act_num_oficio,
      this.act_fecha_oficio,
      this.act_fecha_envio_oficio,
      this.act_captura_imagen,
      //COMPROMISOS
      this.act_compromiso_actividad,
      this.act_compromiso_fecha,
      this.act_compromiso_responsable,
      this.noFirmaActa
    );

    //OBTENER EL TOKEN DEL USUARIO QUE ESTÁ CREANDO EL ACTA
    const token = this.tokenService.getToken()
    //ASIGNANDO TOKEN A LA CLASE DTO - TOKENDTO
    const tokenDto: TokenDto = new TokenDto(token);

    //Obtener los IDS de las evaluaciones Seleccionados
    const evaluacionesIds = Object.values(this.evaluacionesSeleccionadas);

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
      !this.act_representante ||
      !this.act_cod_prestador ||
      !this.act_obj_visita ||
      !this.act_nombre_funcionario ||
      !this.act_cargo_funcionario ||
      !this.act_nombre_prestador ||
      !this.act_cargo_prestador ||
      !this.act_fecha_orden ||
      !this.act_hora_orden ||
      !this.act_num_oficio ||
      !this.act_fecha_oficio ||
      !this.act_fecha_envio_oficio ||

      !(Object.keys(this.evaluacionesSeleccionadas).length > 0)
    ) {
      //ASIGNANDO LOS RESPECTIVOS MENSAJES EN CASO DE ENTRAR AL IF DE VALIDACIÓN
      let mensajeError = 'Por favor, complete los siguientes campos:';

      console.log(this.act_fecha_oficio)
      console.log(this.act_fecha_envio_oficio)

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

      if (!this.act_fecha_orden) {
        mensajeError += ' Fecha del Ordén día,';
      }

      if (!this.act_hora_orden) {
        mensajeError += ' Hora del Ordén día,';
      }

      if (!this.act_num_oficio) {
        mensajeError += ' Número de Oficio,';
      }

      if (!this.act_fecha_oficio) {
        mensajeError += ' Fecha de Oficio,';
      }

      if (!this.act_fecha_envio_oficio) {
        mensajeError += ' Fecha de envio del Oficio,';
      }

      if (Object.keys(this.evaluacionesSeleccionadas).length === 0) {
        mensajeError += ' Selecciona al menos una evaluación,';
      }

      if (!this.verificarImagenSeleccionada) {
        mensajeError += ' Captura de servicios del REPS,';
      }

      mensajeError = mensajeError.slice(0, -1); // VARIABLE PARA ELIMINAR LA ÚLTIMA COMA

      //MOSTRAR MENSAJE POR MEDIO DE TOASTR_SERVICE
      this.toastrService.error(mensajeError, 'Error', {
        timeOut: 3000,
        positionClass: 'toast-top-center',
      });

    } else {
      console.log(this.actaPdf)
      //SOLICITUD DE REGISTRO DE ACTA ENVIANDO COMO PARAMETRO LA ACTA_DTO Y EL TOKEN_DTO
      this.authService.registroActaSpIpsPdf(this.actaPdf, evaluacionesIds, tokenDto).subscribe(
        data => {
          if (!data.error) {
            localStorage.setItem('boton-acta-sp-ips', 'true'); //HABILITAR LA RUTA RESTRINGIDA - EVALUACIÓN_IND
            //DESPUÉS DE REGISTRAR EL ACTA, SE SOLICITA LA ÚLTIMA ACTA
            this.actaPdfService.listaUltimaSpIps().subscribe(
              ultimaActa => {
                //VERIFICA QUE EXISTA EL ACTA REGISTRADA
                if (ultimaActa && ultimaActa.id) {
                  this.id_acta = ultimaActa.id;

                  localStorage.setItem('acta_id', this.id_acta.toString())//ENVIAR ID DEL ACTA EN EL LOCALSTORAGE

                  this.authService.registroImagen(this.imagenSeleccionada, this.id_acta.toString()).subscribe(
                    response => {
                      console.log('Imagen cargada con éxito', response);
                    },
                    error => {
                      console.error('Error al cargar la imagen', error);
                    }
                  );

                  Swal.fire({
                    title: '¿Desea descargar el acta?',
                    showCancelButton: true,
                    confirmButtonText: 'Si',
                    cancelButtonText: 'No'
                  }).then((result) => {
                    //SOLICITUD AL SERVICIO QUE GENERA EL ACTA_PDF PASANDO COMO PARAMETRO LA ULTIMA ACTA REGISTRADA
                    if (result.value) {
                      this.generarPdfActaSpIps.ActaPdf(this.id_acta);
                      this.router.navigate(['/sp/home-evaluacion-ips']);
                      window.scrollTo(0, 0);
                    } else if (result.dismiss === Swal.DismissReason.cancel) {
                      this.router.navigate(['/sp/home-evaluacion-ips']);
                      window.scrollTo(0, 0);
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
      )
    }
  }
}
