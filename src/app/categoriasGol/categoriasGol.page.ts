import { AppComponent } from 'src/app/app.component';
import { UserService } from 'src/environments/api/user.service';
import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { LoadingService } from 'src/environments/utilidades/loading-service.service';
import { LogicaService } from 'src/environments/api/logica.service';
import { ChangeDetectorRef } from '@angular/core';
import swal from 'sweetalert2';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
@Component({
    selector: 'app-categoriasGol',
    templateUrl: './categoriasGol.page.html',
    styleUrls: ['./categoriasGol.page.scss'],
    standalone: false
})
export class CategoriasGolPage {

  sorteos: any = [];
  categorias: any = [];
  categoria = 0;
  constructor(private changeRef: ChangeDetectorRef, private logica: LogicaService, public app: AppComponent, private user: UserService, public loadingCtrl: LoadingService, private platform: Platform, private router: Router) {
    this.obtenerSorteos();
  }

  ngOnInit() {
    this.obtenerSorteos();
  }

  ionViewWillEnter() {
    this.obtenerSorteos();
  }
  obtenerSorteos() {
    /*this.loadingCtrl.present();
    this.logica.sorteosTiqueGol().then((data) => {
      if (data['success']) {
        this.loadingCtrl.dismiss();
        this.sorteos = data['message'];

        if (this.sorteos.length > 0) {
          for (var i = 0; i < this.sorteos.length; i++) {

            const elemento = this.sorteos[i].eliminatoria;

            if (!this.categorias.includes(this.sorteos[i].eliminatoria)) {
              this.categorias.push(elemento);
            }
          }
        } else {

          swal.fire({
            title: "",
            text: "No hay información.",
            confirmButtonText: 'Ok',
            heightAuto: false

          });
          this.loadingCtrl.dismiss();
          this.router.navigateByUrl(`${'/tiqueGol'}`);
        }
      } else {
        swal.fire({
          title: "",
          text: "No hay información.",
          confirmButtonText: 'Ok',
          heightAuto: false
        });
        this.loadingCtrl.dismiss();
        this.router.navigateByUrl(`${'/tiqueGol'}`);
      }
    }).catch(e => {
      this.loadingCtrl.dismiss();
      console.log('Error');
    });
    this.loadingCtrl.dismiss();*/
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

  setCategoria(cat) {

    this.categoria = cat;

    this.sorteos = this.sorteos.filter(x => x.eliminatoria === cat);
    let navigationExtras: NavigationExtras = {
      queryParams: {
        sorteos: JSON.stringify(this.sorteos),
        categoria: JSON.stringify(cat),
      }
    };
    this.router.navigate(['meterGol'], navigationExtras);

    //this.router.navigateByUrl(`${'/meterGol'}`);
  }
}
