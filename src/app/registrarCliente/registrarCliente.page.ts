import { AppComponent } from 'src/app/app.component';
import { UserService } from 'src/environments/api/user.service';
import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { LoadingService } from 'src/environments/utilidades/loading-service.service';
import { LogicaService } from 'src/environments/api/logica.service';
import swal from 'sweetalert2';
@Component({
    selector: 'app-registrarCliente',
    templateUrl: './registrarCliente.page.html',
    styleUrls: ['./registrarCliente.page.scss'],
    standalone: false
})
export class RegistrarClientePage {

  nombre   : '';
  telefono : '';
  cedula   : '';
  constructor(private logica: LogicaService,public app: AppComponent, private user: UserService, public loadingCtrl: LoadingService, private platform: Platform, private router: Router) {
  }

  ionViewWillEnter(){

  }

  guardar(){
    /*this.loadingCtrl.present();
    this.logica.registrarCliente(this.nombre,this.telefono,this.cedula).then((data) => {
      this.loadingCtrl.dismiss();
      if(data['success']){
        swal.fire({ heightAuto: false,
          title: "¡Éxito!",
          text: data['message'],
          type: 'success',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Aceptar'
        })
        this.nombre = '';
        this.telefono = '';
        this.cedula = '';
      }else{
        swal.fire({ heightAuto: false,
          title: "Error",
          text: data['message'],
          type: 'error',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Aceptar'
        })
      }



    }).catch(e => {
      this.loadingCtrl.dismiss();
      swal.fire({ heightAuto: false,
        title: "Error",
        text: 'Error al registrar el cliente',
        type: 'error',
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Aceptar'
      })
    });*/
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
