import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { Device } from '@ionic-native/device/ngx';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { FCM } from '@ionic-native/fcm/ngx'
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({ declarations: [AppComponent],
    bootstrap: [AppComponent], imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
        // ✅ Registra el Service Worker sin estrategia especial
        ServiceWorkerModule.register('ngsw-worker.js', {
            enabled: environment.production
        })], providers: [
        Device,
        FCM,
        StatusBar,
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
        File, FileOpener,
        provideHttpClient(withInterceptorsFromDi())
    ] })
export class AppModule { }
