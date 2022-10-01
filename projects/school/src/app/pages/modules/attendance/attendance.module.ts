import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AttendanceRoutingModule } from './attendance-routing.module';
import { AttendancePage } from './attendance.page';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { AllAttendanceComponent } from './all-attendance/all-attendance.component';
import { NewAttendanceComponent } from './new-attendance/new-attendance.component';
import { ViewAttendanceComponent } from './view-attendance/view-attendance.component';
import { SheetViewComponent } from './sheet-view/sheet-view.component';
import { CheckSheetComponent } from './check-sheet/check-sheet.component';


@NgModule({
  declarations: [
    AttendancePage,
    DashboardComponent,
    ConfigurationComponent,
    AllAttendanceComponent,
    NewAttendanceComponent,
    ViewAttendanceComponent,
    SheetViewComponent,
    CheckSheetComponent
  ],
  imports: [
    CommonModule,
    AttendanceRoutingModule
  ]
})
export class AttendanceModule { }
