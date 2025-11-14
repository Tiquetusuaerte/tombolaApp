import { Component, HostListener, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert2';

import { environment } from '../../environments/environment';
import { UserService } from '../../environments/api/user.service';
import { LogicaService } from '../../environments/api/logica.service';
import { LoadingService } from '../../environments/utilidades/loading-service.service';

type PaisesResponse = {
  success: boolean;
  message: any[];
};

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false
})
export class LoginPage implements OnInit {
  deferredPrompt: any;
  showInstallButton = false;

  public mostrarBotonInstalar = false;
  token = '';
  env = environment;
  isLoading = false;
  nickname = '';
  pais = '';
  password = '';
  username = '';
  tamano = 0;
  charcoal = 'red';
  paises = [];

  constructor(

    private user: UserService,
    private logica: LogicaService,
    public loadingCtrl: LoadingService,
    private route: ActivatedRoute,
    public platform: Platform,
    private router: Router
  ) {
    this.platform.ready().then(() => {
      this.cargarPaises();

      const width = this.platform.width();
      const height = this.platform.height();
      console.log(`Width: ${width}, Height: ${height}`);

      this.tamano = width > 1024 ? width / 2 : width;
    });
  }



  checkPlatform() {
    window.addEventListener('beforeinstallprompt', (e) => {
      console.log('beforeinstallprompt fired', e);

      e.preventDefault();
      this.deferredPrompt = e;

      if (this.isInBrowser() && this.canInstallPWA()) {
        this.showInstallButton = true;
      }
    });
  }

  // Detecta si está en navegador (no app nativa)
  isInBrowser(): boolean {
    return typeof window !== 'undefined' && !!window;
  }

  // Detecta Android basado en userAgent (más fiable en navegador)
  isAndroid(): boolean {
    return /android/i.test(navigator.userAgent);
  }

  // Detecta si se puede mostrar botón instalar
  canInstallPWA(): boolean {
    // Podés personalizar esta función según lo que quieras soportar
    // Ejemplo: solo Android o Desktop Chrome que soporten PWA

    // Si quieres que sea solo Android
    return this.isAndroid();

    // O para todos los navegadores que soporten beforeinstallprompt, devuelve true:
    // return true;
  }

  // Función para disparar prompt manualmente desde el botón
  async promptInstall() {
    if (!this.deferredPrompt) {
      console.log('No se puede instalar ahora');
      return;
    }
    this.deferredPrompt.prompt();
    const choiceResult = await this.deferredPrompt.userChoice;
    console.log('User choice:', choiceResult.outcome);

    // Limpia el prompt
    this.deferredPrompt = null;
    this.showInstallButton = false;
  }


  installApp() {
    if (this.deferredPrompt) {
      this.deferredPrompt.prompt();

      this.deferredPrompt.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('Usuario aceptó la instalación');
        } else {
          console.log('Usuario canceló la instalación');
        }
        this.deferredPrompt = null;
        this.showInstallButton = false;
      });
    }

  }

  ionViewDidEnter() {
    this.nickname = this.user.getUser();
    this.password = this.user.getPass();
    this.pais = this.user.getPais();

    this.platform.backButton.subscribe(() => {
      navigator['app'].exitApp();
    });
  }

  ionViewWillLeave() {
    this.platform.backButton.unsubscribe();
  }

  ngOnInit() {
    this.checkPlatform();
    this.route.queryParams.subscribe((params) => {
      this.token = JSON.parse(params.id);
    });
  }

  async cargarPaises() {
    try {
      const data = await this.logica.cargarPaises() as PaisesResponse;
      if (data?.success) {
        this.paises = data.message;
      }
    } catch (error) {
      console.error('Error al cargar países:', error);
      this.loadingCtrl.dismiss();
    }
  }

  async loginClick() {
    if (!this.nickname || !this.password || !this.pais) {
      await this.loadingCtrl.dismiss();
      swal.fire({
        title: '¡Autentificación Fallida!',
        text: 'Usuario, contraseña y país son necesarios.',
        type: 'warning',
        confirmButtonColor: '#3085d6',
        heightAuto: false,
      });
      return;
    }

    this.loadingCtrl.present();

    try {
      const data = await this.user.login(this.nickname, this.password, this.token, this.pais);
      this.loadingCtrl.dismiss();

      if (data?.success) {
        const dataPais = this.paises.find((x) => x.idPais === Number(this.pais));
        if (dataPais) {
          localStorage.setItem('politicas', dataPais.politicas);
        }
        this.router.navigateByUrl('/inicio');
      } else {
        swal.fire({
          title: '¡Autentificación Fallida!',
          text: 'Escribir al WhatsApp de servicio al cliente +506 8588 4783.',
          type: 'error',
          confirmButtonColor: '#3085d6',
          heightAuto: false,
        });
      }
    } catch (error) {
      this.loadingCtrl.dismiss();
      console.error('Error en login:', error);
    }
  }

  installPWA() {
    if (this.platform.is('desktop') || this.platform.is('mobileweb')) {
      if (this.deferredPrompt) {
        this.deferredPrompt.prompt();
        this.deferredPrompt.userChoice.then((choiceResult: any) => {
          if (choiceResult.outcome === 'accepted') {
            console.log('El usuario aceptó la instalación');
          } else {
            console.log('El usuario canceló la instalación');
          }
          this.deferredPrompt = null;
        });
      } else {
        console.log('No se puede mostrar el prompt de instalación');
      }
    } else {
      console.log('PWA install no está disponible fuera del navegador');
    }
  }

  registro() {
    this.router.navigateByUrl('/registro');
  }

  recuperarPass() {
    this.router.navigateByUrl('/recuperarPass');
  }

  recuperarClave() {
    this.router.navigateByUrl('/recuperar');
  }
}
