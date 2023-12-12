import { Component, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-modal-cumplimiento-atencion-inmediata',
  templateUrl: './modal-cumplimiento-atencion-inmediata.component.html',
  styleUrls: ['./modal-cumplimiento-atencion-inmediata.component.css']
})
export class ModalCumplimientoAtencionInmediataComponent {

  @Input('dataFromParent') public modalRef: BsModalRef;

}
