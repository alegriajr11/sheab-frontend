import { Component, OnInit } from '@angular/core';
import { CriterioIndDto } from 'src/app/models/SpInd/criterioind.dto';
import { EtapaDto } from 'src/app/models/SpInd/etapa.dto';
import { CriterioIndService } from 'src/app/services/SpInd/criterio.service';
import { EtapaService } from 'src/app/services/SpInd/etapa.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-criterio-sp-ind',
  templateUrl: './criterio-sp-ind.component.html',
  styleUrls: ['./criterio-sp-ind.component.css']
})
export class CriterioSpIndComponent implements OnInit {

  etapas: EtapaDto[];
  criterioInd: CriterioIndDto[]
  controlCriterio = false;

  listaVacia: any = undefined;

  constructor(
    private etapaService: EtapaService,
    private critetioindService: CriterioIndService
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

  cargarCriterios(): void{
    var id = (document.getElementById('eta_id')) as HTMLSelectElement
    var sel = id.selectedIndex;
    var opt = id.options[sel]
    var ValorEta = (<HTMLSelectElement><unknown>opt).value;
    this.critetioindService.listaAct(ValorEta).subscribe(
      data => {
        this.criterioInd = data;
        this.listaVacia = undefined
      },
      err => {
        this.listaVacia = err.error.message;
      }
    )
    this.controlCriterio = true;
  }

  llenarSpan(): void{
    var id = (document.getElementById('eta_id')) as HTMLSelectElement
    var sel = id.selectedIndex;
    var opt = id.options[sel]
    var ValorEta = (<HTMLSelectElement><unknown>opt).value;


    this.etapaService.listEtaOne(ValorEta).subscribe(
      data => {
        for(const etaps of this.etapas){
          if(etaps.eta_id.toString() === ValorEta){
            var ite_nombre = (document.getElementById('ite_nombre')) as HTMLSpanElement
            ite_nombre.textContent = etaps.eta_nombre
          }
        }
      }
    )
  }

  borrar(id: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No hay vuelta atrás',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        this.critetioindService.delete(id).subscribe(res => this.cargarCriterios());
        Swal.fire(
          'OK',
          'Criterio Eliminado',
          'success'
        );
        // For more information about handling dismissals please visit
        // https://sweetalert2.github.io/#handling-dismissals
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelado',
          'Criterio a salvo',
          'error'
        );
      }
    });
  }

  obtenerNombreItem(): void{
    var original = document.getElementById("ite_nombre");
    sessionStorage.setItem("idnombre", original.textContent);

  }

}
