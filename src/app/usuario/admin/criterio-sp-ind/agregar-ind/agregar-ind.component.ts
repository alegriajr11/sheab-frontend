import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CriterioIndDto } from 'src/app/models/SpInd/criterioind.dto';
import { EtapaDto } from 'src/app/models/SpInd/etapa.dto';
import { CriterioIndService } from 'src/app/services/SpInd/criterio.service';
import { EtapaService } from 'src/app/services/SpInd/etapa.service';

@Component({
  selector: 'app-agregar-ind',
  templateUrl: './agregar-ind.component.html',
  styleUrls: ['./agregar-ind.component.css']
})
export class AgregarIndComponent implements OnInit {

  newCriterioind: CriterioIndDto = null

  etapas: EtapaDto[];
  cri_nombre: string
  cri_verificacion: string

  listaVacia: any = undefined;

  constructor(
    private etapaService: EtapaService,
    private criterioindService: CriterioIndService,
    private toastrService: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cargarEtapas();
  }

  cargarEtapas(): void{
    this.etapaService.lista().subscribe(
      data => {
        this.etapas = data;
        this.listaVacia = undefined;
      },
      err => {
        this.listaVacia = err.error.message;
      }
    )
  }

  onRegister(): void {
    var id = (document.getElementById('etapa_id')) as HTMLSelectElement
    var sel = id.selectedIndex;
    var opt = id.options[sel]
    var ValorEta = (<HTMLSelectElement><unknown>opt).value;

    console.log(ValorEta)
    
    this.newCriterioind = new CriterioIndDto(
      this.cri_nombre,
      this.cri_verificacion
    );
    this.criterioindService.save(ValorEta,this.newCriterioind).subscribe(
      (data) => {
        this.toastrService.success(data.message, 'Ok', {
          timeOut: 3000,
          positionClass: 'toast-top-center',
        });
        this.router.navigate(['/criterioind']);
      },
      (err) => {
        if(err.status === 404){
          this.toastrService.error('Debe Seleccionar el Item', 'Error', {
            timeOut: 3000,
            positionClass: 'toast-top-center',
          });
        }
      }
    );
  }

  llenarSpan(): void{
    var id = (document.getElementById('etapa_id')) as HTMLSelectElement
    var sel = id.selectedIndex;
    var opt = id.options[sel]
    var ValorEta = (<HTMLSelectElement><unknown>opt).value;


    this.etapaService.listEtaOne(ValorEta).subscribe(
      data => {
        for(const etaps of this.etapas){
          if(etaps.eta_id.toString() === ValorEta){
            var act_nombre = (document.getElementById('eta_nombre')) as HTMLSpanElement
            act_nombre.textContent = etaps.eta_nombre
          }
        }
      }
    )
  }

}
