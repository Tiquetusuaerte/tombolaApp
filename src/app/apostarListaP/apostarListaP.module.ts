import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ApostarListaPPage } from './apostarListaP.page';

const routes: Routes = [
  {
    path: '',
    component: ApostarListaPPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ApostarListaPPage]
})
export class ApostarListaPPageModule {}
