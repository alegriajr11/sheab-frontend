import { Component, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-modal-informe-resolucion',
  templateUrl: './modal-informe-resolucion.component.html',
  styleUrls: ['./modal-informe-resolucion.component.css']
})
export class ModalInformeResolucionComponent {

  @Input('dataFromParent') public modalRef: BsModalRef;

}
