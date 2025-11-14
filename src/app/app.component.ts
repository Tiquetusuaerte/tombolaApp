import { Component, HostListener } from '@angular/core';
import { UserService } from 'src/environments/api/user.service';
import { LoadingService } from 'src/environments/utilidades/loading-service.service';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import swal from 'sweetalert2';
import { SwUpdate } from '@angular/service-worker';

import { Platform } from '@ionic/angular';
declare let window: any;
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: false
})



export class AppComponent {
  deferredPrompt: any;
  idRol = 0;
  token = null;
  pushToken = '';
  constructor(
    public loadingCtrl: LoadingService,
    public platform: Platform,
    private user: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.initializeApp();

    // 👉 Verifica si hay nueva versión y recarga automáticamente
    /* if (this.swUpdate.isEnabled) {
       this.swUpdate.versionUpdates.subscribe(() => {
         this.swUpdate.activateUpdate().then(() => document.location.reload());
       });
     }*/
  }
  ngOnInit() {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      this.deferredPrompt = e;
      // Muestra el botón de instalación en tu UI
     // this.showInstallButton = true;
    });
  }


  compartirApp() {
    if (navigator.share) {
      navigator.share({
        title: 'Descubre esta App',
        text: '¡Te recomiendo esta app! Regístrate y obtené un BONO para jugar gratis. ¡No te lo perdás!',
        url: 'https://tique-internacional.com/app/', // Cambia por el link real de tu app
      })
        .then(() => console.log('Contenido compartido'))
        .catch((error) => console.error('Error al compartir:', error));
    } else {
      alert('Tu dispositivo no admite esta función. Intenta copiar el enlace manualmente.');
    }
  }
  setRol(rol) {
    this.idRol = rol;
  }

  initializeApp() {
    if (this.token != null) {
      this.router.navigateByUrl(`${'/inicio'}`);
    } else {
      this.user.setTokenPush(this.pushToken);
      let navigationExtras: NavigationExtras = {
        queryParams: {
          id: JSON.stringify(this.pushToken)
        }
      };
      this.router.navigate(['login'], navigationExtras);
    }
  }

  async showAlert(title, msg, task) {

    swal.fire({
      title: title,
      text: msg,
      imageUrl: task,
      imageWidth: 300,
      imageHeight: 300,
      imageAlt: 'Custom image',
      animation: false
    }).then((result) => {
      if (result.value) {
      }
    })


  }

  tresMonazos() {
    this.router.navigateByUrl(`${'/menuTresMonazos'}`);
  }
  pale() {
    this.router.navigateByUrl(`${'/menuPale'}`);
  }

  close() {
    this.loadingCtrl.present();
    this.user.logout().then((data) => {
      this.loadingCtrl.dismiss();
    }).catch(e => {
      this.loadingCtrl.dismiss();
      console.log('Error');
    });
  }


  inicio() {
    this.router.navigateByUrl(`${'/inicio'}`);
  }
  perfil() {
    this.router.navigateByUrl(`${'/perfil'}`);
  }
  apostar() {
    this.router.navigateByUrl(`${'/apostar'}`);
  }
  movimientos() {
    this.router.navigateByUrl(`${'/movimientos'}`);
  }
  reglamento() {
    this.router.navigateByUrl(`${'/reglamento'}`);
  }
  sorteos() {
    this.router.navigateByUrl(`${'/sorteos'}`);
  }
  usuarios() {
    this.router.navigateByUrl(`${'/usuarios'}`);
  }
  sorteosTombola() {
    this.router.navigateByUrl(`${'/sorteosTombola'}`);
  }
  misListas() {
    this.router.navigateByUrl(`${'/cccc'}`);
  }

  tiqueGol() {
    this.router.navigateByUrl(`${'/tiqueGol'}`);
  }
  agentesAutorizados() {
    this.router.navigateByUrl(`${'/agentesAutorizados'}`);
  }

}
