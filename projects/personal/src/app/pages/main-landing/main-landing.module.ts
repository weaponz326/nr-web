import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainLandingRoutingModule } from './main-landing-routing.module';
import { MainNavbarModule } from '../../components/main-navbar/main-navbar.module';

import { MainLandingPage } from './main-landing.page';
import { MainScrollnavComponent } from './main-scrollnav/main-scrollnav.component';
import { LandingTopComponent } from './landing-top/landing-top.component';
import { SuiteLeftComponent } from './suite-left/suite-left.component';
import { SuiteRightComponent } from './suite-right/suite-right.component';


@NgModule({
  declarations: [
    MainLandingPage,
    MainScrollnavComponent,
    LandingTopComponent,
    SuiteLeftComponent,
    SuiteRightComponent
  ],
  imports: [
    CommonModule,
    MainLandingRoutingModule,
    MainNavbarModule
  ]
})
export class MainLandingModule { }
