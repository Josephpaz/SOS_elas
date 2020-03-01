import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { GuiaGuard } from './guards/guia.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
    canActivate: [GuiaGuard]
  },
  {
    //criei página guia
    path: 'guia',
    loadChildren: () => import('./guia/guia.module').then( m => m.GuiaPageModule)
  },  {
    path: 'contacts',
    loadChildren: () => import('./contacts/contacts.module').then( m => m.ContactsPageModule)
  }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
