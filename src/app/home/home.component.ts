import { Component, OnInit } from '@angular/core';
import { TokenService } from '../services/token.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  usu_nombreUsuario: string;
  usu_nombre: string;
  isLogged: boolean;


  constructor(
    private tokenService: TokenService,
    private ngxLoader: NgxUiLoaderService
  ) { }

  ngOnInit(): void {
    // Escuchar el evento popstate del navegador
    window.addEventListener('popstate', () => {
      // Eliminar el elemento al navegar hacia atrás
      localStorage.removeItem('boton-editar-acta-sic');
    });
    this.usu_nombreUsuario = this.tokenService.getNombreUsuario();
    this.isLogged = this.tokenService.isLogged();
    this.usu_nombre = this.tokenService.getNombre();

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
