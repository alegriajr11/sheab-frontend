import { Component, OnInit, TemplateRef } from '@angular/core';
import { PrestadorDto } from '../models/prestador.dto';
import { PrestadorService } from '../services/prestador.service';
import { TokenService } from '../services/token.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { SharedServiceService } from '../services/shared-service.service';

@Component({
  selector: 'app-lista-prestador',
  templateUrl: './lista-prestador.component.html',
  styleUrls: ['./lista-prestador.component.css']
})
export class ListaPrestadorComponent implements OnInit {
  
  prestador: any[] = [];

  listaVacia: any = undefined;

  isAdmin: boolean;

  public page: number;
  searchText: any;

    //MODAL
    public modalRef: BsModalRef;

  constructor(
    private prestadorService: PrestadorService,
    private tokenService: TokenService,
    public sharedService: SharedServiceService,
    private modalService: BsModalService,
  ) { }

  ngOnInit(): void {
  this.cargarPrestadores();
  this.isAdmin = this.tokenService.isAdmin();
  }

  cargarPrestadores(): void {
    this.prestadorService.lista().subscribe(
      data => {
        this.prestador = data;
        this.listaVacia = undefined
      },
      err => {
        this.listaVacia = err.error.message;
      }
    );
  }

  openModal(modalTemplate: TemplateRef<any>, id: string, name: string) {
    this.sharedService.setIdPrestador(id)
    this.sharedService.setNombrePrestador(name)
    this.modalRef = this.modalService.show(modalTemplate,
      {
        class: 'modal-dialogue-centered modal-md',
        backdrop: true,
        keyboard: true
      }
    );
  }


}
