import { AppComponent } from 'src/app/app.component';
import { UserService } from 'src/environments/api/user.service';
import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { LoadingService } from 'src/environments/utilidades/loading-service.service';
import { LogicaService } from 'src/environments/api/logica.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
  standalone: false
})
export class InicioPage {
  slideOpts = {
    initialSlide: 0,
    speed: 400,
    loop: true,
    autoplay: {
      delay: 3000,
    }
  };
banners: { imagen: string | null }[] = [];
  disponible = 0;
  texto = '';
  constructor(private logica: LogicaService, public app: AppComponent, private user: UserService, public loadingCtrl: LoadingService, private platform: Platform, private router: Router) {

  }
  formatonumero(number) {
    const exp = /(\d)(?=(\d{3})+(?!\d))/g;
    const rep = '$1,';
    return number.toString().replace(exp, rep);
  }
  ionViewWillEnter() {
    this.cargarMonedero();
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


  cargarMonedero() {

    this.logica.obtenerBanners().then((data) => {
      this.banners = data["message"];
    })
    this.logica.buscarMonedero().then((data) => {
      if (data['success']) {
        this.loadingCtrl.dismiss();
        if (data["success"]) {
          console.log('data', data)
          this.disponible = this.formatonumero(data["message"].balance);
          this.texto = data["message"].texto;

        }
      } else {
        this.user.logout().then((data) => {
          this.loadingCtrl.dismiss();
        }).catch(e => {
          this.loadingCtrl.dismiss();
          console.log('Error');
        });
      }
    }).catch(e => {
      this.loadingCtrl.dismiss();
      console.log('Error');
    });
  }

  doRefresh(event) {
    setTimeout(() => {
      this.cargarMonedero();
      event.target.complete();
    }, 1000);
  }

  refrescar() {
    this.cargarMonedero();
  }

  movimientos() {
    this.router.navigateByUrl(`${'/movimientos'}`);
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

}
