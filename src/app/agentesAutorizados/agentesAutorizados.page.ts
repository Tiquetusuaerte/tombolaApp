import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingService } from 'src/environments/utilidades/loading-service.service';
import { ModalController } from '@ionic/angular';
import { LogicaService } from 'src/environments/api/logica.service';
import { AppComponent } from 'src/app/app.component';
import { UserService } from 'src/environments/api/user.service';
import { Platform } from '@ionic/angular';
import swal from 'sweetalert2';
import { ChangeDetectorRef } from '@angular/core';

@Component({
    selector: 'app-agentesAutorizados',
    templateUrl: './agentesAutorizados.page.html',
    styleUrls: ['./agentesAutorizados.page.scss'],
    standalone: false
})
export class AgentesAutorizadosPage implements OnInit {


  agentes: any = [];


  constructor(private changeRef: ChangeDetectorRef,public app: AppComponent, private platform: Platform, private user: UserService,public modalController: ModalController, public loadingCtrl: LoadingService, private router: Router, private logica: LogicaService) { }

  ionViewWillEnter(){
    this.loadingCtrl.present();
    this.cargaragentes();
  }

  ngOnInit() {

  }
  doRefresh(event) {
    setTimeout(() => {
      this.cargaragentes();
      event.target.complete();
    }, 1000);
  }

  cargaragentes(){
    this.logica.obtenerAgentes().then((data) => {
      if (data['success']) {
       this.agentes = data["message"];
       this.loadingCtrl.dismiss();
      }
    }).catch(e => {
      this.loadingCtrl.dismiss();
      console.log('Error');
    });
  }

  apostar() {
    this.router.navigateByUrl(`${'/apostar'}`);
  }
  inicio() {
    this.router.navigateByUrl(`${'/inicio'}`);
  }
  perfil() {
    this.router.navigateByUrl(`${'/perfil'}`);
  }
  detalleMovimiento() {
    this.router.navigateByUrl(`${'/detalleMovimiento'}`);
  }
  movimientos() {
    this.router.navigateByUrl(`${'/movimientos'}`);
  }





}
