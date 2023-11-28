import { Component, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { NuevoUsuarioDto } from 'src/app/models/nuevo-usuario.dto';
import { TokenDto } from 'src/app/models/token.dto';
import { AuthService } from 'src/app/services/auth.service';
import { SharedServiceService } from 'src/app/services/shared-service.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-nuevo-usuario-rol',
  templateUrl: './nuevo-usuario-rol.component.html',
  styleUrls: ['./nuevo-usuario-rol.component.css']
})
export class NuevoUsuarioRolComponent {

  opciones: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];

  usuario: NuevoUsuarioDto = null;

  usu_cedula: string;
  usu_nombre: string;
  usu_apellido: string;
  usu_email: string;
  usu_cargo: string = 'P.A ASEGURAMIENTO Y PRESTACION DE SERVICIOS - SOGCS';
  usu_area_profesional: string;
  usu_nombreUsuario: string;
  usu_password: string;
  usu_firma: string;
  usu_estado: string;

  opcionesSeleccionadas: [] = []
  //MODAL
  public modalRef: BsModalRef;

  constructor(
    private modalService: BsModalService,
    private authService: AuthService,
    private toastrService: ToastrService,
    private tokenService: TokenService,
    private sharedService: SharedServiceService,
    private router: Router
  ) { }

  ngOnInit(): void { }

  //Metodo Abrir Modal
  openModal(modalTemplate: TemplateRef<any>) {
    this.modalRef = this.modalService.show(modalTemplate,
      {
        class: 'modal-dialogue-centered modal-md',
        backdrop: true,
        keyboard: true
      }

    );
  }

  rolesSeleccionados: { [key: string]: number } = {}; // Usamos un objeto para almacenar los IDs de los roles

  toggleRole(rolKey: string, roleId: number): void {
    if (this.rolesSeleccionados[rolKey]) {
      console.log(roleId)
      // Si el checkbox se desmarca, eliminamos el ID del rol
      delete this.rolesSeleccionados[rolKey];
    } else {
      // Si el checkbox se marca, almacenamos el ID del rol
      this.rolesSeleccionados[rolKey] = roleId;
    }
  }


  onRegister(): void {
    this.usu_firma = this.sharedService.getFirmaUsuario();
    this.usuario = new NuevoUsuarioDto(
      this.usu_cedula,
      this.usu_nombre,
      this.usu_apellido,
      this.usu_cargo,
      this.usu_area_profesional,
      this.usu_email,
      this.usu_nombreUsuario,
      this.usu_password,
      this.usu_firma,
      this.usu_estado
    );
    const token = this.tokenService.getToken()
    const tokenDto: TokenDto = new TokenDto(token);

    //Obtener los IDS de los perfiles Seleccionados
    const rolesIds = Object.values(this.rolesSeleccionados);

    if (!this.usu_cedula ||
      !this.usu_nombre ||
      !this.usu_apellido ||
      !this.usu_cargo ||
      !this.usu_area_profesional ||
      !this.usu_email ||
      !this.usu_nombreUsuario ||
      !this.usu_password ||
      !this.usu_estado) {
      this.toastrService.error('Por favor, complete todos los campos', 'Error', {
        timeOut: 3000,
        positionClass: 'toast-top-center',
      })
      this.usu_firma = this.sharedService.getFirmaUsuario();
    } else if (!this.usu_firma) {
      this.toastrService.error('Debe agregar una firma', 'Error', {
        timeOut: 3000,
        positionClass: 'toast-top-center',
      });
      this.usu_firma = this.sharedService.getFirmaUsuario();
    } else if (rolesIds.length === 0) {
      // Validar que al menos un rol esté seleccionado
      this.toastrService.error('Debe seleccionar al menos un Perfil', 'Error', {
        timeOut: 3000,
        positionClass: 'toast-top-center',
      });
      this.usu_firma = this.sharedService.getFirmaUsuario();
    }
    else {

      this.authService.registroUsuarioRol(this.usuario, Object.values(this.rolesSeleccionados), tokenDto).subscribe(
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

      //Reiniciar el valor de la firma y enviarlo al servicio compartido
      this.usu_firma = null
      this.sharedService.setFirmaUsuario(this.usu_firma)
    }

  }
}
