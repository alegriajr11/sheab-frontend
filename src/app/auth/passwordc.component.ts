import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CambiarPasswordDto } from '../models/cambiar-password.dto';
import { AuthService } from '../services/auth.service';
import { TokenService } from '../services/token.service';

@Component({
  selector: 'app-passwordc',
  templateUrl: './passwordc.component.html',
  styleUrls: ['./passwordc.component.css']
})
export class PasswordcComponent implements OnInit {

  usuario: CambiarPasswordDto;

  oldPassword: string;
  newPassword: string;

  hide: boolean;

  
  constructor(
    private authService: AuthService,
    private toastrService: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }
  
  onChangePassword(): void {
    this.usuario = new CambiarPasswordDto(this.oldPassword, this.newPassword)
    this.authService.cambiarPassword(this.usuario).subscribe(
      (data) => {
        this.toastrService.success(data.message, 'Ok', {
          timeOut: 3000,
          positionClass: 'toast-top-center',
        });
        this.router.navigate(['/']);
      },
      (err) => {
        this.toastrService.error(err.error.message, 'Error', {
          timeOut: 3000,
          positionClass: 'toast-top-center',
        });
      }
    );
  }

  mostrarPassword() {
    var tipo = document.getElementById('newPassword') as HTMLInputElement
  
    if(tipo.type == 'password'){
      tipo.type = 'text';
      return this.hide = true
    } else {
      tipo.type = 'password'
      return this.hide = false
    }


    
  }


}
