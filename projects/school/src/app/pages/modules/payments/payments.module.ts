import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentsRoutingModule } from './payments-routing.module';
import { PaymentsPage } from './payments.page';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { AllPaymentsComponent } from './all-payments/all-payments.component';
import { NewPaymentComponent } from './new-payment/new-payment.component';
import { ViewPaymentComponent } from './view-payment/view-payment.component';
import { PaymentFormComponent } from './payment-form/payment-form.component';


@NgModule({
  declarations: [
    PaymentsPage,
    DashboardComponent,
    ConfigurationComponent,
    AllPaymentsComponent,
    NewPaymentComponent,
    ViewPaymentComponent,
    PaymentFormComponent
  ],
  imports: [
    CommonModule,
    PaymentsRoutingModule
  ]
})
export class PaymentsModule { }
