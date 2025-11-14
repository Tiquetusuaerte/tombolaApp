import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ResultadosPalePage } from './resultadosPale.page';

const routes: Routes = [
  {
    path: '',
    component: ResultadosPalePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ResultadosPalePage]
})
export class ResultadosPalePageModule {}
