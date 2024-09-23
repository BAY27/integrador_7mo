import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServicioRutaPage } from './servicio-ruta.page';

const routes: Routes = [
  {
    path: '',
    component: ServicioRutaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServicioRutaPageRoutingModule {}
