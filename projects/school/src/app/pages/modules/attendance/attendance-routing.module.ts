import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AttendancePage } from './attendance.page';
import { AllAttendanceComponent } from './all-attendance/all-attendance.component';
import { NewAttendanceComponent } from './new-attendance/new-attendance.component';
import { ViewAttendanceComponent } from './view-attendance/view-attendance.component';
import { CheckSheetComponent } from './check-sheet/check-sheet.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConfigurationComponent } from './configuration/configuration.component';

const routes: Routes = [
  {
    path: "",
    component: AttendancePage,
    children: [
      { path: "", component: AttendancePage },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'configuration', component: ConfigurationComponent },
      { path: "all-attendance", component: AllAttendanceComponent },
      { path: "new-attendance", component: NewAttendanceComponent },
      { path: "view-attendance", component: ViewAttendanceComponent },
      { path: "check-sheet", component: CheckSheetComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AttendanceRoutingModule { }
