import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StaffPage } from './staff.page';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { AllStaffComponent } from './all-staff/all-staff.component';
import { NewStaffComponent } from './new-staff/new-staff.component';
import { ViewStaffComponent } from './view-staff/view-staff.component';

import { ViewStaffGuard } from '../../../guards/modules/staff/view-staff/view-staff.guard';

const routes: Routes = [
  {
    path: "",
    component: StaffPage,
    children: [
      { path: "", component: DashboardComponent },
      { path: "dashboard", component: DashboardComponent },
      { path: "configuration", component: ConfigurationComponent },
      { path: "all-staff", component: AllStaffComponent },
      { path: "new-staff", component: NewStaffComponent },
      { path: "view-staff", component: ViewStaffComponent, canActivate: [ViewStaffGuard] }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaffRoutingModule { }
