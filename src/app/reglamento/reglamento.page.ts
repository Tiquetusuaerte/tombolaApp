import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingService } from 'src/environments/utilidades/loading-service.service';
import { ModalController } from '@ionic/angular';
import { LogicaService } from 'src/environments/api/logica.service';
import { AppComponent } from 'src/app/app.component';
import { UserService } from 'src/environments/api/user.service';
import { Platform } from '@ionic/angular';
import swal from 'sweetalert2';

@Component({
    selector: 'app-reglamento',
    templateUrl: './reglamento.page.html',
    styleUrls: ['./reglamento.page.scss'],
    standalone: false
})
export class ReglamentoPage {

  reglamento: string;

  constructor(public app: AppComponent, private platform: Platform, private user: UserService, public modalController: ModalController, public loadingCtrl: LoadingService, private router: Router, private logica: LogicaService) { }

  ionViewWillEnter() {
    this.loadingCtrl.present();
    this.buscarReglamento();
  }
  buscarReglamento() {
    const data = window.localStorage.getItem('politicas');
    this.reglamento = data;
    this.loadingCtrl.dismiss();
  }
  movimientos() {
    this.router.navigateByUrl(`${'/movimientos'}`);
  }
  apostar() {
    this.router.navigateByUrl(`${'/apostar'}`);
  }
  inicio() {
    this.router.navigateByUrl(`${'/inicio'}`);
  }


}
