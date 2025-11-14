import { Component, OnInit } from '@angular/core';
import { LoadingService } from 'src/environments/utilidades/loading-service.service';
import { ModalController } from '@ionic/angular';
import { LogicaService } from 'src/environments/api/logica.service';
import { AppComponent } from 'src/app/app.component';
import { UserService } from 'src/environments/api/user.service';
import { Platform } from '@ionic/angular';
import swal from 'sweetalert2';
import { ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
@Component({
  selector: 'app-comprarLista',
  templateUrl: './comprarLista.page.html',
  styleUrls: ['./comprarLista.page.scss'],
  standalone: false
})
export class ComprarListaPage implements OnInit {

  loterias: any = [];
  numeros: any = [];
  idLista = '';
  loteria = 0;
  sum = 0;
  tipoLista = '';
  errores = '';

  constructor(private changeRef: ChangeDetectorRef, public app: AppComponent, private platform: Platform, private user: UserService, public modalController: ModalController, public loadingCtrl: LoadingService, private route: ActivatedRoute, private router: Router, private logica: LogicaService) {
  }

  ngOnInit() {
    this.loadingCtrl.dismiss();
    this.route.queryParams.subscribe(params => {
      if (params.idLista) {
        this.idLista = params.idLista.replace('"', "");
        this.idLista = this.idLista.replace('"', "");
      }
      if (params.tipoLista) {
        this.tipoLista = params.tipoLista.replace('"', "");
        this.tipoLista = this.tipoLista.replace('"', "");
      }

      if (this.tipoLista) {
        console.log('tiene un tipo de lista');
      } else {
        this.obtenerNumerosLista();
        //this.numeros.push({numero:'01',monto:10});
      }

    });
    this.cargarLoterias();
  }
  obtenerNumerosLista() {
    this.logica.obtenerNumerosListaCompra(this.idLista).then((data) => {
      this.loadingCtrl.dismiss();
      if (data['success']) {
        this.loadingCtrl.dismiss();

        this.numeros = data['message'];
        for (var i = 0; i < this.numeros.length; i++) {
          console.log(this.numeros[i].monto)
          this.sum = this.sum + Number(this.numeros[i].monto);
          console.log(this.sum)
        }

      }
    }).catch(e => {
      this.loadingCtrl.dismiss();
      console.log('Error');
      console.log(e);
    });
  }

  comprar() {
    if (this.loteria) {

      var lot = this.loterias.filter(x => x.idProgramacion === this.loteria);
      lot = lot[0];
      if (lot) {
        let numeros = lot.primerNumero;

        if (lot.segundoNumero !== 0) {
          numeros += '/' + lot.segundoNumero;
        }
        if (lot.tercerNumero !== 0) {
          numeros += '/' + lot.tercerNumero;
        }

        var nombreLOT = `${lot.nombreLoteria} ${lot.horaFormato} - x ${numeros}`;
      } else {
        var nombreLOT = ''
      }

      console.log('this.apuestas.length', this.numeros.length);
      if (this.numeros.length > 0) {
        var texto = '';
        texto = texto + '___ ' + nombreLOT + ' ___</b><br/>';
        for (var i = 0; i < this.numeros.length; i++) {
          if (this.numeros[i].monto != 0) {
            texto = texto + ' #' + this.numeros[i].numero + ' TQC ' + this.numeros[i].monto + '</b><br/>';
          }
        }

        texto = texto + '</b><br/>' + '___' + '</b><br/>' + 'Total TQC ' + this.sum.toFixed(2)
      } else { var texto = ''; }


      swal.fire({
        heightAuto: false,
        title: "Confirmar",
        html: texto,
        type: 'info',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Aceptar'
      }).then((result) => {

        if (result.value) {
          this.changeRef.detectChanges();
          if (this.numeros.length > 0) {
            this.loadingCtrl.conMensaje('Registrando su compra..');

            this.logica.comprarConLista(this.numeros, this.loteria, this.sum, nombreLOT).then((data) => {
              this.errores = '';
              if (data['success']) {
                //Limpio todoslos campos
                this.changeRef.detectChanges();

                if (data['message'][0] == 200) {
                  this.loadingCtrl.dismiss();

                  //Si vienen errores
                  if (data['message'][2]) {
                    for (var i = 0; i < data['message'][2].length; i++) {
                      this.errores = this.errores + '<p style="color: red;">Número ' + data['message'][2][i][0] + ' restringido. <p>';
                    }
                  }
                  this.router.navigateByUrl(`${'/cccc'}`);
                  swal.fire({
                    title: "Éxito",
                    heightAuto: false,
                    html: data['message'][3] + '<br>' + this.errores,
                    confirmButtonText: 'Ok'
                  })

                } else {
                  //Si vienen errores
                  if (data['message'][2]) {
                    for (var i = 0; i < data['message'][2].length; i++) {
                      this.errores = this.errores + '<p style="color: red;">Número ' + data['message'][2][i][0] + ' restringido. <p>';
                    }
                  }
                  this.loadingCtrl.dismiss();
                  swal.fire({
                    title: "Error",
                    heightAuto: false,
                    html: data['message'][1] + '<br>' + this.errores,
                    confirmButtonText: 'Ok'
                  })
                }
              } else {
                swal.fire({
                  title: "Error",
                  heightAuto: false,
                  text: "Error al registrar la apuesta",
                  confirmButtonText: 'Ok'
                })
              }
            }).catch(e => {
              this.loadingCtrl.dismiss();
              console.log('Error');
            });
          } else {
            swal.fire({
              title: "Error",
              heightAuto: false,
              text: "No hay números registrados",
              confirmButtonText: 'Ok'
            })
          }
          this.changeRef.detectChanges();
        }
      })
    } else {
      swal.fire({
        heightAuto: false,
        title: "Error",
        text: "Seleccione",
        confirmButtonText: 'Ok'
      })
    }

  }

  cargarLoterias() {
    this.loadingCtrl.present();
    this.logica.obtenerLoterias().then((data) => {
      if (data['success']) {
        this.loterias = data["message"];
        this.loadingCtrl.dismiss();
      }
    }).catch(e => {
      this.loadingCtrl.dismiss();
      console.log('Error');
    });
    this.changeRef.detectChanges();
  }

  movimientos() {
    this.router.navigateByUrl(`${'/movimientos'}`);
  }
  inicio() {
    this.router.navigateByUrl(`${'/inicio'}`);
  }

}
