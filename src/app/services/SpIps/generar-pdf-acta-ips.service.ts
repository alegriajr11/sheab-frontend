import { Injectable } from '@angular/core';
import { ActapdfService } from '../Sic/actapdf.service';
import jsPDF from 'jspdf';
import autoTable, { Cell } from 'jspdf-autotable';
import { SharedServiceService } from '../shared-service.service';
import { UsuarioService } from '../usuario.service';
import { EvaluacionipsService } from './evaluacionips.service';
import { ActaSpPdfDto } from 'src/app/models/Actas/actaSpPdf.dto';
import { ImagenServicesService } from './imagen-services.service';
import html2canvas from 'html2canvas';


@Injectable({
  providedIn: 'root',
})
export class GenerarPdfActaIpsService {
  actaPdf: ActaSpPdfDto = null;
  listaVacia: any = undefined;

  //ATRIBUTOS PARA FORMAR PDF
  act_id: number;
  act_visita_inicial: string;
  act_visita_seguimiento: string;
  act_fecha_inicial: string;
  act_fecha_final: string;
  act_municipio: string;
  act_prestador: string;
  act_nit: string;
  act_direccion: string;
  act_barrio: string;
  act_telefono: string;
  act_email: string;
  act_sede_principal: string;
  act_sede_localidad: string;
  act_sede_direccion: string;
  act_representante: string;
  act_cod_prestador: string;
  act_cod_sede: string;
  act_obj_visita: string;
  act_nombre_funcionario: string;
  act_cargo_funcionario: string;
  act_firma_funcionario: string;
  act_nombre_prestador: string;
  act_cargo_prestador: string;
  act_firma_prestador: string;

  act_nombre_prestador_acompanante: string
  act_cargo_prestador_acompanante: string
  act_firma_prestador_acompanante: string

  //VARIABLES PARA ORDEN DEL DÍA
  act_fecha_orden: string
  act_hora_orden: string //Variable alamcenar hora en formato 12 horas
  act_num_oficio: string = 'OFICIO-SOGC-SSD-N°'
  act_fecha_oficio: string
  act_fecha_envio_oficio: string

  //VARIABLES COMPROMISOS
  act_compromiso_actividad: string
  act_compromiso_fecha: string
  act_compromiso_responsable: string

  act_estado: string
  //VARIABLES NO FIRMA ACTA
  noFirmaActa: string
  prestadorNoFirma: string = ''

  //CAPTURA DE IMAGEN
  act_captura_imagen: string

  constructor(
    private actapdfService: ActapdfService,
    private usuarioService: UsuarioService,
    private sharedService: SharedServiceService,
    private evaluacionipsService: EvaluacionipsService,
    private imagenService: ImagenServicesService
  ) { }


  addHeader(doc: jsPDF) {
    // Agregar imagen como encabezado
    const imgEncabezado = 'assets/img/encabezadoSp.png';
    doc.addImage(imgEncabezado, 'PNG', 23.5, 4, 160, 25);
  }

  addFooter(doc: jsPDF) {
    // Agregar imagen como pie de página
    const imgPiePagina = 'assets/img/piePaginaSpIps.png';
    doc.addImage(imgPiePagina, 'PNG', -2, 278, 220, 20);
  }

