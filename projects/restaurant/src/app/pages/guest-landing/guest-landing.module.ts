import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GuestLandingRoutingModule } from './guest-landing-routing.module';
import { MainNavbarModule } from 'projects/personal/src/app/components/main-navbar/main-navbar.module';
import { SuiteLandingModule } from 'projects/personal/src/app/components/suite-landing/suite-landing.module';

import { GuestLandingPage } from './guest-landing.page';


@NgModule({
  declarations: [
    GuestLandingPage
  ],
  imports: [
    CommonModule,
    GuestLandingRoutingModule,
    MainNavbarModule,
    SuiteLandingModule
  ]
})
export class GuestLandingModule { }
