import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AjusteDto } from 'src/app/models/SpIps/criterioAjuste.dto';
import { AjusteService } from 'src/app/services/SpIps/ajuste.service';

@Component({
  selector: 'app-editarcriteips',
  templateUrl: './editarcriteips.component.html',
  styleUrls: ['./editarcriteips.component.css']
})
export class EditarcriteipsComponent implements OnInit {

  criterioAjus: AjusteDto = null

  constructor(
    private ajusteService: AjusteService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    this.ajusteService.detail(id)
      .subscribe(
        data => {
          this.criterioAjus = data;
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
    this.ajusteService.update(id, this.criterioAjus).subscribe(
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
    var idnombreajus = sessionStorage.getItem("idnombreajus");
    copy.textContent = " " + idnombreajus + "." 
  }

  capturarNombreEva(): void{
    var copy = document.getElementById("eva-nombre");
    var idnombreeva = sessionStorage.getItem("idnombreeva");
    copy.textContent = " " + idnombreeva + "." 
  }

}
