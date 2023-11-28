import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Actividad } from 'src/app/models/Pamec/actividad.dto';
import { CriterioPam } from 'src/app/models/Pamec/criteriopam.dto';
import { ActividadService } from 'src/app/services/Pamec/actividad.service';
import { CriteriopamService } from 'src/app/services/Pamec/criteriopam.service';

@Component({
  selector: 'app-agregarcripam',
  templateUrl: './agregarcripam.component.html',
  styleUrls: ['./agregarcripam.component.css']
})
export class AgregarcripamComponent implements OnInit {

  actividad: Actividad[];
  criteriopam: CriterioPam[];
  newCriteriopam: CriterioPam = null

  crip_nombre: string;
  crip_desarrollo_etapas: string
  crip_actividad:number;

  listaVacia: any = undefined;

  constructor(
    private actividadService: ActividadService,
    private criteriopamService: CriteriopamService,
    private toastrService: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cargarActividad();
  }

  cargarActividad(): void{
    this.actividadService.lista().subscribe(
      data => {
        this.actividad = data;
        this.listaVacia = undefined;
      },
      err => {
        this.listaVacia = err.error.message;
      }
    )
  }

  llenarSpan(): void{
    var id = (document.getElementById('act_id')) as HTMLSelectElement
    var sel = id.selectedIndex;
    var opt = id.options[sel]
    var ValorAct = (<HTMLSelectElement><unknown>opt).value;


    this.actividadService.listByAct(ValorAct).subscribe(
      data => {
        for(const acts of this.actividad){
          if(acts.act_id.toString() === ValorAct){
            var act_nombre = (document.getElementById('act_nombre')) as HTMLSpanElement
            act_nombre.textContent = acts.act_nombre
          }
        }
      }
    )
  }

  onRegister(): void {
    var id = (document.getElementById('act_id')) as HTMLSelectElement
    var sel = id.selectedIndex;
    var opt = id.options[sel]
    var ValorAct = (<HTMLSelectElement><unknown>opt).value;
    
    this.newCriteriopam = new CriterioPam(
      this.crip_nombre,
      this.crip_desarrollo_etapas
    );
    this.criteriopamService.save(ValorAct,this.newCriteriopam).subscribe(
      (data) => {
        this.toastrService.success(data.message, 'Ok', {
          timeOut: 3000,
          positionClass: 'toast-top-center',
        });
        this.router.navigate(['/criteriopam']);
      },
      (err) => {
        if(err.status === 404){
          this.toastrService.error('Debe Seleccionar la Actividad', 'Error', {
            timeOut: 3000,
            positionClass: 'toast-top-center',
          });
        }
        
      }
    );
  }

}
