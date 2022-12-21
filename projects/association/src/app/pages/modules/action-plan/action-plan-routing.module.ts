import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ActionPlanPage } from './action-plan.page';
import { AllPlansComponent } from './all-plans/all-plans.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ViewPlanComponent } from './view-plan/view-plan.component';

const routes: Routes = [
  {
    path: "",
    component: ActionPlanPage,
    children: [
      { path: "", component: DashboardComponent },
      { path: "dashboard", component: DashboardComponent },
      { path: "configuration", component: ConfigurationComponent },
      { path: "all-plans", component: AllPlansComponent },
      { path: "view-plan", component: ViewPlanComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActionPlanRoutingModule { }
