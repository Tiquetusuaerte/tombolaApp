import { AppComponent } from 'src/app/app.component';
import { UserService } from 'src/environments/api/user.service';
import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { LoadingService } from 'src/environments/utilidades/loading-service.service';
import { LogicaService } from 'src/environments/api/logica.service';

@Component({
    selector: 'app-usuarios',
    templateUrl: './usuarios.page.html',
    styleUrls: ['./usuarios.page.scss'],
    standalone: false
})
export class UsuariosPage {


  constructor(private logica: LogicaService,public app: AppComponent, private user: UserService, public loadingCtrl: LoadingService, private platform: Platform, private router: Router) {
  }

  ionViewWillEnter(){

  }


  registrarCliente() {
    this.router.navigateByUrl(`${'/registrarCliente'}`);
  }
  misClientes() {
    this.router.navigateByUrl(`${'/misClientes'}`);
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
