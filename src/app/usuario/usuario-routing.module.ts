import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsuarioPage } from './usuario.page';

const routes: Routes = [
  {
    path: '',
    component: UsuarioPage
  },
  {
    path: 'perfil',
    loadChildren: () => import('./perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
    path: 'cuartos',
    children: [
      {
        path: '',
        loadChildren: () => import('./cuartos/cuartos.module').then( m => m.CuartosPageModule)
      },
      {
        path: ':habiID',
        loadChildren: () => import('./cuartos/detalle/detalle.module').then(
          m => m.DetallePageModule
        )
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsuarioPageRoutingModule {}
