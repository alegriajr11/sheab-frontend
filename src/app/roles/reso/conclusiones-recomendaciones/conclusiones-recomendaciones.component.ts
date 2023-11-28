import { Component } from '@angular/core';

@Component({
  selector: 'app-conclusiones-recomendaciones',
  templateUrl: './conclusiones-recomendaciones.component.html',
  styleUrls: ['./conclusiones-recomendaciones.component.css']
})
export class ConclusionesRecomendacionesComponent {
  //ATRIBUTOS PRESTADOR
  nombre_prestador: string
  nombre_municipio: string
  id_acta_verificacion: number

  ngOnInit(): void {
    this.capturarActa();
  }

  capturarActa() {
    this.nombre_prestador = localStorage.getItem('nombre-pres-verificacion')
    this.id_acta_verificacion = parseInt(localStorage.getItem('id_acta_verificacion'))
  }
}
