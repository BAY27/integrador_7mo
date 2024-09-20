import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EstudiantesModalPageRoutingModule } from './estudiantes-modal-routing.module';

import { EstudiantesModalPage } from './estudiantes-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EstudiantesModalPageRoutingModule
  ],
  declarations: [EstudiantesModalPage]
})
export class EstudiantesModalPageModule {}
