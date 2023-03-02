import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalesRoutingModule } from './sales-routing.module';
import { SalesPage } from './sales.page';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { AllSalesComponent } from './all-sales/all-sales.component';
import { AddSalesComponent } from './add-sales/add-sales.component';
import { EditSalesComponent } from './edit-sales/edit-sales.component';
import { SalesFormComponent } from './sales-form/sales-form.component';


@NgModule({
  declarations: [
    SalesPage,
    DashboardComponent,
    ConfigurationComponent,
    AllSalesComponent,
    AddSalesComponent,
    EditSalesComponent,
    SalesFormComponent
  ],
  imports: [
    CommonModule,
    SalesRoutingModule
  ]
})
export class SalesModule { }
