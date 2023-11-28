import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from '../models/usuario';
import { UsuarioService } from '../services/usuario.service';
import { TokenDto } from '../models/token.dto';
import { TokenService } from '../services/token.service';


@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css']
})
export class EditarUsuarioComponent implements OnInit {

  rolesSeleccionados: { [key: string]: number } = {};
  usuario: Usuario = null;

  isAdmin: boolean

  constructor(
    private usuarioService: UsuarioService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private tokenService: TokenService,
    private toastrService: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.queryParams['id'];
    this.usuarioService.oneUser(id).subscribe(
      data => {
        this.usuario = data;
        if (this.usuario.roles && this.usuario.roles.length > 0) {
          this.usuario.roles.forEach(rol => {
            this.rolesSeleccionados['rol' + rol.rol_id] = rol.rol_id;
          });
        }
        if (this.usuario.roles && this.usuario.roles.length > 0) {
          this.usuario.roles.forEach(rol => {
            if (rol.rol_nombre === 'admin') {
              this.isAdmin = true
            }
          });
        }

      },
      err => {
        this.toastr.error(err.error.message, 'Fail', {
          timeOut: 3000, positionClass: 'toast-top-center',
        });
        this.router.navigate(['/']);
      }
    );
  }

  toggleRole(rolKey: string, roleId: number): void {
    if (this.rolesSeleccionados[rolKey]) {
      // Si el checkbox se desmarca, eliminamos el ID del rol
      delete this.rolesSeleccionados[rolKey];
    } else {
      // Si el checkbox se marca, almacenamos el ID del rol
      this.rolesSeleccionados[rolKey] = roleId;
    }
  }


  //METODO ACTUALIZAR USUARIO
  onUpdate(): void {
    //Por medio de ActivateRoute se atrapa el id del Usuario
    const id = this.activatedRoute.snapshot.queryParams['id'];
    //Construcción del DTO Token
    const token = this.tokenService.getToken();
    const tokenDto: TokenDto = new TokenDto(token);

    //Asignar la variable rolesAsignados
    const rolesAsignados = this.mapRoles();

    if (rolesAsignados.length === 0) {
      this.showRoleSelectionError();
      return;
    }

    this.updateUser(id, rolesAsignados, tokenDto);
  }

  //Mapear y transformar los roles seleccionados
  private mapRoles(): any[] {
    return Object.keys(this.rolesSeleccionados)
      .filter(rolKey => this.rolesSeleccionados[rolKey])
      .map(rolKey => ({
        rol_id: parseInt(rolKey.replace('rol', ''), 10),
        rol_nombre: rolKey
      }));
  }

  //Toastr al menos un slider seleccionado
  private showRoleSelectionError(): void {
    this.toastrService.error('Debe seleccionar al menos un Perfil', 'Error', {
      timeOut: 3000,
      positionClass: 'toast-top-center',
    });
  }

  //Comunicar al serivicio Usuario para que se contacte con la Api y actualice el Usuario
  private updateUser(id: number, rolesAsignados: any[], tokenDto: TokenDto): void {
    this.usuario.roles = rolesAsignados;

    this.usuarioService.update(id, this.usuario, tokenDto).subscribe(
      data => {
        this.handleSuccess(data.message);
      },
      err => {
        this.handleError(err.error.message);
      }
    );
  }

  //Toastr mensaje éxito de usuario actualizado desde la Api
  private handleSuccess(message: string): void {
    this.toastr.success(message, 'OK', {
      timeOut: 3000, positionClass: 'toast-top-center'
    });
    this.router.navigate(['/usuarios']);
  }

  //Manejo de errores en toastr al actualizar un Usuario
  private handleError(errorMessage: string): void {
    this.toastr.error(errorMessage, 'Fail', {
      timeOut: 3000, positionClass: 'toast-top-center',
    });
  }


  volver(): void {
    this.router.navigate(['/usuarios']);
  }

}
