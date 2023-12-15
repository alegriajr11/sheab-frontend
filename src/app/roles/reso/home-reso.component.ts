import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-home-reso',
  templateUrl: './home-reso.component.html',
  styleUrls: ['./home-reso.component.css']
})
export class HomeResoComponent implements OnInit {

  isCoordinador: boolean
  isAdmin: boolean
  isContador: boolean

  constructor(
    private tokenService: TokenService,
  ) { }

  ngOnInit(): void {
    this.isCoordinador = this.tokenService.IsCoordinador();
    this.isAdmin = this.tokenService.isAdmin();
    this.isContador = this.tokenService.IsContador();

    this.refreshOne()
  }


  refreshOne(){
    const hasRefreshed = localStorage.getItem('hasRefreshed');

    if (!hasRefreshed) {
      // Realizar la lógica que necesitas hacer una vez aquí
      // Por ejemplo:
      console.log('El componente se ha refrescado una vez');

      // Establecer la bandera en el almacenamiento de sesión para evitar más refrescos
      localStorage.setItem('hasRefreshed', 'true');

      // Hacer un refresh manual después de un breve tiempo (por ejemplo, 1 segundo)
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  }

  ngOnDestroy(): void {
    // Eliminar la variable del almacenamiento al salir del componente
    localStorage.removeItem('hasRefreshed');
  }

}
