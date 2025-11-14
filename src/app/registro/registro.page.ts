import { LoadingService } from './../../environments/utilidades/loading-service.service';
import { Component, OnInit } from '@angular/core';
import { UserService } from './../../environments/api/user.service';
import { environment } from '../../environments/environment';
import swal from 'sweetalert2';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { LogicaService } from 'src/environments/api/logica.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
  standalone: false
})
export class RegistroPage implements OnInit {

  token = null;
  env = environment;
  isLoading = false;
  username = "";
  paises = [];
  telefono = "";
  pais = "";
  password = "";
  codigoPais = "";
  validation_messages: any = [];

  constructor(private user: UserService, private logica: LogicaService, public loadingCtrl: LoadingService, private platform: Platform, private router: Router) {
    this.validation_messages = {
      'username': [
        { type: 'required', message: 'Username is required.' },
        { type: 'minlength', message: 'Username must be at least 5 characters long.' },
        { type: 'maxlength', message: 'Username cannot be more than 25 characters long.' },
        { type: 'pattern', message: 'Your username must contain only numbers and letters.' },
        { type: 'validUsername', message: 'Your username has already been taken.' }
      ],
      'name': [
        { type: 'required', message: 'Name is required.' }
      ],

    }
  }


  ionViewDidEnter() {
    this.platform.backButton.subscribe(() => {
      navigator['app'].exitApp();
    });
  }

  ionViewWillLeave() {
    this.platform.backButton.unsubscribe();
  }


  cambiarPais() {
    console.log('this.pais', this.pais);
    if (this.pais) {
      var registro = this.paises.filter(x => x.idPais === this.pais);
      this.codigoPais = registro[0].codigoPais;

      console.log(this.codigoPais);
    }
  }
  ngOnInit() {
    this.cargarPaises();
    //this.token = this.user.getToken();
  }
  cargarPaises() {
    this.logica.cargarPaises().then((data) => {
      if (data["success"]) {
        this.paises = data["message"];
      }
    }).catch(e => {
      this.loadingCtrl.dismiss();
      console.log('Error');
    });
  }

  async verificarCodigo(ident: string, codigo: string) {
    if (!codigo) {
      swal.fire({
        title: 'Error',
        text: 'Debes ingresar el código',
        type: 'warning',
        confirmButtonColor: '#3085d6',
        heightAuto: false
      });
      return;
    }

    try {
      const data: any = await this.logica.verificarCodigo(ident, codigo);

      if (data.success) {
        swal.fire({
          title: '¡Cuenta activada!',
          text: 'Ahora puedes iniciar sesión',
          type: 'success',
          confirmButtonColor: '#3085d6',
          heightAuto: false
        }).then(() => {
          this.router.navigateByUrl('/login');
        });
      } else {
        swal.fire({
          title: 'Código incorrecto',
          text: data.msg,
          type: 'error',
          confirmButtonColor: '#3085d6',
          heightAuto: false
        });
      }
    } catch (err) {
      console.error(err);
      swal.fire({
        title: 'Error',
        text: 'No se pudo verificar el código',
        type: 'error',
        confirmButtonColor: '#3085d6',
        heightAuto: false
      });
    }
  }


