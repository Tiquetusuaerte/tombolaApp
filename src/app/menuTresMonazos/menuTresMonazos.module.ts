import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MenuTresMonazosPage } from './menuTresMonazos.page';

const routes: Routes = [
  {
    path: '',
    component: MenuTresMonazosPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MenuTresMonazosPage]
})
export class MenuTresMonazosPageModule {}
