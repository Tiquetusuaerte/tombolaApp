import { LoadingService } from './../../environments/utilidades/loading-service.service';
import { Component, OnInit } from '@angular/core';
import { UserService } from './../../environments/api/user.service';
import { environment } from '../../environments/environment';
import swal from 'sweetalert2';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
    selector: 'app-recuperarPass',
    templateUrl: './recuperarPass.page.html',
    styleUrls: ['./recuperarPass.page.scss'],
    standalone: false
})
export class RecuperarPassPage {

  token = null;
  env = environment;
  isLoading = false;
  username = "";
  password = "";
  validation_messages :any = [];

  constructor(private user: UserService, public loadingCtrl: LoadingService, private platform: Platform, private router: Router) {
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
  recuperarPass(form){
    this.user.recuperarPass(form.value).then((data) => {
      if (data['success']) {
        swal.fire({ heightAuto: false,
          title: "¡Contraseña enviada con exito!",
          text: data['message'],
          type: 'error',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Aceptar'
        }).then((result) => {
          if (result.value) {
            this.router.navigateByUrl(`${'/login'}`);
          }
        })

      } else {
        swal.fire({ heightAuto: false,
          title: "¡Error al enviar el correo de recuperación!",
          text: data['message'],
          type: 'error',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Aceptar'
        }).then((result) => {
          if (result.value) {
          }
        })
      }
    }).catch(e => {
      console.log('Error');
    });
  }


}
