import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LessonPlanPage } from './lesson-plan.page';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { NewPlanComponent } from './new-plan/new-plan.component';
import { ViewPlanComponent } from './view-plan/view-plan.component';
import { AllPlansComponent } from './all-plans/all-plans.component';

const routes: Routes = [
  {
    path: "",
    component: LessonPlanPage,
    children: [
      { path: "", component: DashboardComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'configuration', component: ConfigurationComponent },
      { path: "all-plans", component: AllPlansComponent },
      { path: "new-plan", component: NewPlanComponent },
      { path: "view-plan", component: ViewPlanComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LessonPlanRoutingModule { }
