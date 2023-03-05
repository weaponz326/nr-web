import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ReceivablesRoutingModule } from './receivables-routing.module';
import { MainNavbarModule } from 'projects/application/src/app/components/main-navbar/main-navbar.module';
import { ModuleUtilitiesModule } from 'projects/personal/src/app/components/module-utilities/module-utilities.module';

import { CustomersWindowsModule } from '../../../components/select-windows/customers-windows/customers-windows.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { AllReceivablesComponent } from './all-receivables/all-receivables.component';
import { AddReceivableComponent } from './add-receivable/add-receivable.component';
import { EditReceivableComponent } from './edit-receivable/edit-receivable.component';
import { ReceivableFormComponent } from './receivable-form/receivable-form.component';
import { ReceivablesPage } from './receivables.page';


@NgModule({
  declarations: [
    DashboardComponent,
    ConfigurationComponent,
    AllReceivablesComponent,
    AddReceivableComponent,
    EditReceivableComponent,
    ReceivableFormComponent,
    ReceivablesPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ReceivablesRoutingModule,
    MainNavbarModule,
    ModuleUtilitiesModule,
    CustomersWindowsModule
  ]
})
export class ReceivablesModule { }
