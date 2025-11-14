import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ResultadosTMPage } from './resultadosTM.page';

const routes: Routes = [
  {
    path: '',
    component: ResultadosTMPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ResultadosTMPage]
})
export class ResultadosTMPageModule {}
