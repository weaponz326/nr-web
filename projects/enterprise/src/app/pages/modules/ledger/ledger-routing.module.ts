import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LedgerPage } from './ledger.page';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { AllLedgerComponent } from './all-ledger/all-ledger.component';
import { ViewLedgerComponent } from './view-ledger/view-ledger.component';

const routes: Routes = [
  {
    path: "",
    component: LedgerPage,
    children: [
      { path: "", component: DashboardComponent },
      { path: "dashboard", component: DashboardComponent },
      { path: "configuration", component: ConfigurationComponent },
      { path: "all-ledger", component: AllLedgerComponent },
      { path: "view-ledger", component: ViewLedgerComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LedgerRoutingModule { }
