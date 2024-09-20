import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BusModalPage } from './bus-modal.page';

const routes: Routes = [
  {
    path: '',
    component: BusModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BusModalPageRoutingModule {}
