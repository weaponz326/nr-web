import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountsRoutingModule } from './accounts-routing.module';
import { AccountsPage } from './accounts.page';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AllAccountsComponent } from './all-accounts/all-accounts.component';
import { AddAccountComponent } from './add-account/add-account.component';
import { ViewAccountComponent } from './view-account/view-account.component';
import { AccountTransactionsComponent } from './account-transactions/account-transactions.component';
import { AddTransactionComponent } from './add-transaction/add-transaction.component';
import { EditTransactionComponent } from './edit-transaction/edit-transaction.component';
import { TransactionFormComponent } from './transaction-form/transaction-form.component';
import { AllTransactionComponent } from './all-transaction/all-transaction.component';


@NgModule({
  declarations: [
    AccountsPage,
    DashboardComponent,
    AllAccountsComponent,
    AddAccountComponent,
    ViewAccountComponent,
    AccountTransactionsComponent,
    AddTransactionComponent,
    EditTransactionComponent,
    TransactionFormComponent,
    AllTransactionComponent
  ],
  imports: [
    CommonModule,
    AccountsRoutingModule
  ]
})
export class AccountsModule { }
