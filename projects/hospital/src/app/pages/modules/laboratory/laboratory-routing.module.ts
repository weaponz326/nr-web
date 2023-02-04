import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LaboratoryPage } from './laboratory.page';
import { AllLabsComponent } from './all-labs/all-labs.component';
import { ViewLabComponent } from './view-lab/view-lab.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConfigurationComponent } from './configuration/configuration.component';


const routes: Routes = [
  {
    path: "",
    component: LaboratoryPage,
    children: [
      { path: "", component: DashboardComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'configuration', component: ConfigurationComponent },
      { path: "all-labs", component: AllLabsComponent },
      { path: "view-lab", component: ViewLabComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LaboratoryRoutingModule { }
