import { Component, OnInit } from '@angular/core';
import { TokenService } from '../services/token.service';

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
    private tokenService: TokenService
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


  refreshOne(){
    const hasRefreshed = localStorage.getItem('hasRefreshedHome');

    if (!hasRefreshed) {
      // Realizar la lógica que necesitas hacer una vez aquí
      // Por ejemplo:
      console.log('El componente se ha refrescado una vez');

      // Establecer la bandera en el almacenamiento de sesión para evitar más refrescos
      localStorage.setItem('hasRefreshedHome', 'true');

      // Hacer un refresh manual después de un breve tiempo (por ejemplo, 1 segundo)
      setTimeout(() => {
        window.location.reload();
      }, 300);
    }
  }

  ngOnDestroy(): void {
    // Eliminar la variable del almacenamiento al salir del componente
    localStorage.removeItem('hasRefreshedHome');
  }
}
