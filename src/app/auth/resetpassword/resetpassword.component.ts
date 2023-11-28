import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RestablecerPasswordDto } from 'src/app/models/reset-password.dto';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { SharedServiceService } from 'src/app/services/shared-service.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent {

  usuario: Usuario = null;

  passwordrest: RestablecerPasswordDto

  password: string

  nombreUsuario: string;
  

  constructor(
    private usuarioService: UsuarioService,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService,
    private sharedService: SharedServiceService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.nombreUsuario = localStorage.getItem('nombreUsuario');
    const id = this.activatedRoute.snapshot.queryParams['id'];
    this.usuarioService.oneUser(id).subscribe(
      data => {
        this.usuario = data;
      },
      err => {
        this.toastr.error(err.error.message, 'Fail', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
        this.router.navigate(['/']);
      }
    );
  }


  onResetPassword(): void{
    this.passwordrest = new RestablecerPasswordDto(
      this.usuario.resetPasswordToken,
      this.password
    );
    this.authService.resetPassword(this.passwordrest).subscribe(
      (data) => {
        this.toastrService.success(data.message, 'Ok', {
          timeOut: 3000,
          positionClass: 'toast-top-center',
        });
        this.router.navigate(['/usuarios']);
      },
      (err) => {
        this.toastrService.error(err.error.message, 'Error', {
          timeOut: 3000,
          positionClass: 'toast-top-center',
        });
      }
    );
    this.nombreUsuario = ''
    localStorage.setItem('nombreUsuario', this.nombreUsuario);
  }
}
