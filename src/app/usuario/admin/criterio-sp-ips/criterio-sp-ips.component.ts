import { Component, OnInit } from '@angular/core';
import { AjusteDto } from 'src/app/models/SpIps/criterioAjuste.dto';
import { ImplementacionDto } from 'src/app/models/SpIps/criterioImplementacion.dto';
import { PlaneacionDto } from 'src/app/models/SpIps/criterioPlaneacion.dto';
import { VerificacionDto } from 'src/app/models/SpIps/criterioVerificacion.dto';
import { EvaluacionIpsDto } from 'src/app/models/SpIps/evaluacion.dto';
import { Item } from 'src/app/models/SpIps/item.dto';
import { AjusteService } from 'src/app/services/SpIps/ajuste.service';
import { EvaluacionipsService } from 'src/app/services/SpIps/evaluacionips.service';
import { ImplementacionService } from 'src/app/services/SpIps/implementacion.service';
import { ItemipsService } from 'src/app/services/SpIps/itemips.service';
import { PlaneacionService } from 'src/app/services/SpIps/planeacion.service';
import { VerificacionService } from 'src/app/services/SpIps/verificacion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-criterio-sp-ips',
  templateUrl: './criterio-sp-ips.component.html',
  styleUrls: ['./criterio-sp-ips.component.css']
})
export class CriterioSpIpsComponent implements OnInit {

  evaluacion: EvaluacionIpsDto[];
  item: Item[];
  criteriosPlaneacion: PlaneacionDto[];
  criteriosVerificacion: VerificacionDto[];
  criteriosImplementacion: ImplementacionDto[];
  criteriosAjuste: AjusteDto[];

  controlCriterio = false;

  listaVacia: any = undefined;

  constructor(
    private evaluacionService: EvaluacionipsService,
    private itemService: ItemipsService,
    private planeacionService: PlaneacionService,
    private implementacionService: ImplementacionService,
    private ajusteService: AjusteService,
    private verificacionService: VerificacionService,
  ) { }

  ngOnInit(): void {
    this.cargarEvaluacion();

  }

  cargarEvaluacion(): void {
    this.evaluacionService.lista().subscribe(
      data => {
        this.evaluacion = data;
        this.listaVacia = undefined;
      },
      err => {
        this.listaVacia = err.error.message;
      }
    )
  }

  cargarItems(): void {
    this.itemService.lista().subscribe(
      data => {
        this.item = data;
        this.listaVacia = undefined;
      },
      err => {
        this.listaVacia = err.error.message;
      }
    )

    this.controlCriterio = false;
    this.criteriosPlaneacion = [];
    this.criteriosImplementacion = [];
    this.criteriosAjuste = [];
    this.criteriosVerificacion = [];

    var eva_nombre = (document.getElementById('eva_nombre')) as HTMLSpanElement
    eva_nombre.textContent = null;

    var item_nombre = (document.getElementById('item_nombre')) as HTMLSpanElement
    item_nombre.textContent = null;

  }

  cargarCriterios(): void {
    var id = (document.getElementById('eva_id')) as HTMLSelectElement
    var sel = id.selectedIndex;
    var opt = id.options[sel]
    var ValorEva = (<HTMLSelectElement><unknown>opt).value;
    var idEvaluacion = parseInt(ValorEva, 10);

    var id = (document.getElementById('item_id')) as HTMLSelectElement
    var sel = id.selectedIndex;
    var opt = id.options[sel]
    var ValorItem = (<HTMLSelectElement><unknown>opt).value;


    if (ValorItem === '1') {
      this.planeacionService.listaPlaneacion(idEvaluacion).subscribe(
        data => {
          this.criteriosPlaneacion = data;
          this.listaVacia = undefined;
        },
        err => {
          this.listaVacia = err.error.message;
        }
      )
      this.criteriosImplementacion = []
      this.criteriosAjuste = []
      this.criteriosVerificacion = []
    }

    if (ValorItem === '2') {
      this.implementacionService.listaImpl(idEvaluacion).subscribe(
        data => {
          this.criteriosImplementacion = data;
          this.listaVacia = undefined;
        },
        err => {
          this.listaVacia = err.error.message;
        }
      )
      this.criteriosPlaneacion = []
      this.criteriosAjuste = []
      this.criteriosVerificacion = []
    }

    if (ValorItem === '3') {
      this.verificacionService.listaVerf(idEvaluacion).subscribe(
        data => {
          this.criteriosVerificacion = data;
          this.listaVacia = undefined;
        },
        err => {
          this.listaVacia = err.error.message;
        }
      )
      this.criteriosImplementacion = []
      this.criteriosPlaneacion = []
      this.criteriosAjuste = []
    }

    if (ValorItem === '4') {
      this.ajusteService.listaAjuste(idEvaluacion).subscribe(
        data => {
          this.criteriosAjuste = data;
          this.listaVacia = undefined;
        },
        err => {
          this.listaVacia = err.error.message;
        }
      )
      this.criteriosImplementacion = []
      this.criteriosVerificacion = []
      this.criteriosPlaneacion = []
    }

    this.controlCriterio = true;
  }


  llenarSpan(): void {
    var id = (document.getElementById('eva_id')) as HTMLSelectElement
    var sel = id.selectedIndex;
    var opt = id.options[sel]
    var ValorEva = (<HTMLSelectElement><unknown>opt).value;
    // Convertir ValorEva a un número entero
    var ValorEvaNumero = parseInt(ValorEva, 10); // El segundo argumento es la base (10 para base decimal)


    var id = (document.getElementById('item_id')) as HTMLSelectElement
    var sel = id.selectedIndex;
    var opt = id.options[sel]
    var ValorItem = (<HTMLSelectElement><unknown>opt).value;

    this.evaluacionService.listOne(ValorEvaNumero).subscribe(
      data => {
        for (const evas of this.evaluacion) {
          if (evas.evips_id.toString() === ValorEva) {
            var eva_nombre = (document.getElementById('eva_nombre')) as HTMLSpanElement
            eva_nombre.textContent = evas.evips_nombre
          }
        }
      }
    )

    this.itemService.listaOne(ValorItem).subscribe(
      data => {
        for (const items of this.item) {
          if (items.ite_id.toString() === ValorItem) {
            var item_nombre = (document.getElementById('item_nombre')) as HTMLSpanElement
            item_nombre.textContent = items.ite_nombre
          }
        }
      }
    )

  }

  borrarVerificacion(id: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No hay vuelta atrás',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        this.verificacionService.delete(id).subscribe(res => this.cargarCriterios());
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


  borrarPlaneacion(id: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No hay vuelta atrás',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        this.planeacionService.delete(id).subscribe(res => this.cargarCriterios());
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

  borrarImplementacion(id: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No hay vuelta atrás',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        this.implementacionService.delete(id).subscribe(res => this.cargarCriterios());
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

  borrarAjuste(id: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No hay vuelta atrás',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        this.ajusteService.delete(id).subscribe(res => this.cargarCriterios());
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

  obtenerNombreItem(): void {
    var original = document.getElementById("item_nombre");
    sessionStorage.setItem("idnombreitem", original.textContent);
  }

  obtenerNombreEvaluacion(): void {
    var original = document.getElementById("eva_nombre");
    sessionStorage.setItem("idnombreeva", original.textContent);
  }

}
