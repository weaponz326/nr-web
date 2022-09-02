import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GuestLandingRoutingModule } from './guest-landing-routing.module';
import { GuestLandingPage } from './guest-landing.page';


@NgModule({
  declarations: [
    GuestLandingPage
  ],
  imports: [
    CommonModule,
    GuestLandingRoutingModule
  ]
})
export class GuestLandingModule { }
