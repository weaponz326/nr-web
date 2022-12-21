import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LeavePage } from './leave.page';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { AllLeaveComponent } from './all-leave/all-leave.component';
import { AddLeaveComponent } from './add-leave/add-leave.component';
import { ViewLeaveComponent } from './view-leave/view-leave.component';

const routes: Routes = [
  {
    path: "",
    component: LeavePage,
    children: [
      { path: "", component: DashboardComponent },
      { path: "dashboard", component: DashboardComponent },
      { path: "configuration", component: ConfigurationComponent },
      { path: "all-leave", component: AllLeaveComponent },
      { path: "add-leave", component: AddLeaveComponent },
      { path: "view-leave", component: ViewLeaveComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeaveRoutingModule { }
