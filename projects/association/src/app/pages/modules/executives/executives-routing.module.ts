import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ExecutivesPage } from './executives.page';
import { ViewExecutiveComponent } from './view-executive/view-executive.component';
import { AddExecutiveComponent } from './add-executive/add-executive.component';
import { AllExecutivesComponent } from './all-executives/all-executives.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: "",
    component: ExecutivesPage,
    children: [
      { path: "", component: DashboardComponent },
      { path: "dashboard", component: DashboardComponent },
      { path: "configuration", component: ConfigurationComponent },
      { path: "all-executives", component: AllExecutivesComponent },
      { path: "add-executive", component: AddExecutiveComponent },
      { path: "view-executive", component: ViewExecutiveComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExecutivesRoutingModule { }
