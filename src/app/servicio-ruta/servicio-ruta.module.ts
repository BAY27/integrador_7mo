import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServicioRutaPageRoutingModule } from './servicio-ruta-routing.module';

import { ServicioRutaPage } from './servicio-ruta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ServicioRutaPageRoutingModule
  ],
  declarations: [ServicioRutaPage]
})
export class ServicioRutaPageModule {}
