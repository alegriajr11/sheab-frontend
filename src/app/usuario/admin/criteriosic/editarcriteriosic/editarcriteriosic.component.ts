import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CriterioSic } from 'src/app/models/Sic/criterio.dto';
import { CriterioSicService } from 'src/app/services/Sic/criterio.service';

@Component({
  selector: 'app-editarcriteriosic',
  templateUrl: './editarcriteriosic.component.html',
  styleUrls: ['./editarcriteriosic.component.css']
})
export class EditarcriteriosicComponent {


  criterioSic: CriterioSic = null

  constructor(
    private criterioSicService: CriterioSicService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    this.criterioSicService.detail(id).subscribe(
      data => {
        this.criterioSic = data;
      },
      err => {
        this.toastr.error(err.error.message, 'Fail', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
        this.router.navigate(['/criteriosic']);
      }
    );

  }
  

  onUpdate(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    this.criterioSicService.update(id, this.criterioSic).subscribe(
      data => {
        this.toastr.success(data.message, 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.router.navigate(['/criteriosic']);
      },
      err => {
        this.toastr.error(err.error.message, 'Fail', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
      }
    );
  }
}
