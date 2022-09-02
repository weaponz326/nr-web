import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuleHomeRoutingModule } from './module-home-routing.module';
import { MainNavbarModule } from 'projects/personal/src/app/components/main-navbar/main-navbar.module';
import { ModuleUtilitiesModule } from 'projects/personal/src/app/components/module-utilities/module-utilities.module';

import { ModuleHomePage } from './module-home.page';


@NgModule({
  declarations: [
    ModuleHomePage
  ],
  imports: [
    CommonModule,
    ModuleHomeRoutingModule,
    MainNavbarModule,
    ModuleUtilitiesModule
  ]
})
export class ModuleHomeModule { }
