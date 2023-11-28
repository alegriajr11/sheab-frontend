import { Component } from '@angular/core';

@Component({
  selector: 'app-home-estandar',
  templateUrl: './home-estandar.component.html',
  styleUrls: ['./home-estandar.component.css']
})
export class HomeEstandarComponent {

  //ATRIBUTOS PRESTADOR
  nombre_prestador: string
  nombre_municipio: string
  id_acta_verificacion: number

  constructor() { }

  ngOnInit(): void {
    this.capturarActa();
  }

  capturarActa() {
    this.nombre_prestador = localStorage.getItem('nombre-pres-verificacion')
    this.id_acta_verificacion = parseInt(localStorage.getItem('id_acta_verificacion'))
  }
}
