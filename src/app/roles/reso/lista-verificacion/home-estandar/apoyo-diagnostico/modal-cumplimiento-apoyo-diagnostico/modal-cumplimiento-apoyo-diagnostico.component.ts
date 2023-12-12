import { Component, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-modal-cumplimiento-apoyo-diagnostico',
  templateUrl: './modal-cumplimiento-apoyo-diagnostico.component.html',
  styleUrls: ['./modal-cumplimiento-apoyo-diagnostico.component.css']
})
export class ModalCumplimientoApoyoDiagnosticoComponent {

  @Input('dataFromParent') public modalRef: BsModalRef;

}
