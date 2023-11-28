import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CriterioSicEstandarDto } from 'src/app/models/Sic/criterioSicEstandar.dto';
import { CriterioSicService } from 'src/app/services/Sic/criterio.service';

@Component({
  selector: 'app-agregarcriterioestandar',
  templateUrl: './agregarcriterioestandar.component.html',
  styleUrls: ['./agregarcriterioestandar.component.css']
})
export class AgregarcriterioestandarComponent {

  criterioEstandarSic: CriterioSicEstandarDto = null

  crie_nombre: string;


  constructor(
    private toastrService: ToastrService,
    private router: Router,
    private criterioSicService: CriterioSicService
  ) { }


  onRegister(): void {
    this.criterioEstandarSic = new CriterioSicEstandarDto(
      this.crie_nombre
    );
    this.criterioSicService.crearEstandar(this.criterioEstandarSic).subscribe(
      (data) => {
        this.toastrService.success(data.message , 'Ok', {
          timeOut: 3000,
          positionClass: 'toast-top-center',
        });
        this.router.navigate(['/criteriosic/estandar']);
      },
      (err) => {
        this.toastrService.error(err.error.message, 'Error', {
          timeOut: 3000,
          positionClass: 'toast-top-center',
        });
      }
    );
    
  }
}
