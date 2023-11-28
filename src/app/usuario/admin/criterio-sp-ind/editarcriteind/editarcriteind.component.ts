import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CriterioIndDto } from 'src/app/models/SpInd/criterioind.dto';
import { CriterioIndService } from 'src/app/services/SpInd/criterio.service';

@Component({
  selector: 'app-editarcriteind',
  templateUrl: './editarcriteind.component.html',
  styleUrls: ['./editarcriteind.component.css']
})
export class EditarcriteindComponent implements OnInit {

  criterioInd: CriterioIndDto = null;

  constructor(
    private criterioindService: CriterioIndService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    this.criterioindService.detail(id)
      .subscribe(
        data => {
          this.criterioInd = data;
        },
        err => {
          this.toastr.error(err.error.message, 'Fail', {
            timeOut: 3000, positionClass: 'toast-top-center',
          });
          this.router.navigate(['/']);
        }
      );
      this.capturarNombreItem();
  }

  onUpdate(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    this.criterioindService.update(id, this.criterioInd).subscribe(
      data => {
        this.toastr.success(data.message, 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.router.navigate(['/criterioind']);
      },
      err => {
        this.toastr.error(err.error.message, 'Fail', {
          timeOut: 3000, positionClass: 'toast-top-center',
        });
      }
    );
  }

  capturarNombreItem(): void{
    var copy = document.getElementById("ite-nombre");
    var elementId = sessionStorage.getItem("idnombre");
    copy.textContent = " " + elementId + "." 
  }

}
