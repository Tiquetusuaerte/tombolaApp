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
    selector: 'app-perfil',
    templateUrl: './perfil.page.html',
    styleUrls: ['./perfil.page.scss'],
    standalone: false
})
export class PerfilPage  {
  perfil : any;
  nickname : '';
  contrasena : '';

  constructor(public app: AppComponent, private platform: Platform, private user: UserService,public modalController: ModalController, public loadingCtrl: LoadingService, private router: Router, private logica: LogicaService) { }

  ionViewWillEnter(){
      
  }
  editarPerfil(){
    this.loadingCtrl.present();
    this.logica.editarPerfil( this.contrasena).then((data) => {
      swal.fire({ heightAuto: false,
        title: "¡Éxito!",
        text: 'Contraseña guardada.',
        type: 'success',
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Aceptar'
      }).then((result) => {
        this.loadingCtrl.dismiss();
        //this.cargarPerfil();
      })
      ///this.cargarPerfil();
    }).catch(e => {
      this.loadingCtrl.dismiss();
    });
  }
  cargarPerfil(){
     /*this.logica.perfil().then((data) => {
       if (data['success']) {
        this.loadingCtrl.dismiss();
       // this.nickname = data["message"].nickname;
       }
     }).catch(e => {
       this.loadingCtrl.dismiss();
     });*/
    }

  apostar() {
    this.router.navigateByUrl(`${'/apostar'}`);
  }
  movimientos() {
    this.router.navigateByUrl(`${'/movimientos'}`);
  }
  inicio() {
    this.router.navigateByUrl(`${'/inicio'}`);
  }
}
