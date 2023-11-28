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
  }


}
