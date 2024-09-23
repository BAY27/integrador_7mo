import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChoferesPage } from './choferes.page';

const routes: Routes = [
  {
    path: '',
    component: ChoferesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChoferesPageRoutingModule {}
