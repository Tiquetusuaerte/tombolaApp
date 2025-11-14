import { AppComponent } from 'src/app/app.component';
import { UserService } from 'src/environments/api/user.service';
import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { LoadingService } from 'src/environments/utilidades/loading-service.service';
import { LogicaService } from 'src/environments/api/logica.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import htmlToPdfmake from "html-to-pdfmake";

import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
    selector: 'app-detalleMovimiento',
    templateUrl: './detalleMovimiento.page.html',
    styleUrls: ['./detalleMovimiento.page.scss'],
    standalone: false
})
export class DetalleMovimientoPage implements OnInit {

  letterObj = { to: '', from: '', text: '' };
  pdfObj = null;
  texto = '';
  jugador = '';
  movimiento: any = [];

  constructor(
    private file: File,
    private fileOpener: FileOpener,
    private changeRef: ChangeDetectorRef,
    private route: ActivatedRoute,
    private logica: LogicaService,
    public app: AppComponent,
    private user: UserService,
    public loadingCtrl: LoadingService,
    private platform: Platform,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.loadingCtrl.present();
      this.logica.detalleMovimiento(params.id).then((data) => {
        if (data['success']) {
          this.loadingCtrl.dismiss();
          this.movimiento = data['message'];

          if (this.movimiento[0].idClienteVentas == 0 || this.movimiento[0].idClienteVentas == null) {
            this.jugador = this.logica.getName();
          } else {
            this.jugador = this.movimiento[0].nombreJugador;
          }

          // 👇 Forzar actualización visual
          this.changeRef.detectChanges();
        }
      }).catch(e => {
        this.loadingCtrl.dismiss();
        console.error('Error', e);
      });
    });
  }

  createPdf(movimiento) {
    let texto = '';
    let total = 0;

    for (let i = 0; i < movimiento.length; i++) {
      texto += `
        <tr>
          <td style='border: none;width: 50%; text-align: right;'>#${this.texto}${movimiento[i].numero}</td>
          <td style='border: none;width: 50%; text-align: left;'>TQC${this.texto}${movimiento[i].monto}</td>
        </tr>
      `;
      total += parseInt(movimiento[i].monto, 10);
    }

    let jugador = '';
    if (movimiento[0].idClienteVentas == 0 || movimiento[0].idClienteVentas == null) {
      jugador = this.logica.getName();
    } else {
      jugador = movimiento[0].nombreJugador;
    }
    this.jugador = jugador;

    const html = htmlToPdfmake(`
      <!doctype html>
      <html lang="en">
      <head><meta charset="utf-8"></head>
      <body>
        <p style="text-align: center;">Tique global</p>
        <p style="text-align: center; margin:0px; padding:0px">Tiquete #${movimiento[0].idVenta}</p>
        <p style="text-align: center; margin:0px; padding:0px">Sorteo: ${movimiento[0].nombre}</p>
        <p style="text-align: center; margin:0px; padding:0px">Venta: ${movimiento[0].fecha}</p>

        <table cellspacing="0" cellpadding="0" style="border: none; height: 6px;">
          <tbody>
            ${texto}
          </tbody>
        </table>

        <p style="text-align: center;">TOTAL: TQC${total}</p>
      </body>
      </html>
    `, {
      tableAutoSize: true
    });

    const docDefinition = {
      pageMargins: [10, 10, 10, 10],
      pageSize: { width: 200, height: 'auto' },
      content: html,
    };

    this.pdfObj = pdfMake.createPdf(docDefinition);
  }

  downloadPdf(movimiento) {
    this.pdfObj.getBuffer((buffer) => {
      const blob = new Blob([buffer], { type: 'application/pdf;charset=utf-8;' });

      this.file.writeFile(this.file.dataDirectory, `${movimiento[0].idVenta}_.pdf`, blob, { replace: true }).then(fileEntry => {
        this.fileOpener.open(this.file.dataDirectory + `${movimiento[0].idVenta}_.pdf`, 'application/pdf');
      }).catch(err => {
        console.error('Error writing file', err);
      });
    });
  }

  descargarPDF() {
    this.createPdf(this.movimiento);
    this.downloadPdf(this.movimiento);
  }

  apostar() {
    this.router.navigateByUrl('/apostar');
  }

  inicio() {
    this.router.navigateByUrl('/inicio');
  }

  perfil() {
    this.router.navigateByUrl('/perfil');
  }

  detalleMovimiento() {
    this.router.navigateByUrl('/detalleMovimiento');
  }

  movimientos() {
    this.router.navigateByUrl('/movimientos');
  }
}
