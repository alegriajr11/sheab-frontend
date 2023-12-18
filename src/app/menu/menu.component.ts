import { AfterViewInit, Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../services/token.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, AfterViewInit {

  isLogged: boolean;
  isAdmin: boolean;
  isSic: boolean;
  isSp: boolean;
  isPamec: boolean;
  isReso: boolean;
  isCoordinador: boolean;
  isContador: boolean;

  usu_nombreUsuario: string;
  usu_nombre: string;

  role: string = '';

  reload: 'reload' | undefined = undefined;

  numeroDeNotificaciones: number

  isDropdownOpen = false



  constructor(
    private tokenService: TokenService,
    private router: Router,
    private renderer: Renderer2,
    private el: ElementRef
  ) { }

  ngOnInit(): void {
    this.isLogged = this.tokenService.isLogged();
    this.isAdmin = this.tokenService.isAdmin();
    this.isSic = this.tokenService.IsSic();
    this.isSp = this.tokenService.IsSp();
    this.isPamec = this.tokenService.IsPamec();
    this.isReso = this.tokenService.IsReso();
    this.isContador = this.tokenService.IsContador();
    this.isCoordinador = this.tokenService.IsCoordinador();
    this.usu_nombreUsuario = this.tokenService.getNombreUsuario();
    this.usu_nombre = this.tokenService.getNombre();

    //
    this.mostrarRolMenu();
  }

  isSubMenuOpen: boolean = false;

  toggleSubMenu(): void {
    this.isSubMenuOpen = !this.isSubMenuOpen;
  }


  logOut(): void {
    this.tokenService.logOut();
    this.router.navigate(['/login']);
  }

  mostrarRolMenu(){
    if(this.isAdmin = this.tokenService.isAdmin()){
      this.role = 'Admin'
    } else if (this.isSic = this.tokenService.IsSic()){
      this.role = 'Sic'
    }
    else if (this.isSic = this.tokenService.IsPamec()){
      this.role = 'Pamec'
    }
    else if (this.isSp = this.tokenService.IsSp()){
      this.role = 'Seguridad del Paciente'
    }
    else if (this.isSic = this.tokenService.IsReso()){
      this.role = 'Resolución 3100'
    }
  }

  ngAfterViewInit(): void {
    const sidebar = document.querySelector(".sidebar");
    const closeBtn = document.querySelector("#btn");
    const searchBtn = document.querySelector(".bx-search");

    closeBtn.addEventListener("click", () => {
      sidebar.classList.toggle("open");
      menuBtnChange();
    });

    searchBtn.addEventListener("click", () => {
      sidebar.classList.toggle("open");
      menuBtnChange();
    });

    function menuBtnChange() {
      if (sidebar.classList.contains("open")) {
        closeBtn.classList.replace("bx-menu", "bx-menu-alt-right");
      } else {
        closeBtn.classList.replace("bx-menu-alt-right", "bx-menu");
      }
    }
  }

}
