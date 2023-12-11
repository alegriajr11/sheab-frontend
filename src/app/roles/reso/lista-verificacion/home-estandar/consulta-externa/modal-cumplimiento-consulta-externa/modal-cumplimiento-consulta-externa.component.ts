import { Component, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-modal-cumplimiento-consulta-externa',
  templateUrl: './modal-cumplimiento-consulta-externa.component.html',
  styleUrls: ['./modal-cumplimiento-consulta-externa.component.css']
})
export class ModalCumplimientoConsultaExternaComponent {


  @Input('dataFromParent') public modalRef: BsModalRef;
}
