import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-pamec',
  templateUrl: './home-pamec.component.html',
  styleUrls: ['./home-pamec.component.css']
})
export class HomePamecComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
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
      }, 500);
    }
  }

  ngOnDestroy(): void {
    // Eliminar la variable del almacenamiento al salir del componente
    localStorage.removeItem('hasRefreshed');
  }

}
