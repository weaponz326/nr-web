import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserLandingRoutingModule } from './user-landing-routing.module';
import { UserLandingPage } from './user-landing.page';


@NgModule({
  declarations: [
    UserLandingPage
  ],
  imports: [
    CommonModule,
    UserLandingRoutingModule
  ]
})
export class UserLandingModule { }
