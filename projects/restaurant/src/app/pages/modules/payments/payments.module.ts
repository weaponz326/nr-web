import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentsRoutingModule } from './payments-routing.module';
import { PaymentsPage } from './payments.page';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AllPaymentsComponent } from './all-payments/all-payments.component';
import { NewPaymentComponent } from './new-payment/new-payment.component';
import { ViewPaymentComponent } from './view-payment/view-payment.component';


@NgModule({
  declarations: [
    PaymentsPage,
    DashboardComponent,
    AllPaymentsComponent,
    NewPaymentComponent,
    ViewPaymentComponent
  ],
  imports: [
    CommonModule,
    PaymentsRoutingModule
  ]
})
export class PaymentsModule { }
