import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SalesRoutingModule } from './sales-routing.module';
import { MainNavbarModule } from 'projects/application/src/app/components/main-navbar/main-navbar.module';
import { ModuleUtilitiesModule } from 'projects/personal/src/app/components/module-utilities/module-utilities.module';

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
    FormsModule,
    ReactiveFormsModule,
    SalesRoutingModule,
    MainNavbarModule,
    ModuleUtilitiesModule,
  ]
})
export class SalesModule { }
