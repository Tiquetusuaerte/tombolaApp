import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { DetalleMovimientoPage } from './detalleMovimiento.page';

const routes: Routes = [
  {
    path: '',
    component: DetalleMovimientoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DetalleMovimientoPage]
})
export class DetalleMovimientoPageModule {}
