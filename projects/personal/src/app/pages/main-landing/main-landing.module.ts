import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainLandingRoutingModule } from './main-landing-routing.module';
import { MainLandingPage } from './main-landing.page';


@NgModule({
  declarations: [
    MainLandingPage
  ],
  imports: [
    CommonModule,
    MainLandingRoutingModule
  ]
})
export class MainLandingModule { }
