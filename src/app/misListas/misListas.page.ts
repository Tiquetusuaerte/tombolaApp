import { AppComponent } from 'src/app/app.component';
import { UserService } from 'src/environments/api/user.service';
import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { LoadingService } from 'src/environments/utilidades/loading-service.service';
import { LogicaService } from 'src/environments/api/logica.service';
import swal from 'sweetalert2';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute, Router,NavigationExtras } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
@Component({
    selector: 'app-misListas',
    templateUrl: './misListas.page.html',
    styleUrls: ['./misListas.page.scss'],
    standalone: false
})
export class MisListasPage {

  listas = [];
  nombreLoteria = '';
  jugador = '';
  errores = '';
  result = '';
  sum = 0;
  idLista = 0;
  apuestas: any = [];

  constructor(private changeRef: ChangeDetectorRef,public alertController: AlertController,private logica: LogicaService,public app: AppComponent, private user: UserService, public loadingCtrl: LoadingService, private platform: Platform,private route: ActivatedRoute, private router: Router,) {
  }

  ionViewWillEnter(){
    this.misListas();
  }

  async agregarLista(){
   const alert = await this.alertController.create({
     header: 'Agregar lista',
     cssClass: 'my-custom-class',
     inputs: [
       {
         name: 'nombre',
         type: 'text',
         id: 'nombre',
         placeholder: 'Nombre de la lista',
       }
     ],
     buttons: [
       {
         text: 'Cancelar',
         role: 'cancel',
         cssClass: 'secondary',
         handler: () => {
           console.log('');
         }
       }, {
         text: 'Guardar',
         handler: (alertData) => {
           this.guardar(alertData.nombre);

         }
       }
     ]
   });
   await alert.present();
 }
   guardar(nombre){
     this.loadingCtrl.present();
     this.logica.agregarLista(nombre).then((data) => {
       this.loadingCtrl.dismiss();
       if(data['success']){
         swal.fire({ heightAuto: false,
           title: "¡Éxito!",
           text:"Lista registrada con éxito",
           type: 'success',
           showCancelButton: false,
           confirmButtonColor: '#3085d6',
           cancelButtonColor: '#d33',
           confirmButtonText: 'Aceptar'
         })
         this.misListas();
       }else{
         swal.fire({ heightAuto: false,
           title: "Error",
           text: 'Error al registrar la lista',
           type: 'error',
           showCancelButton: false,
           confirmButtonColor: '#3085d6',
           cancelButtonColor: '#d33',
           confirmButtonText: 'Aceptar'
         })
       }
     }).catch(e => {
       this.loadingCtrl.dismiss();
       console.log('Error');
     });
   }
   eliminarLista(idLista) {
     swal.fire({ heightAuto: false,
       title: "¿Eliminar lista?",
       text: '',
       type: 'error',
       showCancelButton: true,
       confirmButtonColor: '#3085d6',
       cancelButtonColor: '#d33',
       confirmButtonText: 'Aceptar'
     }).then((result) => {
       if (result.value) {
         this.loadingCtrl.present();
         this.logica.eliminarLista(idLista).then((data) => {
           this.loadingCtrl.dismiss();
           if(data['success']){
             swal.fire({ heightAuto: false,
               title: "¡Éxito!",
               text: "Lista eliminada con éxito",
               type: 'success',
               showCancelButton: false,
               confirmButtonColor: '#3085d6',
               cancelButtonColor: '#d33',
               confirmButtonText: 'Aceptar'
             })
             this.misListas();
           }else{
             swal.fire({ heightAuto: false,
               title: "Error",
               text: data['message'],
               type: 'error',
               showCancelButton: false,
               confirmButtonColor: '#3085d6',
               cancelButtonColor: '#d33',
               confirmButtonText: 'Aceptar'
             })
           }
         }).catch(e => {
           this.loadingCtrl.dismiss();
           console.log('Error');
         });
       }

     })
   }
   misListas() {

     this.loadingCtrl.present();
     this.logica.obtenerListas().then((data) => {
     this.loadingCtrl.dismiss();
       if (data['success']) {
        this.loadingCtrl.dismiss();
        if(data["success"]){
          this.listas = data["message"];

        }
      }
     }).catch(e => {
       this.loadingCtrl.dismiss();
       console.log('Error');
     });
   }
  async comprarDefinidas(idTipoLista,nombre,tipo){

    let navigationExtras: NavigationExtras = {
      queryParams: {
        idTipoLista: JSON.stringify(idTipoLista),
        tipo: JSON.stringify(tipo),
        nombre: JSON.stringify(nombre)
      }
    };
    this.router.navigate(['aaa'], navigationExtras);
  } 
  comprarPredeterminada(idLista){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        idLista: JSON.stringify(idLista)
      }
    };
    this.router.navigate(['xxx'], navigationExtras); 
  }
  movimientos() {
    this.router.navigateByUrl(`${'/movimientos'}`);
  }
  configurarLista(idLista) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        idLista: JSON.stringify(idLista)
      }
    };
    this.router.navigate(['configurarLista'], navigationExtras);
  }
  comprar(idLista) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        idLista: JSON.stringify(idLista)
      }
    };
    this.router.navigate(['xxx'], navigationExtras);
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

}
