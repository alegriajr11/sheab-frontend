import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import SignaturePad from 'signature_pad';
import { SharedServiceService } from 'src/app/services/shared-service.service';

@Component({
  selector: 'app-modal-firma-rol',
  templateUrl: './modal-firma-rol.component.html',
  styleUrls: ['./modal-firma-rol.component.css']
})
export class ModalFirmaRolComponent {

  @ViewChild('signatureCanvas', { static: true }) signatureCanvas: ElementRef<HTMLCanvasElement>;
  signaturePad: SignaturePad;

  firma: string;

  firmaImagenHabilitada = false;

  imagenCargada = false;



  @Input('dataFromParent') public modalRef: BsModalRef;



  constructor(
    public sharedService: SharedServiceService,
    private toastrService: ToastrService
  ) { }

  ngAfterViewInit() {
    // Configura el objeto SignaturePad en el canvas
    this.signaturePad = new SignaturePad(this.signatureCanvas.nativeElement);

    // Establece el grosor del trazo (puedes ajustar el valor según tus necesidades)
    const grosorTrazo = 0.1;

    // Configura el grosor del trazo en el contexto del canvas
    this.signaturePad = new SignaturePad(this.signatureCanvas.nativeElement, {
      minWidth: grosorTrazo,
      maxWidth: grosorTrazo
    });
  }


  ngOnInit() {
  }

  toggleFirma() {
    this.firmaImagenHabilitada = !this.firmaImagenHabilitada;
    if (this.firmaImagenHabilitada) {
      this.signaturePad.clear();
    } else {
      this.imagenCargada = false;
    }
  }


  clearSignature() {
    // Limpia la firma en el canvas
    this.signaturePad.clear();
  }

  capturarFirma() {
    if (this.signaturePad.isEmpty()) {
      this.toastrService.error('Debe Hacer una firma', 'Error', {
        timeOut: 3000,
        positionClass: 'toast-top-center',
      });
    } else {
      const firmaDataURL = this.signatureCanvas.nativeElement.toDataURL();
      this.firma = firmaDataURL;
      this.sharedService.setFirmaUsuario(this.firma);

      this.toastrService.success('Firma Agregada Exitosamente', 'Éxito', {
        timeOut: 3000,
        positionClass: 'toast-top-center',
      });
      this.modalRef?.hide();
    }
  }


  cargarImagen(event: any) {
    const imagen = event.target.files[0];

    if (imagen) {
      // Verificar el tamaño de la imagen (20KB = 500 * 1024 bytes)
      if (imagen.size <= 20 * 1024) {
        const labelElement = document.querySelector('.custom-file-label');
        if (labelElement) {
          labelElement.textContent = imagen.name;
        }
        // Leer la imagen como base64
        const reader = new FileReader();
        reader.onload = (e: any) => {
          // El resultado de la lectura es la imagen en base64
          const imagenBase64 = e.target.result;
          this.imagenCargada = true;
          this.firma = imagenBase64
          this.sharedService.setFirmaUsuario(this.firma);
        };
        reader.readAsDataURL(imagen);
      } else {
        // Mostrar mensaje de notificación
        this.imagenCargada = false;
        this.toastrService.error('La imagen es demasiado grande. Debe ser menor o igual a 20KB.', 'Error', {
          timeOut: 3000,
          positionClass: 'toast-top-center',
        });
        event.target.value = '';
      }
    }
  }


  mostrarToastr() {
    this.toastrService.success('Firma cargada exitosamente', 'Éxito', {
      timeOut: 3000,
      positionClass: 'toast-top-center',
    });
    this.modalRef?.hide();
  }

}
