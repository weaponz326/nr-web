import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllPaymentsComponent } from './all-payments/all-payments.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NewPaymentComponent } from './new-payment/new-payment.component';
import { PaymentsPage } from './payments.page';
import { ViewPaymentComponent } from './view-payment/view-payment.component';

const routes: Routes = [
  {
    path: "",
    component: PaymentsPage,
    children: [
      { path: "", component: DashboardComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'configuration', component: ConfigurationComponent },
      { path: "all-payments", component: AllPaymentsComponent },
      { path: "new-payment", component: NewPaymentComponent },
      { path: "view-payment", component: ViewPaymentComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentsRoutingModule { }
