import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AgentesAutorizadosPage } from './agentesAutorizados.page';

const routes: Routes = [
  {
    path: '',
    component: AgentesAutorizadosPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AgentesAutorizadosPage]
})
export class AgentesAutorizadosPageModule {}
