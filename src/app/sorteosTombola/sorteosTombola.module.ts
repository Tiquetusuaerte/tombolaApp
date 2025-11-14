import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { SorteosTombolaPage } from './sorteosTombola.page';

const routes: Routes = [
  {
    path: '',
    component: SorteosTombolaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SorteosTombolaPage]
})
export class SorteosTombolaPageModule {}
