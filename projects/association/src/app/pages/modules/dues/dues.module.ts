import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DuesRoutingModule } from './dues-routing.module';
import { DuesPage } from './dues.page';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { AllDuesComponent } from './all-dues/all-dues.component';
import { CreateDuesComponent } from './create-dues/create-dues.component';
import { ViewDuesComponent } from './view-dues/view-dues.component';
import { DuesFormComponent } from './dues-form/dues-form.component';
import { DuesPaymentsComponent } from './dues-payments/dues-payments.component';
import { AddPaymentComponent } from './add-payment/add-payment.component';
import { EditPaymentComponent } from './edit-payment/edit-payment.component';


@NgModule({
  declarations: [
    DuesPage,
    DashboardComponent,
    ConfigurationComponent,
    AllDuesComponent,
    CreateDuesComponent,
    ViewDuesComponent,
    DuesFormComponent,
    DuesPaymentsComponent,
    AddPaymentComponent,
    EditPaymentComponent
  ],
  imports: [
    CommonModule,
    DuesRoutingModule
  ]
})
export class DuesModule { }
