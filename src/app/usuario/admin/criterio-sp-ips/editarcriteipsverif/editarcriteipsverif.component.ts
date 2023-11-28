import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { VerificacionDto } from 'src/app/models/SpIps/criterioVerificacion.dto';
import { VerificacionService } from 'src/app/services/SpIps/verificacion.service';

@Component({
  selector: 'app-editarcriteipsverif',
  templateUrl: './editarcriteipsverif.component.html',
  styleUrls: ['./editarcriteipsverif.component.css']
})
export class EditarcriteipsverifComponent implements OnInit {


  criterioVerf: VerificacionDto = null

  constructor(
    private verificacionService: VerificacionService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    this.verificacionService.detail(id)
      .subscribe(
        data => {
          this.criterioVerf = data;
        },
        err => {
          this.toastr.error(err.error.message, 'Fail', {
            timeOut: 3000, positionClass: 'toast-top-center',
          });
          this.router.navigate(['/criterioips']);
        }
      );
      this.capturarNombreItem()
      this.capturarNombreEva()
  }

  onUpdate(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    this.verificacionService.update(id, this.criterioVerf).subscribe(
      data => {
        this.toastr.success(data.message, 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.router.navigate(['/criterioips']);
      },
      err => {
        this.toastr.error(err.error.message, 'Fail', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
      }
    );
  }

  volver(): void {
    this.router.navigate(['/criterioips']);
  }

  capturarNombreItem(): void{
    var copy = document.getElementById("ite-nombre");
    var idnombreajus = sessionStorage.getItem("idnombreitem");
    copy.textContent = " " + idnombreajus + "." 
  }

  capturarNombreEva(): void{
    var copy = document.getElementById("eva-nombre");
    var idnombreeva = sessionStorage.getItem("idnombreeva");
    copy.textContent = " " + idnombreeva + "." 
  }


}
