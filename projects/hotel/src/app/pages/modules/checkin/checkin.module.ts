import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CheckinRoutingModule } from './checkin-routing.module';
import { MainNavbarModule } from 'projects/application/src/app/components/main-navbar/main-navbar.module';
import { ModuleUtilitiesModule } from 'projects/personal/src/app/components/module-utilities/module-utilities.module';

import { CheckinPage } from './checkin.page';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { AllCheckinComponent } from './all-checkin/all-checkin.component';
import { NewCheckinComponent } from './new-checkin/new-checkin.component';
import { ViewCheckinComponent } from './view-checkin/view-checkin.component';
import { CheckinFormComponent } from './checkin-form/checkin-form.component';
import { CheckinRoomsComponent } from './checkin-rooms/checkin-rooms.component';


@NgModule({
  declarations: [
    CheckinPage,
    DashboardComponent,
    ConfigurationComponent,
    AllCheckinComponent,
    NewCheckinComponent,
    ViewCheckinComponent,
    CheckinFormComponent,
    CheckinRoomsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CheckinRoutingModule,
    MainNavbarModule,
    ModuleUtilitiesModule,
  ]
})
export class CheckinModule { }
