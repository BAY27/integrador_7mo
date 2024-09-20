import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EstudiantesModalPage } from './estudiantes-modal.page';

const routes: Routes = [
  {
    path: '',
    component: EstudiantesModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EstudiantesModalPageRoutingModule {}
