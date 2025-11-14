import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { MovimientosTMPage } from './movimientosTM.page';

const routes: Routes = [
  {
    path: '',
    component: MovimientosTMPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MovimientosTMPage]
})
export class MovimientosTMPageModule {}
