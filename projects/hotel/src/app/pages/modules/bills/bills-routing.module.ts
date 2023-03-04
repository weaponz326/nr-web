import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BillsPage } from './bills.page';
import { AllBillsComponent } from './all-bills/all-bills.component';
import { ViewBillComponent } from './view-bill/view-bill.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConfigurationComponent } from './configuration/configuration.component';


const routes: Routes = [
  {
    path: "",
    component: BillsPage,
    children: [
      { path: "", component: DashboardComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'configuration', component: ConfigurationComponent },
      { path: "all-bills", component: AllBillsComponent },
      { path: "view-bill", component: ViewBillComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BillsRoutingModule { }
