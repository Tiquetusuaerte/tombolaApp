import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ResultadosGolPage } from './resultadosGol.page';

const routes: Routes = [
  {
    path: '',
    component: ResultadosGolPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ResultadosGolPage]
})
export class ResultadosGolPageModule {}
