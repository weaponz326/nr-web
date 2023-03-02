import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PayablesPage } from './payables.page';
import { AllPayablesComponent } from './all-payables/all-payables.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: "",
    component: PayablesPage,
    children: [
      { path: "", component: DashboardComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'configuration', component: ConfigurationComponent },
      { path: "all-payables", component: AllPayablesComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PayablesRoutingModule { }
