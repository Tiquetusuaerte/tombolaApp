import { AppComponent } from 'src/app/app.component';
import { UserService } from 'src/environments/api/user.service';
import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { LoadingService } from 'src/environments/utilidades/loading-service.service';
import { LogicaService } from 'src/environments/api/logica.service';
import swal from 'sweetalert2';
import { AlertController } from '@ionic/angular';



@Component({
    selector: 'app-misClientes',
    templateUrl: './misClientes.page.html',
    styleUrls: ['./misClientes.page.scss'],
    standalone: false
})
export class MisClientesPage {

  clientes = [];
  cliente = [];

  constructor(public alertController: AlertController,private logica: LogicaService,public app: AppComponent, private user: UserService, public loadingCtrl: LoadingService, private platform: Platform, private router: Router) {
  }

  ionViewWillEnter(){
    this.misClientes();
  }
  async editarCliente(idCliente){

    this.cliente = this.clientes .filter(x => x.idClienteVentas === idCliente);
   const alert = await this.alertController.create({
     cssClass: 'my-custom-class',
     header: 'Editar usuario',
     inputs: [
       {
         name: 'nombre',
         type: 'text',
         id: 'nombre',
         placeholder: 'Nombre',
         value: this.cliente[0].nombre,
       },
       {
         name: 'telefono',
         type: 'text',
         id: 'telefono',
         placeholder: 'Teléfono',
         value: this.cliente[0].telefono,
       },
       {
         name: 'cedula',
         type: 'text',
         id: 'Cédulaa',
         placeholder: 'cedula',
         value: this.cliente[0].cedula,
       },
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
         text: 'Editar',
         handler: (alertData) => {
           this.editar(alertData.nombre,alertData.telefono,alertData.cedula,this.cliente[0].idClienteVentas);
         }
       }
     ]
   });

   await alert.present();
 }

 editar(nombre,telefono,cedula,idClienteVentas){
   /*this.loadingCtrl.present();
   this.logica.editarClienteVentas(nombre,telefono,cedula,idClienteVentas).then((data) => {
     this.loadingCtrl.dismiss();
     if(data['success']){
       swal.fire({
        heightAuto: false,
         title: "¡Éxito!",
         text:"Registro editado con éxito",
         type: 'success',
         showCancelButton: false,
         confirmButtonColor: '#3085d6',
         cancelButtonColor: '#d33',
         confirmButtonText: 'Aceptar'
       })
       this.misClientes();
     }else{
       swal.fire({
        heightAuto: false,
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
   });*/
 }


  misClientes() {
   /* this.loadingCtrl.present();
    this.logica.obtenerClientes().then((data) => {
      if (data['success']) {
       this.loadingCtrl.dismiss();
       if(data["success"]){
         this.clientes = data["message"];
       }
     }else{
       this.user.logout().then((data) => {
          this.loadingCtrl.dismiss();
       }).catch(e => {
         this.loadingCtrl.dismiss();
         console.log('Error');
       });
     }
    }).catch(e => {
      this.loadingCtrl.dismiss();
      console.log('Error');
    });*/
  }
  eliminarCliente(idClienteVentas) {
    /*swal.fire({
      heightAuto: false,
      title: "¿Eliminar cliente?",
      text: '',
      type: 'error',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar'
    }).then((result) => {
      if (result.value) {
        this.loadingCtrl.present();
        this.logica.eliminarCliente(idClienteVentas).then((data) => {
          this.loadingCtrl.dismiss();
          if(data['success']){
            swal.fire({
              heightAuto: false,
              title: "¡Éxito!",
              text: "Cliente eliminado con éxito",
              type: 'success',
              showCancelButton: false,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Aceptar'
            })
            this.misClientes();
          }else{
            swal.fire({
              heightAuto: false,
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

    })*/
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

}
