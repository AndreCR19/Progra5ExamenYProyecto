import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditarPage } from './editar.page';

const routes: Routes = [
  {
    path: '',
    component: EditarPage
  },
  {
    path: 'editar',
    children: [
      {
        path: '',
        loadChildren: () => import('./edit/edit.module').then( m => m.EditPageModule)
      },
      {
        path: ':habiID',
        loadChildren: () => import('./edit/edit.module').then(
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
export class EditarPageRoutingModule {}
