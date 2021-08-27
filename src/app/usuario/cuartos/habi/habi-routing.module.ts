import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HabiPage } from './habi.page';

const routes: Routes = [
  {
    path: '',
    component: HabiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HabiPageRoutingModule {}
