import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { MovimientosPalePage } from './movimientosPale.page';

const routes: Routes = [
  {
    path: '',
    component: MovimientosPalePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MovimientosPalePage]
})
export class MovimientosPalePageModule {}
