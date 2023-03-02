import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PayablesRoutingModule } from './payables-routing.module';
import { PayablesPage } from './payables.page';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { AllPayablesComponent } from './all-payables/all-payables.component';
import { AddPayableComponent } from './add-payable/add-payable.component';
import { EditPayableComponent } from './edit-payable/edit-payable.component';
import { PayableFormComponent } from './payable-form/payable-form.component';


@NgModule({
  declarations: [
    PayablesPage,
    DashboardComponent,
    ConfigurationComponent,
    AllPayablesComponent,
    AddPayableComponent,
    EditPayableComponent,
    PayableFormComponent
  ],
  imports: [
    CommonModule,
    PayablesRoutingModule
  ]
})
export class PayablesModule { }
