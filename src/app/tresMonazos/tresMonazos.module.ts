import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TresMonazosPage } from './tresMonazos.page';

const routes: Routes = [
  {
    path: '',
    component: TresMonazosPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TresMonazosPage]
})
export class TresMonazosPageModule {}
