import { Injectable } from '@angular/core';
import { environment } from '../environment.prod';

import { HttpClient, HttpHeaders, HttpParamsOptions } from '@angular/common/http';
import swal from 'sweetalert2';
import { Device } from '@ionic-native/device/ngx';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import * as jwt_decode from 'jwt-decode';

declare let window: any; // <--- Declare it like this
@Injectable({
  providedIn: 'root'
})
export class UserService {
  env = environment;
  username = '';
  isAuthenticated = false;
  authToken = '';
  pushToken = '';
  tokenActual = '';
  LOCAL_TOKEN_KEY = 'AppTique';
  USER = 'user';
  PASS = 'pass';
  PAIS = 'pais';
  actualDevice = [];

  constructor(public http: HttpClient, private device: Device, private router: Router) {
  }

  loadUserCredentials() {
    var token = window.localStorage.getItem(this.LOCAL_TOKEN_KEY);
    if (token) {
      this.useCredentials(token);
    }
  };

  storeUserCredentials(token) {
    if (token === undefined) {
      this.destroyUserCredentials();
    } else {
      window.localStorage.setItem(this.LOCAL_TOKEN_KEY, token);
      this.useCredentials(token);
    }
  };

  getToken = function () {
    return window.localStorage.getItem(this.LOCAL_TOKEN_KEY);
  };
  getUser = function () {
    return window.localStorage.getItem(this.USER);
  };
  getPass = function () {
    return window.localStorage.getItem(this.PASS);
  };
  getPais = function () {
    return window.localStorage.getItem(this.PAIS);
  };



  setTokenPush(token) {
    this.pushToken = token;
  };

  useCredentials(token) {
    this.username = token.split('.')[0];
    this.isAuthenticated = true;
    this.authToken = token;
  };


  destroyUserCredentials() {
    this.authToken = undefined;
    this.username = '';
    this.isAuthenticated = false;
    window.localStorage.removeItem(this.LOCAL_TOKEN_KEY);
    this.router.navigateByUrl(`${'/login'}`);
  };

  createAuthorizationHeader(headers: HttpHeaders) {
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
  }

  login(nickname: string, pw: string, token: string, pais: string): Promise<{ success: boolean; message: string }> {
    return new Promise((resolve, reject) => {
      // Configurar dispositivo dependiendo del entorno
      if (typeof window.cordova === 'undefined') {
        this.actualDevice = [{ uuid: '000000000', platform: 'dev-browser' }];
      } else {
        this.actualDevice = [{ uuid: this.device.uuid, platform: this.device.platform }];
      }

      // Crear cuerpo de la solicitud
      const bodyCM = {
        usuario: nickname,
        contrasena: pw,
        token: token,
        pais: Number(pais),
        uuid: this.actualDevice[0].uuid,
        type: this.actualDevice[0].platform,
      };

      console.log('Datos de usuario:', bodyCM);

      // Almacenar datos localmente
      window.localStorage.setItem(this.USER, nickname);
      window.localStorage.setItem(this.PASS, pw);
      window.localStorage.setItem(this.PAIS, pais);

      // Configuración de cabeceras HTTP
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      };

      // Realizar la solicitud HTTP
      this.http.post(environment.lambdas.login, bodyCM, httpOptions).subscribe({
        next: (data: any) => {
          console.log('Respuesta completa:', data);

          try {
            // Manejo de body dependiendo de su formato
            const response = typeof data.body === 'string' ? JSON.parse(data.body) : data.body;
            console.log('Token recibido:', response.token);
            this.storeUserCredentials(response.token);

            // Resolver con éxito
            resolve({ success: true, message: response.token });
          } catch (error) {
            console.error('Error al procesar la respuesta:', error);
            resolve({ success: false, message: 'Error al procesar la respuesta del servidor.' });
          }
        },
        error: (err: any) => {
          console.error('Error en la solicitud HTTP:', err);
          resolve({ success: false, message: 'Error en la solicitud: ' + err.message });
        },
      });
    });
  }
  logout() {
    return new Promise((resolve, reject) => {
      const httpOptions = {
        headers: new HttpHeaders({
          'X-Auth-Token': this.getToken()
        })
      };

        this.destroyUserCredentials();
        resolve({ success: true, message: "" });

      /*this.http.get(this.env.SERVIDOR + "api/logout", httpOptions)
        .subscribe((data) => {
          this.destroyUserCredentials();
          resolve({ success: true, message: "" });
        },
          (err) => {
            this.destroyUserCredentials();
            resolve({ success: true, message: "" });
          });
*/

    });

  }


  recuperarPass(datos) {

    return new Promise((resolve, reject) => {

      let bodyCM = JSON.stringify({
        "email": datos.email,
      });

      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded'
        })
      };
      this.http.post(this.env.SERVIDOR + "Auth/recovery", bodyCM, httpOptions)
        .subscribe((data) => {

          this.authToken = data['token'];
          this.storeUserCredentials(this.authToken);
          resolve({ success: true, message: "" });
        },
          (err) => {
            let error = err;
            resolve({ success: false, message: error });
          });
    });
  }
  registro(datos) {

    return new Promise((resolve, reject) => {

      let bodyCM = {
        "nickname": datos.nickname,
        "telefono": datos.telefono,
        "contrasena": datos.contrasena,
        "pais": datos.pais,
        "nombre": datos.nombre,
        "identificacion": datos.identificacion,
        "correo": datos.correo,
      };

      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded'
        })
      };
      this.http.post(this.env.lambdas.app + "registro", bodyCM)
        .subscribe((data) => {
          console.log('response', data);
          this.authToken = data['token']
          if (data['success']) {
            this.storeUserCredentials(this.authToken);
          }
          resolve({ success: true, message: data });
        },
          (err) => {
            let error = err;
            resolve({ success: false, message: error.error.message });
          });
    });
  }
}
