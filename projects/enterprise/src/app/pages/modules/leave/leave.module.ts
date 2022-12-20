import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LeaveRoutingModule } from './leave-routing.module';
import { MainNavbarModule } from 'projects/application/src/app/components/main-navbar/main-navbar.module';
import { ModuleUtilitiesModule } from 'projects/personal/src/app/components/module-utilities/module-utilities.module';
import { EmployeesWindowsModule } from '../../../components/select-windows/employees-windows/employees-windows.module';

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
    FormsModule,
    ReactiveFormsModule,
    LeaveRoutingModule,
    MainNavbarModule,
    ModuleUtilitiesModule,
    EmployeesWindowsModule
  ]
})
export class LeaveModule { }
