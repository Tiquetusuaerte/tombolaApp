import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

/*
if (environment.production) {
  enableProdMode();
}*/

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
  /*
if (environment.production && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/appReemplazo/ngsw-worker.js')
      .then(registration => {
        console.log('Service Worker registrado correctamente:', registration);
      })
      .catch(error => {
        console.error('Error al registrar el Service Worker:', error);
      });
  });
}*/