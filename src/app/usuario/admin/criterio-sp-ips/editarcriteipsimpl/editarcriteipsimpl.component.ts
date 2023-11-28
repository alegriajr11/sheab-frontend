import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ImplementacionDto } from 'src/app/models/SpIps/criterioImplementacion.dto';
import { ImplementacionService } from 'src/app/services/SpIps/implementacion.service';

@Component({
  selector: 'app-editarcriteipsimpl',
  templateUrl: './editarcriteipsimpl.component.html',
  styleUrls: ['./editarcriteipsimpl.component.css']
})
export class EditarcriteipsimplComponent implements OnInit {

  criterioImple: ImplementacionDto = null

  constructor(
    private implementacionService: ImplementacionService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    this.implementacionService.detail(id)
      .subscribe(
        data => {
          this.criterioImple = data;
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
    this.implementacionService.update(id, this.criterioImple).subscribe(
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
