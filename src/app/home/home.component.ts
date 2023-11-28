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
  }

}
