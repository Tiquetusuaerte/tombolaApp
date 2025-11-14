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
  selector: 'app-apostar',
  templateUrl: './apostar.page.html',
  styleUrls: ['./apostar.page.scss'],
  standalone: false
})
export class ApostarPage implements OnInit {

  apuestas: any = [];
  new: any = [];
  loterias: any = [];
  numeros: any = [];
  clientes: any = [];
  numero = '';
  monto = 0;
  loteria = '';
  errores = '';
  alto = 0;
  ancho = 0;
  respuestaLoteria = false;
  respuestaNum = false;
  sumatoria = 0;
  result = "";
  jugador = '';
  nombreLOT = '';
  idCompra = 0;
  recompra : any = [];

  constructor(private changeRef: ChangeDetectorRef, public app: AppComponent, private platform: Platform, private user: UserService, public modalController: ModalController, public loadingCtrl: LoadingService, private route: ActivatedRoute, private router: Router, private logica: LogicaService) {
  }
  ngOnInit() {
    this.clientes = '';
    this.cargarLoterias();
    this.changeRef.detectChanges();
    this.route.queryParams.subscribe(params => {
      this.idCompra = params.id;
      this.logica.detalleMovimiento(params.id).then((data) => {
        console.log('data', data);
        this.recompra = data['message'];
      }).catch(e => {
        this.loadingCtrl.dismiss();
        console.log('Error');
      });
    });
  }
  /*ngOnInit() {
    this.clientes = '';
    this.cargarLoterias();
  }*/
  cargarLoterias() {

    this.loadingCtrl.present();
    //this.misClientes();
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
  jugar(loteria, nombre, idLoteriaPais, idProgramacion, nombreLoteria, horaFormato, primerNumero, segundoNumero, tercerNumero) {

    let numeros = primerNumero.toString();

    if (segundoNumero !== 0) {
      numeros += '/' + segundoNumero;
    }
    if (tercerNumero !== 0) {
      numeros += '/' + tercerNumero;
    }

    this.nombreLOT = `${nombreLoteria} ${horaFormato} - x ${numeros}`;

    //this.nombreLOT = nombreLoteria + ' ' + hora + ' - ' + primerNumero + '/' + segundoNumero + '/' + tercerNumero;
    //Si tiene clientes, debe seleccionar jugador
    if (this.jugador) {
      this.irApostar(loteria, nombre, this.jugador, idLoteriaPais, idProgramacion, this.nombreLOT)
    } else {
      //Si no tiene cliente es el mismo
      this.irApostar(loteria, nombre, 0, idLoteriaPais, idProgramacion, this.nombreLOT);
    }
  }

  irApostar(loteria, nombre, jugador, idLoteriaPais, idProgramacion, nombreLoteria) {
    console.log('irApostar', {
      idCompra: this.idCompra,
      idLoteria: JSON.stringify(loteria),
      nombre: JSON.stringify(nombre),
      jugador: JSON.stringify(jugador),
      idLoteriaPais: JSON.stringify(idLoteriaPais),
      idProgramacion: JSON.stringify(idProgramacion),
      nombreLoteria: JSON.stringify(nombreLoteria),
    });
    let navigationExtras: NavigationExtras = {
      queryParams: {
        idCompra: this.idCompra,
        idLoteria: JSON.stringify(loteria),
        nombre: JSON.stringify(nombre),
        jugador: JSON.stringify(jugador),
        idLoteriaPais: JSON.stringify(idLoteriaPais),
        idProgramacion: JSON.stringify(idProgramacion),
        nombreLoteria: JSON.stringify(nombreLoteria),
        recompra: this.recompra ? JSON.stringify( this.recompra ) : '', 
      }
    };
    console.log('apostar', JSON.stringify(this.idCompra));
    this.router.navigate(['apostarP2'], navigationExtras);
  }
  movimientos() {
    this.router.navigateByUrl(`${'/movimientos'}`);
  }
  inicio() {
    this.router.navigateByUrl(`${'/inicio'}`);
  }
  apostarrrr() {
    this.router.navigateByUrl(`${'/apostar'}`);
  }
  misClientes() {
    /*this.logica.obtenerClientes().then((data) => {
      if (data['success']) {
         this.clientes = data["message"];
     }
    }).catch(e => {
      this.loadingCtrl.dismiss();
      console.log('Error');
    });
  */}
}
