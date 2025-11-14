import { AppComponent } from 'src/app/app.component';
import { UserService } from 'src/environments/api/user.service';
import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingService } from 'src/environments/utilidades/loading-service.service';
import { LogicaService } from 'src/environments/api/logica.service';
import swal from 'sweetalert2';
import { AlertController } from '@ionic/angular';
import { ChangeDetectorRef } from '@angular/core';


@Component({
    selector: 'app-configurarLista',
    templateUrl: './configurarLista.page.html',
    styleUrls: ['./configurarLista.page.scss'],
    standalone: false
})
export class ConfigurarListaPage {
  idLista = '';
  numerosLista = [];
  numeros = [];
  sum = 0;
  respuestaNum = false;
  montospPais = '';
  montos = [];

  constructor(private changeRef: ChangeDetectorRef, public alertController: AlertController, private logica: LogicaService, public app: AppComponent, private user: UserService, public loadingCtrl: LoadingService, private platform: Platform, private route: ActivatedRoute, private router: Router) {
  }
  montosPais() {
    this.logica.montosPais('').then((data) => {
      if (data["success"]) {
        this.montospPais = data["message"].montos;
        //this.montos = this.montospPais.split(";");
        this.montos = this.montospPais.split(";").map(m => Number(m))
      }
    }).catch(e => {
      this.loadingCtrl.dismiss();
    });
  }
  ionViewWillEnter() {
    this.route.queryParams.subscribe(params => {
      this.idLista = params.idLista.replace('"', "");
      this.idLista = this.idLista.replace('"', "");
      this.obtenerNumerosLista();
      this.montosPais();
    });
  }

  agregarNumero(numero, monto) {
    this.respuestaNum = this.buscarNumeroRepetido(numero);
    if (this.respuestaNum) {
      this.numerosLista.push([numero, monto.detail.value]);
    } else {
      var registro = this.numerosLista.filter(x => x[0] === numero);
      this.eliminarNumero(numero);
      this.numerosLista.push([numero, monto.detail.value]);
    }

    this.sumar();
  }

  buscarNumeroRepetido(numero) {
    if (this.numerosLista.filter(x => x[0] === numero).length == 0) {
      return true;
    } else {
      return false;
    }
    this.changeRef.detectChanges();
  }
  sumar() {
    this.sum = 0;
    for (var i = 0; i < this.numeros.length; i++) {
      this.sum = this.sum + Number(this.numeros[i].monto)
    }
  }
  obtenerNumerosLista() {
    this.logica.obtenerNumerosLista(this.idLista).then((data) => {
      if (data['success']) {
        this.loadingCtrl.dismiss();
        //this.numeros = data['message'];
        this.numeros = data['message'].map(item => ({
          ...item,
          monto: Number(item.monto) // fuerza número
        }));
        this.sumar();
      }
    }).catch(e => {
      console.log(e);
      this.loadingCtrl.dismiss();
      console.log('Error');
    });
  }

  guardar() {
    this.loadingCtrl.present();
    this.logica.guardarConfiguracionLista(this.numerosLista, this.idLista).then((data) => {
      if (data['success']) {
        this.loadingCtrl.dismiss();
        swal.fire({
          title: "",
          heightAuto: false,
          text: "Se guardo la lista correctamente.",
          confirmButtonText: 'Ok'
        });
        this.obtenerNumerosLista();
        this.router.navigateByUrl(`${'/cccc'}`);
      }
    }).catch(e => {
      swal.fire({
        title: "",
        heightAuto: false,
        text: "Error al guardar la lista.",
        confirmButtonText: 'Ok'
      })
      this.loadingCtrl.dismiss();
      console.log('Error');
    });
    this.changeRef.detectChanges();
  }

  eliminarNumero(numero) {
    this.loadingCtrl.present();
    for (var i = 0; i < this.numerosLista.length; i++) {
      if (this.numerosLista[i][0] == numero) {
        this.numerosLista.splice(i, 1);
      }
    }
    this.sumar();
    this.loadingCtrl.dismiss();
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
