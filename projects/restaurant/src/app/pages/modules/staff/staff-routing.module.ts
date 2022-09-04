import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StaffPage } from './staff.page';
import { AllStaffComponent } from './all-staff/all-staff.component';
import { NewStaffComponent } from './new-staff/new-staff.component';
import { ViewStaffComponent } from './view-staff/view-staff.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: "",
    component: StaffPage,
    children: [
      { path: "", component: DashboardComponent },
      { path: "dashboard", component: DashboardComponent },
      { path: "all-staff", component: AllStaffComponent },
      { path: "new-staff", component: NewStaffComponent },
      { path: "view-staff", component: ViewStaffComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaffRoutingModule { }
