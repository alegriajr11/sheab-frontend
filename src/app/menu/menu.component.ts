import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../services/token.service';
import {MenubarModule} from 'primeng/menubar';
import {MenuItem} from 'primeng/api';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

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

  }

  logOut(): void {
    this.tokenService.logOut();
    this.router.navigate(['/login']);
  }

  mostrarNotificaciones(){

  }


}
