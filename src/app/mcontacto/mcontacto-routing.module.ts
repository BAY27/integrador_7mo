import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { McontactoPage } from './mcontacto.page';

const routes: Routes = [
  {
    path: '',
    component: McontactoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class McontactoPageRoutingModule {}
