import { AppComponent } from 'src/app/app.component';
import { UserService } from 'src/environments/api/user.service';
import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingService } from 'src/environments/utilidades/loading-service.service';
import { LogicaService } from 'src/environments/api/logica.service';

@Component({
    selector: 'app-jugarGol',
    templateUrl: './jugarGol.page.html',
    styleUrls: ['./jugarGol.page.scss'],
    standalone: false
})
export class JugarGolPage {

  sorteo: any = {};
  montos = [];
  marcador1 = 0;
  marcador2 = 0;
  monto = 0;
  marcadores = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  constructor(private route: ActivatedRoute, private logica: LogicaService, public app: AppComponent, private user: UserService, public loadingCtrl: LoadingService, private platform: Platform, private router: Router) {

  }
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.sorteo = JSON.parse(params.sorteo);
      if (this.sorteo) {
        this.montos = this.sorteo.montosTiqueGol.split(";");
      }

    });

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

  enviarApuesta() {
    if (this.monto > 0) {
      var texto = '';
      texto = texto + '</b><br/>*** Apuesta es definitiva, no se puede cancelar o eliminar una vez aceptada la apuesta ***</b><br/>',
        texto = texto + '</b><br/>' + 'Acumulado de bolsa TQC' + ' ' + (this.sorteo.bolsa ? this.sorteo.bolsa : 0) + '</b><br/>',
        texto = texto + '</b><br/>' + this.sorteo.equipoA + ' ' + this.marcador1 + '',
        texto = texto + '</b><br/>' + this.sorteo.equipoB + ' ' + this.marcador2 + '</b><br/>',
        texto = texto + '</b><br/>' + 'TQC ' + this.monto + '</b><br/>',
        
        
        swal.fire({
          title: "</b><br/>Confirmar",
          html: texto,
          type: 'info',
          showCancelButton: true,
          heightAuto: false,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Aceptar',
          cancelButtonText: 'Corregir'
        }).then((result) => {
          if (result.value) {
            this.loadingCtrl.present();
            /*this.logica.enviarApuestaTG(this.sorteo.equipoA, this.sorteo.equipoB, this.marcador1, this.marcador2, this.monto, this.sorteo.idsorteosTiqueGol).then((data) => {
              console.log(data);
              if (data['message'][0] == 200) {
                swal.fire({
                  heightAuto: false,
                  title: "Exito",
                  text: data['message'][1],
                  confirmButtonText: 'Ok'
                })
              } else {
                swal.fire({
                  title: "Error",
                  heightAuto: false,
                  text: data['message'][1],
                  confirmButtonText: 'Ok'
                })
              }
              this.loadingCtrl.dismiss();
              this.router.navigateByUrl(`${'/meterGol'}`, { skipLocationChange: true });


            })*/
          }
        })

    }
    else {
      this.loadingCtrl.dismiss();
      swal.fire({
        title: "Error",
        text: "Seleccione un monto",
        heightAuto: false,
        confirmButtonText: 'Ok'
      })
    }
  }


}
