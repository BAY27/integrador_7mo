import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChoferesPageRoutingModule } from './choferes-routing.module';

import { ChoferesPage } from './choferes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChoferesPageRoutingModule
  ],
  declarations: [ChoferesPage]
})
export class ChoferesPageModule {}
