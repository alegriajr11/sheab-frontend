import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-home-pamec',
  templateUrl: './home-pamec.component.html',
  styleUrls: ['./home-pamec.component.css']
})
export class HomePamecComponent implements OnInit {

  constructor(
    private ngxLoader: NgxUiLoaderService
  ) { }

  ngOnInit(): void {
    this.refreshOne()
  }

  //FUNCIONALIDAD DEL SLIDER BAR
  refreshOne() {
    const hasRefreshed = localStorage.getItem('hasRefreshed');

    if (!hasRefreshed) {
      // Realizar la lógica que necesitas hacer una vez aquí
      // Por ejemplo:
      console.log('El componente se ha refrescado una vez');

      // Establecer la bandera en el almacenamiento de sesión para evitar más refrescos
      localStorage.setItem('hasRefreshed', 'true');
      
      // Hacer un refresh manual después de un breve tiempo
      setTimeout(() => {
        this.ngxLoader.start(); // Inicia el loader
        window.location.reload();
      }, 10);
    }
  }

  ngOnDestroy(): void {
    // Eliminar la variable del almacenamiento al salir del componente
    localStorage.removeItem('hasRefreshed');
  }

}
