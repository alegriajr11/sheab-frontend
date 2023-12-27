import { Component, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-modal-cumplimiento-internacion',
  templateUrl: './modal-cumplimiento-internacion.component.html',
  styleUrls: ['./modal-cumplimiento-internacion.component.css']
})
export class ModalCumplimientoInternacionComponent {

  @Input('dataFromParent') public modalRef: BsModalRef;
}
