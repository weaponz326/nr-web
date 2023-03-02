import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ReceivablesPage } from './receivables.page';
import { AllReceivablesComponent } from './all-receivables/all-receivables.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: "",
    component: ReceivablesPage,
    children: [
      { path: "", component: DashboardComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'configuration', component: ConfigurationComponent },
      { path: "all-receivables", component: AllReceivablesComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReceivablesRoutingModule { }
