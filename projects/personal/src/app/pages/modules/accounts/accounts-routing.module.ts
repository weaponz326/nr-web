import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AccountsPage } from './accounts.page';
import { AllAccountsComponent } from './all-accounts/all-accounts.component';
import { AllTransactionComponent } from './all-transaction/all-transaction.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ViewAccountComponent } from './view-account/view-account.component';
import { ConfigurationComponent } from './configuration/configuration.component';

import { ViewAccountGuard } from '../../../guards/modules/accounts/view-account/view-account.guard';


const routes: Routes = [
  {
    path: "",
    component: AccountsPage,
    children: [
      { path: "", component: DashboardComponent },
      { path: "dashboard", component: DashboardComponent },
      { path: "configuration", component: ConfigurationComponent },
      { path: "all-accounts", component: AllAccountsComponent },
      { path: "view-account", component: ViewAccountComponent, canActivate: [ViewAccountGuard] },
      { path: "all-transactions", component: AllTransactionComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountsRoutingModule { }
