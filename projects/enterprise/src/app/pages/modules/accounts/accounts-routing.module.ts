import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AccountsPage } from './accounts.page';
import { AllAccountsComponent } from './all-accounts/all-accounts.component';
import { AllTransactionsComponent } from './all-transactions/all-transactions.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ViewAccountComponent } from './view-account/view-account.component';
import { ConfigurationComponent } from './configuration/configuration.component';


const routes: Routes = [
  {
    path: "",
    component: AccountsPage,
    children: [
      { path: "", component: DashboardComponent },
      { path: "dashboard", component: DashboardComponent },
      { path: "configuration", component: ConfigurationComponent },
      { path: "all-accounts", component: AllAccountsComponent },
      { path: "view-account", component: ViewAccountComponent },
      { path: "all-transactions", component: AllTransactionsComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountsRoutingModule { }
