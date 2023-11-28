import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CriterioSic } from 'src/app/models/Sic/criterio.dto';
import { Indicador } from 'src/app/models/Sic/indicador.dto';
import { Dominio } from 'src/app/models/Sic/sic.dto';
import { CriterioSicService } from 'src/app/services/Sic/criterio.service';
import { DominioService } from 'src/app/services/Sic/dominio.service';
import { IndicadorService } from 'src/app/services/Sic/indicador.service';
import { CriterioIndService } from 'src/app/services/SpInd/criterio.service';

@Component({
  selector: 'app-agregarcrisic',
  templateUrl: './agregarcrisic.component.html',
  styleUrls: ['./agregarcrisic.component.css']
})
export class AgregarcrisicComponent implements OnInit {


  criterioSic: CriterioSic = null

  cri_nombre: string;

  listaVacia: any = undefined;

  constructor(
    private toastrService: ToastrService,
    private router: Router,
    private criterioSicService: CriterioSicService
  ) { }

  ngOnInit(): void {

  }


  onRegister(): void {
    this.criterioSic = new CriterioSic(
      this.cri_nombre
    );
    this.criterioSicService.crearCriSic(this.criterioSic).subscribe(
      (data) => {
        this.toastrService.success(data.message , 'Ok', {
          timeOut: 3000,
          positionClass: 'toast-top-center',
        });
        this.router.navigate(['/criteriosic']);
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
