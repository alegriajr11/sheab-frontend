import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PlaneacionDto } from 'src/app/models/SpIps/criterioPlaneacion.dto';
import { PlaneacionService } from 'src/app/services/SpIps/planeacion.service';

@Component({
  selector: 'app-editarcriteipsplan',
  templateUrl: './editarcriteipsplan.component.html',
  styleUrls: ['./editarcriteipsplan.component.css']
})
export class EditarcriteipsplanComponent implements OnInit {
  criterioPla: PlaneacionDto = null

  constructor(
    private planeacionService: PlaneacionService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    this.planeacionService.detail(id)
      .subscribe(
        data => {
          this.criterioPla = data;
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
    this.planeacionService.update(id, this.criterioPla).subscribe(
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
