import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'admin',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'admin',
    children: [
      {
        path: '',
        loadChildren: () => import('./admin/admin.module').then( m => m.AdminPageModule)
      },
      {
        path: ':habiID',
        loadChildren: () => import('./admin/editar/editar.module').then(
          m => m.EditarPageModule
        )
      },
      {
        path: 'agregar',
        loadChildren: () => import('./admin/agregar/agregar.module').then(
          m => m.AgregarPageModule
        )
      }
    ]
  },
  {
    path: 'usuario',
    children: [
      {
        path: '',
        loadChildren: () => import('./usuario/usuario.module').then(
          m => m.UsuarioPageModule
        )
      },
      {
        path: ':habiID',
        loadChildren: () => import('./usuario/cuartos/cuartos.module').then(
          m => m.CuartosPageModule
        )
      }
    ]
  },
  {
    path: 'registrar',
    loadChildren: () => import('./registrar/registrar.module').then( m => m.RegistrarPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
