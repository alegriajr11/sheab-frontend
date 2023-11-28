import { Component, AfterViewInit, Output, EventEmitter } from '@angular/core';

declare var tinymce: any;

@Component({
  selector: 'app-rich-text-editor',
  templateUrl: './rich-text-editor.component.html',
  styleUrls: ['./rich-text-editor.component.css']
})
export class RichTextEditorComponent implements AfterViewInit {
  @Output() contentChange = new EventEmitter<string>();

  ngAfterViewInit(): void {
    const script = document.createElement('script');
    script.src = 'https://cdn.tiny.cloud/1/e8fy8lo8wushv0g1mhfunwtxlwbngb5y7v1i7xtyf30f882v/tinymce/5/tinymce.min.js';
    script.referrerPolicy = 'origin';

    script.onload = () => {
      tinymce.init({
        selector: 'textarea',
        plugins: ['lists', 'link', 'paste'],
        toolbar: 'bold italic underline | numlist bullist | alignleft aligncenter alignright',
        menubar: false
      });

      // Agrega un oyente de cambios en el contenido del editor
      tinymce.activeEditor.on('input', () => {
        const content = tinymce.activeEditor.getContent();
        this.contentChange.emit(content); // Emite el contenido actualizado
      });
    };

    document.body.appendChild(script);
  }
}
