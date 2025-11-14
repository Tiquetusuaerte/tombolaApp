import { AppComponent } from 'src/app/app.component';
import { UserService } from 'src/environments/api/user.service';
import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { LoadingService } from 'src/environments/utilidades/loading-service.service';
import { LogicaService } from 'src/environments/api/logica.service';
import { ChangeDetectorRef } from '@angular/core';
import swal from 'sweetalert2';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
@Component({
    selector: 'app-tresMonazos',
    templateUrl: './tresMonazos.page.html',
    styleUrls: ['./tresMonazos.page.scss'],
    standalone: false
})
export class TresMonazosPage {

  sorteos: any = [];
  categorias: any = [];
  montos: any = [];



  prueba: any = [];



  sorteo: 0;
  monto: 0;
  categoria = 0;
  cantidad: any = [];

  primero = '';
  segundo = '';
  tercero = '';

  numSelect = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  constructor(private changeRef: ChangeDetectorRef, private logica: LogicaService, public app: AppComponent, private user: UserService, public loadingCtrl: LoadingService, private platform: Platform, private router: Router) {

    var cant = this.cantidad.length;
    this.cantidad.push({ 'primero': 'primero' + cant, 'segundo': 'segundo' + cant, 'tercero': 'tercero' + cant });

  }

  ngOnInit() {
    this.loadingCtrl.present();
    this.obtenerSorteosTresMonazos();
    this.obtenerCategorias();
    this.obtenerMontos();
  }

  obtenerMontos() {
    this.logica.montosPais('').then((data) => {
      if (data['success']) {
        this.montos = data["message"].montosTM;
        this.montos = this.montos.split(";");
        this.loadingCtrl.dismiss();
      }
    }).catch(e => {
      this.loadingCtrl.dismiss();
      console.log('Error');
    });
  }
  obtenerCategorias() {
    this.logica.obtenerCategoriasTM().then((data) => {
      if (data['success']) {
        this.categorias = data["message"];
        this.loadingCtrl.dismiss();
      }
    }).catch(e => {
      this.loadingCtrl.dismiss();
      console.log('Error');
    });
  }

  repetidos(arr) {
    return arr.some(function (v, i) { return arr.indexOf(v, i + 1) > -1 })
  }



 




