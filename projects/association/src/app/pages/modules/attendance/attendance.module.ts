import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AttendanceRoutingModule } from './attendance-routing.module';
import { MainNavbarModule } from 'projects/application/src/app/components/main-navbar/main-navbar.module';
import { ModuleUtilitiesModule } from 'projects/personal/src/app/components/module-utilities/module-utilities.module';

import { AttendancePage } from './attendance.page';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { AllAttendanceComponent } from './all-attendance/all-attendance.component';
import { NewAttendanceComponent } from './new-attendance/new-attendance.component';
import { ViewAttendanceComponent } from './view-attendance/view-attendance.component';
import { ViewSheetComponent } from './view-sheet/view-sheet.component';
import { CheckAttendanceComponent } from './check-attendance/check-attendance.component';
import { AttendanceFormComponent } from './attendance-form/attendance-form.component';


@NgModule({
  declarations: [
    AttendancePage,
    DashboardComponent,
    ConfigurationComponent,
    AllAttendanceComponent,
    NewAttendanceComponent,
    ViewAttendanceComponent,
    ViewSheetComponent,
    CheckAttendanceComponent,
    AttendanceFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AttendanceRoutingModule,
    MainNavbarModule,
    ModuleUtilitiesModule
  ]
})
export class AttendanceModule { }
