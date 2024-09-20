import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { McontactoPageRoutingModule } from './mcontacto-routing.module';

import { McontactoPage } from './mcontacto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    McontactoPageRoutingModule
  ],
  declarations: [McontactoPage]
})
export class McontactoPageModule {}
