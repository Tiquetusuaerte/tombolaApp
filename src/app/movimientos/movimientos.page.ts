import { AppComponent } from 'src/app/app.component';
import { UserService } from 'src/environments/api/user.service';
import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { LoadingService } from 'src/environments/utilidades/loading-service.service';
import { LogicaService } from 'src/environments/api/logica.service';
import { ActivatedRoute, Router,NavigationExtras } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
@Component({
    selector: 'app-movimientos',
    templateUrl: './movimientos.page.html',
    styleUrls: ['./movimientos.page.scss'],
    standalone: false
})
export class MovimientosPage {
  ultimoMovimiento: any = null;
  movimientos: any = [];
  constructor(private changeRef: ChangeDetectorRef,private route: ActivatedRoute, private router: Router,private logica: LogicaService,public app: AppComponent, private user: UserService, public loadingCtrl: LoadingService, private platform: Platform) {
  }


  ionViewWillEnter(){
    this.loadingCtrl.present();
    
    this.logica.movimientos().then((data) => {
      if (data['success']) {
        this.loadingCtrl.dismiss();
        this.movimientos = data['message'];

        if (this.movimientos.length > 0) {
          this.ultimoMovimiento = this.movimientos[0]; // Asumiendo que vienen ordenados por fecha DESC
        }

        console.log('Último movimiento:', this.ultimoMovimiento);
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
  formatearNumero(valor: number): string {
    return new Intl.NumberFormat('es-CR').format(valor);
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
  detalleMovimiento(dato) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        id: JSON.stringify(dato)
      }
    };
    this.router.navigate(['detalleMovimiento'], navigationExtras);
  }

}
