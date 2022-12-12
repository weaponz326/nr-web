import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProcurementPage } from './procurement.page';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { AllProcurementComponent } from './all-procurement/all-procurement.component';
import { ViewProcurementComponent } from './view-procurement/view-procurement.component';
import { NewProcurementComponent } from './new-procurement/new-procurement.component';

const routes: Routes = [
  {
    path: "",
    component: ProcurementPage,
    children: [
      { path: "", component: DashboardComponent },
      { path: "dashboard", component: DashboardComponent },
      { path: "configuration", component: ConfigurationComponent },
      { path: "all-procurement", component: AllProcurementComponent },
      { path: "new-procurement", component: NewProcurementComponent },
      { path: "view-procurement", component: ViewProcurementComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProcurementRoutingModule { }
