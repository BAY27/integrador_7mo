import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'menu',
    loadChildren: () => import('./menu/menu.module').then( m => m.MenuPageModule)
  },
  {
    path: 'rclave',
    loadChildren: () => import('./rclave/rclave.module').then( m => m.RclavePageModule)
  },
  {
    path: 'registrar',
    loadChildren: () => import('./registrar/registrar.module').then( m => m.RegistrarPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
    path: 'contactos',
    loadChildren: () => import('./contactos/contactos.module').then( m => m.ContactosPageModule)
  },
  {
    path: 'contacto',
    loadChildren: () => import('./contacto/contacto.module').then( m => m.ContactoPageModule)
  },
  {
    path: 'econtacto',
    loadChildren: () => import('./econtacto/econtacto.module').then( m => m.EcontactoPageModule)
  },
  {
    path: 'mcontacto',
    loadChildren: () => import('./mcontacto/mcontacto.module').then( m => m.McontactoPageModule)
  },


  {
    path: 'menu-estudiante',
    loadChildren: () => import('./menu-estudiante/menu-estudiante.module').then( m => m.MenuEstudiantePageModule)
  },
  {
    path: 'menu-conductor',
    loadChildren: () => import('./menu-conductor/menu-conductor.module').then( m => m.MenuConductorPageModule)
  },
  {
    path: 'real-time',
    loadChildren: () => import('./real-time/real-time.module').then( m => m.RealTimePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
