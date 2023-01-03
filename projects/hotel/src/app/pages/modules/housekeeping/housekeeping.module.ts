import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HousekeepingRoutingModule } from './housekeeping-routing.module';
import { HousekeepingPage } from './housekeeping.page';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { AllHousekeepingComponent } from './all-housekeeping/all-housekeeping.component';
import { NewHousekeepingComponent } from './new-housekeeping/new-housekeeping.component';
import { ViewHousekeepingComponent } from './view-housekeeping/view-housekeeping.component';
import { HousekeepingFormComponent } from './housekeeping-form/housekeeping-form.component';
import { HousekeepingChecklistComponent } from './housekeeping-checklist/housekeeping-checklist.component';
import { AddChecklistComponent } from './add-checklist/add-checklist.component';
import { EditChecklistComponent } from './edit-checklist/edit-checklist.component';


@NgModule({
  declarations: [
    HousekeepingPage,
    DashboardComponent,
    ConfigurationComponent,
    AllHousekeepingComponent,
    NewHousekeepingComponent,
    ViewHousekeepingComponent,
    HousekeepingFormComponent,
    HousekeepingChecklistComponent,
    AddChecklistComponent,
    EditChecklistComponent
  ],
  imports: [
    CommonModule,
    HousekeepingRoutingModule
  ]
})
export class HousekeepingModule { }
