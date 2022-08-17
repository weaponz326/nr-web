import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainLandingRoutingModule } from './main-landing-routing.module';
import { MainLandingPage } from './main-landing.page';
import { MainNavbarModule } from '../../components/main-navbar/main-navbar.module';


@NgModule({
  declarations: [
    MainLandingPage
  ],
  imports: [
    CommonModule,
    MainLandingRoutingModule,
    MainNavbarModule
  ]
})
export class MainLandingModule { }
