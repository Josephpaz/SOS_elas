import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContatosPageRoutingModule } from './contatos-routing.module';

import { ContatosPage } from './contatos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContatosPageRoutingModule
  ],
  declarations: [ContatosPage]
})
export class ContatosPageModule {}
