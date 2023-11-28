import { Component, OnInit, Type, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginUsuarioDto } from '../models/login-usuario.dto';
import { AuthService } from '../services/auth.service';
import { TokenService } from '../services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: LoginUsuarioDto = null;
  
  usu_nombreUsuario: string;
  usu_password: string;

  hide: boolean;


  constructor(
    private authService: AuthService,
    private tokenService: TokenService,
    private toastrService: ToastrService,
    private router: Router
  ) { }

  usu_passwordType: string = 'password';
  usu_passwordIcon: string = 'eye-off';

  ngOnInit(): void {
    
  }

  onLogin(): void{
    this.usuario = new LoginUsuarioDto(this.usu_nombreUsuario, this.usu_password);
    this.authService.login(this.usuario).subscribe(
      data =>{
        if(!data.token) {
          this.toastrService.error(data.response.message, 'Error', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
        } else {
          this.tokenService.setToken(data.token);
          this.router.navigate(['/']);
        }

      },
      err => {
        this.toastrService.error(err.error.message, 'Error', {
        timeOut: 3000,  positionClass: 'toast-top-center',
      });
  }
    );
}

hideShowPassword() {
  this.usu_passwordType = this.usu_passwordType === 'text' ? 'password' : 'text';
  this.usu_passwordIcon = this.usu_passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
}

mostrarPassword() {
  var tipo = document.getElementById('usu_password') as HTMLInputElement

  if(tipo.type == 'password'){
    tipo.type = 'text';
    return this.hide = true
  } else {
    tipo.type = 'password'
    return this.hide = false
  }
}


}
