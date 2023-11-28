import { Injectable } from '@angular/core';
import { ActapdfService } from '../Sic/actapdf.service';
import { ActaPamecDto } from 'src/app/models/Actas/actaPamePdf.dto';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Injectable({
  providedIn: 'root'
})
export class GenerarPdfActaPamecService {

  actaPamecPdf: ActaPamecDto = null
  listaVacia: any = undefined;

  act_id: number;
  act_tipo_visita: string;
  //ATRIBUTOS CON TIPO VISITA:
  act_ano_formulacion: string;
  act_ciclo_mejoramiento: string;
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

  //OBSERVACIONES
  act_observaciones: string

  constructor(
    private actapdfService: ActapdfService
  ) { }

  addHeader(doc: jsPDF) {
    var imgEncabezado = 'assets/img/encabezadoPamec.png'
    doc.addImage(imgEncabezado, 'PNG', 23.5, 4, 160, 28);
  }

  //GENERAR PDF ULTIMA ACTA CREADA
  async ActaPdf(id_acta: number): Promise<void> {
    this.actapdfService.oneActaPamec(id_acta).subscribe(
      async data => {
        this.actaPamecPdf = data;
        // Asignar los datos del actaPdf a las propiedades correspondientes
        this.act_id = this.actaPamecPdf.act_id
        this.act_tipo_visita = this.actaPamecPdf.act_tipo_visita
        this.act_ano_formulacion = this.actaPamecPdf.act_ano_formulacion
        this.act_ciclo_mejoramiento = this.actaPamecPdf.act_ciclo_mejoramiento
        this.act_fecha_visita = this.actaPamecPdf.act_fecha_visita
        this.act_municipio = this.actaPamecPdf.act_municipio
        this.act_prestador = this.actaPamecPdf.act_prestador
        this.act_nit = this.actaPamecPdf.act_nit
        this.act_direccion = this.actaPamecPdf.act_direccion
        this.act_barrio = this.actaPamecPdf.act_barrio
        this.act_telefono = this.actaPamecPdf.act_telefono
        this.act_email = this.actaPamecPdf.act_email
        this.act_representante = this.actaPamecPdf.act_representante
        this.act_cod_prestador = this.actaPamecPdf.act_cod_prestador
        this.act_sede = this.actaPamecPdf.act_sede
        this.act_sede_barrio = this.actaPamecPdf.act_sede_barrio
        this.act_sede_direccion = this.actaPamecPdf.act_sede_direccion
        this.act_obj_visita = this.actaPamecPdf.act_obj_visita
        //FUNCIONARIO UNO
        this.act_nombre_funcionario1 = this.actaPamecPdf.act_nombre_funcionario1
        this.act_cargo_funcionario1 = this.actaPamecPdf.act_cargo_funcionario1
        this.act_firma_funcionario1 = this.actaPamecPdf.act_firma_funcionario1
        //FUNCIONARIO DOS
        this.act_nombre_funcionario2 = this.actaPamecPdf.act_nombre_funcionario2
        this.act_cargo_funcionario2 = this.actaPamecPdf.act_cargo_funcionario2
        this.act_firma_funcionario2 = this.actaPamecPdf.act_firma_funcionario2
        //PRESTADOR FIRMA
        this.act_nombre_prestador = this.actaPamecPdf.act_nombre_prestador
        this.act_cargo_prestador = this.actaPamecPdf.act_cargo_prestador
        this.act_firma_prestador = this.actaPamecPdf.act_firma_prestador


        const doc = new jsPDF()
        this.addHeader(doc);
        var marca_agua_borrador = 'assets/img/marcaAguaSsd.png'
        var marca_agua_original = 'assets/img/marcaAguaSsdOriginal.png'


        doc.setFontSize(11)
        doc.setTextColor(128, 128, 128);
        doc.setFontSize(11);
        doc.setTextColor(0, 0, 0);
        doc.setFont("helvetica", "bold")
        doc.text("ACTA DE VERIFICACIÓN Y SEGUIMIENTO AL PAMEC", 56, 40);
        doc.text("INSTITUCIONES PRESTADORAS DE SERVICIOS DE SALUD", 51, 50);
        //doc.text("PROFESIONALES INDEPENDIENTES", 80, 45);

        //INCIAL DEL ACTA
        doc.setFontSize(14);
        doc.text("Número de acta:", 16, 65);
        const numero_acta = this.act_id.toString()
        doc.text(numero_acta, 56, 65)

        //NOMBRE PRESTADOR
        doc.setFontSize(11);
        doc.text("INFORMACIÓN DEL PRESTADOR", 70, 79);

        autoTable(doc, {
          startY: 80,
          columnStyles: { nombrePres: { halign: 'left' } },
          body: [
            { nombrePres: this.act_prestador },
          ],
          columns: [
            { header: 'Nombre:', dataKey: 'nombrePres' },
          ],
          tableWidth: 'auto',
          headStyles: {
            fillColor: [255, 255, 255],
            textColor: [0, 0, 0]
          },
          bodyStyles: {
            fillColor: [255, 255, 255],
            textColor: [0, 0, 0],
          },
          styles: {
            fontSize: 10
          }
        })

        //NIT, MUNICIPIO, DIRECCION PRESTADOR
        autoTable(doc, {
          startY: 98,
          columnStyles: { nit: { halign: 'left' } },
          body: [
            { nit: this.act_nit, municipio: this.act_municipio, direccion: this.act_direccion },
          ],
          columns: [
            { header: 'Nit:', dataKey: 'nit' },
            { header: 'Municipio:', dataKey: 'municipio' },
            { header: 'Dirección:', dataKey: 'direccion' },
          ],
          headStyles: {
            fillColor: [255, 255, 255],
            textColor: [0, 0, 0]
          },
          bodyStyles: {
            fillColor: [255, 255, 255],
            textColor: [0, 0, 0],
          },
          styles: {
            fontSize: 10
          }
        })

        //BARRIO, TELEFONO, EMAIL
        autoTable(doc, {
          startY: 115,
          columnStyles: { nit: { halign: 'left' } },
          body: [
            { barrio: this.act_barrio, telefono: this.act_telefono, email: this.act_email },
          ],
          columns: [
            { header: 'Barrio:', dataKey: 'barrio' },
            { header: 'Telefono:', dataKey: 'telefono' },
            { header: 'Email:', dataKey: 'email' },
          ],
          headStyles: {
            fillColor: [255, 255, 255],
            textColor: [0, 0, 0]
          },
          bodyStyles: {
            fillColor: [255, 255, 255],
            textColor: [0, 0, 0],
          },
          styles: {
            fontSize: 10
          }
        })

        //REPRESENTANTE LEGAL, CODIGO PRESTADOR, CODIGO SEDE VISITADA
        autoTable(doc, {
          startY: 131,
          columnStyles: { sede: { halign: 'left' } },
          body: [
            { representante: this.act_representante, codpres: this.act_cod_prestador },
          ],
          columns: [
            { header: 'Representante Legal:', dataKey: 'representante' },
            { header: 'Código Prestador:', dataKey: 'codpres' },

          ],
          headStyles: {
            fillColor: [255, 255, 255],
            textColor: [0, 0, 0]
          },
          bodyStyles: {
            fillColor: [255, 255, 255],
            textColor: [0, 0, 0],
          },
          styles: {
            fontSize: 10
          }
        })

        //SEDE
        autoTable(doc, {
          startY: 130,
          columnStyles: { sede: { halign: 'left' } },
          body: [
            { sede: this.act_sede },
          ],
          columns: [
            { header: 'Sede Visitada:', dataKey: 'sede' },

          ],
          headStyles: {
            fillColor: [255, 255, 255],
            textColor: [0, 0, 0]
          },
          bodyStyles: {
            fillColor: [255, 255, 255],
            textColor: [0, 0, 0],
          },
          styles: {
            fontSize: 10
          }
        })

        //BARRIO Y DIRECCIÓN DE LA SEDE SELECCIONADA
        autoTable(doc, {
          startY: 145,
          columnStyles: { sede: { halign: 'left' } },
          body: [
            { barrio: this.act_sede_barrio, direccionSede: this.act_sede_direccion },
          ],
          columns: [
            { header: 'Barrio Sede:', dataKey: 'barrio' },
            { header: 'Dirección Sede:', dataKey: 'direccionSede' },

          ],
          headStyles: {
            fillColor: [255, 255, 255],
            textColor: [0, 0, 0]
          },
          bodyStyles: {
            fillColor: [255, 255, 255],
            textColor: [0, 0, 0],
          },
          styles: {
            fontSize: 10
          }
        })

        //REPRESENTANTE LEGAL, CODIGO PRESTADOR, CODIGO SEDE VISITADA
        autoTable(doc, {
          startY: 165,
          columnStyles: { sede: { halign: 'left' } },
          body: [
            { representante: this.act_representante, codpres: this.act_cod_prestador, codsede: 'this.act_cod_sede' },
          ],
          columns: [
            { header: 'Representante Legal:', dataKey: 'representante' },
            { header: 'Código Prestador:', dataKey: 'codpres' },
            { header: 'Código Sede Visitada:', dataKey: 'codsede' },

          ],
          headStyles: {
            fillColor: [255, 255, 255],
            textColor: [0, 0, 0]
          },
          bodyStyles: {
            fillColor: [255, 255, 255],
            textColor: [0, 0, 0],
          },
          styles: {
            fontSize: 10
          }
        })

        //OBJETO DE LA VISITA
        autoTable(doc, {
          startY: 185,
          columnStyles: { objeto: { halign: 'left' } },
          body: [
            { objeto: this.act_obj_visita },
          ],
          columns: [
            { header: 'Objeto de la Visita:', dataKey: 'objeto' },
          ],
          tableWidth: 'auto',
          headStyles: {
            fillColor: [255, 255, 255],
            textColor: [0, 0, 0]
          },
          bodyStyles: {
            fillColor: [255, 255, 255],
            textColor: [0, 0, 0],
          },
          styles: {
            fontSize: 10
          }
        })

        //TIPO DE LA VISITA
        if (this.act_ano_formulacion) {
          autoTable(doc, {
            startY: 205,
            columnStyles: { sede: { halign: 'left' } },
            body: [
              { tipovisita: this.act_tipo_visita, anoformulacion: this.act_ano_formulacion },
            ],
            columns: [
              { header: 'Tipo de Visita:', dataKey: 'tipovisita' },
              { header: 'Año de Formulación:', dataKey: 'anoformulacion' },

            ],
            headStyles: {
              fillColor: [255, 255, 255],
              textColor: [0, 0, 0]
            },
            bodyStyles: {
              fillColor: [255, 255, 255],
              textColor: [0, 0, 0],
            },
            styles: {
              fontSize: 10
            }
          })
        } else if (this.act_ciclo_mejoramiento) {
          autoTable(doc, {
            startY: 205,
            columnStyles: { sede: { halign: 'left' } },
            body: [
              { tipovisita: this.act_tipo_visita, ciclomejoramiento: this.act_ciclo_mejoramiento },
            ],
            columns: [
              { header: 'Tipo de Visita:', dataKey: 'tipovisita' },
              { header: 'Ciclo de Mejoramiento:', dataKey: 'ciclomejoramiento' },

            ],
            headStyles: {
              fillColor: [255, 255, 255],
              textColor: [0, 0, 0]
            },
            bodyStyles: {
              fillColor: [255, 255, 255],
              textColor: [0, 0, 0],
            },
            styles: {
              fontSize: 10
            }
          })
        } else {
          autoTable(doc, {
            startY: 205,
            columnStyles: { sede: { halign: 'left' } },
            body: [
              { tipovisita: this.act_tipo_visita },
            ],
            columns: [
              { header: 'Tipo de Visita:', dataKey: 'tipovisita' },
            ],
            headStyles: {
              fillColor: [255, 255, 255],
              textColor: [0, 0, 0]
            },
            bodyStyles: {
              fillColor: [255, 255, 255],
              textColor: [0, 0, 0],
            },
            styles: {
              fontSize: 10
            }
          })
        }

        //DESCRIPCIÓN
        autoTable(doc, {
          startY: 222,
          columnStyles: {
            objeto: { halign: 'justify' },
          },
          body: [
            {
              objeto:
                `El día ${this.act_fecha_visita} en el municipio de ${this.act_municipio} se presentó en las instalaciones de ${this.act_prestador} ` +
                `el personal de la Secretaria de Salud Departamental del Putumayo mediante la aplicación de un instrumento para verificación y seguimiento ` +
                `al PAMEC determinó el nivel de ejecución, de conformidad a  lo establecido en el Decreto 780/16 (1011 de 2006) y a las Pautas de Auditoría ` +
                `para el Mejoramiento de la Calidad de la Atención en Salud definidas por el Ministerio de Salud y Protección Social.`
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

        //DESCRIPCIÓN
        autoTable(doc, {
          startY: 252,
          columnStyles: {
            objeto: { halign: 'justify' },
          },
          body: [
            {
              objeto:
                `Se deja constancia de la actividad relacionada con el Componente de Auditoria para el Mejoramiento de la Calidad realizado por parte de ` +
                `el personal técnico de la Secretaría de Salud Departamental y se da por terminada la presente diligencia a las HORA del día ${this.act_fecha_visita} ` +
                `\n` +
                `\n` +
                `La presente acta de visita se lee, se aprueba, se firma por los que en ella intervinieron y se entrega copia de esta a quien atiende la visita.`
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


        //OBSERVACIONES
        if(this.act_observaciones){
          autoTable(doc, {
            margin: { top: 35 },
            headStyles: {
              fillColor: [220, 220, 220],
              textColor: [0, 0, 0],
              halign: 'center'
            },
            body: [
              {
                observaciones: 'Aquí observaciones'
              }
            ],
            bodyStyles: {
              fillColor: [248, 248, 248],
              textColor: [0, 0, 0],
            },
            columns: [
              { header: 'Obervaciones:', dataKey: 'observaciones' },
            ],
            tableWidth: 'auto',
          })
          
        }
        

        //MENSAJE FIRMAS POR PRESTADOR
        autoTable(doc, {
          margin: { top: 35 },
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
        //AGREGAR HEADER EN EL DOC AL TENER NUEVA PAGINA
        this.addHeader(doc);

        //NOMBRE USUARIO1, CARGO USUARIO1 Y FIRMA1
        autoTable(doc, {
          margin: { top: 35 },
          columnStyles: { sede: { halign: 'left' } },

          body: [
            { nombre: this.act_nombre_prestador, cargo: this.act_cargo_prestador, firma: '' },
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
            { nombre: this.act_nombre_funcionario1, cargo: this.act_cargo_funcionario1, firma: '' },
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

        if(this.act_nombre_funcionario2){
          //NOMBRE USUARIO1, CARGO USUARIO1 Y FIRMA1
        autoTable(doc, {
          margin: { top: 35 },
          columnStyles: { sede: { halign: 'left' } },

          body: [
            { nombre: this.act_nombre_funcionario2, cargo: this.act_cargo_funcionario2, firma: '' },
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
        }

        doc.output('dataurlnewwindow');
        //doc.save(this.act_cod_prestador + 'Pamec')

      },


      err => {
        this.listaVacia = err.error.message;
      }

    )
  }
}