  addMarcaAgua(doc: jsPDF) {
    var marca_agua = 'assets/img/marcaAguaSsd.png'
    doc.addImage(marca_agua, 'PNG', -10, 10, 140, 115);
    doc.addImage(marca_agua, 'PNG', -10, 100, 140, 115);
    doc.addImage(marca_agua, 'PNG', 5, 168, 140, 115);
    doc.addImage(marca_agua, 'PNG', 80, -14, 140, 115);
    doc.addImage(marca_agua, 'PNG', 100, 49, 140, 115);
    doc.addImage(marca_agua, 'PNG', 80, 168, 140, 115);
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

  async solicitarCaptura(doc: jsPDF, width: number) {
    //SEPARAR EN PARTES LA RUTA
    const partesRuta = this.act_captura_imagen.split('\\');

    // Obtener la carpeta y el nombre del archivo
    const folderName = partesRuta[partesRuta.length - 2]; // El segundo desde el final es el nombre de la carpeta
    const imageName = partesRuta[partesRuta.length - 1]; // El último elemento es el nombre del archivo

    // Obtener la imagen desde el servicio
    const blobImage = await this.imagenService.getImage(folderName, imageName).toPromise();

    // Crear una promesa para leer el contenido del blob como base64
    const base64Promise = new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blobImage);
    });

    // Esperar a que se complete la conversión a base64
    const base64Image = await base64Promise;
    const imgString = base64Image.toString()

    const imagen = this.getFileFromBase64(imgString)
    doc.addImage(await imagen, 25.5, width, 159, 98)
  }


  async InformacionPrestador(doc: jsPDF): Promise<void> {
    doc.setFontSize(9);
    doc.setTextColor(128, 128, 128);
    doc.setFontSize(9);
    doc.setTextColor(0, 0, 0);
    doc.setFont('helvetica', 'bold');
    doc.text(
      'ACTA DE VISITA DE VERIFICACIÓN DEL CUMPLIMIENTO DEL PROGRAMA DE SEGURIDAD DEL PACIENTE',
      26,
      40
    );
    doc.text('INSTITUCIONES PRESTADORAS DE SERVICIOS DE SALUD (IPS)', 59, 45);

    // Crear la inforlacion prestador en la primera página
    //FORMALIZAR LAS FECHAS
    const fechaInicial = this.convertirFecha(this.act_fecha_inicial)
    const fechaFinal = this.convertirFecha(this.act_fecha_final)


    //INCIAL DEL ACTA
    autoTable(doc, {
      margin: { top: 52 },
      columnStyles: {
        acta: { halign: 'left' },
        inicial: { halign: 'center' },
        segumiento: { halign: 'center' },
      },
      body: [
        {
          acta: this.act_id,
          inicial: this.act_visita_inicial,
          segumiento: this.act_visita_seguimiento,
          feinicio: fechaInicial,
          fefinal: fechaFinal,
        },
      ],
      columns: [
        { header: 'Número de acta', dataKey: 'acta' },
        { header: 'Visita Inicial', dataKey: 'inicial' },
        { header: 'Visita Seguimiento', dataKey: 'segumiento' },
        { header: 'Fecha de Inicio', dataKey: 'feinicio' },
        { header: 'Fecha Final', dataKey: 'fefinal' },
      ],
      headStyles: {
        fillColor: [255, 255, 255],
        textColor: [0, 0, 0],
      },
      bodyStyles: {
        fillColor: [255, 255, 255],
        textColor: [0, 0, 0],
      },
      styles: {
        fontSize: 10,
      },
    });

    //NOMBRE PRESTADOR
    doc.text('INFORMACIÓN DEL PRESTADOR DE SERVICIOS', 70, 79);
    autoTable(doc, {
      startY: 80,
      columnStyles: { nombrePres: { halign: 'left' } },
      body: [{ nombrePres: this.act_prestador }],
      columns: [{ header: 'Nombre:', dataKey: 'nombrePres' }],
      tableWidth: 'auto',
      headStyles: {
        fillColor: [255, 255, 255],
        textColor: [0, 0, 0],
      },
      bodyStyles: {
        fillColor: [255, 255, 255],
        textColor: [0, 0, 0],
      },
      styles: {
        fontSize: 10,
      },
    });

    //NIT, MUNICIPIO, DIRECCION PRESTADOR
    autoTable(doc, {
      startY: 98,
      columnStyles: { nit: { halign: 'left' } },
      body: [
        {
          nit: this.act_nit,
          municipio: this.act_municipio,
          direccion: this.act_direccion,
        },
      ],
      columns: [
        { header: 'Nit:', dataKey: 'nit' },
        { header: 'Municipio:', dataKey: 'municipio' },
        { header: 'Dirección:', dataKey: 'direccion' },
      ],
      headStyles: {
        fillColor: [255, 255, 255],
        textColor: [0, 0, 0],
      },
      bodyStyles: {
        fillColor: [255, 255, 255],
        textColor: [0, 0, 0],
      },
      styles: {
        fontSize: 10,
      },
    });

    //BARRIO, TELEFONO, EMAIL
    autoTable(doc, {
      startY: 115,
      columnStyles: { nit: { halign: 'left' } },
      body: [
        {
          barrio: this.act_barrio,
          telefono: this.act_telefono,
          email: this.act_email,
        },
      ],
      columns: [
        { header: 'Barrio:', dataKey: 'barrio' },
        { header: 'Telefono:', dataKey: 'telefono' },
        { header: 'Email:', dataKey: 'email' },
      ],
      headStyles: {
        fillColor: [255, 255, 255],
        textColor: [0, 0, 0],
      },
      bodyStyles: {
        fillColor: [255, 255, 255],
        textColor: [0, 0, 0],
      },
      styles: {
        fontSize: 10,
      },
    });

    //REPRESENTANTE LEGAL, CODIGO PRESTADOR, CODIGO SEDE VISITADA
    autoTable(doc, {
      startY: 131,
      columnStyles: { sede: { halign: 'left' } },
      body: [
        {
          representante: this.act_representante,
          codpres: this.act_cod_prestador,
        },
      ],
      columns: [
        { header: 'Representante Legal:', dataKey: 'representante' },
        { header: 'Código Prestador:', dataKey: 'codpres' },
      ],
      headStyles: {
        fillColor: [255, 255, 255],
        textColor: [0, 0, 0],
      },
      bodyStyles: {
        fillColor: [255, 255, 255],
        textColor: [0, 0, 0],
      },
      styles: {
        fontSize: 10,
      },
    });

    //OBJETO DE LA VISITA
    autoTable(doc, {
      startY: 148,
      columnStyles: { objeto: { halign: 'left' } },
      body: [{ objeto: this.act_obj_visita }],
      columns: [{ header: 'Objeto de la Visita:', dataKey: 'objeto' }],
      tableWidth: 'auto',
      headStyles: {
        fillColor: [255, 255, 255],
        textColor: [0, 0, 0],
      },
      bodyStyles: {
        fillColor: [255, 255, 255],
        textColor: [0, 0, 0],
      },
      styles: {
        fontSize: 10,
      },
    });
  }

  async generarOrdenDia(doc: jsPDF): Promise<void> {
    // Crear una tabla para el contenido
    const tableData: string[][] = [];

    // Función para crear una lista enumerada
    function crearListaNumerada(items: string[]) {
      let number = 1; // Inicializa el contador

      items.forEach(item => {
        // Agrega el número de lista y el elemento de la lista en una fila de la tabla
        tableData.push([`${number}. ${item}`]);
        number++; // Incrementa el contador
      });
    }

    // Lista del orden del día
    const lista_orden: string[] = [
      "Presentación ante Gerente y/o su delegado.",
      "Objeto de la visita.",
      "Caracterización de los servicios ofertados. ",
      "Revisión de información y/o documentos que aplican. ",
      "Socialización de hallazgos y/u observaciones. ",
      "Cierre de la visita y compromisos. ",
    ];
    // Llamar a la función para crear la lista numerada en la tabla
    crearListaNumerada(lista_orden);

    doc.text('ORDEN DEL DÍA', 93, 185)
    // Crear una tabla para el contenido
    autoTable(doc, {
      startY: 192,
      body: tableData, // Los datos de la tabla que generaste
      tableWidth: 'auto',
      headStyles: {
        fillColor: [255, 255, 255],
        textColor: [0, 0, 0],
      },
      bodyStyles: {
        fillColor: [255, 255, 255],
        textColor: [0, 0, 0],
      },
      styles: {
        fontSize: 10,
      },
    });
  }

  //DESARROLLO DE LA REUNIÓN - ORDEN DEL DIA UNO Y DOS
  async generarDesarrolloOrden(doc: jsPDF, actaSpIps: ActaSpPdfDto): Promise<void> {

    //INFORMACIÓN DEL USUARIO ASIGNADO EN EL ACTA:
    const usuario = await this.usuarioService.oneUser(this.actaPdf.act_id_funcionario).toPromise()
    const usuarioAsignado = usuario.usu_nombre + ' ' + usuario.usu_apellido

    doc.text(
      'DESARROLLO DE LA REUNIÓN',
      82,
      40
    );

    // DESARROLLO DE LA REUNIÓN
    autoTable(doc, {
      margin: { top: 42 },
      columnStyles: {
        objeto: { halign: 'justify' },
      },
      body: [
        {
          objeto:
            `La Secretaria de Salud Departamental del Putumayo, en cumplimiento de sus funciones orgánicas de inspección, vigilancia ` +
            `y control estipuladas bajo la Ley 715 de 2021 y de acuerdo al Decreto 1011 de 2006 por el cual se crea el Sistema Obligatorio de Garantía de Calidad ` +
            `de la Atención en Salud y teniendo en cuenta los lineamientos relacionados al programa de seguridad del paciente emanados ` +
            `por el Ministerio de Salud y Protección Social; realiza seguimiento al programa de seguridad del paciente a fin de velar por el` +
            `cumplimiento de la normatividad vigente y de esta manera garantizar que las IPS del departamento minimicen el riesgo de sufrir ` +
            `un evento adverso en el proceso de atención de salud o de mitigar sus consecuencias, lo cual Implica la evaluación permanente` +
            `de los riesgos asociados a la atención en salud y diseñar e implantar barreras de seguridad necesarias para su ocurrencia.` +
            `Por lo cual procede a realizar la presente visita y respectivo levantamiento de esta acta, como soporte del cumplimiento de lo expuesto.`
        },
      ],
      columns: [
        { header: '', dataKey: 'objeto' },
      ],
      headStyles: {
        fillColor: [255, 255, 255],
        textColor: [0, 0, 0],
      },
      bodyStyles: {
        fillColor: [255, 255, 255],
        textColor: [0, 0, 0],
      },
      styles: {
        fontSize: 10,
      },
    });

    let tipo_visita
    if (this.act_visita_inicial) {
      tipo_visita = 'Incial'
    } else if (this.act_visita_seguimiento) {
      tipo_visita = 'de Seguimiento'
    }

    //FORMALIZAR LAS FECHAS DEL ORDEN DEL DÍA
    const fechaOrden = this.convertirFecha(this.act_fecha_orden)
    const fechaOficio = this.convertirFecha(this.act_fecha_oficio)
    const fechaEnvioOficio = this.convertirFecha(this.act_fecha_envio_oficio)

    // 1. Presentación ante gerente y/o su delegado:
    autoTable(doc, {
      startY: 90,
      columnStyles: { objeto: { halign: 'justify' } },
      body: [
        {
          objeto:
            `Siendo las ${this.act_hora_orden} del día ${fechaOrden}, en las instalaciones ubicadas en ${this.act_direccion} se realiza ` +
            `visita ${tipo_visita} al programa de seguridad del paciente a ${this.act_prestador} con Código de habilitación ${this.act_cod_prestador} ` +
            `acorde al oficio Número. ${this.act_num_oficio} emitido el ${fechaOficio} y enviado vía correo electrónico el ${fechaEnvioOficio}. ` +
            `Se procede con la presentación por parte del Profesional de Apoyo ${usuarioAsignado} de la oficina de Aseguramiento y Prestación de Servicios - Sistema Obligatorio de Garantía de la Calidad en Salud - ` +
            `SOGC a quien reciben en la visita, ${this.act_nombre_prestador} y ${this.act_nombre_prestador_acompanante}. `

        },
      ],
      columns: [{ header: '1. Presentación ante gerente y/o su delegado: ', dataKey: 'objeto' }],
      tableWidth: 'auto',
      headStyles: {
        fillColor: [255, 255, 255],
        textColor: [0, 0, 0],
      },
      bodyStyles: {
        fillColor: [255, 255, 255],
        textColor: [0, 0, 0],
      },
      styles: {
        fontSize: 10,
      },
    });

    // 2. Objeto de la visita: 
    autoTable(doc, {
      startY: 130,
      columnStyles: { objeto: { halign: 'justify' } },
      body: [
        {
          objeto:
            `Dando continuidad a la agenda, se da a conocer el objeto de la visita, el cual es realizar el seguimiento a la implementación del programa de seguridad del paciente ` +
            `acorde a los lineamientos y buenas prácticas estipuladas por el Ministerio de salud. Para lo cual se evaluará lo siguiente: `

        },
      ],
      columns: [{ header: '2. Objeto de la visita: ', dataKey: 'objeto' }],
      tableWidth: 'auto',
      headStyles: {
        fillColor: [255, 255, 255],
        textColor: [0, 0, 0],
      },
      bodyStyles: {
        fillColor: [255, 255, 255],
        textColor: [0, 0, 0],
      },
      styles: {
        fontSize: 10,
      },
      didDrawCell: (data => {
        if (data.section === 'body') {
          data.cell.styles.fillColor = [255, 255, 255]; // Establecer el color de fondo de cada celda en el cuerpo de la tabla como blanco
        }
      })
    });

    const evaluaciones = await this.evaluacionipsService.listaEvaActId(actaSpIps.id).toPromise();

    let idIncremental = 1; // Inicializar un contador

    const lista_evaluacions = evaluaciones.map(eva => ['    ' + idIncremental++ + '.', eva.evips_nombre])

    // LISTAR LAS EVALUACIONES ASIGNADAS POR EL USUARIO
    autoTable(doc, {
      startY: 155,
      body: lista_evaluacions,
      tableWidth: 'auto',
      headStyles: {
        fillColor: [248, 248, 248],
        textColor: [0, 0, 0],
      },
      bodyStyles: {
        fillColor: [255, 255, 255],
        textColor: [0, 0, 0],
      },
      styles: {
        fontSize: 10,
      },
    });

    // MANEJO DE INSERCIÓN DE LA ORDEN TRES CON BASE A LAS EVALUACIONES SELECCIONADAS
    if (idIncremental <= 8) {
      let startY = 175;
      await this.ordenTres(doc, startY);
      //CAPTURA DE LA IMAGEN EN NUEVA PAGINA
      //NUEVA PAGINA
      doc.addPage();
      // Aplicar las mismas configuraciones necesarias Header
      this.addHeader(doc);
      const widthImage = 32
      await this.solicitarCaptura(doc, widthImage)

      //VARIABLE PARA INCICIO DE ORDENES POSTERIORES
      let top_orden_pos = 135
      await this.ordenPoseterior(doc, top_orden_pos)
    } else {
      // Agregar una nueva página para la "orden tres"
      doc.addPage();
      // Aplicar las mismas configuraciones necesarias Header
      this.addHeader(doc);
      let top_table = 35;
      await this.ordenTres(doc, top_table);

      const widthImage = 58
      await this.solicitarCaptura(doc, widthImage)

      //VARIABLE PARA INCICIO DE ORDENES POSTERIORES
      let top_orden_pos = 160
      await this.ordenPoseterior(doc, top_orden_pos)
    }
  }

  //ORDEN DE LA REUNIÓN - DOS
  async ordenTres(doc: jsPDF, top: number) {
    autoTable(doc, {
      margin: { top },
      columnStyles: {
        caracterizacion: { halign: 'justify' },
      },
      body: [
        {
          caracterizacion: `Revisada la plataforma del REPS se puede evidenciar los servicios registrados y ofertados por ` +
            `parte de ${this.act_prestador} a la fecha.`
        },
      ],
      columns: [{ header: '3. Caracterización de los servicios ofertados: ', dataKey: 'caracterizacion' }],
      headStyles: {
        fillColor: [255, 255, 255],
        textColor: [0, 0, 0],
      },
      bodyStyles: {
        fillColor: [255, 255, 255],
        textColor: [0, 0, 0],
      },
      styles: {
        fontSize: 10,
      },
    });
  }

  async ordenPoseterior(doc: jsPDF, top: number) {
    //ORDEN CUATRO DEL ACTA
    autoTable(doc, {
      startY: top,
      columnStyles: { objeto: { halign: 'justify' } },
      body: [
        {
          objeto:
            `Se procede a solicitar información y/o documentos pertinentes al caso y según aplique, ` +
            `acorde a los servicios ofertadas y reportados en el REPS. Para lo cual se aplican las listas de chequeo respectivas. `

        },
      ],
      columns: [{ header: '4. Revisión de información y/o documentos:  ', dataKey: 'objeto' }],
      tableWidth: 'auto',
      headStyles: {
        fillColor: [255, 255, 255],
        textColor: [0, 0, 0],
      },
      bodyStyles: {
        fillColor: [255, 255, 255],
        textColor: [0, 0, 0],
      },
      styles: {
        fontSize: 10,
      },
      didDrawCell: (data => {
        if (data.section === 'body') {
          data.cell.styles.fillColor = [255, 255, 255]; // Establecer el color de fondo de cada celda en el cuerpo de la tabla como blanco
        }
      })
    });

    //ORDEN CINCO DEL ACTA
    autoTable(doc, {
      startY: top + 20,
      columnStyles: { objeto: { halign: 'justify' } },
      body: [
        {
          objeto:
            `Una vez realizada la respectiva revisión de la documentación y demás evidencias que soportan la ejecución e implementación del programa ` +
            `de seguridad del paciente, se procede a socializar los hallazgos (estos pueden indicar conformidad o no conformidad) u observaciones respectivas.`

        },
      ],
      columns: [{ header: '5. Socialización de Hallazgos y/u Observaciones: ', dataKey: 'objeto' }],
      tableWidth: 'auto',
      headStyles: {
        fillColor: [255, 255, 255],
        textColor: [0, 0, 0],
      },
      bodyStyles: {
        fillColor: [255, 255, 255],
        textColor: [0, 0, 0],
      },
      styles: {
        fontSize: 10,
      },
      didDrawCell: (data => {
        if (data.section === 'body') {
          data.cell.styles.fillColor = [255, 255, 255]; // Establecer el color de fondo de cada celda en el cuerpo de la tabla como blanco
        }
      })
    });


    //ORDEN SEIS DEL ACTA
    autoTable(doc, {
      startY: top + 43,
      columnStyles: { objeto: { halign: 'justify' } },
      body: [
        {
          objeto:
            `Una vez socializado los hallazgos  u observaciones a que haya lugar a la IPS auditada y frente a la herramienta de evaluación  ` +
            `establecida por la secretaria de salud departamental, se procede hacer el cierre respectivo de la visita, recordando que aquello ` +
            `que se encuentre con calificación de 3 y/o 1 son objeto de acciones de mejoramiento (entiéndase como acciones de mejoramiento,` +
            `toda actividad implementada en la menor medida posible y que tiendan a corregir las desviaciones que se pudieren estar presentando) y los compromisos adquiridos. `

        },
      ],
      columns: [{ header: '6. Cierre de la visita y compromisos: ', dataKey: 'objeto' }],
      tableWidth: 'auto',
      headStyles: {
        fillColor: [255, 255, 255],
        textColor: [0, 0, 0],
      },
      bodyStyles: {
        fillColor: [255, 255, 255],
        textColor: [0, 0, 0],
      },
      styles: {
        fontSize: 10,
      },
      didDrawCell: (data => {
        if (data.section === 'body') {
          data.cell.styles.fillColor = [255, 255, 255]; // Establecer el color de fondo de cada celda en el cuerpo de la tabla como blanco
        }
      })
    });

    //COMPROMISOS
    // LISTAR LAS EVALUACIONES ASIGNADAS POR EL USUARIO
    const compromisos = 'Por lo anterior se pactan los siguientes compromisos. '
    autoTable(doc, {
      startY: top + 72,
      body: [{ compromisos }],
      tableWidth: 'auto',
      headStyles: {
        fillColor: [248, 248, 248],
        textColor: [0, 0, 0],
      },
      bodyStyles: {
        fillColor: [255, 255, 255],
        textColor: [0, 0, 0],
      },
      styles: {
        fontSize: 10,
      },
    });


    //TRANSFORMAR LA FECHA DEL COMPROMISO.
    const fechaCompromiso = this.convertirFecha(this.act_compromiso_fecha)

    //TABLA COMPROMISOS
    //SI LA VARIABLE act_compromiso_actividad ES MAYOR A 170 CARACTERES PASAR LA TABLA A OTRA HOJA
    if (this.act_compromiso_actividad && this.act_compromiso_actividad.length > 170) {
      if (this.act_compromiso_actividad && fechaCompromiso && this.act_compromiso_responsable) {
        //AGREGAR PAGINA SI SUPERA LOS 170 CARACTERES
        doc.addPage();
        // Aplicar las mismas configuraciones necesarias Header
        this.addHeader(doc);
        let top_table = 35;
        autoTable(doc, {
          margin: { top: top_table },
          headStyles: {
            fillColor: [220, 220, 220],
            textColor: [0, 0, 0],
            halign: 'center'
          },
          columns: [
            { header: 'COMPROMISOS', dataKey: 'mensaje' },
          ],
          tableWidth: 'auto',
        })

        autoTable(doc, {
          margin: { top: 52 },
          columnStyles: {
            acta: { halign: 'left' },
            fecha: { halign: 'center' },
            responsable: { halign: 'center' },
          },
          body: [
            {
              actividad: this.act_compromiso_actividad,
              fecha: fechaCompromiso,
              responsable: this.act_compromiso_responsable
            },
          ],
          columns: [
            { header: 'Actividad', dataKey: 'actividad' },
            { header: 'Fecha', dataKey: 'fecha' },
            { header: 'Responsables', dataKey: 'responsable' },
          ],
          headStyles: {
            fillColor: [200, 200, 200],
            textColor: [0, 0, 0],
          },
          bodyStyles: {
            fillColor: [255, 255, 255],
            textColor: [0, 0, 0],
          },
          styles: {
            fontSize: 10,
          },
        });
        //AGREGAR TABLA FIRMAS CON INCIO EN 80 SI SUPERA LOS 175 CARACTERES
        const top_firmas = 80
        const posicionYFirmaPrestador = 103
        const posicionYFirmaAcompanante = 116
        const posicionYFirmaFuncionario = 153
        await this.firmasActa(doc, top_firmas, posicionYFirmaPrestador, posicionYFirmaAcompanante, posicionYFirmaFuncionario)
      }

    } else if (this.act_compromiso_actividad && fechaCompromiso && this.act_compromiso_responsable) {
      autoTable(doc, {
        margin: { top: 52 },
        headStyles: {
          fillColor: [220, 220, 220],
          textColor: [0, 0, 0],
          halign: 'center'
        },
        columns: [
          { header: 'COMPROMISOS', dataKey: 'mensaje' },
        ],
        tableWidth: 'auto',
      })

      autoTable(doc, {
        margin: { top: 52 },
        columnStyles: {
          acta: { halign: 'left' },
          fecha: { halign: 'center' },
          responsable: { halign: 'center' },
        },
        body: [
          {
            actividad: this.act_compromiso_actividad,
            fecha: fechaCompromiso,
            responsable: this.act_compromiso_responsable
          },
        ],
        columns: [
          { header: 'Actividad', dataKey: 'actividad' },
          { header: 'Fecha', dataKey: 'fecha' },
          { header: 'Responsables', dataKey: 'responsable' },
        ],
        headStyles: {
          fillColor: [200, 200, 200],
          textColor: [0, 0, 0],
        },
        bodyStyles: {
          fillColor: [255, 255, 255],
          textColor: [0, 0, 0],
        },
        styles: {
          fontSize: 10,
        },
      });
      //AGREGAR PAGINA PARA LAS FIRMAS SI NO SUPERA LOS 175 CARACTERES
      doc.addPage();
      // Aplicar las mismas configuraciones necesarias Header
      this.addHeader(doc);
      const top_firmas = 35
      //VARIABLES PARA POSICIONAR FIRMAS DEL METODO (FIRMAS ACTA)
      const posicionYFirmaPrestador = 57
      const posicionYFirmaAcompanante = 72
      const posicionYFirmaFuncionario = 108
      await this.firmasActa(doc, top_firmas, posicionYFirmaPrestador, posicionYFirmaAcompanante, posicionYFirmaFuncionario)

    } else {
      //AGREGAR LA TABLA FIRMAS POR SI NO HAY NINGUNA TABLA DE COMPROMISOS
      //AGREGAR PAGINA PARA LAS FIRMAS SI NO SUPERA LOS 175 CARACTERES
      doc.addPage();
      // Aplicar las mismas configuraciones necesarias Header
      this.addHeader(doc);
      const top_firmas = 35
      //VARIABLES PARA POSICIONAR FIRMAS DEL METODO (FIRMAS ACTA)
      const posicionYFirmaPrestador = 57
      const posicionYFirmaAcompanante = 72
      const posicionYFirmaFuncionario = 108
      await this.firmasActa(doc, top_firmas, posicionYFirmaPrestador, posicionYFirmaAcompanante, posicionYFirmaFuncionario)
    }

  }

  firmasActa(doc: jsPDF, top: number, posicionYFirmaPrestador: number,
    posicionYFirmaAcompanante: number, posicionYFirmaFuncionario: number) {
    //MENSAJE FIRMAS POR PRESTADOR
    autoTable(doc, {
      startY: top,
      headStyles: {
        fillColor: [220, 220, 220],
        textColor: [0, 0, 0],
        halign: 'center'
      },
      columns: [
        { header: 'En constancia de lo anterior firman por el prestador:', dataKey: 'mensaje' },
      ],
      tableWidth: 'auto',
    })

    if (this.noFirmaActa === 'true') {
      this.prestadorNoFirma = 'Declara no firmar el acta.'
    } else {
      this.prestadorNoFirma = ''
    }
    //NOMBRE USUARIO1, CARGO USUARIO1 Y FIRMA1
    autoTable(doc, {
      margin: { top: 35 },
      columnStyles: { sede: { halign: 'left' } },

      body: [
        { nombre: this.act_nombre_prestador, cargo: this.act_cargo_prestador, firma: this.prestadorNoFirma },
        { nombre: '', cargo: '', firma: '' },
        { nombre: this.act_nombre_prestador_acompanante, cargo: this.act_cargo_prestador_acompanante, firma: this.prestadorNoFirma },
      ],
      columns: [
        { header: 'Nombre:', dataKey: 'nombre' },
        { header: 'Cargo:', dataKey: 'cargo' },
        { header: 'Firma:', dataKey: 'firma' },

      ],
      headStyles: {
        fillColor: [255, 255, 255],
        textColor: [0, 0, 0]
      },
      bodyStyles: {
        fillColor: [248, 248, 248],
        textColor: [0, 0, 0],
      },
      styles: {
        fontSize: 10
      }
    })


    //MENSAJE FIRMAS POR SECRETARIA DE SALUD
    autoTable(doc, {
      margin: { top: 35 },
      headStyles: {
        fillColor: [220, 220, 220],
        textColor: [0, 0, 0],
        halign: 'center'
      },
      columns: [
        { header: 'En constancia de lo anterior firman por la secretaria de Salud Departamental:', dataKey: 'mensaje' },
      ],
      tableWidth: 'auto',
    })

    //NOMBRE USUARIO1, CARGO USUARIO1 Y FIRMA1
    autoTable(doc, {
      margin: { top: 35 },
      columnStyles: { sede: { halign: 'left' } },

      body: [
        { nombre: this.act_nombre_funcionario, cargo: this.act_cargo_funcionario, firma: '' },
      ],
      columns: [
        { header: 'Nombre:', dataKey: 'nombre' },
        { header: 'Cargo:', dataKey: 'cargo' },
        { header: 'Firma:', dataKey: 'firma' },

      ],
      headStyles: {
        fillColor: [255, 255, 255],
        textColor: [0, 0, 0]
      },
      bodyStyles: {
        fillColor: [248, 248, 248],
        textColor: [0, 0, 0],
      },
      styles: {
        fontSize: 10
      }
    })

    //FIRMA PRESTADOR
    if (this.noFirmaActa === 'false') {
      if (this.act_firma_prestador) {
        // Convertir la firma prestador de base64 a Uint8Array
        const firmaDataPrestador = atob(this.act_firma_prestador.split(',')[1]);
        const firmaUint8ArrayPrestador = new Uint8Array(firmaDataPrestador.length);
        for (let i = 0; i < firmaDataPrestador.length; i++) {
          firmaUint8ArrayPrestador[i] = firmaDataPrestador.charCodeAt(i);
        }
        doc.addImage(firmaUint8ArrayPrestador, 'PNG', 175, posicionYFirmaPrestador, 25, 9.25)
      }

      //FIRMA PRESTADOR ACOMPAÑANTE
      if (this.act_firma_prestador_acompanante) {
        // Convertir la firma prestador de base64 a Uint8Array
        const firmaDataPrestadorAcompanante = atob(this.act_firma_prestador_acompanante.split(',')[1]);
        const firmaUint8ArrayPrestador = new Uint8Array(firmaDataPrestadorAcompanante.length);
        for (let i = 0; i < firmaDataPrestadorAcompanante.length; i++) {
          firmaUint8ArrayPrestador[i] = firmaDataPrestadorAcompanante.charCodeAt(i);
        }
        doc.addImage(firmaUint8ArrayPrestador, 'PNG', 175, posicionYFirmaAcompanante, 25, 9.25)
      }
    }


    //FIRMA FUNCIONARIO SSD
    // Convertir la firma usuario de base64 a Uint8Array
    if (this.act_firma_funcionario) {
      const firmaDataFuncionario = atob(this.act_firma_funcionario.split(',')[1]);
      const firmaUint8ArrayFuncionario = new Uint8Array(firmaDataFuncionario.length);
      for (let i = 0; i < firmaDataFuncionario.length; i++) {
        firmaUint8ArrayFuncionario[i] = firmaDataFuncionario.charCodeAt(i);
      }
      doc.addImage(firmaUint8ArrayFuncionario, 'PNG', 177, posicionYFirmaFuncionario, 25, 9.25)
    }
  }

  async getFileFromBase64(base64String: string) {
    let img = new Image()
    img.src = base64String
    return img
  }


  //GENERAR PDF ULTIMA ACTA CREADA
  async ActaPdf(id_acta: number): Promise<void> {

    //CONSULTAR EL ACTA A GENERAR
    this.actapdfService.oneActaSpIps(id_acta).subscribe(async (data) => {
      this.actaPdf = data;
      // Asignar los datos del actaPdf a las propiedades correspondientes
      this.act_id = this.actaPdf.act_id;
      this.act_visita_inicial = this.actaPdf.act_visita_inicial;
      this.act_visita_seguimiento = this.actaPdf.act_visita_seguimiento;
      this.act_fecha_inicial = this.actaPdf.act_fecha_inicial;
      this.act_fecha_final = this.actaPdf.act_fecha_final;
      this.act_municipio = this.actaPdf.act_municipio;
      this.act_prestador = this.actaPdf.act_prestador;
      this.act_nit = this.actaPdf.act_nit;
      this.act_direccion = this.actaPdf.act_direccion;
      this.act_barrio = this.actaPdf.act_barrio;
      this.act_telefono = this.actaPdf.act_telefono;
      this.act_email = this.actaPdf.act_email;
      this.act_representante = this.actaPdf.act_representante;
      this.act_cod_prestador = this.actaPdf.act_cod_prestador;
      this.act_obj_visita = this.actaPdf.act_obj_visita;
      this.act_nombre_funcionario = this.actaPdf.act_nombre_funcionario;
      this.act_cargo_funcionario = this.actaPdf.act_cargo_funcionario;
      this.act_firma_funcionario = this.actaPdf.act_firma_funcionario;
      this.act_nombre_prestador = this.actaPdf.act_nombre_prestador;
      this.act_cargo_prestador = this.actaPdf.act_cargo_prestador;
      this.act_firma_prestador = this.actaPdf.act_firma_prestador;
      this.act_nombre_prestador_acompanante = this.actaPdf.act_nombre_prestador_acompanante
      this.act_cargo_prestador_acompanante = this.actaPdf.act_cargo_prestador_acompanante
      this.act_firma_prestador_acompanante = this.actaPdf.act_firma_prestador_acompanante
      //VARIABLES DE ORDEN
      this.act_hora_orden = this.actaPdf.act_hora_orden;
      this.act_fecha_orden = this.actaPdf.act_fecha_orden;
      this.act_num_oficio = this.actaPdf.act_num_oficio;
      this.act_fecha_oficio = this.actaPdf.act_fecha_oficio;
      this.act_fecha_envio_oficio = this.actaPdf.act_fecha_envio_oficio

      //ASIGNAR LOS COMPROMISOS
      this.act_compromiso_actividad = this.actaPdf.act_compromiso_actividad
      this.act_compromiso_fecha = this.actaPdf.act_compromiso_fecha
      this.act_compromiso_responsable = this.actaPdf.act_compromiso_responsable

      //ESTADO DEL ACTA
      this.act_estado = this.actaPdf.act_estado
      //ESTADO FIRMA O NO EL ACTA
      this.noFirmaActa = this.actaPdf.noFirmaActa

      //ASIGNAR LA IMAGEN ENCONTRADA
      this.act_captura_imagen = this.actaPdf.act_captura_imagen

      // Crear un nuevo documento PDF
      const doc = new jsPDF();

      // Agregar la primera página
      this.addHeader(doc);
      await this.InformacionPrestador(doc)
      await this.generarOrdenDia(doc)

      // Agregar la segunda página DESARROLLO DE LA REUNION
      doc.addPage();
      this.addHeader(doc);
      // Generar la informacion desarrollo de la reunion
      await this.generarDesarrolloOrden(doc, this.actaPdf)

      // Agregar el pie de página en todas las páginas
      const totalPages = doc.getNumberOfPages();
      for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i);
        this.addFooter(doc);
        if (this.act_estado === '1') {
          this.addMarcaAgua(doc)
        }
      }


      doc.save(this.act_cod_prestador + 'Sp_Ips')
    });
  }
}
