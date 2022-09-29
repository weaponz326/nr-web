import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PaymentsRoutingModule } from './payments-routing.module';
import { MainNavbarModule } from 'projects/application/src/app/components/main-navbar/main-navbar.module';
import { ModuleUtilitiesModule } from 'projects/personal/src/app/components/module-utilities/module-utilities.module';
import { OrdersWindowsModule } from '../../../components/select-windows/orders-windows/orders-windows.module';

import { PaymentsPage } from './payments.page';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AllPaymentsComponent } from './all-payments/all-payments.component';
import { NewPaymentComponent } from './new-payment/new-payment.component';
import { ViewPaymentComponent } from './view-payment/view-payment.component';
import { PaymentFormComponent } from './payment-form/payment-form.component';


@NgModule({
  declarations: [
    PaymentsPage,
    DashboardComponent,
    AllPaymentsComponent,
    NewPaymentComponent,
    ViewPaymentComponent,
    PaymentFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PaymentsRoutingModule,
    MainNavbarModule,
    ModuleUtilitiesModule,
    OrdersWindowsModule
  ]
})
export class PaymentsModule { }
