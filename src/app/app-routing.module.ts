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
  {
    path: 'estudiantes',
    loadChildren: () => import('./estudiantes/estudiantes.module').then( m => m.EstudiantesPageModule)
  },
  {
    path: 'estudiantes-modal',
    loadChildren: () => import('./estudiantes-modal/estudiantes-modal.module').then( m => m.EstudiantesModalPageModule)
  },
  {
    path: 'bus',
    loadChildren: () => import('./bus/bus.module').then( m => m.BusPageModule)
  },
{
    path: 'choferes',
    loadChildren: () => import('./choferes/choferes.module').then( m => m.ChoferesPageModule)
  },
  {
    path: 'chofer',
    loadChildren: () => import('./chofer/chofer.module').then( m => m.ChoferPageModule)
  },
  {
    path: 'editar-chofer/:id', // Ruta que incluye el parámetro `id`
    loadChildren: () => import('./editar-chofer/editar-chofer.module').then( m => m.EditarChoferPageModule)
  },
  {
    path: 'eliminar-chofer/:id', // Ruta que incluye el parámetro `id`
    loadChildren: () => import('./eliminar-chofer/eliminar-chofer.module').then( m => m.EliminarChoferPageModule)
  },
  {
    path: 'completar-perfil-chofer',
    loadChildren: () => import('./completar-perfil-chofer/completar-perfil-chofer.module').then( m => m.CompletarPerfilChoferPageModule)
  },  {
    path: 'horarios',
    loadChildren: () => import('./horarios/horarios.module').then( m => m.HorariosPageModule)
  },
  {
    path: 'servicio-ruta',
    loadChildren: () => import('./servicio-ruta/servicio-ruta.module').then( m => m.ServicioRutaPageModule)
  },



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