  comprar() {
    var cant = this.cantidad.length;
    var texto = '';
    var entro = 0;

    //VERIFICAR LA CANTIDAD DE COLECCIONES QUE AGREGARON


      this.cantidad.forEach((value) => {

      texto = texto + '#' + value.primero + ''+ value.segundo  + '' +value.tercero+' x'+this.monto+'<br/>';



      if (!Number.isFinite(value.primero) || !Number.isFinite(value.segundo) || !Number.isFinite(value.tercero)) {
        swal.fire({
          title: "Error",
          heightAuto: false,
          text: 'Todos los datos son requeridos',
          confirmButtonText: 'Ok'
        })
      }else{
        var arr = [value.primero, value.segundo, value.tercero];

        if (arr.some(function (v, i) { return arr.indexOf(v, i + 1) > -1 }) && (this.categoria['idCategoriaTM'] == 2 || this.categoria['idCategoriaTM'] == 3)) {
          swal.fire({
            title: "Error",
            heightAuto: false,
            text: 'En esta modalidad no debe haber numeros repetidos',
            confirmButtonText: 'Ok'
          })
        } else {
          entro = entro+1;
          console.log('entro',entro);
          console.log('cant',cant);
          if(entro == cant){
            console.log('realizar proceso de compra');
            if (this.sorteo && this.monto && this.categoria) {
              var texto2 = '';
              texto2 = texto2 + '<br/>--- ' + this.sorteo['nombre'] + ' ---<br/>',
                texto2 = texto2 + '<br/> Formato: ' + this.categoria['nombre'] + '<br/><br/>',
                texto2 = texto2 + texto,
                texto2 = texto2 + '<br/>' + 'TQC ' + this.monto*cant + '<br/>';
        
              if (this.categoria['idCategoriaTM'] == 2 || this.categoria['idCategoriaTM'] == 3) {
                //tengo que validar los numeros no sean iguales
                var l1 = [this.primero, this.segundo, this.tercero]
        
             
                  swal.fire({
                    title: "</b><br/>Confirmar",
                    html: texto2,
                    type: 'info',
                    showCancelButton: true,
                    heightAuto: false,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Aceptar',
                    cancelButtonText: 'Corregir'
                  }).then((result) => {
                    if (result.value) {
                      this.logica.enviarCompraTM(this.sorteo['idSorteoTM'], this.monto*cant , this.categoria['idCategoriaTM'], this.cantidad).then((data) => {
                        if (data['success']) {
                          if (data['message'][0] == 200) {
        
                            this.sorteo = 0;
                            this.monto = 0;
                            this.categoria = 0;
        
                            this.primero = '';
                            this.segundo = '';
                            this.tercero = '';

                           this.cantidad = [];
                          this.cantidad.push({ 'primero': 'primero' + cant, 'segundo': 'segundo' + cant, 'tercero': 'tercero' + cant });


                            swal.fire({
                              heightAuto: false,
                              title: "Exito",
                              html: data['message'][1],
                              confirmButtonText: 'Ok'
                            })
                            //this.router.navigateByUrl(`${'/menuTresMonazos'}`);
                          } else {
                            swal.fire({
                              title: "Error",
                              heightAuto: false,
                              html: data['message'][1],
                              confirmButtonText: 'Ok'
                            })
                          }
                          this.loadingCtrl.dismiss();
        
                        }
                      }).catch(e => {
                        this.loadingCtrl.dismiss();
                        console.log('Error');
                      });
                    }
        
                  })
               
        
              } else {
                swal.fire({
                  title: "</b><br/>Confirmar",
                  html: texto2,
                  type: 'info',
                  showCancelButton: true,
                  heightAuto: false,
                  confirmButtonColor: '#3085d6',
                  cancelButtonColor: '#d33',
                  confirmButtonText: 'Aceptar',
                  cancelButtonText: 'Corregir'
                }).then((result) => {
                  if (result.value) {
                    this.logica.enviarCompraTM(this.sorteo['idSorteoTM'], this.monto*cant , this.categoria['idCategoriaTM'],this.cantidad).then((data) => {
                      if (data['success']) {
                        if (data['message'][0] == 200) {
                          this.sorteo = 0;
                          this.monto = 0;
                          this.categoria = 0;
        
                          this.primero = '';
                          this.segundo = '';
                          this.tercero = '';


                          this.cantidad = [];
                          this.cantidad.push({ 'primero': 'primero' + cant, 'segundo': 'segundo' + cant, 'tercero': 'tercero' + cant });

                          swal.fire({
                            heightAuto: false,
                            title: "Exito",
                            text: data['message'][1],
                            confirmButtonText: 'Ok'
                          })
                        } else {
                          swal.fire({
                            title: "Error",
                            heightAuto: false,
                            text: data['message'][1],
                            confirmButtonText: 'Ok'
                          })
                        }
                        this.loadingCtrl.dismiss();
                        //this.router.navigateByUrl(`${'/menuTresMonazos'}`);
                      }
                    }).catch(e => {
                      this.loadingCtrl.dismiss();
                      console.log('Error');
                    });
                  }
        
                })
              }
        
            } else {
              swal.fire({
                title: "Error",
                heightAuto: false,
                text: 'Todos los datos son requeridos',
                confirmButtonText: 'Ok'
              })
            }
          }
          
        }
      }
    });
  }

 
  compra(){
  
  }
  
  obtenerSorteosTresMonazos() {
    this.logica.obtenerSorteosTresMonazos().then((data) => {
      if (data['success']) {
        this.sorteos = data["message"];
        this.loadingCtrl.dismiss();
      }
    }).catch(e => {
      this.loadingCtrl.dismiss();
      console.log('Error');
    });
  }
  movimientos() {
    this.router.navigateByUrl(`${'/movimientos'}`);
  }

  agregar() {
    var cant = this.cantidad.length;
    this.cantidad.push({ 'primero': 'primero' + cant, 'segundo': 'segundo' + cant, 'tercero': 'tercero' + cant });
    console.log(this.cantidad);
  }
  eliminar() {
    this.cantidad.pop();
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