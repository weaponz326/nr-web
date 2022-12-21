import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppraisalPage } from './appraisal.page';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { AllAppraisalComponent } from './all-appraisal/all-appraisal.component';
import { NewAppraisalComponent } from './new-appraisal/new-appraisal.component';
import { ViewAppraisalComponent } from './view-appraisal/view-appraisal.component';

const routes: Routes = [
  {
    path: "",
    component: AppraisalPage,
    children: [
      { path: "", component: DashboardComponent },
      { path: "dashboard", component: DashboardComponent },
      { path: "configuration", component: ConfigurationComponent },
      { path: "all-appraisal", component: AllAppraisalComponent },
      { path: "new-appraisal", component: NewAppraisalComponent },
      { path: "view-appraisal", component: ViewAppraisalComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppraisalRoutingModule { }
