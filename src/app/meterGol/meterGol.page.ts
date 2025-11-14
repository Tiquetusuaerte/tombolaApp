import { AppComponent } from 'src/app/app.component';
import { UserService } from 'src/environments/api/user.service';
import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { LoadingService } from 'src/environments/utilidades/loading-service.service';
import { LogicaService } from 'src/environments/api/logica.service';
import { ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import swal from 'sweetalert2';

@Component({
    selector: 'app-meterGol',
    templateUrl: './meterGol.page.html',
    styleUrls: ['./meterGol.page.scss'],
    standalone: false
})
export class MeterGolPage {

  sorteos: any = [];
  categorias: any = [];
  categoria = 0;
  constructor(private route: ActivatedRoute, private changeRef: ChangeDetectorRef, private logica: LogicaService, public app: AppComponent, private user: UserService, public loadingCtrl: LoadingService, private platform: Platform, private router: Router) {

  }


  obtenerSorteos() {
    /*this.loadingCtrl.present();
    this.logica.sorteosTiqueGol().then((data) => {
      if (data['success']) {
        this.loadingCtrl.dismiss();
        this.sorteos = data['message'];

        this.sorteos = this.sorteos.filter(x => x.eliminatoria === this.categoria);
      }
    })*/
  }

  
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if(params.sorteos){
        this.sorteos = JSON.parse(params.sorteos);
        this.categoria = JSON.parse(params.categoria);
      }else{
        this.obtenerSorteos();
      }
    });
  }


  /*ionViewWillEnter(){
   this.loadingCtrl.present();
   this.logica.sorteosTiqueGol().then((data) => {
     if (data['success']) {
      this.loadingCtrl.dismiss();
      this.sorteos = data['message'];

     for(var i = 0; i < this.sorteos.length; i++) {
     
       const elemento = this.sorteos[i].eliminatoria;
     
       if (!this.categorias.includes(this.sorteos[i].eliminatoria)) {
         this.categorias.push(elemento);
       }
     }

     console.log(this.categorias);
     this.changeRef.detectChanges();

     }
   }).catch(e => {
     this.loadingCtrl.dismiss();
     console.log('Error');
   });
 }*/

  movimientos() {
    this.router.navigateByUrl(`${'/movimientos'}`);
  }
  jugarGol(sorteo) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        sorteo: JSON.stringify(sorteo),
      }
    };
    this.router.navigate(['jugarGol'], navigationExtras);

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
