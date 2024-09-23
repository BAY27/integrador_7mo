import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompletarPerfilChoferPage } from './completar-perfil-chofer.page';

const routes: Routes = [
  {
    path: '',
    component: CompletarPerfilChoferPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompletarPerfilChoferPageRoutingModule {}
