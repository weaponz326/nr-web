import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { StaffRoutingModule } from './staff-routing.module';
import { MainNavbarModule } from 'projects/personal/src/app/components/main-navbar/main-navbar.module';
import { ModuleUtilitiesModule } from 'projects/personal/src/app/components/module-utilities/module-utilities.module';

import { StaffPage } from './staff.page';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AllStaffComponent } from './all-staff/all-staff.component';
import { NewStaffComponent } from './new-staff/new-staff.component';
import { ViewStaffComponent } from './view-staff/view-staff.component';
import { StaffFormComponent } from './staff-form/staff-form.component';


@NgModule({
  declarations: [
    StaffPage,
    DashboardComponent,
    AllStaffComponent,
    NewStaffComponent,
    ViewStaffComponent,
    StaffFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MainNavbarModule,
    ModuleUtilitiesModule,
    StaffRoutingModule
  ]
})
export class StaffModule { }