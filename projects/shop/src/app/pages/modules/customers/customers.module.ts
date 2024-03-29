import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CustomersRoutingModule } from './customers-routing.module';
import { MainNavbarModule } from 'projects/application/src/app/components/main-navbar/main-navbar.module';
import { ModuleUtilitiesModule } from 'projects/personal/src/app/components/module-utilities/module-utilities.module';

import { CustomersPage } from './customers.page';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { AllCustomersComponent } from './all-customers/all-customers.component';
import { NewCustomerComponent } from './new-customer/new-customer.component';
import { ViewCustomerComponent } from './view-customer/view-customer.component';
import { CustomerFormComponent } from './customer-form/customer-form.component';


@NgModule({
  declarations: [
    CustomersPage,
    DashboardComponent,
    ConfigurationComponent,
    AllCustomersComponent,
    NewCustomerComponent,
    ViewCustomerComponent,
    CustomerFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CustomersRoutingModule,
    MainNavbarModule,
    ModuleUtilitiesModule,
  ]
})
export class CustomersModule { }
