import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EliminarChoferPageRoutingModule } from './eliminar-chofer-routing.module';

import { EliminarChoferPage } from './eliminar-chofer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EliminarChoferPageRoutingModule
  ],
  declarations: [EliminarChoferPage]
})
export class EliminarChoferPageModule {}