  register(form) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (form.value.nickname.includes(" ")) {
      swal.fire({
        heightAuto: false,
        title: "¡Nombre inválido!",
        text: 'El nombre de usuario no puede contener espacios.',
        type: 'error',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Aceptar'
      });
      return;
    } else if (form.value.nickname.trim() == ""
      || form.value.contrasena.trim() == ""
      || form.value.telefono == "" || form.value.pais == "") {
      swal.fire({
        heightAuto: false,
        title: "¡Datos requeridos!",
        text: '',
        type: 'error',
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Aceptar'
      }).then((result) => {
        if (result.value) {
        }
      })
    } else if (!emailRegex.test(form.value.correo.trim())) {
      swal.fire({
        heightAuto: false,
        title: "¡Correo inválido!",
        text: 'Por favor ingrese un correo electrónico válido.',
        type: 'error',
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Aceptar'
      }).then((result) => {
        if (result.value) {
        }
      })
    } else {

      const n = form.value.nickname;
      const c = form.value.contrasena;
      const p = form.value.pais;
      const ident = form.value.identificacion;

      this.user.registro(form.value).then((data) => {
        if (data['message'].success) {

          if (data['message'].success) {

            swal.fire({
              title: 'Verifica tu cuenta',
              text: 'Se envió un código a tu correo. Ingresa el código para activar tu cuenta:',
              input: 'text',
              inputPlaceholder: 'Código de verificación',
              confirmButtonText: 'Verificar',
              showCancelButton: true,
              cancelButtonText: 'Cancelar',
              heightAuto: false,
              preConfirm: async (codigo) => {
                if (!codigo) {
                  swal.showValidationMessage('Debes ingresar un código');
                  return false;
                }
                try {
                  const data: any = await this.logica.verificarCodigo(ident, codigo);

                  if (data.success) {
                    const montosPorPais = {
                      1: 1000,  // Costa Rica
                      2: 70,    // Nicaragua
                      3: 2,    // Salvador
                      4: 4000,  // Colombia
                      5: 2000,  // Argentina
                      6: 15,    // Guatemala
                      7: 180    // Venezuela
                    };

                    const monto = montosPorPais[p] || 0;
                    const mensajeWSCR = encodeURIComponent(`Hola, soy un nuevo usuario registrado en Tiqué y deseo solicitar el bono de bienvenida de TQC ${monto.toLocaleString()}.`);
                    const mensajeWSNI = encodeURIComponent(`Hola, soy un nuevo usuario registrado en Tiqué.`);

                    const numNic = "50589303906";
                    const numCr = "50685884783"
                    const linkWhatsApp = `https://wa.me/${p !== 2 ? numCr : numNic}?text=${p !== 2 ? mensajeWSCR : mensajeWSNI}`;
                    const mensajeBTN = p !== 2 ? "Solicitar bono por WhatsApp" : 'Contactar a servicio al cliente.'

                    let bonoHTML = '';

                    if (p !== 2) {
                      bonoHTML = `
             <p>Para recibir tu <strong>bono de bienvenida</strong> de:</p>
             <h2 style="color: green; font-size: 32px; margin: 15px 0;">TQC ${monto.toLocaleString()}</h2>
           `;
                    }




                    swal.fire({
                      title: '¡Bienvenido a Tiqué!',

                      html: `
               <p>¡Felicidades por registrarte!</p>
               ${bonoHTML}
               <p>Debes escribir a nuestro Servicio al Cliente.</p>
               <a href="${linkWhatsApp}" target="_blank" style="display: inline-block; margin-top: 15px; background-color: #25D366; color: white; padding: 10px 20px; border-radius: 5px; text-decoration: none; font-weight: bold;">
                  ${mensajeBTN} 
               </a>
             `,
                      type: 'success',
                      confirmButtonText: '¡Empezar a Jugar!',
                      confirmButtonColor: '#3085d6',
                      heightAuto: false,
                      customClass: {
                        popup: 'swal2-rounded',
                      }
                    }).then((result) => {
                      if (result.value) {
                        window.location.href = linkWhatsApp;
                        //this.loginClick(n, c, p);
                      }
                    });
                     return false;
                  } else {
                    swal.showValidationMessage('Código incorrecto');
                    return false; // ❌ no cierra el modal
                  }
                } catch (error) {
                  swal.showValidationMessage('Error al verificar el código');
                  return false;
                }
              }
            }).then((result: any) => {
              if (result.isConfirmed) {
                swal.fire('¡Cuenta activada!', 'Ahora puedes iniciar sesión', 'success')
                  .then(() => this.router.navigateByUrl('/login'));
              } else {
                swal.showValidationMessage('Error al verificar el código');
                // return false;
              }
            });


            // this.nuevoIdCliente = data['message'].nuevo_idCliente;

            /*swal.fire({
              title: 'Verifica tu cuenta',
              text: 'Se envió un código a tu correo. Ingresa el código para activar tu cuenta:',
              input: 'text', // <- aquí se crea el input nativo de SweetAlert2
              inputPlaceholder: 'Código de verificación',
              confirmButtonText: 'Verificar',
              showCancelButton: true,
              cancelButtonText: 'Cancelar',
              heightAuto: false
            }).then(async (result) => {
              if (result.value) { // <- aquí está el valor ingresado
                const codigo = result.value;
                try {
                  await this.verificarCodigo(ident,codigo); // Llamada a tu función
                  swal.fire('¡Éxito!', 'Tu cuenta fue verificada.', 'success');
                } catch (error) {
                  swal.fire('Error', 'Código incorrecto o expirado.', 'error');
                }
              }
            });
      
      
      */
          }
          /* const montosPorPais = {
             1: 1000,  // Costa Rica
             2: 70,    // Nicaragua
             3: 2,    // Salvador
             4: 4000,  // Colombia
             5: 2000,  // Argentina
             6: 15,    // Guatemala
             7: 180    // Venezuela
           };
 
           const monto = montosPorPais[p] || 0;
           const mensajeWSCR = encodeURIComponent(`Hola, soy un nuevo usuario registrado en Tiqué y deseo solicitar el bono de bienvenida de TQC ${monto.toLocaleString()}.`);
           const mensajeWSNI = encodeURIComponent(`Hola, soy un nuevo usuario registrado en Tiqué.`);
 
           const numNic = "50589303906";
           const numCr = "50685884783"
           const linkWhatsApp = `https://wa.me/${p !== 2 ? numCr : numNic}?text=${p !== 2 ? mensajeWSCR : mensajeWSNI}`;
           const mensajeBTN = p !== 2 ? "Solicitar bono por WhatsApp" : 'Contactar a servicio al cliente.'
 
           let bonoHTML = '';
 
           if (p !== 2) {
             bonoHTML = `
             <p>Para recibir tu <strong>bono de bienvenida</strong> de:</p>
             <h2 style="color: green; font-size: 32px; margin: 15px 0;">TQC ${monto.toLocaleString()}</h2>
           `;
           }
 
 
 
 
           swal.fire({
             title: '¡Bienvenido a Tiqué!',
 
             html: `
               <p>¡Felicidades por registrarte!</p>
               ${bonoHTML}
               <p>Debes escribir a nuestro Servicio al Cliente.</p>
               <a href="${linkWhatsApp}" target="_blank" style="display: inline-block; margin-top: 15px; background-color: #25D366; color: white; padding: 10px 20px; border-radius: 5px; text-decoration: none; font-weight: bold;">
                  ${mensajeBTN} 
               </a>
             `,
             type: 'success',
             confirmButtonText: '¡Empezar a Jugar!',
             confirmButtonColor: '#3085d6',
             heightAuto: false,
             customClass: {
               popup: 'swal2-rounded',
             }
           }).then((result) => {
             if (result.value) { 
                window.location.href = linkWhatsApp;
               //this.loginClick(n, c, p);
             }
           });
           */
        } else {
          swal.fire({
            heightAuto: false,
            title: "¡Error al registrarse!",
            text: data['message'].msg,
            type: 'error',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Aceptar'
          });
        }
      }).catch(e => {
        console.log('Error');
      });
    }
  }

  linkWhatsApp() { }

  async loginClick(nickname, pass, pai) {

    this.loadingCtrl.present();

    try {
      const data = await this.user.login(nickname, pass, '', pai);
      this.loadingCtrl.dismiss();

      if (data?.success) {
        const dataPais = this.paises.find((x) => x.idPais === Number(this.pais));
        if (dataPais) {
          localStorage.setItem('politicas', dataPais.politicas);
        }
        this.router.navigateByUrl('/inicio');
      } else {
        swal.fire({
          title: '¡Autentificación Fallida!',
          text: 'Escribir al WhatsApp de servicio al cliente +506 8588 4783.',
          type: 'error',
          confirmButtonColor: '#3085d6',
          heightAuto: false,
        });
      }
    } catch (error) {
      this.loadingCtrl.dismiss();
      console.error('Error en login:', error);
    }
  }

  recuperarClave() {
    this.router.navigateByUrl(`${'/recuperar'}`);
  }



}
