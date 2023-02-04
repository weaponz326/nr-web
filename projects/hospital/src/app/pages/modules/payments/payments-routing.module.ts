import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PaymentsPage } from './payments.page';
import { AllPaymentsComponent } from './all-payments/all-payments.component';
import { ViewPaymentComponent } from './view-payment/view-payment.component';
import { PaymentsHistoryComponent } from './payments-history/payments-history.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConfigurationComponent } from './configuration/configuration.component';


const routes: Routes = [
  {
    path: "",
    component: PaymentsPage,
    children: [
      { path: "", component: DashboardComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'configuration', component: ConfigurationComponent },
      { path: "all-payments", component: AllPaymentsComponent },
      { path: "view-payment", component: ViewPaymentComponent },
      { path: "payments-history", component: PaymentsHistoryComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentsRoutingModule { }
