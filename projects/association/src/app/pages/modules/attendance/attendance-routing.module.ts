import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllAttendanceComponent } from './all-attendance/all-attendance.component';

import { AttendancePage } from './attendance.page';
import { CheckAttendanceComponent } from './check-attendance/check-attendance.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NewAttendanceComponent } from './new-attendance/new-attendance.component';
import { ViewAttendanceComponent } from './view-attendance/view-attendance.component';

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
      { path: "check-sheet", component: CheckAttendanceComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AttendanceRoutingModule { }
