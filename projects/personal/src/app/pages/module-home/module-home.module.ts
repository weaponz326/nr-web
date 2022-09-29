import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ModuleHomeRoutingModule } from './module-home-routing.module';
import { MainNavbarModule } from 'projects/application/src/app/components/main-navbar/main-navbar.module';
import { ModuleUtilitiesModule } from '../../components/module-utilities/module-utilities.module';

import { ModuleHomePage } from './module-home.page';


@NgModule({
  declarations: [
    ModuleHomePage
  ],
  imports: [
    CommonModule,
    RouterModule,
    ModuleHomeRoutingModule,
    MainNavbarModule,
    ModuleUtilitiesModule
  ]
})
export class ModuleHomeModule { }
