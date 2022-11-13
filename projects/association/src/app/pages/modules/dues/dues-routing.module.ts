import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllDuesComponent } from './all-dues/all-dues.component';

import { DuesPage } from './dues.page';
import { ViewDuesComponent } from './view-dues/view-dues.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { CreateDuesComponent } from './create-dues/create-dues.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DuesPaymentsComponent } from './dues-payments/dues-payments.component';

const routes: Routes = [
  {
    path: "",
    component: DuesPage,
    children: [
      { path: "", component: DashboardComponent },
      { path: "dashboard", component: DashboardComponent },
      { path: "configuration", component: ConfigurationComponent },
      { path: "all-dues", component: AllDuesComponent },
      { path: "create-dues", component: CreateDuesComponent },
      { path: "view-dues", component: ViewDuesComponent },
      { path: "dues-payments", component: DuesPaymentsComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DuesRoutingModule { }
