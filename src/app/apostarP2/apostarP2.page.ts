import { Component, OnInit } from '@angular/core';
import { LoadingService } from 'src/environments/utilidades/loading-service.service';
import { ModalController } from '@ionic/angular';
import { LogicaService } from 'src/environments/api/logica.service';
import { AppComponent } from 'src/app/app.component';
import { UserService } from 'src/environments/api/user.service';
import { Platform } from '@ionic/angular';
import swal from 'sweetalert2';
import { ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-apostarP2',
  templateUrl: './apostarP2.page.html',
  styleUrls: ['./apostarP2.page.scss'],
  standalone: false
})

export class ApostarP2Page implements OnInit {
  montoSeleccionado: number;
  className: string = 'num';
  sum = 0;
  monto = 0;
  montospPais = '';
  arrayNumeros: any = [];
  apuestas: any = [];
  new: any = [];
  loterias: any = [];
  recompra: any = [];
  numeros: any = [];
  numero = '';
  loteria = '';
  idLoteriaPais = '';
  nombreLoteria = '';
  errores = '';
  alto = 0;
  ancho = 0;
  idProgramacion = 0;
  idCompra = '';
  nombrePais = '';
  respuestaLoteria = false;
  respuestaNum = false;
  respuestaNumPIE = false;
  result = "";
  jugador = "";
  montos = [];
  private domYaRenderizado = false;

  constructor(private changeRef: ChangeDetectorRef, public app: AppComponent, private platform: Platform, private user: UserService, public modalController: ModalController, public loadingCtrl: LoadingService, private route: ActivatedRoute, private router: Router, private logica: LogicaService) {

  }

  aplicarMontoSeleccionado() {
    if (!this.montoSeleccionado) return;
    this.agregarApuestaNew(this.montoSeleccionado);
  }

