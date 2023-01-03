import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckinRoutingModule } from './checkin-routing.module';
import { CheckinPage } from './checkin.page';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { AllCheckinComponent } from './all-checkin/all-checkin.component';
import { NewCheckinComponent } from './new-checkin/new-checkin.component';
import { ViewCheckinComponent } from './view-checkin/view-checkin.component';
import { CheckinFormComponent } from './checkin-form/checkin-form.component';


@NgModule({
  declarations: [
    CheckinPage,
    DashboardComponent,
    ConfigurationComponent,
    AllCheckinComponent,
    NewCheckinComponent,
    ViewCheckinComponent,
    CheckinFormComponent
  ],
  imports: [
    CommonModule,
    CheckinRoutingModule
  ]
})
export class CheckinModule { }
