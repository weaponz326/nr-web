import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PayablesRoutingModule } from './payables-routing.module';
import { MainNavbarModule } from 'projects/application/src/app/components/main-navbar/main-navbar.module';
import { ModuleUtilitiesModule } from 'projects/personal/src/app/components/module-utilities/module-utilities.module';

import { SuppliersWindowsModule } from '../../../components/select-windows/suppliers-windows/suppliers-windows.module';

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
    FormsModule,
    ReactiveFormsModule,
    PayablesRoutingModule,
    MainNavbarModule,
    ModuleUtilitiesModule,
    SuppliersWindowsModule
  ]
})
export class PayablesModule { }
