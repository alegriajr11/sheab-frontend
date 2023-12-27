import { Component, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-modal-cumplimiento-quirurgico',
  templateUrl: './modal-cumplimiento-quirurgico.component.html',
  styleUrls: ['./modal-cumplimiento-quirurgico.component.css']
})
export class ModalCumplimientoQuirurgicoComponent {

  @Input('dataFromParent') public modalRef: BsModalRef;
}
