import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TiqueGolPage } from './tiqueGol.page';

const routes: Routes = [
  {
    path: '',
    component: TiqueGolPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TiqueGolPage]
})
export class TiqueGolPageModule {}
