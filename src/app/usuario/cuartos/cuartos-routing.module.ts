import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CuartosPage } from './cuartos.page';

const routes: Routes = [
  {
    path: '',
    component: CuartosPage
  },
  {
    path: 'detalle',
    loadChildren: () => import('./detalle/detalle.module').then( m => m.DetallePageModule)
  }/* ,
  {
    path: 'detalle',
    children: [
      {
        path: '',
        loadChildren: () => import('./detalle/detalle.module').then( m => m.DetallePageModule)
      },
      {
        path: ':habiID',
        loadChildren: () => import('./detalle/detalle.module').then(
          m => m.DetallePageModule
        )
      }
    ]
  } */
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CuartosPageRoutingModule {}
