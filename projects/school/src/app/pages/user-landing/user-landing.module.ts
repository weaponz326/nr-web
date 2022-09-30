import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserLandingRoutingModule } from './user-landing-routing.module';
import { MainNavbarModule } from 'projects/application/src/app/components/main-navbar/main-navbar.module';
import { SuiteLandingModule } from 'projects/personal/src/app/components/suite-landing/suite-landing.module';

import { UserLandingPage } from './user-landing.page';


@NgModule({
  declarations: [
    UserLandingPage
  ],
  imports: [
    CommonModule,
    UserLandingRoutingModule,
    MainNavbarModule,
    SuiteLandingModule
  ]
})
export class UserLandingModule { }
