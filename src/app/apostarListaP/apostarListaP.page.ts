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
    selector: 'app-apostarListaP',
    templateUrl: './apostarListaP.page.html',
    styleUrls: ['./apostarListaP.page.scss'],
    standalone: false
})

export class ApostarListaPPage implements OnInit {

  className: string = 'num';
  sum = 0;
  idCompra = 0;
  lot = 0;
  nombre = '';
  monto = 0;
  idLoteria = 0;
  arrayNumeros: any = [];
  apuestas: any = [];
  new: any = [];
  loterias: any = [];
  numeros: any = [];
  numero = '';
  loteria = '';
  errores = '';
  alto = 0;
  ancho = 0;
  tipo = '';
  idLoteriaPais = '';
  idTipoLista = '';
  respuestaLoteria = false;
  respuestaNum = false;
  respuestaNumPIE = false;
  result = "";
  jugador = "";
  montospPais = "";
  nombreLoteria = '';
  montos = [];
  nombrePais = '';

  constructor(private changeRef: ChangeDetectorRef, public app: AppComponent, private platform: Platform, private user: UserService, public modalController: ModalController, public loadingCtrl: LoadingService, private route: ActivatedRoute, private router: Router, private logica: LogicaService) { }


  agregarNuevoNumero(num) {


    this.respuestaNum = this.buscarNumeroR(num);

    console.log(this.respuestaNum);
    if (this.respuestaNum) {
      //SI NO EXISTE, AGREGARLO
      console.log(num);
      let imgEl: HTMLElement = document.getElementById(num);
      imgEl.setAttribute("class", "numSelect ios hydrated");
      this.arrayNumeros.push(num);
    } else {
      //SI YA EXISTE, ELIMINARLO
      this.eliminarNum(num);
      let imgEl: HTMLElement = document.getElementById(num);
      imgEl.setAttribute("class", "num ios hydrated");
      //BUSCAR APUESTA EN PIE
      this.respuestaNumPIE = this.buscarNumeroRepetido(num);

      if (!this.respuestaNumPIE) {
        this.eliminarNumero(num);
      }
    }
  }
  agregarApuestaNew(monto) {
    for (var i = 0; i < this.arrayNumeros.length; i++) {
      console.log(this.arrayNumeros[i]);
      this.agregarNeww(this.arrayNumeros[i], monto);
      this.sum = this.sum + monto;
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
      console.log('Error');
    });
    this.changeRef.detectChanges();
  }


  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.montosPais();
      console.log('params', params)
      this.nombre = params.nombre;
      this.idLoteriaPais = params.idLoteriaPais;

      this.nombre = this.nombre.replace('"', "");
      this.nombre = this.nombre.replace('"', "");

      if (params.idTipoLista) {
        this.idTipoLista = params.idTipoLista;
        this.idTipoLista = this.idTipoLista.replace('"', "");
        this.idTipoLista = this.idTipoLista.replace('"', "");
      }

      if (params.tipo) {
        this.tipo = params.tipo;
        this.tipo = this.tipo.replace('"', "");
        this.tipo = this.tipo.replace('"', "");
      }

    });
    //his.cargarApuesta();
    this.cargarLoterias();
    this.changeRef.detectChanges();
  }
  cargarApuesta() {
    this.apuestas = [];

    console.log(' this.loterias', this.loterias)
    var registro = this.loterias.filter(x => x.idProgramacion === this.lot);
    console.log(' registro', registro)
    this.idLoteriaPais = registro[0].idProgramacion;
    if (Number(this.tipo) == 1) {
      //TERMINACIONES
      if (this.idTipoLista && this.monto) {
        for (var i = 0; i < 10; i++) {
          this.apuestas.push([i + '' + this.idTipoLista, this.lot, this.monto, this.idLoteriaPais]);
          this.sum = this.sum + Number(this.monto);
        }
        this.enviar();
      }
    } else if (Number(this.tipo) == 2) {
      //Docenas
      for (var i = 0; i <= 9; i++) {
        var resultado = Number(this.idTipoLista) + '' + Number(i);
        this.apuestas.push([resultado, this.lot, this.monto, this.idLoteriaPais]);
        this.sum = this.sum + Number(this.monto);
      }
      this.enviar();
    } else if (Number(this.tipo) == 3) {
      //Cuartos
      if (Number(this.idTipoLista) == 1) {
        for (var i = 0; i <= 24; i++) {
          var cadenaNumerica = '00';
          var resultado = cadenaNumerica + i;
          resultado = resultado.substring(resultado.length - cadenaNumerica.length);
          this.apuestas.push([resultado, this.lot, this.monto, this.idLoteriaPais]);
          this.sum = this.sum + Number(this.monto);
        }
        this.enviar();
      } else if (Number(this.idTipoLista) == 2) {
        for (var i = 25; i <= 49; i++) {
          this.apuestas.push([i, this.lot, this.monto, this.idLoteriaPais]);
          this.sum = this.sum + Number(this.monto);
        }
        this.enviar();
      } else if (Number(this.idTipoLista) == 3) {
        for (var i = 50; i <= 74; i++) {
          this.apuestas.push([i, this.lot, this.monto, this.idLoteriaPais]);
          this.sum = this.sum + Number(this.monto);
        }
        this.enviar();
      } else if (Number(this.idTipoLista) == 4) {
        for (var i = 75; i <= 99; i++) {
          this.apuestas.push([i, this.lot, this.monto, this.idLoteriaPais]);
          this.sum = this.sum + Number(this.monto);
        }
        this.enviar();
      }
    } else if (Number(this.tipo) == 4) {
      //MITADES
      if (Number(this.idTipoLista) == 1) {
        for (var i = 0; i <= 49; i++) {
          var cadenaNumerica = '00';
          var resultado = cadenaNumerica + i;
          resultado = resultado.substring(resultado.length - cadenaNumerica.length);
          this.apuestas.push([resultado, this.lot, this.monto, this.idLoteriaPais]);
          this.sum = this.sum + Number(this.monto);
        }
        this.enviar();
      } else if (Number(this.idTipoLista) == 2) {
        for (var i = 50; i <= 99; i++) {
          this.apuestas.push([i, this.lot, this.monto, this.idLoteriaPais]);
          this.sum = this.sum + Number(this.monto);
        }
        this.enviar();
      }
    } else if (Number(this.tipo) == 5) {
      //PARES
      let pares = ['00', '11', '22', '33', '44', '55', '66', '77', '88', '99'];
      pares.forEach((value) => {
        this.apuestas.push([value, this.lot, this.monto, this.idLoteriaPais]);
        this.sum = this.sum + Number(this.monto);
      });
      this.enviar();
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
    this.apuestas = [];
    var newstr = this.loteria.replace('"', "");
    var lot = newstr.replace('"', "");

    if (numero && monto.detail.value) {
      this.respuestaNum = this.buscarNumeroRepetido(numero);
      if (this.respuestaNum) {
        if (monto.detail.value != '0') {
          this.apuestas.push([numero, lot, monto.detail.value, this.idLoteriaPais]);
          this.sum = this.sum + Number(monto.detail.value);
        }
      } else {
        var registro = this.apuestas.filter(x => x[0] === numero);
        this.eliminarNumero(numero);
        if (monto.detail.value != '0') {
          this.apuestas.push([numero, lot, monto.detail.value, this.idLoteriaPais]);
          this.sum = this.sum + Number(monto.detail.value);
        }
      }

    }
  }

  agregarNeww(numero, monto) {
    this.changeRef.detectChanges();
    this.loadingCtrl.present();
    if (this.loteria) {
      this.respuestaLoteria = this.buscarLoteriaDiferente(this.loteria);
      if (this.respuestaLoteria) {
        if (numero >= '0') {
          this.respuestaNum = this.buscarNumeroRepetido(numero);
          if (this.respuestaNum) {
            if (monto) {
              this.sum = this.sum + Number(monto.detail.value);
              var newstr = this.loteria.replace('"', "");
              var lot = newstr.replace('"', "");
              this.apuestas.push([numero, lot, monto.detail.value, this.idLoteriaPais]);
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
            swal.fire({
              title: "Error",
              heightAuto: false,
              text: "Número ya fue ingresado a la lista",
              confirmButtonText: 'Ok'
            })
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

  agregarNumero(monto) {
    this.changeRef.detectChanges();
    this.loadingCtrl.present();
    if (this.loteria) {
      this.respuestaLoteria = this.buscarLoteriaDiferente(this.loteria);
      if (this.respuestaLoteria) {
        if (this.result >= '0') {
          this.respuestaNum = this.buscarNumeroRepetido(this.result);
          if (this.respuestaNum) {
            if (this.monto) {
              this.sum = this.sum + this.monto;
              var newstr = this.loteria.replace('"', "");
              var lot = newstr.replace('"', "");
              this.apuestas.push([this.result, lot, this.monto, this.idLoteriaPais]);
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
            swal.fire({
              title: "Error",
              heightAuto: false,
              text: "Número ya fue ingresado a la lista",
              confirmButtonText: 'Ok'
            })
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
          heightAuto: false,
          title: "Error",
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
    this.logica.obtenerNumeros(this.lot).then((data) => {
      if (data['success']) {
        this.numeros = data["message"].filter(x => (x.Disponible === null || x.Disponible > 0));
        this.loadingCtrl.dismiss();
      } else {
        this.loadingCtrl.dismiss();
      }
    }).catch(e => {
      this.loadingCtrl.dismiss();
      console.log('Error');
    });
  }
  eliminarNum(idNumero) {
    this.changeRef.detectChanges();
    this.loadingCtrl.present();
    for (var i = 0; i < this.arrayNumeros.length; i++) {
      if (this.arrayNumeros[i] == idNumero) {
        //this.sum = this.sum-this.apuestas[i][2];
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
    slides.slideTo(num); // slide to next
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
    this.changeRef.detectChanges();
  }

  buscarNumeroR(numero) {
    if (this.arrayNumeros.filter(x => x === numero).length == 0) {
      return true;
    } else {
      return false;
    }
    this.changeRef.detectChanges();
  }


  buscarNumeroRepetido(numero) {
    if (this.apuestas.filter(x => x[0] === numero).length == 0) {
      return true;
    } else {
      return false;
    }
    this.changeRef.detectChanges();
  }
  montosPais() {
    this.logica.montosPais(this.lot).then((data) => {
      if (data["success"]) {
        this.montospPais = data["message"].montos;

        this.nombrePais = data["message"].nombre;
        this.montos = this.montospPais.split(";");
      }
    }).catch(e => {
      this.loadingCtrl.dismiss();
    });
  }
  vender(monto) {
    this.changeRef.detectChanges();
    this.apuestas.push([this.result, 2, monto, this.idLoteriaPais]);
    this.changeRef.detectChanges();
  }

  enviar() {
    console.log(this.sum, 'monto');
    console.log(this.lot, 'lot')
    if (this.monto) {
      if (this.lot) {
        if (this.apuestas.length > 0) {
          var texto = '';
          texto = texto + '___ ' + this.nombrePais + ' ___</b><br/>';
          for (var i = 0; i < this.apuestas.length; i++) {
            if (this.apuestas[i][2] != 0) {
              texto = texto + ' #' + this.apuestas[i][0] + ' TQC ' + this.apuestas[i][2] + '</b><br/>';
            }
          }

          texto = texto + '</b><br/>' + '___' + '</b><br/>' + 'Total TQC ' + this.sum.toFixed(2)



          const lotSeleccionada = this.loterias.filter(x => x.idProgramacion === this.lot);
          
          let numeros = lotSeleccionada[0].primerNumero.toString();

          if (lotSeleccionada[0].segundoNumero !== 0) {
            numeros += '/' + lotSeleccionada[0].segundoNumero;
          }
          if (lotSeleccionada[0].tercerNumero !== 0) {
            numeros += '/' + lotSeleccionada[0].tercerNumero;
          }
      
          const nombreLOT = `${lotSeleccionada[0].nombreLoteria} ${lotSeleccionada[0].hora} - x ${numeros}`;
          
          
          
          swal.fire({
            heightAuto: false,
            title: nombreLOT + "</b><br/>Confirmar",
            html: texto,
            type: 'info',
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

                this.logica.enviarLoterias(this.sum, this.lot, this.apuestas, this.jugador, nombreLOT).then((data) => {
                  this.errores = '';
                  if (data['success']) {
                    //Limpio todoslos campos
                    this.apuestas = [];
                    this.sum = 0;
                    this.result = '';
                    this.changeRef.detectChanges();

                    console.log()

                    if (data['message'][0] == 200) {
                      this.obtenerNumeros();
                      this.loadingCtrl.dismiss();

                      //Si vienen errores
                      if (data['message'][2]) {
                        for (var i = 0; i < data['message'][2].length; i++) {
                          this.errores = this.errores + 'Número ' + data['message'][2][i][0] + ' restringido. <br>';
                        }
                      }
                      //Se registró la apuesta correctamente, factura #"+data['message'][1]+'<br>'+this.errores
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
                          this.errores = this.errores + 'Número ' + data['message'][2][i][0] + ' restringido. <br>';
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
                      text: "Error al registrar.",
                      confirmButtonText: 'Ok'
                    })
                  }
                }).catch(e => {
                  this.loadingCtrl.dismiss();
                  console.log('Error', e);
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
            text: "No hay números para apostar",
            confirmButtonText: 'Ok'
          })
        }
      } else {
        swal.fire({
          title: "Error",
          heightAuto: false,
          text: "Seleccione sorteo",
          confirmButtonText: 'Ok'
        })
      }
    } else {
      swal.fire({
        title: "Error",
        heightAuto: false,
        text: "Seleccione monto",
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
