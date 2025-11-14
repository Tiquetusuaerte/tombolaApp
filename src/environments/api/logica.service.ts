import { UserService } from './user.service';
import { Injectable } from '@angular/core';
import { environment } from '../environment.prod';
import { HttpClient, HttpHeaders, HttpParamsOptions } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LogicaService {
  NOMBRE = 'NAME';
  env = environment;
  constructor(private http: HttpClient, private router: Router, private user: UserService) { }

  getName = function () {
    return window.localStorage.getItem(this.NOMBRE);
  };
  obtenerLoterias() {
    return new Promise((resolve, reject) => {
      const httpOptions = {
        headers: new HttpHeaders({
          'X-Auth-Token': this.user.getToken()
        })
      };

      this.http.get(this.env.lambdas.app + "programacion", httpOptions)
        .subscribe((data) => {
          console.log('data', data)
          resolve({ success: true, message: data });
        });
    });
  }

  obtenerCategoriasPale() {
    return new Promise((resolve, reject) => {
      const httpOptions = {
        headers: new HttpHeaders({
          'X-Auth-Token': this.user.getToken()
        })
      };

      this.http.get(this.env.SERVIDOR + "api/obtenerCategoriasPale", httpOptions)
        .subscribe((data) => {
          resolve({ success: true, message: data });
        });
    });
  }
  obtenerCategoriasTM() {
    return new Promise((resolve, reject) => {
      const httpOptions = {
        headers: new HttpHeaders({
          'X-Auth-Token': this.user.getToken()
        })
      };

      this.http.get(this.env.lambdas.app + "obtenerCategoriasTM", httpOptions)
        .subscribe((data) => {
          resolve({ success: true, message: data });
        });
    });
  }
  obtenerSorteosPale() {
    return new Promise((resolve, reject) => {
      const httpOptions = {
        headers: new HttpHeaders({
          'X-Auth-Token': this.user.getToken()
        })
      };

      this.http.get(this.env.lambdas.app + "sorteosPale", httpOptions)
        .subscribe((data) => {
          resolve({ success: true, message: data });
        },
          (err) => {
            let error = err;
            resolve({ success: false, message: error });
          });
    });
  }

  obtenerSorteosTresMonazos() {
    return new Promise((resolve, reject) => {
      const httpOptions = {
        headers: new HttpHeaders({
          'X-Auth-Token': this.user.getToken()
        })
      };

      this.http.get(this.env.lambdas.app + "sorteosTresMonazos", httpOptions)
        .subscribe((data) => {
          resolve({ success: true, message: data });
        },
          (err) => {
            let error = err;
            resolve({ success: false, message: error });
          });
    });
  }

  enviarCompraTM(idSorteoTM: any, monto: number, categoria: any, cantidad: any) {
    return new Promise((resolve, reject) => {
      const httpOptions = {
        headers: new HttpHeaders({
          'X-Auth-Token': this.user.getToken()
        })
      };

      this.http.post(this.env.lambdas.app + "compraTM2", { idSorteoTM, monto, categoria, cantidad }, httpOptions)
        .subscribe((data) => {
          resolve({ success: true, message: data });
        });
    });
  }

  obtenerAgentes() {
    return new Promise((resolve, reject) => {
      const httpOptions = {
        headers: new HttpHeaders({
          'X-Auth-Token': this.user.getToken()
        })
      };

      this.http.get(this.env.lambdas.app + "obtenerAgentes", httpOptions)
        .subscribe((data) => {
          resolve({ success: true, message: data });
        });
    });
  }

  enviarCompraPale(idSorteoPale: any, monto: number, categoria: number, cantidad: any) {
    return new Promise((resolve, reject) => {
      const httpOptions = {
        headers: new HttpHeaders({
          'X-Auth-Token': this.user.getToken()
        })
      };

      this.http.post(this.env.lambdas.app + "compraPale", { idSorteoPale, monto, categoria, cantidad }, httpOptions)
        .subscribe((data) => {
          resolve({ success: true, message: data });
        });
    });
  }


  obtenerReporteSorteosTombola() {
    return new Promise((resolve, reject) => {
      const httpOptions = {
        headers: new HttpHeaders({
          'X-Auth-Token': this.user.getToken()
        })
      };

      this.http.get(this.env.lambdas.app + "reporteSorteosTombola", httpOptions)
        .subscribe((data) => {
          resolve({ success: true, message: data });
        });
    });
  }
  obtenerReporteSorteos() {
    return new Promise((resolve, reject) => {
      const httpOptions = {
        headers: new HttpHeaders({
          'X-Auth-Token': this.user.getToken()
        })
      };

      this.http.get(this.env.lambdas.app + "reporteSorteos", httpOptions)
        .subscribe((data) => {
          resolve({ success: true, message: data });
        });
    });
  }

  buscarMonedero() {

    ///console.log('TOKEN',this.user.getToken());
    return new Promise((resolve, reject) => {

      const httpOptions = {
        headers: new HttpHeaders({
          'X-Auth-Token': this.user.getToken()
        })
      };
      let bodyCM = {};

      this.http.post(this.env.lambdas.app + "monedero", bodyCM, httpOptions)
        .subscribe(
          data => {
            console.log('data', data);
            const newDarta = data;
            console.log(newDarta[0]);
            resolve({ success: true, message: newDarta[0] });
          },
          err => {
            console.log('ERROR', err);

            resolve({ success: false, message: err });
          },
          () => console.log('yay')
        );
    });
  }

    verificarCodigo(identificacion,codigo) {

    return new Promise((resolve, reject) => {

      let bodyCM = {
        "codigo": codigo, 
        "identificacion": identificacion, 
      };

      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded'
        })
      };
      this.http.post(this.env.lambdas.app + "validarCodigo", bodyCM)
        .subscribe((data) => { 
          resolve({ success: true, message: data });
        },
          (err) => {
            let error = err;
            resolve({ success: false, message: error.error.message });
          });
    });
  }

   verificarCodigoOLD(cod: string){ 
      return new Promise((resolve, reject) => {
        const httpOptions = {
          headers: new HttpHeaders({
            'X-Auth-Token': this.user.getToken()
          })
        };
        let bodyCM = {
          "cod": cod,
        };

        this.http.post(this.env.lambdas.app + "validarCodigo", bodyCM, httpOptions)
          .subscribe((data) => {
            resolve({ success: true, message: data });
          });
      });
   }

   obtenerBanners( ) {
    return new Promise((resolve, reject) => {
      const httpOptions = {
        headers: new HttpHeaders({
          'X-Auth-Token': this.user.getToken()
        })
      }; 

      this.http.post(this.env.lambdas.app + "obtenerBanners", {}, httpOptions)
        .subscribe((data) => {
          let dataResult = data
          if (dataResult) {
            resolve({ success: true, message: data });
          } else {
            resolve({ success: false });
          }

        });
    });
  }

  obtenerNumerosListaCompra(idLista: string) {
    return new Promise((resolve, reject) => {
      const httpOptions = {
        headers: new HttpHeaders({
          'X-Auth-Token': this.user.getToken()
        })
      };
      let bodyCM = {
        "idLista": idLista,
      };

      this.http.post(this.env.lambdas.app + "obtenerNumerosListaCompra", bodyCM, httpOptions)
        .subscribe((data) => {
          let dataResult = data
          if (dataResult) {
            resolve({ success: true, message: data });
          } else {
            resolve({ success: false });
          }

        });
    });
  }
  obtenerNumerosLista(idLista: string) {
    return new Promise((resolve, reject) => {
      const httpOptions = {
        headers: new HttpHeaders({
          'X-Auth-Token': this.user.getToken()
        })
      };
      let bodyCM = {
        "idLista": idLista,
      };

      this.http.post(this.env.lambdas.app + "obtenerNumerosLista", bodyCM, httpOptions)
        .subscribe((data) => {
          let dataResult = data
          if (dataResult) {
            resolve({ success: true, message: data });
          } else {
            resolve({ success: false });
          }

        });
    });
  }

  agregarLista(nombre: any) {
    return new Promise((resolve, reject) => {
      const httpOptions = {
        headers: new HttpHeaders({
          'X-Auth-Token': this.user.getToken()
        })
      };
      let bodyCM = {
        "nombre": nombre,
      };

      this.http.post(this.env.lambdas.app + "agregarLista", bodyCM, httpOptions)
        .subscribe((data) => {
          let dataResult = data
          if (dataResult) {
            resolve({ success: true });
          } else {
            resolve({ success: false });
          }

        });
    });
  }
  editarPerfil(contrasena: string) {
    return new Promise((resolve, reject) => {
      const httpOptions = {
        headers: new HttpHeaders({
          'X-Auth-Token': this.user.getToken()
        })
      };
      let bodyCM = {
        "idCliente": 4,
        "contrasena": contrasena
      };

      this.http.post(this.env.lambdas.app + "cambiarPass", bodyCM, httpOptions)
        .subscribe((data) => {
          resolve({ success: true, message: data });
        });
    });
  }
  eliminarLista(idLista: any) {
    return new Promise((resolve, reject) => {
      const httpOptions = {
        headers: new HttpHeaders({
          'X-Auth-Token': this.user.getToken()
        })
      };
      let bodyCM = {
        "idLista": idLista,
      };

      this.http.post(this.env.lambdas.app + "eliminarLista", bodyCM, httpOptions)
        .subscribe((data) => {
          let dataResult = data
          if (dataResult) {
            resolve({ success: true });
          } else {
            resolve({ success: false, message: dataResult[1] });
          }
        });
    });
  }

  movimientos() {
    return new Promise((resolve, reject) => {
      const httpOptions = {
        headers: new HttpHeaders({
          'X-Auth-Token': this.user.getToken()
        })
      };
      let bodyCM = {};

      this.http.post(this.env.lambdas.app + "movimiento", bodyCM, httpOptions)
        .subscribe((data) => {
          resolve({ success: true, message: data });
        });
    });
  }
  movimientosTM() {
    return new Promise((resolve, reject) => {
      const httpOptions = {
        headers: new HttpHeaders({
          'X-Auth-Token': this.user.getToken()
        })
      };
      this.http.get(this.env.lambdas.app + "movimientosTM", httpOptions)
        .subscribe((data) => {
          resolve({ success: true, message: data });
        });
    });
  }
  movimientosPale() {
    return new Promise((resolve, reject) => {
      const httpOptions = {
        headers: new HttpHeaders({
          'X-Auth-Token': this.user.getToken()
        })
      };
      this.http.get(this.env.lambdas.app + "movimientosPale", httpOptions)
        .subscribe((data) => {
          resolve({ success: true, message: data });
        });
    });
  }
  obtenerReporteSorteosPale() {
    return new Promise((resolve, reject) => {
      const httpOptions = {
        headers: new HttpHeaders({
          'X-Auth-Token': this.user.getToken()
        })
      };

      this.http.get(this.env.lambdas.app + "resultadosPale", httpOptions)
        .subscribe((data) => {
          resolve({ success: true, message: data });
        });
    });
  }
  obtenerReporteSorteosTM() {
    return new Promise((resolve, reject) => {
      const httpOptions = {
        headers: new HttpHeaders({
          'X-Auth-Token': this.user.getToken()
        })
      };

      this.http.get(this.env.lambdas.app + "resultadosTM", httpOptions)
        .subscribe((data) => {
          resolve({ success: true, message: data });
        });
    });
  }

  detalleMovimiento(idMovimiento: string) {
    console.log('idMovimiento', idMovimiento);
    return new Promise((resolve, reject) => {
      const httpOptions = {
        headers: new HttpHeaders({
          'X-Auth-Token': this.user.getToken()
        })
      };
      let bodyCM = {
        "idVenta": idMovimiento,
      };

      this.http.post(this.env.lambdas.app + "detalleMovimiento", bodyCM, httpOptions)
        .subscribe((data) => {
          resolve({ success: true, message: data });
        });
    });
  }



  guardarConfiguracionLista(datos: any[], idLista: string) {
    return new Promise((resolve, reject) => {
      const httpOptions = {
        headers: new HttpHeaders({
          'X-Auth-Token': this.user.getToken()
        })
      };

      const body = {
        idLista: idLista,
        datos: datos
      };

      this.http.post(this.env.lambdas.app + "guardarConfiguracionLista", body, httpOptions)
        .subscribe((data) => {
          resolve({ success: true, message: data });
        });
    });
  }

  comprarConLista(datos: any, idLoteria: number,monto: number,nombreLoteria:string ) {
    return new Promise((resolve, reject) => {
      const httpOptions = {
        headers: new HttpHeaders({
          'X-Auth-Token': this.user.getToken()
        })
      };
 
      this.http.post(this.env.lambdas.app + "comprarConLista", { 
        "idProgramacion": idLoteria,
        "totalCompra": monto,
        "nombreLoteria": nombreLoteria,
        datos,
        jugador: 0
      }, httpOptions)
        .subscribe((data) => {
          resolve({ success: true, message: data });
        });
    });
  }
  enviarLoterias(monto: number, programacion: number, datos: any, jugador: string, nombreLoteria: string) {
    console.log(datos, jugador);
    return new Promise((resolve, reject) => {
      const httpOptions = {
        headers: new HttpHeaders({
          'X-Auth-Token': this.user.getToken()
        })
      };

      this.http.post(this.env.lambdas.app + "enviarLoterias",
        {
          "idProgramacion": programacion,
          "totalCompra": monto,
          "nombreLoteria": nombreLoteria,
          datos,
          jugador
        }, httpOptions)
        .subscribe((data) => {
          resolve({ success: true, message: data });
        });
    });
  }
  obtenerNumeros(idProgramacion: number) {

    return new Promise((resolve, reject) => {
      const httpOptions = {
        headers: new HttpHeaders({
          'X-Auth-Token': this.user.getToken()
        })
      };

      let bodyCM = {
        "idProgramacion": idProgramacion,
      };
      console.log('idProgramacion', idProgramacion)
      this.http.post(environment.lambdas.app + "obtenerNumerosProgramacion", bodyCM, httpOptions)
        .subscribe((data) => {

          resolve({ success: true, message: data });

        });
    });
  }

  montosPais(idProgramacion: string | number) {
    return new Promise((resolve, reject) => {
      const httpOptions = {
        headers: new HttpHeaders({
          'X-Auth-Token': this.user.getToken()
        })
      };
      let bodyCM = {
        "idProgramacion": idProgramacion,
      };
      this.http.post(environment.lambdas.app + "montosPaises", bodyCM, httpOptions)
        .subscribe((data) => {
          resolve({ success: true, message: data[0] });
        },
          (err) => {
            let error = err;
            resolve({ success: false, message: error });
          });
    });
  }
  cargarPaises() {

    return new Promise((resolve, reject) => {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded',

        })
      };
      this.http.get(environment.lambdas.paises, {})
        .subscribe((data) => {
          resolve({ success: true, message: data });
        },
          (err) => {
            let error = err;
            resolve({ success: false, message: error });
          });
    });
  }
  obtenerListas() {
    return new Promise((resolve, reject) => {
      const httpOptions = {
        headers: new HttpHeaders({
          'X-Auth-Token': this.user.getToken()
        })
      };

      this.http.get(this.env.lambdas.app + "obtenerListas", httpOptions)
        .subscribe((data) => {
          resolve({ success: true, message: data });
        });
    });
  }
}
