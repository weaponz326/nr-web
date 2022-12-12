import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeaveRoutingModule } from './leave-routing.module';
import { LeavePage } from './leave.page';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { AllLeaveComponent } from './all-leave/all-leave.component';
import { AddLeaveComponent } from './add-leave/add-leave.component';
import { ViewLeaveComponent } from './view-leave/view-leave.component';
import { LeaveFormComponent } from './leave-form/leave-form.component';


@NgModule({
  declarations: [
    LeavePage,
    DashboardComponent,
    ConfigurationComponent,
    AllLeaveComponent,
    AddLeaveComponent,
    ViewLeaveComponent,
    LeaveFormComponent
  ],
  imports: [
    CommonModule,
    LeaveRoutingModule
  ]
})
export class LeaveModule { }
