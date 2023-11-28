import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

  var atributo = window.location.hash;

  console.log(atributo);

  const elemento = document.getElementById('log')

  let URLActual = document.body.firstElementChild.children

console.log(URLActual);
  // let URLActual = window.location.href;
  // if(URLActual = "http://localhost:4200/login"){
  //   elemento.classList.add('conimg');
  // }else{
  //   elemento.classList.add('bg');
  // }
  // console.log(URLActual);
