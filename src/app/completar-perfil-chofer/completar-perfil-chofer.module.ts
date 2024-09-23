import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompletarPerfilChoferPageRoutingModule } from './completar-perfil-chofer-routing.module';

import { CompletarPerfilChoferPage } from './completar-perfil-chofer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CompletarPerfilChoferPageRoutingModule
  ],
  declarations: [CompletarPerfilChoferPage]
})
export class CompletarPerfilChoferPageModule {}
