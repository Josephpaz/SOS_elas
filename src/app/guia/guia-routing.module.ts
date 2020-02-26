import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GuiaPage } from './guia.page';

const routes: Routes = [
  {
    path: '',
    component: GuiaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GuiaPageRoutingModule {}
