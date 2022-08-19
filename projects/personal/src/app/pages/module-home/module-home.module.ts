import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuleHomeRoutingModule } from './module-home-routing.module';
import { ModuleHomePage } from './module-home.page';


@NgModule({
  declarations: [
    ModuleHomePage
  ],
  imports: [
    CommonModule,
    ModuleHomeRoutingModule
  ]
})
export class ModuleHomeModule { }