  agregarNuevoNumero(num) {
    this.respuestaNum = this.buscarNumeroR(num);
    if (this.respuestaNum) {
      //SI NO EXISTE, AGREGARLO 
      let imgEl: HTMLElement = document.getElementById(num);
      imgEl.setAttribute("class", "numSelect ios hydrated");
      this.arrayNumeros.push(num);
    } else {
      //SI YA EXISTE, ELIMINARLO
      this.eliminarNum(num);
      let imgEl: HTMLElement = document.getElementById(num);
      imgEl.setAttribute("class", "btn num md button button-round button-solid ion-activatable ion-focusable hydrated");
      //BUSCAR APUESTA EN PIE
      this.respuestaNumPIE = this.buscarNumeroRepetido(num);

      if (!this.respuestaNumPIE) {
        this.eliminarNumero(num);
      }
    }
  }
  agregarApuestaNew(monto) {

    console.log('estoy aqui');
    // this.apuestas = [];
    //this.sum = 0;
    console.log('agregarApuestaNew', monto);
    this.montoSeleccionado = monto;
    for (var i = 0; i < this.arrayNumeros.length; i++) {
      this.agregarNeww(this.arrayNumeros[i], monto);
    }
    this.arrayNumeros = [];
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
    });
    this.changeRef.detectChanges();
  }
  formatonumero(number) {
    return number.toFixed(2);
  }
  montosPais() {
    this.logica.montosPais(this.loteria).then((data) => {
      if (data["success"]) {
        this.montospPais = data["message"].montos;
        this.nombrePais = data["message"].nombre;
        this.montos = this.montospPais.split(";"); 
      }
    }).catch(e => {
      this.loadingCtrl.dismiss();
    });
  }
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.loteria = params.idProgramacion;
      this.idProgramacion = params.idProgramacion;
      this.idLoteriaPais = params.idLoteriaPais;
      this.recompra = params.recompra ? JSON.parse(params.recompra) : []
      this.montosPais();
      this.obtenerNumeros();

      this.nombreLoteria = params.nombreLoteria;
      this.jugador = params.jugador;
      this.nombreLoteria = this.nombreLoteria.replace('"', "");
      this.nombreLoteria = this.nombreLoteria.replace('"', "");

      if (params.idCompra) {
        this.idCompra = params.idCompra;
        this.idCompra = this.idCompra.replace('"', "");
        this.idCompra = this.idCompra.replace('"', "");
      }
    });

    this.alto = this.platform.height();
    this.ancho = this.platform.width();
    this.cargarLoterias();
    this.changeRef.detectChanges();
  }



  cargarNumerosCompra() {
    if (this.idCompra) {
      this.logica.detalleMovimiento(this.idCompra).then((data) => {
        if (data['success']) {
          for (var i = 0; i < data['message'].length; i++) {
            let imgEl: HTMLElement = document.getElementById(data['message'][i].numero);
            imgEl.setAttribute("class", "numSelect ios hydrated");
            this.arrayNumeros.push(data['message'][i].numero);
            this.agregarNewwP(data['message'][i].numero, data['message'][i].monto);
            this.arrayNumeros = [];
          }
        }
      }).catch(e => {
        this.loadingCtrl.dismiss();
      });
    }
  }

  add(btn) {
    this.changeRef.detectChanges();
    this.result += btn;
    this.result = this.result.substr(-2);
    this.changeRef.detectChanges();
  }
  refrescar() {
    this.cargarLoterias();
    this.changeRef.detectChanges();
  }

  agregarNew(numero, monto) {
    var newstr = this.loteria.replace('"', "");
    var lot = newstr.replace('"', "");

    if (numero && monto.detail.value) {
      this.respuestaNum = this.buscarNumeroRepetido(numero);
      if (this.respuestaNum) {
        if (monto.detail.value != '0') {
          this.apuestas.push([numero, lot, monto.detail.value, this.idProgramacion]);
          this.sum = this.sum + Number(monto.detail.value);
        }
      } else {
        var registro = this.apuestas.filter(x => x[0] === numero);
        this.eliminarNumero(numero);
        if (monto.detail.value != '0') {
          this.apuestas.push([numero, lot, monto.detail.value, this.idProgramacion]);
          this.sum = this.sum + Number(monto.detail.value);
        }
      }

    }
  }
  agregarNewwP(numero, monto) {
    this.changeRef.detectChanges();
    this.loadingCtrl.present();
    if (this.idProgramacion) {
      this.respuestaLoteria = this.buscarLoteriaDiferente(this.loteria);
      if (this.respuestaLoteria) {
        if (numero >= '0') {
          this.respuestaNum = this.buscarNumeroRepetido(numero);
          if (this.respuestaNum) {
            if (monto) {
              this.sum = this.sum + Number(monto);
              var newstr = this.loteria.replace('"', "");
              var lot = newstr.replace('"', "");
              this.apuestas.push([numero, lot, monto, this.idProgramacion]);
              this.loadingCtrl.dismiss();
            } else {
              this.loadingCtrl.dismiss();
              swal.fire({
                title: "Error",
                heightAuto: false,
                text: "Seleccione un monto",
                confirmButtonText: 'Ok'
              })
            }
          } else {
            this.loadingCtrl.dismiss();
            /*swal.fire({
              title: "Error",
              heightAuto: false,
              text: "Número ya fue ingresado a la lista",
              confirmButtonText: 'Ok'
            })*/
          }
        } else {
          this.loadingCtrl.dismiss();
          swal.fire({
            title: "Error",
            heightAuto: false,
            text: "Seleccione un número",
            confirmButtonText: 'Ok'
          })
        }
      } else {
        this.loadingCtrl.dismiss();
        swal.fire({
          title: "Error",
          heightAuto: false,
          text: "No puedes agregar una loteria diferente en la misma apuesta",
          confirmButtonText: 'Ok'
        })
      }
    } else {
      this.loadingCtrl.dismiss();
      swal.fire({
        title: "Error",
        heightAuto: false,
        text: "Seleccione una loteria",
        confirmButtonText: 'Ok'
      })
    }
    this.changeRef.detectChanges();
  }
  agregarNeww(numero, monto) {
    console.log('agregarNeww');
    this.changeRef.detectChanges();
    this.loadingCtrl.present();
    if (this.idProgramacion) {
      this.respuestaLoteria = this.buscarLoteriaDiferente(this.loteria);
      if (this.respuestaLoteria) {
        if (numero >= '0') {
          this.respuestaNum = this.buscarNumeroRepetido(numero);
          if (this.respuestaNum) {
            if (monto) {
              this.sum = this.sum + Number(monto);
              var newstr = this.loteria.replace('"', "");
              var lot = newstr.replace('"', "");
              this.apuestas.push([numero, lot, monto, this.idProgramacion]);
              this.loadingCtrl.dismiss();
            } else {
              this.loadingCtrl.dismiss();
              swal.fire({
                title: "Error",
                heightAuto: false,
                text: "Seleccione un monto",
                confirmButtonText: 'Ok'
              })
            }
          } else {
            this.loadingCtrl.dismiss();
            /*swal.fire({
              title: "Error",
              heightAuto: false,
              text: "Número ya fue ingresado a la lista",
              confirmButtonText: 'Ok'
            })*/
          }
        } else {
          this.loadingCtrl.dismiss();
          swal.fire({
            title: "Error",
            text: "Seleccione un número",
            heightAuto: false,
            confirmButtonText: 'Ok'
          })
        }
      } else {
        this.loadingCtrl.dismiss();
        swal.fire({
          title: "Error",
          heightAuto: false,
          text: "No puedes agregar una loteria diferente en la misma apuesta",
          confirmButtonText: 'Ok'
        })
      }
    } else {
      this.loadingCtrl.dismiss();
      swal.fire({
        title: "Error",
        heightAuto: false,
        text: "Seleccione una loteria",
        confirmButtonText: 'Ok'
      })
    }
    this.changeRef.detectChanges();
  }

  agregarNumero(monto) {
    this.changeRef.detectChanges();
    this.loadingCtrl.present();
    if (this.idProgramacion) {
      this.respuestaLoteria = this.buscarLoteriaDiferente(this.loteria);
      if (this.respuestaLoteria) {
        if (this.result >= '0') {
          this.respuestaNum = this.buscarNumeroRepetido(this.result);
          if (this.respuestaNum) {
            if (this.monto) {
              this.sum = this.sum + this.monto;
              var newstr = this.loteria.replace('"', "");
              var lot = newstr.replace('"', "");
              this.apuestas.push([this.result, lot, this.monto, this.idProgramacion]);
              this.loadingCtrl.dismiss();
            } else {
              this.loadingCtrl.dismiss();
              swal.fire({
                title: "Error",
                text: "Seleccione un monto",
                heightAuto: false,
                confirmButtonText: 'Ok'
              })
            }
          } else {
            this.loadingCtrl.dismiss();
            /*swal.fire({
              title: "Error",
              text: "Número ya fue ingresado a la lista",
              heightAuto: false,
              confirmButtonText: 'Ok'
            })*/
          }
        } else {
          this.loadingCtrl.dismiss();
          swal.fire({
            title: "Error",
            text: "Seleccione un número",
            heightAuto: false,
            confirmButtonText: 'Ok'
          })
        }
      } else {
        this.loadingCtrl.dismiss();
        swal.fire({
          title: "Error",
          heightAuto: false,
          text: "No puedes agregar una loteria diferente en la misma apuesta",
          confirmButtonText: 'Ok'
        })
      }
    } else {
      this.loadingCtrl.dismiss();
      swal.fire({
        heightAuto: false,
        title: "Error",
        text: "Seleccione una loteria",
        confirmButtonText: 'Ok'
      })
    }
    this.changeRef.detectChanges();
  }

  obtenerNumeros() {
    this.logica.obtenerNumeros(this.idProgramacion).then((data) => {
      if (data['success']) {
        this.numeros = data["message"].filter(x => (x.montoRestante === null || x.montoRestante > 0));
        this.loadingCtrl.dismiss();
        if (this.recompra.length && !this.domYaRenderizado) {
          this.apuestas = [];
          this.montoSeleccionado = 0;

          this.domYaRenderizado = true;
          setTimeout(() => {
            for (const item of this.recompra) {
              console.log('recompra',item);
              const numStr = item.numero.toString().padStart(2, '0');
              this.agregarNuevoNumero(numStr);
              this.agregarNeww(numStr, item.monto);
                
            }

            this.montoSeleccionado = Number(this.recompra[0].monto);
            this.changeRef.detectChanges();
 

          }, 100);
        }


      } else {
        this.loadingCtrl.dismiss();
      }
    }).catch(e => {
      this.loadingCtrl.dismiss();
    });
  }

  eliminarNum(idNumero) {
    this.changeRef.detectChanges();
    this.loadingCtrl.present();
    for (var i = 0; i < this.arrayNumeros.length; i++) {
      if (this.arrayNumeros[i] == idNumero) {
        this.arrayNumeros.splice(i, 1);
      }
    }
    this.loadingCtrl.dismiss();
    this.changeRef.detectChanges();
  }

  eliminarNumero(idNumero) {
    this.changeRef.detectChanges();
    this.loadingCtrl.present();
    for (var i = 0; i < this.apuestas.length; i++) {
      if (this.apuestas[i][0] == idNumero) {
        this.sum = this.sum - this.apuestas[i][2];
        this.apuestas.splice(i, 1);
      }
    }
    this.loadingCtrl.dismiss();
    this.changeRef.detectChanges();
  }

  next(slides, num) {
    slides.slideTo(num);
  }

  buscarLoteriaDiferente(idLoteria) {
    if (this.new.length == 0) {
      return true;
    } else {
      if (this.new.filter(x => x[1] === idLoteria).length == 0) {
        return false;
      } else {
        return true;
      }
    }
  }

  buscarNumeroR(numero) {
    if (this.arrayNumeros.filter(x => x === numero).length == 0) {
      return true;
    } else {
      return false;
    }
  }

  buscarNumeroRepetido(numero) {
    if (this.apuestas.filter(x => x[0] === numero).length == 0) {
      return true;
    } else {
      return false;
    }
  }

  vender(monto) {
    this.changeRef.detectChanges();
    this.apuestas.push([this.result, 2, monto, this.idProgramacion]);
    this.changeRef.detectChanges();
  }

  enviar() {
    if (this.apuestas.length > 0) {
      var texto = '';
      texto = texto + '___ ' + this.nombreLoteria + ' ___</b><br/>';
      for (var i = 0; i < this.apuestas.length; i++) {
        if (this.apuestas[i][2] != 0) {
          texto = texto + ' #' + this.apuestas[i][0] + ' TQC ' + this.apuestas[i][2] + '</b><br/>';
        }
      }

      texto = texto + '</b><br/>' + '___' + '</b><br/>' + 'Total TQC ' + this.sum.toFixed(2)

      swal.fire({
        title: this.nombreLoteria + "</b><br/>Confirmar",
        html: texto,
        type: 'info',
        heightAuto: false,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Aceptar'
      }).then((result) => {
        if (result.value) {
          this.changeRef.detectChanges();
          if (this.apuestas.length > 0) {
            this.loadingCtrl.conMensaje('Registrando...');

            this.jugador = this.jugador.replace('"', "");
            this.jugador = this.jugador.replace('"', "");

            this.logica.enviarLoterias(this.sum, this.idProgramacion, this.apuestas, this.jugador, this.nombreLoteria).then((data) => {
              this.errores = '';
              if (data['success']) {
                //Limpio todoslos campos
                this.apuestas = [];
                this.sum = 0;
                this.result = '';
                this.changeRef.detectChanges();

                if (data['message'][0] == 200) {
                  this.obtenerNumeros();
                  this.loadingCtrl.dismiss();

                  //Si vienen errores
                  if (data['message'][2]) {
                    for (var i = 0; i < data['message'][2].length; i++) {
                      this.errores = this.errores + ' ' + data['message'][2][i] + '. <br>';
                    }
                  }
                  swal.fire({
                    title: "Éxito",
                    heightAuto: false,

                    html: data['message'][3] + '<br>' + this.errores,
                    confirmButtonText: 'Ok'
                  })

                } else {
                  if (data['message'][2]) {
                    for (var i = 0; i < data['message'][2].length; i++) {
                      this.errores = this.errores + data['message'][2][i] + ' <br>';
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
                this.router.navigateByUrl(`${'/apostar'}`);
              } else {
                swal.fire({
                  heightAuto: false,
                  title: "Error",
                  text: "Error al registrar",
                  confirmButtonText: 'Ok'
                })
              }
            }).catch(e => {
              this.loadingCtrl.dismiss();
            });
          } else {
            swal.fire({
              heightAuto: false,
              title: "Error",
              text: "No hay ninguna apuesta registrada",
              confirmButtonText: 'Ok'
            })
          }
          this.changeRef.detectChanges();
        }
      })

    } else {
      swal.fire({
        title: "Error",
        heightAuto: false,
        text: "No hay números seleccionados",
        confirmButtonText: 'Ok'
      })
    }
  }

  movimientos() {
    this.router.navigateByUrl(`${'/movimientos'}`);
  }
  inicio() {
    this.router.navigateByUrl(`${'/inicio'}`);
  }
}
