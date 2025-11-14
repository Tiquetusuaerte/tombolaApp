import { AppComponent } from 'src/app/app.component';
import { UserService } from 'src/environments/api/user.service';
import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { LoadingService } from 'src/environments/utilidades/loading-service.service';
import { LogicaService } from 'src/environments/api/logica.service';
import { ActivatedRoute, Router,NavigationExtras } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
@Component({
    selector: 'app-movimientosPale',
    templateUrl: './movimientosPale.page.html',
    styleUrls: ['./movimientosPale.page.scss'],
    standalone: false
})
export class MovimientosPalePage {
  movimientos: any = [];
  constructor(private changeRef: ChangeDetectorRef,private route: ActivatedRoute, private router: Router,private logica: LogicaService,public app: AppComponent, private user: UserService, public loadingCtrl: LoadingService, private platform: Platform) {
  }


  ionViewWillEnter(){
    this.loadingCtrl.present();
    this.logica.movimientosPale().then((data) => {
      if (data['success']) {
       this.loadingCtrl.dismiss();
       this.movimientos = data['message'];
      }
    }).catch(e => {
      this.loadingCtrl.dismiss();
      console.log('Error');
    });
  }

  recomprar(idVenta){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        id: JSON.stringify(idVenta)
      }
    };
    this.router.navigate(['recomprarFactura'], navigationExtras);
  }

  apostar() {
    this.router.navigateByUrl(`${'/apostar'}`);
  }
  apostar2(idTipoLista) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        id: JSON.stringify(idTipoLista)
      }
    };
    this.router.navigate(['apostar'], navigationExtras);
    //this.router.navigateByUrl(`${'/apostar'}`);
  }
  inicio() {
    this.router.navigateByUrl(`${'/inicio'}`);
  }
  perfil() {
    this.router.navigateByUrl(`${'/perfil'}`);
  }
  movimientosN() {
    this.router.navigateByUrl(`${'/movimientos'}`);
  }
  detalleMovimiento(dato) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        id: JSON.stringify(dato)
      }
    };
    this.router.navigate(['detalleMovimiento'], navigationExtras);
  }

}
