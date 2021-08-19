import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminPage } from './admin.page';

const routes: Routes = [
  {
    path: '',
    component: AdminPage
  },
  {
    path: 'agregar',
    loadChildren: () => import('./agregar/agregar.module').then( m => m.AgregarPageModule)
  },
  {
    path: 'editar',
    children: [
      {
        path: '',
        loadChildren: () => import('./editar/editar.module').then( m => m.EditarPageModule)
      },
      {
        path: ':habiID',
        loadChildren: () => import('./editar/edit/edit.module').then(
          m => m.EditPageModule
        )
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminPageRoutingModule {}
