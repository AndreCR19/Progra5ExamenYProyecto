import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HabiPageRoutingModule } from './habi-routing.module';

import { HabiPage } from './habi.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HabiPageRoutingModule
  ],
  declarations: [HabiPage]
})
export class HabiPageModule {}
